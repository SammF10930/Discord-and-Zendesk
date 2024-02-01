# Discord-Zendesk Integration Bot

## Overview
Curious about integrating Discord with Zendesk for efficient ticket management while ensuring high user privacy and security? This bot is an exploration into just that, serving as a bridge between Discord messages and Zendesk tickets.

## What This Bot Does
This bot turns Discord messages into Zendesk tickets and ensures Zendesk agent responses are relayed back to Discord. It's designed with privacy in mind, encrypting messages before they leave Discord.

### Workflow

1. **Discord to Zendesk**: Messages in Discord are encrypted and sent to Zendesk.
2. **Zendesk to Discord**: Zendesk agent responses are sent back to Discord.

*For Privacy, only Discord usernames are used in the Zendesk Ticket*

## Setting It Up

### Discord Setup
1. **Create a Bot**:
   - Visit the [Discord Developer Portal](https://discord.com/developers/applications).
   - Click "New Application", provide a name for your app, and create it.
   - In the application dashboard, navigate to the "Bot" tab and click "Add Bot".
   - Once the bot is created, find the "Token" section and click "Copy" to get your bot token. Keep this token secure.
2. **Invite the Bot to Your Server**:
   - Still in the Discord Developer Portal, go to the "OAuth2" tab.
   - Under "Scopes", check "bot". This will generate a URL below.
   - Choose the appropriate permissions for your bot under "Bot Permissions".
   - Use the generated URL to invite your bot to your Discord server.

### Zendesk Setup
1. **Create API Token**:
   - Go to Zendesk Admin > Channels > API.
   - Generate a new API token and keep it secure.
2. **Add Webhook (Target)**:
   - Navigate to Admin > Extensions.
   - Add a new target that will receive webhook calls.
3. **Create Custom Fields**:
   - Go to Admin > Ticket Fields.
   - Add custom fields for:
     - Discord Message ID
     - Discord Thread ID
4. **Create Trigger**:
   - Go to Admin > Triggers and add a new trigger.
   - Set conditions like "Ticket is updated" and "Current user is agent".
   - For actions, select "Notify webhook", using the format below:

    ```json
    {
      "ticketId": "{{ticket.id}}",
      "comment": "{{ticket.latest_comment}}",
      "discordMessageId": "{{ticket.ticket_field_<Discord Message ID Field Key>}}",
      "discordThreadId": "{{ticket.ticket_field_<Discord Thread ID Field Key>}}"
    }
    ```

### Local Setup and Testing with ngrok
1. **Install ngrok**:
   - Go to [ngrok's website](https://ngrok.com/) and download the ngrok application for your operating system.
   - Follow the installation instructions provided on the website.
2. **Run ngrok**:
   - After installing, open a command prompt or terminal.
   - Navigate to the directory where ngrok is installed.
   - Run the command `ngrok http 3000` to expose your local server (replace `3000` with your local server's port number).
   - ngrok will start and display a forwarding URL (e.g., `https://12345.ngrok.io`).
3. **Use the ngrok URL**:
   - Copy the forwarding URL provided by ngrok.
   - Use this URL as the webhook endpoint in your Zendesk trigger configuration.

*Note: ngrok URLs are temporary and will change each time you restart ngrok.*

### Production Deployment
For production, adjust webhook URLs and other configurations as necessary.

## Disclaimer
This bot is for educational and experimental use. Review and test thoroughly before production use.

## Connect
Questions or discussions? Connect with me on [LinkedIn](https://www.linkedin.com/in/sammf10930/).

## License
Open-sourced under the [MIT License](https://opensource.org/licenses/MIT).

## Further Development Ideas
While the current version of the bot serves the fundamental purpose of linking Discord and Zendesk, there's room for further development to enhance its capabilities. Here are a couple of ideas:

1. **Chrome Plugin or Zendesk App for Decrypting Messages**: Develop a tool that allows Zendesk agents to decrypt and read the encrypted Discord messages directly within the Zendesk agent view.

2. **Encrypting Zendesk Responses**: Extend plugin functionality to encrypt Zendesk messages before sending them to Discord, and update the bot to decrypt these messages before posting them in Discord. This would provide end-to-end encryption for the entire communication cycle.

## Contributions
Fork, explore, and contribute. Enhancements and feedback are welcome!
