// ════════════════════════════════════════════════════════
// 🎵 PLAY / SONG COMMAND
// ✅ YouTube Audio Downloader
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
    react: "🎶",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    // ❌ No query
    if (!q) {
        return reply("🎵 Please provide a song name\n\nExample: `.play Faded Alan Walker`");
    }

    try {

        // 🎶 React
        await conn.sendMessage(from, {
            react: {
                text: '🎶',
                key: m.key
            }
        });

        // 🔍 Search YouTube
        const search = await yts(q);

        if (!search.videos.length) {

            await conn.sendMessage(from, {
                react: {
                    text: '❌',
                    key: m.key
                }
            });

            return reply("❌ No results found");
        }

        const video = search.videos[0];

        // 📥 Download API
        const api = `https://api.ootaizumi.web.id/downloader/youtube`;

        const { data } = await axios.get(api, {
            params: {
                url: video.url,
                format: 'mp3'
            },
            timeout: 15000
        });

        // ❌ API Error
        if (!data.status || !data.result?.download) {
            throw new Error("Download failed");
        }

        const result = data.result;

        // 🖼️ Song Info Card
        await conn.sendMessage(from, {
            image: { url: result.thumbnail },
            caption:
`╭━━━〔 🎵 SONG DOWNLOADER 〕━━━⬣
┃
┃ 🎧 *Title:* ${result.title}
┃ 👤 *Channel:* ${result.author?.channelTitle || "Unknown"}
┃ ⏱️ *Duration:* ${video.timestamp}
┃ 👁️ *Views:* ${video.views.toLocaleString()}
┃
┃ 📥 *Status:* Downloading...
┃
╰━━━━━━━━━━━━━━━━━━⬣

> Powered By AHMAD-MD`
        }, { quoted: mek });

        // 🎵 Send Audio
        await conn.sendMessage(
            from,
            {
                audio: { url: result.download },
                mimetype: 'audio/mpeg',
                fileName: `${result.title}.mp3`,

                contextInfo: {
                    externalAdReply: {
                        title: result.title,
                        body: result.author?.channelTitle || 'YouTube Audio',
                        thumbnailUrl: result.thumbnail,
                        sourceUrl: video.url,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: mek }
        );

        // ✅ Success Reaction
        await conn.sendMessage(from, {
            react: {
                text: '✅',
                key: m.key
            }
        });

    } catch (e) {

        console.error("PLAY ERROR:", e);

        // ❌ Error Reaction
        await conn.sendMessage(from, {
            react: {
                text: '❌',
                key: m.key
            }
        });

        reply("⚠️ Error while processing the request");
    }
});
