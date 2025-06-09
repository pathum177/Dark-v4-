const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require('node-fetch');

cmd({
    pattern: "pmp4",
    alias: ["ytvideo", "ytmp4"],
    react: "📽️",
    desc: "Download YouTube video using poll system",
    category: "media",
    use: '.mp4 < name or url >',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗️කරුණාකර YouTube ලින්ක් එකක් හෝ නමක් යොදන්න.");

        const yt = await ytsearch(q);
        if (!yt || yt.results.length < 1) return reply("⚠️ කිසිදු ප්‍රතිඵලයක් හමු නොවීය.");

        let yts = yt.results[0];
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;

        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.status !== 200 || !data.result || !data.result.download_url) {
            return reply("❌ වීඩියෝ එක ලබා ගැනීම අසාර්ථකයි. නැවත උත්සාහ කරන්න.");
        }

        const pollId = 'poll-' + Date.now();
        const pollOptions = ['📄 Document', '▶️ Normal Video'];
        const poll = {
            name: `Download as?`,
            values: pollOptions
        };

        const pollMsg = await conn.sendMessage(from, {
            poll,
            caption: `📽️ *${yts.title}*\n\nකරුණාකර ඔබට අවශ්‍ය download format එක තෝරන්න.`,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "CHAMA-MD Poll System",
                    body: yts.author.name,
                    thumbnailUrl: yts.thumbnail,
                    mediaType: 1,
                    mediaUrl: yts.url,
                    sourceUrl: yts.url
                }
            }
        }, { quoted: mek });

        conn.ev.on('messages.update', async (msgUpdate) => {
            try {
                const vote = msgUpdate[0]?.pollUpdates;
                if (!vote || !vote.pollUpdateMessage || vote.pollUpdateMessage.pollId !== pollMsg.message.pollMessage.pollId) return;

                const selected = pollOptions[vote.pollUpdateMessage.votes[0]];
                if (!selected) return;

                await conn.sendMessage(from, { react: { text: "📥", key: pollMsg.key } });

                if (selected.includes('Document')) {
                    await conn.sendMessage(from, {
                        document: { url: data.result.download_url },
                        mimetype: 'video/mp4',
                        fileName: `${yts.title}.mp4`
                    }, { quoted: mek });
                } else if (selected.includes('Normal')) {
                    await conn.sendMessage(from, {
                        video: { url: data.result.download_url },
                        mimetype: 'video/mp4',
                        caption: `🎬 *${yts.title}*\n\n✅ Download completed.`
                    }, { quoted: mek });
                }

            } catch (err) {
                console.log("Poll handler error:", err);
            }
        });

    } catch (e) {
        console.log(e);
        reply("🚫 දෝෂයක් සිදු විය.");
    }
});
