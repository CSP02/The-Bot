const { PermissionsBitField } = require('discord.js');
const puppeteer = require("puppeteer");

module.exports = {
    name: 'status',
    description: 'sends the status of the bot',
    syntax: '!status',
    aliases: ['status', 'botstatus', 'uptime'],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    async execute(client, message, args, Discord) {
        var url = 'https://stats.uptimerobot.com/5VY3YFMLXL';

        (async () => {
            const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            await page.goto(url);
            await page.screenshot({ path: 'The-Bot_Status.png' });
            await message.channel.send({ files: ['The-Bot_Status.png'] });
        })();
    }
};