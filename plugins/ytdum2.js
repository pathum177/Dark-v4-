const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();
const fetch = require('node-fetch');

cmd({
  pattern: "yts4",
  alias: ["ytsearch", "media", "ytmedia", "nsong", "nvideo"],
  use: ".yts <query>",
  react: "🔎",
  desc: "Search YouTube and download Audio/Video",
  category: "main",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  const react = async (msgKey, emoji) => {
    try {
      await conn.sendMessage(from, {
        react: {
          text: emoji,
          key: msgKey
        }
      });
    } catch (e) {
      console.error("Reaction error:", e.message);
    }
  };

  try {
    if (!q) return reply("❌ Please provide a YouTube video/song name.");

    const yt = await ytsearch(q);
    const results = yt.results;
    if (!results || results.length === 0) return reply("❌ No results found!");

    let page = 0;
    const pageSize = 10;

    const sendPage = async (pg) => {
      const start = pg * pageSize;
      const end = start + pageSize;
      const slice = results.slice(start, end);

      if (slice.length === 0) {
        return conn.sendMessage(from, { text: "❌ No more results." }, { quoted: mek });
      }

      let list = "🔍 *🆈🅾🆄🆃🆄🅱🅴 🆂🅴🅰🆁🅲🅷 🆁🅴🆂🆄🅻🆃🆂*\n\n";
      slice.forEach((v, i) => {
        list += `${start + i + 1}. *${v.title}*\n${v.url}\n\n`;
      });
      list += `_Reply with the number (1-${end}) or 0 for next page_`;

      const msg = await conn.sendMessage(from, { text: list }, { quoted: mek });
      return msg.key.id;
    };

    let listMsgId = await sendPage(page);

    conn.ev.on("messages.upsert", async (update) => {
      const msg = update?.messages?.[0];
      if (!msg?.message) return;

      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
      const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
      if (!isReplyToList) return;

      const index = parseInt(text.trim()) - 1;

      if (text.trim() === "0") {
        page += 1;
        listMsgId = await sendPage(page);
        return;
      }

      if (isNaN(index) || index < 0 || index >= results.length) {
        return conn.sendMessage(from, { text: "❌ Invalid number." }, { quoted: msg });
      }

      const chosen = results[index];
      await react(msg.key, '✅');

      const askType = await conn.sendMessage(from, {
        image: { url: chosen.thumbnail },
        caption: `🎬 *🆂🅾🅽🅶 🅳🅴🆃🅰🅸🅻🆂*

🎶 *Title:* ${chosen.title}
⏳ *Duration:* ${chosen.duration}
👀 *Views:* ${chosen.views}
👤 *Author:* ${chosen.author.name}
📅 *Published:* ${chosen.ago}
🔗 *Link:* ${chosen.url}

📥 *Choose what to download:*
1️⃣ Audio 🎧
2️⃣ Video 🎥

_Reply with 1 or 2_

© *Powered by Chamindu*`
      }, { quoted: msg });
      const typeMsgId = askType.key.id;

      conn.ev.on("messages.upsert", async (tUpdate) => {
        const tMsg = tUpdate?.messages?.[0];
        if (!tMsg?.message) return;

        const tText = tMsg.message?.conversation || tMsg.message?.extendedTextMessage?.text;
        const isReplyToType = tMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === typeMsgId;
        if (!isReplyToType) return;

        const { title, duration, views, author, ago: published, url: videoUrl, thumbnail } = chosen;
        await react(tMsg.key, tText.trim() === "1" ? '🎧' : tText.trim() === "2" ? '🎥' : '❓');

        if (tText.trim() === "1") {
          const audioData = await dy_scrap.ytmp3(chosen.url);
          const optMsg = await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption:
              `🌐 *🅳🅾🆆🅽🅻🅾🅰🅳 🅰🆄🅳🅸🅾*\n` +
              `🎶 *Title:* ${title}\n` +
              `⏳ *Duration:* ${duration}\n` +
              `👀 *Views:* ${views}\n` +
              `👤 *Author:* ${author.name || author}\n` +
              `📅 *Published:* ${published}\n` +
              `🔗 *Link:* ${videoUrl}\n\n` +
              `*Choose download format:*\n` +
              `1️⃣. 📄 *MP3 as Document*\n` +
              `2️⃣. 🎧 *MP3 as Audio (Play)*\n` +
              `3️⃣. 🎙️ *MP3 as Voice Note (PTT)*\n\n` +
              `_🎶 Powered by Chamindu_`
          }, { quoted: tMsg });
          const optMsgId = optMsg.key.id;

          conn.ev.on("messages.upsert", async (aUpdate) => {
            const aMsg = aUpdate?.messages?.[0];
            if (!aMsg?.message) return;

            const aText = aMsg.message?.conversation || aMsg.message?.extendedTextMessage?.text;
            const isReplyToAudio = aMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === optMsgId;
            if (!isReplyToAudio) return;

            const url = audioData?.result?.download?.url;
            if (!url) return reply("❌ Audio download failed!");
            await react(aMsg.key, '⬇️');

            switch (aText.trim()) {
              case "1":
                await conn.sendMessage(from, {
                  document: { url },
                  fileName: `${title}.mp3`,
                  mimetype: "audio/mpeg"
                }, { quoted: aMsg });
                break;
              case "2":
                await conn.sendMessage(from, {
                  audio: { url },
                  mimetype: "audio/mpeg"
                }, { quoted: aMsg });
                break;
              case "3":
                await conn.sendMessage(from, {
                  audio: { url },
                  mimetype: "audio/mpeg",
                  ptt: true
                }, { quoted: aMsg });
                break;
              default:
                await conn.sendMessage(from, { text: "❌ Invalid input. Reply with 1, 2, or 3." }, { quoted: aMsg });
            }
          });

        } else if (tText.trim() === "2") {
          const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          const vUrl = data?.result?.download_url;
          if (!vUrl) return reply("❌ Video download failed!");

          const vMsg = await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption:
              `🌐 *🅳🅾🆆🅽🅻🅾🅰🅳 🆅🅸🅳🅴🅾*\n` +
              `🎞️ *Title:* ${title}\n` +
              `⏳ *Duration:* ${duration}\n` +
              `👀 *Views:* ${views}\n` +
              `👤 *Author:* ${author.name || author}\n` +
              `📅 *Published:* ${published}\n` +
              `🔗 *Link:* ${videoUrl}\n\n` +
              `*Choose download format:*\n` +
              `1️⃣. 📄 *MP4 as Document*\n` +
              `2️⃣. ▶️ *MP4 as Video (Play)*\n\n` +
              `_🎬 Powered by Chamindu_`
          }, { quoted: tMsg });
          const vMsgId = vMsg.key.id;

          conn.ev.on("messages.upsert", async (vUpdate) => {
            const vRes = vUpdate?.messages?.[0];
            if (!vRes?.message) return;

            const vText = vRes.message?.conversation || vRes.message?.extendedTextMessage?.text;
            const isReplyToVideo = vRes?.message?.extendedTextMessage?.contextInfo?.stanzaId === vMsgId;
            if (!isReplyToVideo) return;

            const emoji = vText.trim() === "1" || vText.trim() === "2" ? '⬇️' : '❌';
            await react(vRes.key, emoji);

            switch (vText.trim()) {
              case "1":
                await conn.sendMessage(from, {
                  document: { url: vUrl },
                  fileName: `${title}.mp4`,
                  mimetype: "video/mp4"
                }, { quoted: vRes });
                break;
              case "2":
                await conn.sendMessage(from, {
                  video: { url: vUrl },
                  mimetype: "video/mp4"
                }, { quoted: vRes });
                break;
              default:
                await conn.sendMessage(from, { text: "❌ Invalid input. Reply with 1 or 2." }, { quoted: vRes });
            }
          });

        } else {
          await conn.sendMessage(from, { text: "❌ Invalid input. Use 1 for Audio or 2 for Video." }, { quoted: tMsg });
        }
      });
    });

  } catch (err) {
    console.error(err);
    reply("❌ Error: " + err.message);
  }
});
