const { Client, Intents } = require('discord.js');
const axios = require('axios');
const crypto = require('crypto');
const express = require('express');
const config = require('./config');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
    ],
});

function encrypt(text) {
    const iv = crypto.randomBytes(config.encryption.ivLength);
    const cipher = crypto.createCipheriv(config.encryption.algorithm, config.encryption.secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.type === 'REPLY') {
        return;
    }

    if (message.channel.id === config.discord.channelId) {
        try {
            const encryptedContent = encrypt(message.content);
            await createZendeskTicket(message.author.username, encryptedContent, message.id);
        } catch (error) {
            console.error('Error in message handling:', error);
        }
    } else if (message.channel.isThread()) {
        try {
            const thread = message.channel;
            const ticketId = thread.name.startsWith('Ticket ') ? thread.name.replace('Ticket ', '') : null;
            if (ticketId) {
                const encryptedContent = encrypt(message.content);
                await updateZendeskTicket(ticketId, encryptedContent, message.author.username);
            }
        } catch (error) {
            console.error('Error handling thread message:', error);
        }
    }
});

async function createZendeskTicket(username, content, discordMessageId) {
    const zendeskApiUrl = config.zendesk.apiUrl;
    const data = {
        ticket: {
            requester: { name: username },
            subject: "Discord Support Request",
            comment: { body: content },
            tags: ['discord_conversation', 'vpn_support'],
            custom_fields: [
                { id: config.zendesk.customFieldIdForDiscordMessageId, value: discordMessageId }
            ]
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${config.zendesk.zendeskEmail}/token:${config.zendesk.apiToken}`).toString('base64')
    };

    try {
        const response = await axios.post(zendeskApiUrl, data, { headers });
        console.log('Zendesk ticket created with ID:', response.data.ticket.id);
    } catch (error) {
        console.error('Error creating Zendesk Ticket:', error.message);
    }
}

async function updateZendeskTicketWithThreadID(ticketId, threadId) {
    const zendeskApiUrl = `https://${config.zendesk.subdomain}.zendesk.com/api/v2/tickets/${ticketId}.json`;
    const data = {
        ticket: {
            custom_fields: [
                { id: config.zendesk.customFieldIdForDiscordThreadId, value: threadId }
            ]
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${config.zendesk.zendeskEmail}/token:${config.zendesk.apiToken}`).toString('base64')
    };

    try {
        await axios.put(zendeskApiUrl, data, { headers });
        console.log(`Zendesk Ticket ID ${ticketId} updated with Thread ID ${threadId}`);
    } catch (error) {
        console.error('Error updating Zendesk Ticket with Discord Thread ID:', error);
    }
}

async function updateZendeskTicket(ticketId, content, discordUsername) {
    const zendeskApiUrl = `https://${config.zendesk.subdomain}.zendesk.com/api/v2/tickets/${ticketId}.json`;
    const formattedContent = `[From Discord User] ${content}`;
    const data = {
        ticket: {
            comment: { body: formattedContent, public: false }, // Mark as internal note
            status: "open"
        }
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${config.zendesk.zendeskEmail}/token:${config.zendesk.apiToken}`).toString('base64')
    };

    try {
        await axios.put(zendeskApiUrl, data, { headers });
        console.log(`Updated Zendesk Ticket ID ${ticketId} with new internal note from Discord user ${discordUsername}.`);
    } catch (error) {
        console.error('Error updating Zendesk Ticket:', error);
    }
}

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
    const { ticketId, comment, discordMessageId, discordThreadId } = req.body;

    try {
        let thread;
        if (discordThreadId) {
            thread = await client.channels.cache.find(c => c.isThread() && c.id === discordThreadId);
            if (thread) {
                thread.send(comment);
            }
        } else {
            const channel = await client.channels.fetch(config.discord.channelId);
            const originalMessage = await channel.messages.fetch(discordMessageId);
            thread = await originalMessage.startThread({
                name: `Ticket ${ticketId}`,
                autoArchiveDuration: 60,
            });

            await updateZendeskTicketWithThreadID(ticketId, thread.id);
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
    }

    res.status(200).send('Update received');
});

app.listen(config.webhook.serverPort, () => {
    console.log(`Webhook server running on port ${config.webhook.serverPort}`);
});

client.login(config.discord.botToken);
