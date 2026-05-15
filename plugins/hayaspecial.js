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
            mimetype: 'audio/ogg; codecs=opus', // Correct mimetype for .opus files
            ptt: false, // Isay false hi rehne dein taaki audio bar show ho
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
        // Agar audio fail ho jaye toh user ko error message milega
        await reply("❌ Audio loading error! Link check karein ya bot restart karein.");
    }
});
                    
