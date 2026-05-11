// ✅ Coded by AHMADTech for AHMAD MD
// ⚙️ APIs: JawadTech (Video) | Izumi (Audio)

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

// ======================== VIDEO DOWNLOADER (.ytv) ========================
cmd({
    pattern: "ytv",
    alias: ["ytmp4", "video"],
    desc: "Download YouTube video (MP4)",
    category: "download",
    react: "📹",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎥 Please provide a YouTube video name or URL!\n\nExample: .ytv alone marshmello");

        let videoInfo = null;  
        if (q.startsWith('http://') || q.startsWith('https://')) {  
            const match = q.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            const videoId = match ? match[1] : null;
            if (!videoId) return await reply("❌ Invalid YouTube URL!");  
            videoInfo = await yts({ videoId });  
        } else {  
            const search = await yts(q);  
            videoInfo = search.videos[0];  
            if (!videoInfo) return await reply("❌ No video results found!");  
        }  

        // Send thumbnail + info
        await conn.sendMessage(from, {  
            image: { url: videoInfo.thumbnail },  
            caption: `*🎬 VIDEO DOWNLOADER*\n\n🎞️ *Title:* ${videoInfo.title}\n📺 *Channel:* ${videoInfo.author.name}\n🕒 *Duration:* ${videoInfo.timestamp}\n\n*Status:* Downloading Video...\n\n*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩 Tᴇᴄʜ*`  
        }, { quoted: mek });  

        const apiUrl = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(videoInfo.url)}`;  
        const { data } = await axios.get(apiUrl);  

        if (!data?.status || !data?.result?.mp4) {  
            return await reply("❌ Failed to fetch video! Try again later.");  
        }  

        await conn.sendMessage(from, {  
            video: { url: data.result.mp4 },  
            caption: `🎬 *${data.result.title}*\n\n*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩 Tᴇᴄʜ*`  
        }, { quoted: mek });  

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });  

    } catch (e) {  
        console.error(e);
        await reply("⚠️ Something went wrong!");  
    }
});

// ======================== AUDIO DOWNLOADER (.play / .song) ========================
cmd({
    pattern: "play",
    alias: ["song", "ytmp3"],
    desc: "Download YouTube audio",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎧 Please provide a song name!\n\nExample: .play Faded Alan Walker");

        const { videos } = await yts(q);  
        if (!videos || videos.length === 0) return await reply("❌ No results found!");  
        const vid = videos[0];  

        // Send info first
        await conn.sendMessage(from, {  
            image: { url: vid.thumbnail },  
            caption: `- *AUDIO DOWNLOADER 🎧*\n╭━━❐━⪼\n┇๏ *Title* - ${vid.title}\n┇๏ *Duration* - ${vid.timestamp}\n┇๏ *Views* - ${vid.views.toLocaleString()}\n┇๏ *Author* - ${vid.author.name}\n┇๏ *Status* - Downloading...\n╰━━❑━⪼\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩 Tᴇᴄʜ*`  
        }, { quoted: mek });  

        // API Request (Izumi API)
        const api = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(vid.url)}&format=mp3`;  
        const res = await axios.get(api);  
        
        if (!res.data?.status || !res.data?.result?.download) {
            return await reply("❌ Download failed!");
        }

        const audioUrl = res.data.result.download;  

        // Send final audio file
        await conn.sendMessage(from, {  
            audio: { url: audioUrl },  
            mimetype: "audio/mpeg",  
            fileName: `${vid.title}.mp3`  
        }, { quoted: mek });  

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });  

    } catch (e) {  
        console.error(e);
        await reply("❌ Error occurred!");  
    }
});
    
