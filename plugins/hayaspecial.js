const { cmd } = require('../command');

// HAYA ELITE LOOP & PATTERN
cmd({
    pattern: "hayasong",
    alias: ["hsong", "hayas"],
    desc: "Fetch random audio from Haya Channel",
    category: "HAYA ELITE", 
    react: "⭐",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const newsletterJid = "120363407531832623@newsletter";

        await conn.sendMessage(from, { 
            text: "🚀 *𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩 𝐁𝐨𝐭 is accessing Haya Elite Database...*" 
        }, { quoted: mek });

        // Direct fetch logic from Newsletter
        const result = await conn.newsletterMessages("updates", newsletterJid, 50);
        const audioMessages = result.filter(msg => msg.viewOnceMessageV2Extension?.message?.audioMessage || msg.message?.audioMessage);

        if (audioMessages.length === 0) {
            return await reply("❌ Channel mein filhal koi audio nahi mila.");
        }

        const randomAudio = audioMessages[Math.floor(Math.random() * audioMessages.length)];

        await conn.copyNForward(from, randomAudio, true, {
            quoted: mek,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "🎶 𝐇𝐀𝐘𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐑𝐀𝐍𝐃𝐎𝐌 𝐏𝐋𝐀𝐘𝐄𝐑",
                    body: "𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩",
                    thumbnailUrl: "https://files.catbox.moe/zhm68m.jpg",
                    sourceUrl: "https://whatsapp.com/channel/120363407531832623",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        });

    } catch (e) {
        console.error("Error:", e);
        await reply("❌ Connection error! Please try again later.");
    }
});
       
