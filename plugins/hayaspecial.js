const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "hayasong", // Ab main command .hayasong hai
    alias: ["haya", "song"], // Ye shortcuts bhi kaam karenge
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Audio file channel forwarding details ke sath send hogi
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/hoi9ur.mp3" },
            mimetype: 'audio/mpeg',
            ptt: false, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363408512260657@newsletter', 
                    newsletterName: "AHMADTech", 
                    serverMessageId: 143 
                } 
            }
        }, { quoted: mek });

    } catch (e) { 
        reply(`Error: ${e.message}`); 
    } 
});
        
