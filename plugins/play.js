// ════════════════════════════════════════════════════════
// 🎵 PLAY / SONG COMMAND FIXED (RAPID-API VERSION)
// ✅ Stable Audio Downloader - RapidAPI Tested
// ⚡ Powered By AHMAD-MD
// ════════════════════════════════════════════════════════

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Helper function for delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

cmd({
    pattern: "play",
    alias: ["song", "music", "mp3"],
    desc: "Download YouTube audio via RapidAPI",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    try {
        // ❌ No Query
        if (!q) {
            return reply("🎵 Please provide a song name\n\nExample: .play Faded Alan Walker");
        }

        // 🎶 Reaction
        await conn.sendMessage(from, { react: { text: "🎶", key: m.key } });

        // 🔍 Search YouTube
        const search = await yts(q);
        if (!search.videos || search.videos.length === 0) {
            await conn.sendMessage(from, { react: { text: "❌", key: m.key } });
            return reply("❌ No results found");
        }

        const video = search.videos[0];

        // 🖼️ Send Info & Status
        await conn.sendMessage(from, {
            image: { url: video.thumbnail },
            caption: `╭━━━〔 🎵 SONG DOWNLOADER 〕━━━⬣
┃
┃ 🎵 *Title:* ${video.title}
┃ 👤 *Author:* ${video.author?.name || "Unknown"}
┃ ⏱️ *Duration:* ${video.timestamp}
┃ 📥 *Status:* Processing API...
┃
╰━━━━━━━━━━━━━━━━━━⬣
> Powered By AHMAD-MD`
        }, { quoted: mek });

        // 📥 RapidAPI Request Configuration
        const options = {
            method: 'GET',
            url: 'https://youtube-mp3-audio-video-downloader.p.rapidapi.com/get_mp3_download_link',
            params: {
                url: video.url,
                quality: '320',
                wait_until_the_file_is_ready: 'false'
            },
            headers: {
                'x-rapidapi-key': 'be7b67b30cmshccb5e99f75813f1p19aff2jsnbf9e9cdd1011',
                'x-rapidapi-host': 'youtube-mp3-audio-video-downloader.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };

        // Fetching Data from API
        const response = await axios.request(options);
        const audioUrl = response.data.file; // As seen in your screenshot

        if (!audioUrl) {
            throw new Error("API did not return a file link");
        }

        // ⏳ Waiting for Server to finalize the file (Crucial for this API)
        await reply("📥 Server is preparing your file, please wait 10 seconds...");
        await sleep(10000); 

        // 📥 Download Audio Buffer from the retrieved link
        const audioBuffer = await axios.get(audioUrl, {
            responseType: "arraybuffer",
            timeout: 60000
        });

        // 📂 Temp File
        const filePath = path.join(__dirname, `temp_${Date.now()}.mp3`);
        fs.writeFileSync(filePath, audioBuffer.data);

        // 🎧 Send Audio File
        await conn.sendMessage(from, {
            audio: fs.readFileSync(filePath),
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            ptt: false,
            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: "AHMAD-MD Audio Player",
                    thumbnailUrl: video.thumbnail,
                    sourceUrl: video.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        // 🗑️ Cleanup
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

    } catch (e) {
        console.log("PLAY ERROR:", e);
        await conn.sendMessage(from, { react: { text: "❌", key: m.key } });
        reply("⚠️ API Error: Link is being generated or limit reached. Try again in a moment.");
    }
});
        
