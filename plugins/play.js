// ✅ Coded for YouTube Music Download
// ⚙️ Direct Download Method (No API)

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

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
            url = q;
            try {
                videoInfo = await ytdl.getInfo(url);
            } catch (e) {
                return await reply("❌ Invalid YouTube URL!");
            }
        } else {
            const search = await yts(q);
            videoInfo = search.videos[0];
            if (!videoInfo) return await reply("❌ No video results found!");
            url = videoInfo.url;
        }

        // 🖼️ Send thumbnail + video info
        const thumbnail = videoInfo.videoDetails?.thumbnails?.[0]?.url || videoInfo.thumbnail;
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: `*🎵 AUDIO DOWNLOADER*\n\n🎤 *Title:* ${videoInfo.videoDetails?.title || videoInfo.title}\n👤 *Channel:* ${videoInfo.videoDetails?.author?.name || videoInfo.author?.name}\n⏱️ *Duration:* ${videoInfo.videoDetails?.lengthSeconds || videoInfo.timestamp}\n\n*Status:* Downloading audio...\n\n*© Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩-MD ♡*`
        }, { quoted: mek });

        // 📥 Download Audio
        try {
            const audioStream = ytdl(url, {
                quality: 'lowestAudio',
                filter: 'audioonly'
            });

            const title = (videoInfo.videoDetails?.title || videoInfo.title || "song").substring(0, 50);
            const fileName = `${title}.mp3`;
            const filePath = path.join('/tmp', fileName);

            const file = fs.createWriteStream(filePath);
            
            audioStream.pipe(file);

            file.on('finish', async () => {
                // 🎧 Send audio file
                await conn.sendMessage(from, {
                    audio: fs.readFileSync(filePath),
                    mimetype: "audio/mpeg",
                    fileName: fileName,
                    ptt: false
                }, { quoted: mek });

                // ✅ Success Reaction
                await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

                // Clean up
                fs.unlinkSync(filePath);
            });

            audioStream.on('error', async (err) => {
                console.error("Stream error:", err);
                await reply("❌ Download failed!");
                await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            });

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

        // 📥 Download Audio
        try {
            const audioStream = ytdl(vid.url, {
                quality: 'lowestAudio',
                filter: 'audioonly'
            });

            const title = (vid.title || "song").substring(0, 50);
            const fileName = `${title}.mp3`;
            const filePath = path.join('/tmp', fileName);

            const file = fs.createWriteStream(filePath);
            
            audioStream.pipe(file);

            file.on('finish', async () => {
                // 🎧 Send audio file
                await conn.sendMessage(from, {
                    audio: fs.readFileSync(filePath),
                    mimetype: "audio/mpeg",
                    fileName: fileName,
                    ptt: false
                }, { quoted: mek });

                // ✅ Success
                await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

                // Clean up
                fs.unlinkSync(filePath);
            });

            audioStream.on('error', async (err) => {
                console.error("Stream error:", err);
                await reply("❌ Download failed!");
                await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            });

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

module.exports = {};
