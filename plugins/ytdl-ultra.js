// ✅ Coded by AHMADTech for AHMAD MD
// ⚙️ YouTube Video & Audio Downloader Commands

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

// ─────────────────────────────────────────
// 📹 VIDEO DOWNLOADER — .ytv
// ─────────────────────────────────────────
cmd({
    pattern: "ytv",
    alias: ["ytmp4", "video"],
    desc: "Download YouTube video (MP4)",
    category: "download",
    react: "📹",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(
            `╭━━━━━━━━━━━━━━━╮\n` +
            `┃   📹 *VIDEO DOWNLOADER*   ┃\n` +
            `╰━━━━━━━━━━━━━━━╯\n\n` +
            `❗ Please provide a YouTube URL or video name!\n\n` +
            `*Example:*\n` +
            `▸ \`.ytv alone marshmello\`\n` +
            `▸ \`.ytv https://youtu.be/xxxxx\``
        );

        let videoInfo = null;

        // 🔍 URL detect karo ya search karo
        if (q.startsWith('http://') || q.startsWith('https://')) {
            const videoId = q.match(
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
            )?.[1];
            if (!videoId) return await reply("❌ Invalid YouTube URL! Please check and try again.");
            videoInfo = await yts({ videoId });
        } else {
            const search = await yts(q);
            videoInfo = search.videos[0];
        }

        if (!videoInfo) return await reply("❌ No results found! Try a different search.");

        const url = videoInfo.url;

        // 🖼️ Thumbnail + Info bhejo
        await conn.sendMessage(from, {
            image: { url: videoInfo.thumbnail },
            caption:
                `╭━━━━━━━━━━━━━━━╮\n` +
                `┃   🎬 *VIDEO DOWNLOADER*   ┃\n` +
                `╰━━━━━━━━━━━━━━━╯\n\n` +
                `🎞️ *Title :* ${videoInfo.title}\n` +
                `📺 *Channel :* ${videoInfo.author.name}\n` +
                `🕒 *Duration :* ${videoInfo.timestamp}\n` +
                `🔗 *URL :* ${url}\n\n` +
                `⏳ *Status :* Fetching video, please wait...\n\n` +
                `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        }, { quoted: mek });

        // ⚙️ API se download link lo
        const apiUrl = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(url)}`;
        let data;
        try {
            const response = await axios.get(apiUrl, { timeout: 60000 });
            data = response.data;
        } catch (apiErr) {
            return await reply("⚠️ API Timeout! Server is busy. Please try again later.");
        }

        if (!data?.status || !data?.result?.mp4) {
            return await reply(
                `❌ *Download Failed!*\n\n` +
                `The API did not return a valid video link.\n` +
                `Please try again after some time.`
            );
        }

        // 📹 Video bhejo
        await conn.sendMessage(from, {
            video: { url: data.result.mp4 },
            caption:
                `╭━━━━━━━━━━━━━━━╮\n` +
                `┃   ✅ *DOWNLOAD COMPLETE*   ┃\n` +
                `╰━━━━━━━━━━━━━━━╯\n\n` +
                `🎬 *${data.result.title || videoInfo.title}*\n\n` +
                `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("[YTV ERROR]:", e.message);
        await reply("⚠️ An unexpected error occurred! Please try again.");
    }
});


// ─────────────────────────────────────────
// 🎧 AUDIO DOWNLOADER — .play
// ─────────────────────────────────────────
cmd({
    pattern: "play",
    alias: ["ytmp3", "song", "music"],
    desc: "Download YouTube audio (MP3)",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply(
            `╭━━━━━━━━━━━━━━━╮\n` +
            `┃   🎧 *AUDIO DOWNLOADER*   ┃\n` +
            `╰━━━━━━━━━━━━━━━╯\n\n` +
            `❗ Please provide a song name!\n\n` +
            `*Example:*\n` +
            `▸ \`.play Faded Alan Walker\`\n` +
            `▸ \`.play Shape of You Ed Sheeran\``
        );

        // 🔍 Search YouTube
        const { videos } = await yts(q);
        if (!videos || videos.length === 0) {
            return await reply("❌ No results found! Try a different song name.");
        }

        const vid = videos[0];

        // 🎵 Info message bhejo
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption:
                `╭━━━━━━━━━━━━━━━╮\n` +
                `┃   🎧 *AUDIO DOWNLOADER*   ┃\n` +
                `╰━━━━━━━━━━━━━━━╯\n\n` +
                `🎵 *Title :* ${vid.title}\n` +
                `🎙️ *Artist :* ${vid.author.name}\n` +
                `🕒 *Duration :* ${vid.timestamp}\n` +
                `👁️ *Views :* ${vid.views?.toLocaleString() || 'N/A'}\n\n` +
                `⏳ *Status :* Downloading audio...\n\n` +
                `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        }, { quoted: mek });

        // ⚙️ API se MP3 link lo
        const api = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(vid.url)}&format=mp3`;
        let json;
        try {
            const res = await axios.get(api, { timeout: 60000 });
            json = res.data;
        } catch (apiErr) {
            return await reply("⚠️ API Timeout! Server is busy. Please try again later.");
        }

        if (!json?.status || !json?.result?.download) {
            return await reply(
                `❌ *Download Failed!*\n\n` +
                `The API returned an empty response.\n` +
                `Please try again after some time.`
            );
        }

        // 🎧 Audio file bhejo
        await conn.sendMessage(from, {
            audio: { url: json.result.download },
            mimetype: "audio/mpeg",
            fileName: `${json.result.title || vid.title}.mp3`
        }, { quoted: mek });

        // ✅ Success message
        await conn.sendMessage(from, {
            text:
                `╭━━━━━━━━━━━━━━━╮\n` +
                `┃   ✅ *DOWNLOAD COMPLETE*   ┃\n` +
                `╰━━━━━━━━━━━━━━━╯\n\n` +
                `🎵 *${json.result.title || vid.title}*\n` +
                `📁 *Format :* MP3\n\n` +
                `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩*`
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("[PLAY ERROR]:", e.message);
        await reply("⚠️ An unexpected error occurred! Please try again.");
    }
});
