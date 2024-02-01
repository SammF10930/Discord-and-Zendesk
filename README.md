# Discord <> Zendesk Integration Bot 🤖

## Overview:
Curious about integrating Discord with Zendesk for efficient ticket management while ensuring high user privacy and security? This bot is an exploration into just that, serving as a bridge between Discord messages and Zendesk tickets.

## What This Bot Does:
This bot turns Discord messages into Zendesk tickets and ensures Zendesk agent responses are relayed back to Discord. It's designed with privacy in mind, encrypting messages before they leave Discord.

### Workflow 

1. **Discord to Zendesk**: Messages in Discord are encrypted 🔒 before being sent to Zendesk.
2. **Zendesk to Discord**: Zendesk agent responses are sent back to Discord.

*For Privacy, only Discord usernames are shared with Zendesk.*

## Setting up the Bot:

### Discord Setup 
1. **Create a Bot**:
   - Visit the [Discord Developer Portal](https://discord.com/developers/applications).
   - Click "New Application", provide a name for your app, and create it.
   - In the application dashboard, navigate to the "Bot" tab and click "Add Bot".
   - Once the bot is created, find the "Token" section and click "Copy" to get your bot token.
> [!IMPORTANT]
> Securely store the Bot Token, and add it to your config.js file.
2. **Invite the Bot to Your Server**:
   - Still in the Discord Developer Portal, go to the "OAuth2" tab.
   - Under "Scopes", check "bot". This will generate a URL below.
   - Under "Bot Permissions", select permissions like 'Send Messages', 'Manage Messages', 'Read Message History'.
   - Use the generated URL to invite your bot to your Discord server.

### Zendesk Setup 
1. **Create API Token**:
   - Go to Zendesk Admin > Channels > API.
   - Generate a new API token. 
> [!IMPORTANT]
> Securely store the Zendesk API Token, and add it to your config.js file.
   
2. **Add a new Webhook *(Formerly known as a "Target")***:
   - Navigate to Admin > Extensions.
   - Add a new target that will receive webhook calls.
3. **Create Custom Fields**:
   - Go to Admin > Ticket Fields.
   - Add custom fields for:
     - Discord Message ID
     - Discord Thread ID
> [!IMPORTANT]
> Securely store the Customer Field IDs, and add these to your config.js file.

4. **Create Trigger**:
   - Go to Admin > Triggers and add a new trigger.
   - Set conditions "Ticket is updated" and "Current user is agent".
   - For actions, select "Notify webhook" choosing your newly added webhook address, and using the payload below:

    ```json
    {
      "ticketId": "{{ticket.id}}",
      "comment": "{{ticket.latest_comment}}",
      "discordMessageId": "{{ticket.ticket_field_<Discord Message ID Field Key>}}",
      "discordThreadId": "{{ticket.ticket_field_<Discord Thread ID Field Key>}}"
    }
    ```
> [!NOTE]
> Be sure to replace `<Discord Message ID Field Key>` and `<Discord Thread ID Field Key>` with the actual Custom Field IDs.

### Running the Bot Locally 🏠
1. **Install Node.js**:
   - Ensure Node.js is installed on your machine. If not, download and install it from the [Node.js website](https://nodejs.org/).
2. **Clone the Repository**:
   - Clone the bot repository from GitHub to your local machine.
3. **Install Dependencies**:
   - Navigate to the bot directory in your command line.
   - Run `npm install` to install the required dependencies.
4. **Update Configurations**:
   - Edit the `config.js` file with your Discord bot token and other necessary configurations.
5. **Start the Bot**:
   - Run `node bot.js` in the command line to start the bot.
   - The bot should now be running and connected to Discord.

### Local Setup and Testing with ngrok 🌐
1. **Install ngrok**:
   - Download ngrok from [ngrok's website](https://ngrok.com/) and install it.
2. **Run ngrok**:
   - Open a new command prompt or terminal.
   - Navigate to where ngrok is installed.
   - Run `ngrok http 3000` to expose your local server (replace `3000` with the port number your bot runs on).
   - ngrok will start and display a forwarding URL (e.g., `https://12345.ngrok.io`).
3. **Configure the Webhook URL in Zendesk**:
   - Use the forwarding URL provided by ngrok as the webhook endpoint in your Zendesk trigger configuration.
   - This allows Zendesk to send webhook data to your locally running bot.
> [!WARNING]
> ngrok URLs are temporary and will change each time you restart ngrok if you're using the free plan.*

## License:
Open-sourced under the [MIT License](https://opensource.org/licenses/MIT).

## Disclaimer:
This bot is for educational and experimental use. Review and test thoroughly before production use.

### Production Deployment 🚀
If you intend to use this bot in production, adjust webhook URLs and other configurations as necessary and be sure to review Zendesk and Discord's Terms of use and Data / Privacy policies.

## Further Development Ideas:
While the current version of the bot serves the fundamental purpose of linking Discord and Zendesk, there's room for further development to enhance its capabilities. Here are a couple of ideas:

1. **Chrome Plugin or Zendesk App for Decrypting Messages**: Develop a tool that allows Zendesk agents to decrypt and read the encrypted Discord messages directly within the Zendesk agent view.
2. **Encrypting Zendesk Responses**: Extend plugin functionality to encrypt Zendesk messages before sending them to Discord, and update the bot to decrypt these messages before posting them in Discord. This would provide end-to-end encryption for all communication.

## Connect:
Questions or discussions? Connect with me on [LinkedIn](https://www.linkedin.com/in/sammf10930/).

## Contributions:
While I built this bot out of curiosity, contributions are always welcome!
