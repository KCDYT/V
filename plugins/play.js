// ✅ Coded for YouTube Music Download
// ⚙️ Using Working ootaizumi API

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "play",
    alias: ["ytmp3", "audio", "music"],
    desc: "Download YouTube audio as MP3",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎧 Please provide a song name or URL!\n\nExample: `.play Faded Alan Walker`");

        let url = q;
        let videoInfo = null;

        // 🔍 Detect URL or search by title
        if (q.startsWith('http://') || q.startsWith('https://')) {
            if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
                return await reply("❌ Please provide a valid YouTube URL!");
            }
            const videoId = getVideoId(q);
            if (!videoId) return await reply("❌ Invalid YouTube URL!");
            const searchFromUrl = await yts({ videoId });
            videoInfo = searchFromUrl;
            url = q;
        } else {
            const search = await yts(q);
            videoInfo = search.videos[0];
            if (!videoInfo) return await reply("❌ No video results found!");
            url = videoInfo.url;
        }

        // 🖼️ Send thumbnail + video info
        await conn.sendMessage(from, {
            image: { url: videoInfo.thumbnail },
            caption: `*🎵 AUDIO DOWNLOADER*\n\n🎤 *Title:* ${videoInfo.title}\n👤 *Artist:* ${videoInfo.author.name}\n⏱️ *Duration:* ${videoInfo.timestamp}\n👁️ *Views:* ${videoInfo.views.toLocaleString()}\n\n*Status:* Downloading audio...\n\n*© Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩-MD ♡*`
        }, { quoted: mek });

        // API: ootaizumi (WORKING)
        try {
            console.log("Downloading from:", url);
            const apiUrl = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(url)}`;
            const { data } = await axios.get(apiUrl);

            if (!data?.status || !data?.result?.mp3) {
                return await reply("❌ Failed to get download link! Try another song.");
            }

            const audioUrl = data.result.mp3;
            const title = videoInfo.title || "Unknown Song";

            // 🎧 Send audio file
            await conn.sendMessage(from, {
                audio: { url: audioUrl },
                mimetype: "audio/mpeg",
                fileName: `${title}.mp3`,
                ptt: false
            }, { quoted: mek });

            // ✅ Success Reaction
            await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

        } catch (e) {
            console.error("Error:", e.message);
            return await reply("❌ Download failed! Try again later.");
        }

    } catch (e) {
        console.error("❌ Error in .play command:", e);
        await reply("⚠️ Something went wrong! Try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

cmd({
    pattern: "song",
    alias: ["gana", "gaana", "mp3song"],
    desc: "Download YouTube song as MP3",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎼 Please provide a song name!\n\nExample: `.song Shape of You Ed Sheeran`");

        const search = await yts(q);
        const videos = search.videos;

        if (!videos || videos.length === 0) {
            return await reply("❌ No songs found!");
        }

        const vid = videos[0];

        // 🎵 Send video info
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: `╭━━━❐━⪼
┇ 🎶 *SONG DOWNLOADER*
┇ 
┇ 🎤 *Title:* ${vid.title}
┇ 👤 *Artist:* ${vid.author.name}
┇ ⏱️ *Duration:* ${vid.timestamp}
┇ 👁️ *Views:* ${vid.views.toLocaleString()}
┇
┇ *Status:* 🔄 Downloading...
╰━━━❑━⪼

*© Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩-MD ♡*`
        }, { quoted: mek });

        // API: ootaizumi (WORKING)
        try {
            console.log("Downloading from:", vid.url);
            const apiUrl = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(vid.url)}`;
            const { data } = await axios.get(apiUrl);

            if (!data?.status || !data?.result?.mp3) {
                return await reply("❌ Failed to get download link! Try another song.");
            }

            const audioUrl = data.result.mp3;

            // 🎧 Send audio file
            await conn.sendMessage(from, {
                audio: { url: audioUrl },
                mimetype: "audio/mpeg",
                fileName: `${vid.title}.mp3`,
                ptt: false
            }, { quoted: mek });

            // ✅ Success
            await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

        } catch (e) {
            console.error("Error:", e.message);
            return await reply("❌ Download failed! Try again later.");
        }

    } catch (e) {
        console.error("❌ Error in .song command:", e);
        await reply("⚠️ Error occurred! Try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Helper function: Get Video ID
function getVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
}

module.exports = {
    getVideoId
};
