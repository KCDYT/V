// ✅ Coded by AHMADTech for AHMAD MD

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

cmd({
    pattern: "play",
    alias: [
        "play2",
        "play3",
        "song",
        "song2",
        "song3",
        "paly",
        "paly2",
        "paly3"
    ],
    desc: "Download YouTube audio",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) {
            return await reply(
                "🎧 Please provide a song name!\n\nExample:\n.play Faded Alan Walker"
            );
        }

        // 🔍 Search YouTube
        const { videos } = await yts(q);

        if (!videos || videos.length === 0) {
            return await reply("❌ No results found!");
        }

        const vid = videos[0];

        // 🎵 Thumbnail + Info
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption:
                `🎵 *AUDIO DOWNLOADER*\n\n` +
                `📌 *Title:* ${vid.title}\n` +
                `⏱️ *Duration:* ${vid.timestamp}\n` +
                `👀 *Views:* ${vid.views.toLocaleString()}\n` +
                `📺 *Author:* ${vid.author.name}\n\n` +
                `⬇️ Downloading audio...\n\n` +
                `© POWERED BY AHMAD TECHX`
        }, { quoted: mek });

        // 🎧 API
        const api =
            `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(vid.url)}&format=mp3`;

        const response = await axios.get(api);

        const json = response.data;

        // ❌ Check API
        if (
            !json ||
            !json.status ||
            !json.result ||
            !json.result.download
        ) {
            return await reply("❌ Download failed! Try again later.");
        }

        const audioUrl = json.result.download;

        // 🎶 Send Audio
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${vid.title}.mp3`
        }, { quoted: mek });

        // ✅ Success Reaction
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

    } catch (e) {

        console.error("PLAY ERROR:", e);

        await reply("❌ Error occurred while downloading!");

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

    }

});
