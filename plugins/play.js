const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "play",
    alias: ["song", "music", "mp3"],
    desc: "Download YouTube audio",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("🎵 Please provide a song name\n\nExample: .play Faded");

        const search = await yts(q);
        const video = search.videos[0];
        if (!video) return reply("❌ No results found");

        // Info Message
        await conn.sendMessage(from, {
            image: { url: video.thumbnail },
            caption: `*🎵 Title:* ${video.title}\n*⏱️ Duration:* ${video.timestamp}\n\n> 📥 Downloading...`
        }, { quoted: mek });

        // API Call
        const api = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(video.url)}`;
        const { data } = await axios.get(api);

        const audioUrl = data?.result?.audio || data?.result?.url || data?.url;

        if (!audioUrl) return reply("❌ Download link not found.");

        // ✅ FIXED: Direct Audio Sending (No Temp File Needed)
        await conn.sendMessage(from, {
            audio: { url: audioUrl }, // Direct URL se WhatsApp behtar handle karta hai
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: "AHMAD-MD Music Player",
                    thumbnailUrl: video.thumbnail,
                    sourceUrl: video.url,
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.log("Error:", e);
        reply("⚠️ Server Error: Try again later.");
    }
});
            
