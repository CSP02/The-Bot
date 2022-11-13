const { PermissionsBitField } = require('discord.js');
const puppeteer = require("puppeteer");

module.exports = {
    name: 'status',
    description: 'sends the status of the bot',
    syntax: '!status',
    aliases: ['status', 'botstatus', 'uptime'],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    async execute(client, message, args, Discord) {
        puppeteer
            .launch({
                defaultViewport: {
                    width: 1280,
                    height: 860,
                },
            })
            .then(async (browser) => {
                const page = await browser.newPage();
                await page.goto("https://stats.uptimerobot.com/5VY3YFMLXL");
                await page.screenshot({ path: "BotStatus.png" });
                await browser.close();
                await message.channel.send(
                    { files: ['BotStatus.png'] }
                );
            });
    }
};