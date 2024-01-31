module.exports = {
    discord: {
        botToken: '',
        channelId: '',
    },
    zendesk: {
        subdomain: '',
        apiUrl: '', 
        apiToken: '',
        zendeskEmail: '',
        customFieldIdForDiscordMessageId: '',
        customFieldIdForDiscordThreadId: '',
    },
    webhook: {
        serverPort: ,
        ngrokUrl: ''
    },
    encryption: {
        algorithm: 'aes-256-ctr',
        secretKey: '12345678901234567890123456789012', 
        ivLength: 16 
    }
};
