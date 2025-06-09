const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙️",
    filename: __filename


},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        let desc = `*❰❰ 𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝐒𝐄𝐓𝐓𝐈𝐍𝐆 𝐋𝐈𝐒𝐓 ❱❱*

🔢 *ʀᴇᴘʟʏ ʙʟᴏᴡ ɴᴜᴍʙᴇʀ ᴄʜᴀɴɢᴇ ᴛᴏ 𝚌𝚑𝚊𝚖𝚊 𝚖𝚍 ꜱᴇᴛᴛɪɴɢ,*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗪𝗢𝗥𝗞 𝗧𝗬𝗣𝗘
*┃  1.1 | ᴘᴜʙʟɪᴄ 🌏*
*┃  1.2 | ᴘʀɪᴠᴀᴛᴇ 👤*  
*┃  1.3 | ɢʀᴏᴜᴘ 🫂*  
*┃  1.4 | ɪɴʙᴏx 🫟*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗩𝗢𝗜𝗖𝗘
*┃  2.1 | ᴛʀᴜᴇ ✔️*
*┃  2.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗦𝗧𝗔𝗧𝗨𝗦 𝗦𝗘𝗘𝗡
*┃  3.1 | ᴛʀᴜᴇ ✔️*
*┃  3.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗦𝗧𝗔𝗧𝗨𝗦 𝗥𝗘𝗔𝗖𝗧
*┃  4.1 | ᴛʀᴜᴇ ✔️*
*┃  4.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗦𝗧𝗔𝗧𝗨𝗦 𝗥𝗘𝗣𝗟𝗬
*┃  5.1 | ᴛʀᴜᴇ ✔️*
*┃  5.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗦𝗧𝗜𝗖𝗞𝗘𝗥
*┃  6.1 | ᴛʀᴜᴇ ✔️*
*┃  6.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬
*┃  7.1 | ᴛʀᴜᴇ ✔️*
*┃  7.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗟𝗪𝗔𝗬𝗦 𝗢𝗡𝗟𝗜𝗡𝗘
*┃  8.1 | ᴛʀᴜᴇ ✔️*
*┃  8.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗥𝗘𝗔𝗗 𝗠𝗦𝗚
*┃  9.1 | ᴛʀᴜᴇ ✔️*
*┃  9.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗥𝗘𝗔𝗖𝗧 𝗠𝗦𝗚
*┃  10.1 | ᴛʀᴜᴇ ✔️*
*┃  10.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗡𝗧𝗜 𝗟𝗜𝗡𝗞
*┃  11.1 | ᴛʀᴜᴇ ✔️*
*┃  11.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗗𝗠𝗜𝗡 𝗘𝗩𝗘𝗡𝗧
*┃  12.1 | ᴛʀᴜᴇ ✔️*
*┃  12.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗪𝗘𝗟𝗖𝗢𝗠𝗘
*┃  13.1 | ᴛʀᴜᴇ ✔️*
*┃  13.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗠𝗘𝗡𝗧𝗜𝗢𝗡 𝗥𝗘𝗣𝗟𝗬
*┃  14.1 | ᴛʀᴜᴇ ✔️*
*┃  14.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗡𝗧𝗜𝗕𝗔𝗗 𝗪𝗢𝗥𝗗𝗦
*┃  15.1 | ᴛʀᴜᴇ ✔️*
*┃  15.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗡𝗧𝗜 𝗗𝗘𝗟𝗘𝗧𝗘 𝗟𝗜𝗡𝗞𝗦
*┃  16.1 | ᴛʀᴜᴇ ✔️*
*┃  16.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗧𝗬𝗣𝗜𝗡𝗚
*┃  17.1 | ᴛʀᴜᴇ ✔️*
*┃  17.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃* 🌀 𝗔𝗨𝗧𝗢 𝗥𝗘𝗖𝗢𝗥𝗗𝗜𝗡𝗚
*┃  18.1 | ᴛʀᴜᴇ ✔️*
*┃  18.2 | ꜰᴀʟꜱᴇ ❌*  
*┗━━━━━━━━━━━━━━━━━━━━┛*

> *♯ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙲𝙷𝙰𝙼𝙰 𝙼𝙳 𝚅1*
`;

        const vv = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/khqeb9.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".mode public" );
                        break;
                    case '1.2':               
                        reply(".mode private");
                        break;
                    case '1.3':               
                          reply(".mode group");
                      break;
                    case '1.4':     
                        reply(".mode inbox");
                      break;
                    case '2.1':     
                        reply(".autovoice on");
                        break;
                    case '2.2':     
                        reply(".autovoice off");
                    break;
                    case '3.1':    
                        reply(".autostatusseen on");
                    break;
                    case '3.2':    
                        reply(".autostatusseen off");
                    break;                    
                    case '4.1':    
                        reply(".autolikestatus on");
                    break;
                    case '4.2':    
                        reply(".autolikestatus off");
                    break;                                        
                    case '5.1':    
                        reply(".statusreply on");
                    break;
                    case '5.2':    
                        reply(".statusreply off");
                    break;                        
                    case '6.1':    
                        reply(".autosticker on");
                    break; 
                    case '6.2':    
                        reply(".autosticker off");
                    break;                       
                    case '7.1':    
                        reply(".autoreply on");
                    break;
                    case '7.2':    
                        reply(".autoreply off");
                    break;
                    case '8.1':    
                        reply(".alwaysonline on");
                    break;
                    case '8.2':    
                        reply(".alwaysonline off");
                    break;
                    case '9.1':    
                        reply(".autoreadmessage on");
                    break;
                    case '9.2':    
                        reply("autoreadmessage off");
                    break;
                    case '10.1':    
                        reply(".autoreact on");
                    break;
                    case '10.2':    
                        reply(".autoreact off");
                    break;
                    case '11.1':    
                        reply(".antilink on");
                    break;
                    case '11.2':    
                        reply(".antilink off");
                    break;
                    case '12.1':    
                        reply(".adminevents on");
                    break;
                    case '12.2':    
                        reply(".adminevents off");
                    break;
                    case '13.1':    
                        reply(".welcome on");
                    break;
                    case '13.2':    
                        reply(".welcome off");
                    break;
                    case '14.1':    
                        reply(".mentionreply on");
                    break;
                    case '14.2':    
                        reply(".mentionreply off");
                    break;
                    case '15.1':    
                        reply(".antibad on");
                    break;
                    case '15.2':    
                        reply(".antibad off");
                    break;
                        case '16.1':    
                        reply(".deletelink on");
                    break;
                        case '16.2':    
                        reply(".deletelink off");
                    break;
                    break;
                        case '17.1':    
                        reply(".autotyping on");
                    break;
                    break;
                        case '17.2':    
                        reply(".autotyping off");
                    break;
                    break;
                        case '18.1':    
                        reply(".autorecording on");
                    break;
                    break;
                        case '18.2':    
                        reply(".autorecording off");
                    break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
