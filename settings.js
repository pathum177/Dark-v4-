const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {    
SESSION_ID: process.env.SESSION_ID || 'CHAMA-MD=Rv11hRTZ#cb8jNF4fvqfp8ehD6naLFv5RUvA49GRMj-DxIq6hM2Y',
OWNER_NUMBER: process.env.OWNER_NUMBER || "94773024361",
ALIVE: process.env.ALIVE || `default`,
OWNER_NAME: process.env.OWNER_NAME || 'chamindu' ,     
POSTGRESQL_URL: process.env.POSTGRESQL_URL || 'postgres://izumimd_meje_user:0Vhm5vKGZ7ORt2FlJBQf4d6EtRdeuE8z@dpg-cn0o2imn7f5s73fa46q0-a.frankfurt-postgres.render.com/izumimd_meje',
PREFIX:  process.env.PREFIX || ['.'] ,
FOOTER: '> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀᴅʜɪ ᴏꜰᴄ',
DIRECTION: true,
IMAGE: process.env.IMAGE || `https://i.ibb.co/B25Ws4nf/temp-image.jpg`,
LOGO: process.env.LOGO || `https://i.ibb.co/B25Ws4nf/temp-image.jpg`     
};
