// AHMAD TechX

const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

cmd({
    pattern: "play",
    alias: ["ytmp3", "play2", "yta"],
    desc: "Download YouTube audio",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) {
            return reply("🎧 Please provide song name!");
        }

        // Search YouTube
        const search = await yts(q);

        if (!search.videos.length) {
            return reply("❌ No results found!");
        }

        const vid = search.videos[0];

        // Thumbnail message
        await conn.sendMessage(
            from,
            {
                image: { url: vid.thumbnail },
                caption:
                    `🎵 *AUDIO DOWNLOADER*\n\n` +
                    `📌 *Title:* ${vid.title}\n` +
                    `⏱️ *Duration:* ${vid.timestamp}\n` +
                    `👀 *Views:* ${vid.views}\n` +
                    `📺 *Channel:* ${vid.author.name}\n\n` +
                    `⬇️ Downloading audio...\n\n` +
                    `© POWERED BY AHMAD TECHX`
            },
            { quoted: mek }
        );

        // API
        const api = `https://api.nexray.web.id/downloader/ytmp3?url=${encodeURIComponent(vid.url)}`;

        const response = await axios.get(api);

        // Check API response
        if (
            !response.data ||
            !response.data.status ||
            !response.data.result ||
            !response.data.result.url
        ) {
            return reply("❌ Download failed!");
        }

        const audioUrl = response.data.result.url;

        // Send Audio
        await conn.sendMessage(
            from,
            {
                audio: { url: audioUrl },
                mimetype: "audio/mpeg",
                fileName: `${vid.title}.mp3`
            },
            { quoted: mek }
        );

        // Success reaction
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

    } catch (e) {

        console.log("PLAY ERROR:", e);

        reply("❌ Error occurred while downloading");

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

    }

});

cmd({
    pattern: "ytv",
    alias: ["ytmp4", "video"],
    desc: "Download YouTube video",
    category: "download",
    react: "📹",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) {
            return reply("🎥 Please provide video name!");
        }

        // Search YouTube
        const search = await yts(q);

        if (!search.videos.length) {
            return reply("❌ No video found!");
        }

        const vid = search.videos[0];

        // Thumbnail
        await conn.sendMessage(
            from,
            {
                image: { url: vid.thumbnail },
                caption:
                    `🎬 *VIDEO DOWNLOADER*\n\n` +
                    `📌 *Title:* ${vid.title}\n` +
                    `⏱️ *Duration:* ${vid.timestamp}\n` +
                    `📺 *Channel:* ${vid.author.name}\n\n` +
                    `⬇️ Downloading video...\n\n` +
                    `© POWERED BY AHMAD TECHX`
            },
            { quoted: mek }
        );

        // API
        const api = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(vid.url)}`;

        const response = await axios.get(api);

        // Validate
        if (
            !response.data ||
            !response.data.status ||
            !response.data.result ||
            !response.data.result.mp4
        ) {
            return reply("❌ Video download failed!");
        }

        const videoUrl = response.data.result.mp4;

        // Send Video
        await conn.sendMessage(
            from,
            {
                video: { url: videoUrl },
                caption:
                    `🎬 *${vid.title}*\n\n` +
                    `© POWERED BY AHMAD TECHX`
            },
            { quoted: mek }
        );

        // Success reaction
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

    } catch (e) {

        console.log("YTV ERROR:", e);

        reply("❌ Error occurred while downloading");

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

    }

});
