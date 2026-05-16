const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

// Teeno patterns ko loop ke zariye register kiya hai
const patternLoop = ["hayasong", "haya", "song"];

patternLoop.forEach((ptrn) => {
    cmd({
        pattern: ptrn,
        category: "main",
        react: "✨",
        filename: __filename
    },
    async (conn, mek, m, { from, reply }) => {
        try {
            // Nayi .opus audio file aur naya channel JID set kar diya hai
            await conn.sendMessage(from, {
                audio: { url: "https://files.catbox.moe/cs1158.opus" },
                mimetype: 'audio/mpeg',
                ptt: false, 
                contextInfo: { 
                    mentionedJid: [m.sender], 
                    forwardingScore: 999, 
                    isForwarded: true, 
                    forwardedNewsletterMessageInfo: { 
                        newsletterJid: '120363407531832623@newsletter', // Naya channel JID
                        newsletterName: "HAYA SINGS❤️‍🩹", 
                        serverMessageId: 143 
                    } 
                }
            }, { quoted: mek });

        } catch (e) { 
            reply(`Error: ${e.message}`); 
        } 
    });
});
                            
