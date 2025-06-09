const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Get Sri Lanka time
        const date = new Date();
        const timeString = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Colombo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);

        // Greeting in Sinhala based on Sri Lanka time
        const hourNumber = parseInt(new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Colombo',
            hour: '2-digit',
            hour12: false
        }).format(date));

        let greeting = "සුභ රත්‍රියක්!";
        if (hourNumber < 12) greeting = "සුභ උදෑසනක්!";
        else if (hourNumber < 18) greeting = "සුභ සැන්දෑවක!";

        const senderName = m.pushName || "User";

        // Menu caption with dynamic info
        const menuCaption = `╭━━━〔 *𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1* 〕━━━┈⊷
┃🙋 *User:* ${senderName}
┃⏰ *Local Time (LK):* ${timeString}
┃💬 *Greeting:* ${greeting}
╰━━━━━━━━━━━━━━━┈⊷
╭━━━━━━━━━━━━━━━━┈⊷
┃⚙️ *Bot Info*
┃├ Owner: *Chamindu*
┃├ Baileys: *Multi Device*
┃├ Type: *NodeJs*
┃├ Platform: *Heroku*
┃├ Mode: *[${config.MODE}]*
┃├ Prefix: *[${config.PREFIX}]*
┃└ Version: *1.0.0*
╰━━━━━━━━━━━━━━━┈⊷

╭━━〔 *Menu List* 〕━━┈⊷
┃0️⃣ 📥 *Download Menu*
┃1️⃣  👥 *Group Menu*
┃2️⃣  😄 *Fun Menu*
┃3️⃣  👑 *Owner Menu*
┃4️⃣  🤖 *AI Menu*
┃5️⃣ 🎎 *Anime Menu*
┃6️⃣  🔄 *Convert Menu*
┃7️⃣  📌 *Other Menu*
┃8️⃣  💞 *Reactions Menu*
┃9️⃣  🏠 *Main Menu*
┃🔟  🔳 *Logo Menu*
┃11   💥*new menu list*
╰━━━━━━━━━━━━━━━┈⊷

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363419192353625@newsletter',
                newsletterName: '☈☟𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1️⃣',
                serverMessageId: 143
            }
        };

        // Function to send menu video with timeout
        const sendMenuVideo = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        video: { url: 'https://github.com/Chamijd/KHAN-DATA/raw/refs/heads/main/logo/VID-20250508-WA0031(1).mp4' },
                        mimetype: 'video/mp4', // Correct property name
                        ptv: true // Set PTV to true for WhatsApp video message
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Video send failed, continuing without it:', e);
                throw e; // Let the error propagate to fallback to image
            }
        };

        // Function to send menu image with timeout
        const sendMenuImage = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        image: { url: 'https://files.catbox.moe/ww4val.jpg' },
                        caption: menuCaption,
                        contextInfo: contextInfo
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Image send failed, falling back to text:', e);
                return await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        };

        

        // Send video, then image, then audio sequentially
        let sentMsg;
        try {
            // Send video with 12s timeout
            await Promise.race([
                sendMenuVideo(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Video send timeout')), 12000))
            ]);

            // Send image with 10s timeout
            sentMsg = await Promise.race([
                sendMenuImage(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Image send timeout')), 10000))
            ]);

            // Then send audio with 1s delay and 8s timeout
            await Promise.race([
                sendMenuAudio(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Audio send timeout')), 8000))
            ]);
        } catch (e) {
            console.log('Menu send error:', e);
            if (!sentMsg) {
                sentMsg = await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        }

        const messageID = sentMsg.key.id;

        // Menu data (complete version)
        const menuData = {
            '0': {
                title: "📥 *Download Menu* 📥",
                content: `╭━━━〔 *Download Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🌐 *Social Media*
┃★│ • facebook [url]
┃★│ • mediafire [url]
┃★│ • tiktok [url]
┃★│ • twitter [url]
┃★│ • Insta [url]
┃★│ • apk [app]
┃★│ • img [query]
┃★│ • tt2 [url]
┃★│ • pins [url]
┃★│ • apk2 [app]
┃★│ • fb2 [url]
┃★│ • pinterest [url]
┃★╰──────────────
┃★╭──────────────
┃★│ 🎵 *Music/Video*
┃★│ • spotify [query]
┃★│ • play [song]
┃★│ • play2-10 [song]
┃★│ • audio [url]
┃★│ • video [url]
┃★│ • video2-10 [url]
┃★│ • ytmp3 [url]
┃★│ • ytmp4 [url]
┃★│ • song [name]
┃★│ • darama [name]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '1': {
                title: "👥 *Group Menu* 👥",
                content: `╭━━━〔 *Group Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🛠️ *Management*
┃★│ • grouplink
┃★│ • kickall
┃★│ • kickall2
┃★│ • kickall3
┃★│ • add @user
┃★│ • remove @user
┃★│ • kick @user
┃★╰──────────────
┃★╭──────────────
┃★│ ⚡ *Admin Tools*
┃★│ • promote @user
┃★│ • demote @user
┃★│ • dismiss 
┃★│ • revoke
┃★│ • mute [time]
┃★│ • unmute
┃★│ • lockgc
┃★│ • unlockgc
┃★╰──────────────
┃★╭──────────────
┃★│ 🏷️ *Tagging*
┃★│ • tag @user
┃★│ • hidetag [msg]
┃★│ • tagall
┃★│ • tagadmins
┃★│ • invite
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '2': {
                title: "😄 *Fun Menu* 😄",
                content: `╭━━━〔 *Fun Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🎭 *Interactive*
┃★│ • shapar
┃★│ • rate @user
┃★│ • insult @user
┃★│ • hack @user
┃★│ • ship @user1 @user2
┃★│ • character
┃★│ • pickup
┃★│ • joke
┃★╰──────────────
┃★╭──────────────
┃★│ 😂 *Reactions*
┃★│ • hrt
┃★│ • hpy
┃★│ • syd
┃★│ • anger
┃★│ • shy
┃★│ • kiss
┃★│ • mon
┃★│ • cunfuzed
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷>
 *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '3': {
                title: "👑 *Owner Menu* 👑",
                content: `╭━━━〔 *Owner Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ ⚠️ *Restricted*
┃★│ • block @user
┃★│ • unblock @user
┃★│ • fullpp [img]
┃★│ • setpp [img]
┃★│ • restart
┃★│ • shutdown
┃★│ • updatecmd
┃★╰──────────────
┃★╭──────────────
┃★│ ℹ️ *Info Tools*
┃★│ • gjid
┃★│ • jid @user
┃★│ • listcmd
┃★│ • allmenu
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '4': {
                title: "🤖 *AI Menu* 🤖",
                content: `╭━━━〔 *AI Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 💬 *Chat AI*
┃★│ • ai [query]
┃★│ • gpt4 [query]
┃★│ • deepseek [query]
┃★╰──────────────
┃★╭──────────────
┃★│ 🖼️ *Image AI*
┃★│ • aiimg [text]
┃★│ • aiimg2 [text]
┃★│ • aiimg3 [text]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '5': {
                title: "🎎 *Anime Menu* 🎎",
                content: `╭━━━〔 *Anime Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🖼️ *Images*
┃★│ • fack
┃★│ • dog
┃★│ • awoo
┃★│ • garl
┃★│ • waifu
┃★│ • neko
┃★│ • megnumin
┃★│ • maid
┃★│ • loli
┃★╰──────────────
┃★╭──────────────
┃★│ 🎭 *Characters*
┃★│ • animegirl
┃★│ • animegirl1-5
┃★│ • anime1-5
┃★│ • foxgirl
┃★│ • naruto
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '6': {
                title: "🔄 *Convert Menu* 🔄",
                content: `╭━━━〔 *Convert Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🖼️ *Media*
┃★│ • sticker [img]
┃★│ • sticker2 [img]
┃★│ • emojimix 😎+😂
┃★│ • take [name,text]
┃★│ • tomp3 [video]
┃★╰──────────────
┃★╭──────────────
┃★│ 📝 *Text*
┃★│ • fancy [text]
┃★│ • tts [text]
┃★│ • trt [text]
┃★│ • base64 [text]
┃★│ • unbase64 [text]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '7': {
                title: "📌 *Other Menu* 📌",
                content: `╭━━━〔 *Order Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🕒 *Utilities*
┃★│ • timenow
┃★│ • date
┃★│ • count [num]
┃★│ • calculate [expr]
┃★│ • countx
┃★╰──────────────
┃★╭──────────────
┃★│ 🎲 *Random*
┃★│ • flip
┃★│ • coinflip
┃★│ • rcolor
┃★│ • roll
┃★│ • fact
┃★╰──────────────
┃★╭──────────────
┃★│ 🔍 *Search*
┃★│ • define [word]
┃★│ • news [query]
┃★│ • movie [name]
┃★│ • weather [loc]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '8': {
                title: "💞 *Reactions Menu* 💞",
                content: `╭━━━〔 *Reactions Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ ❤️ *Affection*
┃★│ • cuddle @user
┃★│ • hug @user
┃★│ • kiss @user
┃★│ • lick @user
┃★│ • pat @user
┃★╰──────────────
┃★╭──────────────
┃★│ 😂 *Funny*
┃★│ • bully @user
┃★│ • bonk @user
┃★│ • yeet @user
┃★│ • slap @user
┃★│ • kill @user
┃★╰──────────────
┃★╭──────────────
┃★│ 😊 *Expressions*
┃★│ • blush @user
┃★│ • smile @user
┃★│ • happy @user
┃★│ • wink @user
┃★│ • poke @user
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '9': {
                title: "🏠 *Main Menu* 🏠",
                content: `╭━━━〔 *Main Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ ℹ️ *Bot Info*
┃★│ • ping
┃★│ • live
┃★│ • alive
┃★│ • runtime
┃★│ • uptime
┃★│ • repo
┃★│ • owner
┃★╰──────────────
┃★╭──────────────
┃★│ 🛠️ *Controls*
┃★│ • menu
┃★│ • menu2
┃★│ • restart
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '10': {
                title: "🔳 *Logo Menu* 🔳",
                content: `╭━━━〔 *Logo Menu* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🖼️ *Logos*
┃★│ • 
┃★│ • 
┃★│ • 
┃★│ •
┃★│ • 
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            },
            '11': {
                title: "🔳 *new menu list* 🔳",
                content: `╭━━━〔 *new menu list* 〕━━━┈⊷
┃★╭──────────────
┃★│ 💬 *auto reply*
┃★│ • setreply(අලුත් රිප්ලයි ඇතුල් කිරිම)
┃★│ • delreply(රිප්ලයි එක් ඩිලිට් කිරිම)
┃★│ • replylies(රිප්ලයි ලිස්ට් එක ලබා ගැනිම)
┃★╰─────────────
┃★╭──────────────
┃★│ 🖼️ *auto stickers*
┃★│ • setsticker(අලුත් stickers එකක් ඇතුලු කිරිමට)
┃★│ • delsticker(stickersඩිලිට් කිරිමට)
┃★│ • stickerslist(ලිස්ට් එක ලබා ගැනිමට)
┃★╰──────────────
┃★╭──────────────
┃★│ 🎤 *auto voice*
┃★│ • setvoice(අලුත් voice එකක් ඇතුලු කිරිමට)
┃★│ • delvoice(voice ඩිලිට් කිරිමට)
┃★│ • voicelist(ලිස්ට් එක ලබා ගැනිමට)
┃★╰──────────────
┃★╭──────────────
┃★│ 🇱🇰 *Group list*
┃★│ • addlist
┃★│ • getlist
┃★│ • rnlist
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                image: true
            }
        };

        // Message handler with improved error handling
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            if (selectedMenu.image) {
                                await conn.sendMessage(
                                    senderID,
                                    {
                                        image: { url: 'https://files.catbox.moe/ww4val.jpg' },
                                        caption: selectedMenu.content,
                                        contextInfo: contextInfo
                                    },
                                    { quoted: receivedMsg }
                                );
                            } else {
                                await conn.sendMessage(
                                    senderID,
                                    { text: selectedMenu.content, contextInfo: contextInfo },
                                    { quoted: receivedMsg }
                                );
                            }

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            console.log('Menu reply error:', e);
                            await conn.sendMessage(
                                senderID,
                                { text: selectedMenu.content, contextInfo: contextInfo },
                                { quoted: receivedMsg }
                            );
                        }

                    } else {
                        await conn.sendMessage(
                            senderID,
                            {
                                text: `❌ *Invalid Option!* ❌\n\nPlease reply with a number between 0-10 to select a menu.\n\n*Example:* Reply with "1" for Group Menu\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*`,
                                contextInfo: contextInfo
                            },
                            { quoted: receivedMsg }
                        );
                    }
                }
            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        // Add listener
        conn.ev.on("messages.upsert", handler);

        // Remove listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `❌ Menu system is currently busy. Please try again later.\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*` },
                { quoted: mek }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});
