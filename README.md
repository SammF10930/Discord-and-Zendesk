# Discord-Zendesk Integration Bot
## Overview:
Curious about integrating Discord with Zendesk for efficient ticket management while ensuring high user privacy and security? 
This bot is an exploration into just that, serving as a bridge between Discord messages and Zendesk tickets.

## What This Bot Does:
This bot turns Discord messages into Zendesk tickets and ensures Zendesk agent responses are relayed back to Discord. It's designed with privacy in mind, encrypting messages before they leave Discord.

## Workflow:
* Discord to Zendesk: Messages in Discord are encrypted and sent to Zendesk.
* Zendesk to Discord: Zendesk agent responses are decrypted and sent back to Discord.


_For Privacy, only Discord usernames are used by the bot, no email address or further information is required._

## Setting It Up
### Discord Setup
1. **Create a Bot:** Go to Discord Developer Portal, create an app, and make a bot. Note the bot token.
2. **Invite the Bot:** Use the OAuth2 URL generator in the Developer Portal to invite the bot to your server.
### Zendesk Setup
1. **Create API Token:**
    - Go to Zendesk Admin > Channels > API.
    - Generate a new API token and keep it secure.
2. **Add Webhook (*previously Targets*):**
    - Navigate to Admin > Extensions.
    - Add a new target that will receive webhook calls.
3. **Create Custom Fields:**
    - Go to Admin > Ticket Fields.
    - Add custom fields for:
      a. Discord Message ID
      b. Discord Thread ID
4. **Create Trigger:**
    - Go to Admin > Triggers and add a new trigger.
    - Set conditions "Ticket is updated" and "Current user is agent".
    - For actions, select "Notify webhook", using the format below:
      ```
      {
        "ticketId": "{{ticket.id}}",
        "comment": "{{ticket.latest_comment}}",
        "discordMessageId": "{{ticket.ticket_field_<Discord Message ID Field Key>}}",
        "discordThreadId": "{{ticket.ticket_field_<Discord Thread ID Field Key>}}"
      }
      ```
### Local Setup and Testing with ngrok
1. **Install ngrok:** Download from ngrok's website and install.
2. **Run ngrok:** Expose your local server (e.g., ngrok http 3000).
3. **Copy ngrok URL:** Use this as the webhook URL in Zendesk trigger.
  > [!WARNING]
  > ngrok URLs will change on restart if you're using a free account.

### Production Deployment
For production, adjust webhook URLs and other configurations as necessary.

### Disclaimer
This bot is for educational and experimental use. Review and test thoroughly before production use.

### Connect
Questions or discussions? Connect with me on [LinkedIn](https://www.linkedin.com/in/sammf10930/).

### License
Open-sourced under the MIT License.

### Further Development Ideas
While the current version of the bot serves the fundamental purpose of linking Discord and Zendesk, there's room for further development to enhance its capabilities. Here are a couple of ideas:

1. **Chrome Plugin or Zendesk App for Decrypting Messages:** Develop a tool that allows Zendesk agents to decrypt and read the encrypted Discord messages directly within the Zendesk agent view.

2. **Encrypting Zendesk Responses:** Extend plugin's functionality to encrypt Zendesk messages before sending them to Discord, and accordingly, update the bot to decrypt these messages before posting them in Discord. This would provide end-to-end encryption for the entire communication cycle.

These enhancements would further strengthen the privacy and security aspects of the integration, making it even more robust for practical use.

### Contributions
Fork, explore, and contribute. Enhancements and feedback are welcome!
