const { cmd } = require('../command');

cmd({
    pattern: "hayasong",
    desc: "Play Haya Official Audio with Channel Link",
    category: "HAYA",
    react: "🎧",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Aapka Diya Gaya Audio Link
        const audioUrl = "https://files.catbox.moe/cs1158.opus";

        await conn.sendMessage(from, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mpeg',
            ptt: false, // Isay true karne par ye voice note ban jayega
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363407531832623@newsletter",
                    serverMessageId: 100,
                    newsletterName: "Haya Official Channel"
                },
                externalAdReply: {
                    title: "𝐇𝐀𝐘𝐀 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐒𝐎𝐍𝐆 𝐏𝐋𝐀𝐘𝐄𝐑",
                    body: "Click here to view channel",
                    sourceUrl: "https://whatsapp.com/channel/120363407531832623",
                    thumbnailUrl: "https://files.catbox.moe/zhm68m.jpg", 
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true 
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in hayasong:", e);
        await reply("❌ Audio send nahi ho saki.");
    }
});
                    
