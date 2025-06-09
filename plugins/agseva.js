const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

cmd({
  pattern: "vfcpush",
  alias: [],
  use: ".push",
  react: "📁",
  desc: "Group එකේ හැමෝටම CHAMA-MD vCard File එක inbox කරන්න",
  category: "group",
  filename: __filename
}, async (conn, m, mek, { participants, reply }) => {
  try {
    if (!m.isGroup) {
      return await reply("මෙම command එක group එකක් තුළ විතරයි භාවිතා කරන්න.");
    }

    // Path to the bundled vCard file
    const vcfPath = path.join(__dirname, '../vcards/MoneyHeistContacts.vcf');
    const vcfBuffer = fs.readFileSync(vcfPath);

    let sentCount = 0;

    for (const { id: jid } of participants) {
      await conn.sendMessage(jid, {
        document: vcfBuffer,
        fileName: 'CHAMA-MD-Contacts.vcf',
        mimetype: 'text/vcard',
        caption: '📁 CHAMA-MD Contacts — import කරගන්න'
      });

      sentCount++;
      await delay(15000); // 15 seconds delay between each send
    }

    await conn.sendMessage(m.chat, { text: `✅ CHAMA-MD Contacts file එක inbox කරලා ✅\n👥 Total Members Sent: ${sentCount}`, quoted: mek });

  } catch (err) {
    console.error("*ERROR* :", err);
    await reply("*ERROR*");
    await conn.sendMessage(m.chat, { react: { text: '❌', key: mek.key } });
  }
});
