const { cmd, commands } = require('../lib/command')
const config = require('../settings')
const os = require('os')
var { get_set , input_set } = require('../lib/set_db') 
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')


cmd({
    pattern: "alive",
    react: "🧬",
    desc: "Check bot Commands.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { reply, prefix }) => {
    try {

        let teksnya = `
 Hello Ｉ ａｍ  *DARK-SHADOW-MD🎊* 
╭────────────────────●●►
| *🛠️  𝙑𝙀𝙍𝙎𝙄𝙊𝙉:* ${require("../package.json").version}
| *📟 Ram usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
| *⏱️  𝗥𝗨𝗡𝗧𝗜𝗠𝗘:* ${runtime(process.uptime())}
| *👨‍💻 Owner*: Pathum Malsara
╰─────────────────────●●►
 *║ ❮❮    DARK SHADOW 𝗠𝗗 𝗠𝗘𝗡𝗨   𝗟𝗜𝗦𝗧 ❯❯  ║*
 
 `;

        let imageUrl = "https://i.ibb.co/5XJdT7zS/6691.jpg";

        let vpsOptions = [
        
            { title: "ᴅᴏᴡɴʟᴏᴀᴅ menu ", description: "Get Bot Download Menu", id: `${prefix}downloadmenu` },
            { title: "ᴍᴏᴠɪᴇ ᴍᴇɴᴜ ", description: "Get Bot Movie Menu", id: `${prefix}moviemenu` },
            { title: "ᴄᴏɴᴠᴇʀᴛ menu ", description: "Get Bot Convert Menu", id: `${prefix}convertmenu` },
            { title: "ɢʀᴏᴜᴘ ᴍᴇɴᴜ ", description: "Get Group Only Commands", id: `${prefix}groupmenu` },
            { title: "ᴀɪ ᴍᴇɴᴜ ", description: "Get Bot AI Commands List", id: `${prefix}aimenu` },
            { title: "ꜱᴇᴀʀᴄʜ menu ", description: "Get Bot Search Menu", id: `${prefix}searchmenu` },
            { title: "ꜰᴜɴ menu ", description: "Fun Joke Menu Bot", id: `${prefix}funmenu` },
            { title: "ʙᴜɢ menu ", description: "Owner Only Bug Menu", id: `${prefix}bugmenu` },
            { title: "ʀᴀɴᴅᴏᴍ ᴍᴇɴᴜ ", description: "Random Commands Menu", id: `${prefix}randommenu` }
        ];

        let buttonSections = [
            {
                title: "List of DARK SHADOW MD Bot Commands",
                highlight_label: "DARK SHADOW",
                rows: vpsOptions
            }
        ];

        let buttons = [
            {
                buttonId: "action",
                buttonText: { displayText: "Select Menu" },
                type: 4,
                nativeFlowInfo: {
                    name: "single_select",
                    paramsJson: JSON.stringify({
                        title: "MENU📃",
                        sections: buttonSections
                    })
                },
            {
                buttonId: "quick_reply",
                buttonText: { displayText: "ALIVE" },                          {
                type: 4,
                nativeFlowInfo: {
                    name: "quick_reply",
                    paramsJson: JSON.stringify({
                        title: "ALIVE",
                    })
            }
        ];

        conn.sendMessage(m.chat, {
            buttons,
            headerType: 1,
            viewOnce: true,
            caption: teksnya,
            image: { url: imageUrl },
            contextInfo: {
                mentionedJid: [m.sender], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: `SHADOW💗`,
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
