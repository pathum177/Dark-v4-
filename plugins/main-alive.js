const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');
const AliveData = require('../lib/schema/aliveSchema');

// Fake quoted contact
const qMessage = {
  key: {
    fromMe: false,
    remoteJid: "status@broadcast",
    participant: "0@s.whatsapp.net",
  },
  message: {
    contactMessage: {
      displayName: "CHAMINDU",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:CHAMINDU
TEL:+94773024361
END:VCARD`
    }
  }
};

// ALIVE COMMAND
cmd({
  pattern: "alive",
  alias: ["status", "online", "a"],
  desc: "Check bot is alive or not",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from, sender }) => {
  try {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Colombo",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const emojiMap = {
      "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣",
      "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣",
      "8": "8️⃣", "9": "9️⃣", ":": ":", "A": "🅰️",
      "P": "🅿️", "M": "Ⓜ️", " ": " "
    };
    const toEmoji = str => str.split("").map(c => emojiMap[c] || c).join("");

    const emojiTime = toEmoji(time);
    const usedRam = toEmoji((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2));
    const totalRam = toEmoji((os.totalmem() / 1024 / 1024).toFixed(2));

    const hour = parseInt(now.toLocaleString("en-US", { hour: "2-digit", hour12: false, timeZone: "Asia/Colombo" }));
    let greeting = "Hello!";
    if (hour >= 5 && hour < 12) greeting = "🌞 Good Morning!";
    else if (hour >= 12 && hour < 17) greeting = "☀️ Good Afternoon!";
    else if (hour >= 17 && hour < 20) greeting = "🌇 Good Evening!";
    else greeting = "🌙 Good Night!";

    const status = `
╭━━〔 *🤖 CHAMA-MD-V1 STATUS* 〕━━╮
╭──〔 ${greeting} 〕──╮
🟢 *BOT STATUS:* Active & Online
👑 *Owner:* chamindu
⚙️ *Version:* 1.0.0
✏️ *Prefix:* [ ${config.PREFIX} ]
🌐 *Mode:* ${config.MODE === 'public' ? '🌍 Public' : '🔐 Private'}
⏰ *Local Time (LK):* ${emojiTime}
⏳ *Uptime:* ${runtime(process.uptime())}
💾 *RAM භාවිතය:*
   ├─ භාවිතවෙමින්: ${usedRam} MB
   └─ මුළු RAM එක: ${totalRam} MB
🖥️ *Host:* ${os.hostname()}
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ chamindu*
╰━━〔 *✨ ALIVE END ✨* 〕━━╯
`;

    const alive = await AliveData.findById("aliveData");
    const videoUrl = alive?.videoUrl || 'https://github.com/Chamijd/KHAN-DATA/raw/refs/heads/main/logo/VID-20250508-WA0031(1).mp4';
    const imgUrl = alive?.imgUrl || 'https://files.catbox.moe/z2nfoo.jpg';

    // Send PTV video
    try {
      await conn.sendMessage(from, {
        video: { url: videoUrl },
        mimetype: 'video/mp4',
        ptv: true
      }, { quoted: qMessage });
    } catch (e) {
      console.log("Video send failed:", e);
    }

    // Send image + caption
    await conn.sendMessage(from, {
      image: { url: imgUrl },
      caption: status,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363419192353625@newsletter',
          newsletterName: '☈☟𝗖𝗛𝗔𝗠𝗔 𝗠𝗗 𝗩1️⃣',
          serverMessageId: 143
        }
      }
    }, { quoted: qMessage });

  } catch (e) {
    console.error("Alive Error:", e);
    m.reply(`❌ Error: ${e.message}`);
  }
});

// SET ALIVE IMAGE
cmd({
  pattern: "setaimg",
  desc: "Set alive image by replying to an image or sending URL",
  category: "owner",
  react: "🖼️",
  filename: __filename
}, async (conn, mek, m, { reply, isOwner, args }) => {
  if (!isOwner) return reply("❌ Only owner can set alive image.");
  
  let imageUrl;

  if (args[0]?.startsWith("http")) {
    imageUrl = args[0];
  } else {
    const mime = m.quoted?.mimetype || "";
    if (!/image/.test(mime)) return reply("❌ Reply to an image or provide image URL!");
    const media = await conn.downloadAndSaveMediaMessage(m.quoted);
    imageUrl = await conn.uploadAndGetUrl(media);
  }

  await AliveData.findByIdAndUpdate("aliveData", { imgUrl: imageUrl }, { upsert: true });
  reply("✅ Alive image updated successfully!");
});

// SET ALIVE VIDEO
cmd({
  pattern: "setavideo",
  desc: "Set alive video note by replying to a PTV or sending URL",
  category: "owner",
  react: "🎥",
  filename: __filename
}, async (conn, mek, m, { reply, isOwner, args }) => {
  if (!isOwner) return reply("❌ Only owner can set alive video.");
  
  let videoUrl;

  if (args[0]?.startsWith("http")) {
    videoUrl = args[0];
  } else {
    const type = Object.keys(m.quoted?.message || {})[0];
    if (type !== 'videoMessage' || !m.quoted.message.videoMessage?.isAnimated) {
      return reply("❌ Reply to a *PTV* (video note) or provide PTV URL!");
    }
    const media = await conn.downloadAndSaveMediaMessage(m.quoted);
    videoUrl = await conn.uploadAndGetUrl(media);
  }

  await AliveData.findByIdAndUpdate("aliveData", { videoUrl: videoUrl }, { upsert: true });
  reply("✅ Alive video note updated successfully!");
});
