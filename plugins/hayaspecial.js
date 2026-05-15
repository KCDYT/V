const { cmd } = require('../command');

// Custom Song Link
const hayaAudio = "https://files.catbox.moe/cs1158.opus";

// Command 1: .hayasong
cmd({
    pattern: "hayasong",
    desc: "Play Haya Official Song",
    category: "HAYA ELITE",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: hayaAudio }, 
            mimetype: 'audio/mpeg',
            ptt: false, 
            contextInfo: {
                externalAdReply: {
                    title: "𝐇𝐀𝐘𝐀 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐒𝐎𝐍𝐆",
                    body: "𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩 𝐄𝐥𝐢𝐭𝐞 𝐏𝐥𝐚𝐲𝐞𝐫",
                    sourceUrl: "https://whatsapp.com/channel/120363407531832623",
                    thumbnailUrl: "https://files.catbox.moe/zhm68m.jpg", 
                    mediaType: 1,
                    showAdAttribution: true, // Official Ping look
                    renderLargerThumbnail: true 
                }
            }
        }, { quoted: mek });
        await conn.sendMessage(from, { text: "*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*" }, { quoted: m });
    } catch (e) { reply("Error!"); }
});

// Command 2: .hsong
cmd({
    pattern: "hsong",
    desc: "Play Haya Music",
    category: "HAYA ELITE",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: hayaAudio }, 
            mimetype: 'audio/mpeg',
            ptt: false, 
            contextInfo: {
                externalAdReply: {
                    title: "𝐇𝐀𝐘𝐀 𝐌𝐔𝐒𝐈𝐂 𝐁𝐎𝐓",
                    body: "𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩",
                    sourceUrl: "https://whatsapp.com/channel/120363407531832623",
                    thumbnailUrl: "https://files.catbox.moe/zhm68m.jpg", 
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true 
                }
            }
        }, { quoted: mek });
        await conn.sendMessage(from, { text: "*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*" }, { quoted: m });
    } catch (e) { reply("Error!"); }
});

// Command 3: .hayas (Aapki request par pattern change kar diya)
cmd({
    pattern: "hayas",
    desc: "Haya Special Audio",
    category: "HAYA ELITE",
    react: "⭐",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { 
            audio: { url: hayaAudio }, 
            mimetype: 'audio/mpeg',
            ptt: false, 
            contextInfo: {
                externalAdReply: {
                    title: "𝐇𝐀𝐘𝐀 𝐒𝐏𝐄𝐂𝐈𝐀𝐋 𝐄𝐃𝐈𝐓𝐈𝐎𝐍",
                    body: "𝐇𝐚𝐲𝐚 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥",
                    sourceUrl: "https://whatsapp.com/channel/120363407531832623",
                    thumbnailUrl: "https://files.catbox.moe/zhm68m.jpg", 
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true 
                }
            }
        }, { quoted: mek });
        await conn.sendMessage(from, { text: "*_powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*" }, { quoted: m });
    } catch (e) { reply("Error!"); }
});
    
