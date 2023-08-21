const puppeteer = require('puppeteer-core');
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config()
const katex = require('katex');

module.exports = {
    name: 'buildtex',
    data: new SlashCommandBuilder()
        .setName('buildtex')
        .setDescription('sends an image link of generated tex')
        .addStringOption((option) =>
            option.setName('tex').setDescription('tex code to be generated').setRequired(true)
        ),

    async execute(client, interaction, Discord) {
        let height = 0;
        let width = 0;
        try {
            interaction.reply('Connecting...');
            const latexText = interaction.options.getString('tex');

            const html = `
            <html>
                <head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
                    <style>
                        body{
                            background-color: #1f1f1f;
                            color: #dcddde;
                        }
                        .katex{
                            font-size: 38pt;
                            text-align: left;
                            margin: 0;
                        }
                        .base{
                            margin: .5rem;
                            padding: .5rem;
                        }
                        #katexBuilt{
                            width: fit-content;
														padding: .5rem;
							              display: block;
                        }
                    </style>
                </head>
                <body>
                    <div id="katexBuilt">${katex.renderToString(latexText, { displayMode: true })}</div>
                </body>
            </html>
            `;

            const browser = await puppeteer.connect({
                browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.API_KEY_BLC}`,
            });
            interaction.editReply("Connected!")
            const page = await browser.newPage();
            await page.setViewport({
                width: 960,
                height: 760,
                deviceScaleFactor: 1,
            });
            interaction.editReply("Generating...")
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const hw = await page.$eval('#katexBuilt', el => {
                h = el.offsetHeight
                w = el.offsetWidth
                return { height: h, width: w }
            });
            height = hw.height
            width = hw.width
            await page.screenshot({ path: 'GeneratedImages/screenshot.png', clip: { x: 0, y: 0, width: width, height: height } });
            await browser.close();
            interaction.editReply('Generated! To get full details of latex input visit this site!\n[katex reference table](<https://katex.org/docs/support_table.html>)');
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            await interaction.editReply({ files: [{ attachment: 'GeneratedImages/screenshot.png' }] });
        }
    },
};