// Discord-Zendesk Integration Bot Configuration
// See the README at https://github.com/SammF10930/Discord-and-Zendesk for brief instructions on how to get these values

module.exports = {
    discord: {
        botToken: 'YOUR_DISCORD_BOT_TOKEN', // Get this from Discord Developer Portal
        channelId: 'YOUR_DISCORD_CHANNEL_ID', // The ID of the channel where the bot listens
    },
    zendesk: {
        subdomain: 'YOUR_ZENDESK_SUBDOMAIN', // Your Zendesk Subdomain
        apiUrl: 'https://YOUR_SUBDOMAIN.zendesk.com/api/v2/tickets.json', // Your Zendesk API URL
        apiToken: 'YOUR_ZENDESK_API_TOKEN', // Generate this in Zendesk
        zendeskEmail: 'YOUR_ZENDESK_EMAIL', // The email address for your Zendesk Admin account; used for API Access
        customFieldIdForDiscordMessageId: 'YOUR_CUSTOM_FIELD_ID_FOR_MESSAGE_ID', // Zendesk Custom Feild ID for storing Dicscord Message ID
        customFieldIdForDiscordThreadId: 'YOUR_CUSTOM_FIELD_ID_FOR_THREAD_ID', // Zendesk Custom Feild ID for storing Dicscord Thread ID
    },
    webhook: {
        serverPort: 3000, // Local server port for webhook
        ngrokUrl: 'YOUR_NGROK_URL' // If you're using ngrok for local testing
    },
    encryption: {
        algorithm: 'aes-256-ctr', // Encryption algorithm
        secretKey: 'YOUR_SECRET_ENCRYPTION_KEY', // Set a strong secret key
        ivLength: 16  // Initialization vector length
    }
};
