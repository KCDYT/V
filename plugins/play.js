// ════════════════════════════════════════════════════════
// 🎵 PLAY / SONG COMMAND
// ✅ API: jawad-tech.vercel.app
// ⚡ Powered By AHMAD-MD
// ════════════════════════════════════════════════════════

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

        // ❌ No Query
        if (!q) {
            return reply(
                "🎵 Please provide a song name\n\nExample: .play Faded Alan Walker"
            );
        }

        // 🎶 React
        await conn.sendMessage(from, {
            react: {
                text: "🎶",
                key: m.key
            }
        });

        // 🔍 Search YouTube
        const search = await yts(q);

        if (!search.videos || search.videos.length === 0) {

            await conn.sendMessage(from, {
                react: {
                    text: "❌",
                    key: m.key
                }
            });

            return reply("❌ No results found");
        }

        const video = search.videos[0];

        // 📥 API Request
        const api =
`https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(video.url)}`;

        const { data } = await axios.get(api, {
            timeout: 20000
        });

        // 🔍 Debug
        console.log(data);

        // 🎧 Audio URL
        const audioUrl =
            data?.result?.audio ||
            data?.audio ||
            data?.result?.mp3;

        if (!audioUrl) {
            throw new Error("Audio URL not found");
        }

        // 🖼️ Song Info
        await conn.sendMessage(from, {
            image: { url: video.thumbnail },
            caption:
`╭━━━〔 🎵 SONG DOWNLOADER 〕━━━⬣
┃
┃ 🎵 *Title:* ${video.title}
┃ 👤 *Author:* ${video.author?.name || "Unknown"}
┃ ⏱️ *Duration:* ${video.timestamp}
┃ 👁️ *Views:* ${video.views.toLocaleString()}
┃
┃ 📥 *Status:* Downloading...
┃
╰━━━━━━━━━━━━━━━━━━⬣

> Powered By AHMAD-MD`
        }, { quoted: mek });

        // 🎧 Send Audio
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`,
            ptt: false,

            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: "YouTube Audio",
                    thumbnailUrl: video.thumbnail,
                    sourceUrl: video.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }

        }, { quoted: mek });

        // ✅ Success
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: m.key
            }
        });

    } catch (e) {

        console.log("PLAY ERROR:", e);

        // ❌ Error React
        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: m.key
            }
        });

        reply("⚠️ Error while processing request");
    }

});
