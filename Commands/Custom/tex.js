const { ANSI } = require('../../Generators/AnsiColors');

const puppeteer = require('puppeteer-core');
const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config()
const katex = require('katex');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: 'buildtex',
    cooldown: 20,
    data: new SlashCommandBuilder()
        .setName('buildtex')
        .setDescription('Sends an image of generated tex.')
        .addStringOption((option) =>
            option.setName('tex_input').setDescription('tex code to be generated').setRequired(true)
        ),

    async execute(Discord, client, interaction) {
        let height = 0; //? Set the height of the document to 0
        let width = 0; //? Set the width of the document to 0

        try {
            await interaction.reply('Connecting...');
            const latexText = await interaction.options.getString('tex_input'); //? Get the tex input
            let katexOut = ""; 
            
            try {
                await interaction.editReply("Parsing...");
                katexOut = katex.renderToString(latexText, { displayMode: true }); //? Parse the equation and generate the output html
            } catch (e) {
                if (e instanceof katex.ParseError) return await interaction.editReply("Invalid tex code!");
            }

            const html = `
			<!DOCTYPE html>
            <html>
                <head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
                    <style>
                        *{
                            margin: 0;
                            padding: 0;
                        }
                        body{
                            background-color: #1f1f1f;
                            color: #dcddde;
                        }
                        .katex{
                            font-size: 38pt;
                            text-align: left;
                            margin: 0;
                        }
                        .katex-html{
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
                    <div id="katexBuilt">${katexOut}</div>
                </body>
            </html>
            `;

            const browser = await puppeteer.connect({ //? Open browser through websocket
                browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.API_KEY_BLC}`,
            });
            
            await interaction.editReply("Connected!");
            
            const page = await browser.newPage(); //? Open a new page
            await page.setViewport({
                width: 960,
                height: 760,
                deviceScaleFactor: 1,
            });

            await interaction.editReply("Generating...");
            
            await page.setContent(html, { waitUntil: 'networkidle0' }); //? Set the page content (html document) to the html which holds the generated html code for the math eq
            
            const hw = await page.$eval('#katexBuilt', el => {
                h = el.offsetHeight;
                w = el.offsetWidth;
                return { height: h, width: w };
            });
            
            height = hw.height; //? These variables are used to take screenshot with the height and width
            width = hw.width;

            //? Take the screenshot and save it in GeneratedImages/screenshot.png folder/file with the dimensions given 
            await page.screenshot({ path: 'GeneratedImages/screenshot.png', clip: { x: 0, y: 0, width: width, height: height } });
            await browser.close();
            
            await interaction.editReply('Generated! To get full details of latex input visit this site!\n[katex reference table](<https://katex.org/docs/support_table.html>)');
            
            await wait(2000);
            
            await interaction.editReply({ files: [{ attachment: 'GeneratedImages/screenshot.png' }] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.error(ANSI.foreground.Red + e + ANSI.Reset);
        }
    },
};
