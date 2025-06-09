const config = require('../config')
const {cmd , commands} = require('../command')
const getFBInfo = require("@xaviabot/fb-downloader");

cmd({
  pattern: "fb",
  alias: ["fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

  if (!q || !q.startsWith("https://")) {
    return conn.sendMessage(from, { text: "❌ Please provide a valid URL." }, { quoted: mek });
}

await conn.sendMessage(from, { react: { text: "💡", key: mek.key } });

const result = await getFBInfo(q);

    const captionHeader = `*╭─────────────⊶*
*│*🎥 *𝙵𝙱 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*
*╰─────────────────⊶*
*┏━━━━━━━━━━━━━━━━━━━━┓*
*┃ 🎥 ᴛɪᴛʟᴇ:* ${result.title}
*┃ 🔗 ᴜʀʟ:* -=-${q} 
*┗━━━━━━━━━━━━━━━━━━━━┛*

*🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ:*

*[1] 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗩𝗜𝗗𝗘𝗢*🎥
*1.1 | 🪫 ꜱᴅ Qᴜᴀʟɪᴛʏ*
*1.2 | 🔋 ʜᴅ Qᴜᴀʟɪᴛʏ*

*[2] 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗔𝗨𝗗𝗜𝗢*🎧
*2.1 | 🎶 ᴀᴜᴅɪᴏ ꜰɪʟᴇ*
*2.2 | 🗃️ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ*
*2.3 | 🎤 ᴠᴏɪᴄᴇ ᴄᴜᴛ [ptt]*

> *𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙲𝙷𝙰𝙼𝙸𝙽𝙳𝚄*
`;

const sentMsg = await conn.sendMessage(from, {
  image: { url: result.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
  caption: captionHeader,
  contextInfo: {
      mentionedJid: ['94774575878@s.whatsapp.net'], // specify mentioned JID(s) if any
      groupMentions: [],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
          newsletterJid: '@newsletter',
          newsletterName: "𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1",
          serverMessageId: 999
      },
      externalAdReply: {
          title: '𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1',
          body: 'ᴄʜᴀᴍᴀ ᴍᴅ ᴠ1 ꜰᴀᴄᴇʙᴏᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
          mediaType: 1,
          sourceUrl: "https://github.com/CHMA2009/-CHAMA-MD",
          thumbnailUrl: 'https://files.catbox.moe/0eo2q4.jpg', // This should match the image URL provided above
          renderLargerThumbnail: false,
          showAdAttribution: true
      }
  }
});
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        
        

        // React to the upload (sending the file)
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        if (messageType === '1.1') {
            // Handle option 1 (sd File)
            await conn.sendMessage(from, {
              video: { url: result.sd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*♯ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙲𝙷𝙰𝙼𝙰 𝙼𝙳 𝚅1*",
              contextInfo: {
                  mentionedJid: ['94774575878@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '@newsletter',
                      newsletterName: "𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: '𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1',
                      body: 'ᴄʜᴀᴍᴀ ᴍᴅ ᴠ1 ꜰᴀᴄᴇʙᴏᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
                      mediaType: 1,
                      sourceUrl: "https://github.com/CHMA2009/-CHAMA-MD",
                      thumbnailUrl: 'https://files.catbox.moe/0eo2q4.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
          }

          else if (messageType === '1.2') {
            // Handle option 2 (hd File)
            await conn.sendMessage(from, {
              video: { url: result.hd}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
              caption: "*♯ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙲𝙷𝙰𝙼𝙰 𝙼𝙳 𝚅1*",
              contextInfo: {
                  mentionedJid: ['94774575878@s.whatsapp.net'], // specify mentioned JID(s) if any
                  groupMentions: [],
                  forwardingScore: 999,
                  isForwarded: true,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: '@newsletter',
                      newsletterName: "𝗖𝗛𝗠𝗔 𝗠𝗗 𝗩1",
                      serverMessageId: 999
                  },
                  externalAdReply: {
                      title: '𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1',
                      body: 'ᴄʜᴀᴍᴀ ᴍᴅ ᴠ1 ꜰᴀᴄᴇʙᴏᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
                      mediaType: 1,
                      sourceUrl: "https://github.com/CHMA2009/-CHAMA-MD",
                      thumbnailUrl: 'https://files.catbox.moe/0eo2q4.jpg', // This should match the image URL provided above
                      renderLargerThumbnail: false,
                      showAdAttribution: true
                  }
              }
            });
          }
           
          else if (messageType === '2.1') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: "audio/mpeg" }, { quoted: mek })
          }
          
          else if (messageType === '2.2') {
            await conn.sendMessage(from, {
              document: { url: result.sd },
              mimetype: "audio/mpeg",
              fileName: `CHAMA MD V1/FBDL.mp3`,
              caption: "*♯ 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙲𝙷𝙰𝙼𝙸𝙽𝙳𝚄*",
              contextInfo: {
                mentionedJid: ['94774575878@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: "𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: '𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1',
                    body: 'ᴄʜᴀᴍᴀ ᴍᴅ ᴠ1 ꜰᴀᴄᴇʙᴏᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ',
                    mediaType: 1,
                    sourceUrl: "https://github.com/CHMA2009/-CHAMA-MD",
                    thumbnailUrl: 'https://files.catbox.moe/0eo2q4.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
          }, { quoted: mek });
          }
          
          else if (messageType === '2.3') {
            //Handle option 3 (audio File)  
          await conn.sendMessage(from, { audio: { url: result.sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
    
          }

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
  });
} catch (e) {
console.log(e);
reply(`${e}`);
}
})