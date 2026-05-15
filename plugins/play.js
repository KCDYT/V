// ✅ Coded for YouTube Music Download
// ⚙️ Multiple Working APIs

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

        let audioUrl = null;
        let error = null;

        // API 1: Cobalt API
        try {
            const api1 = `https://api.cobalt.tools/api/json?url=${encodeURIComponent(url)}&vCodec=h264&aFormat=best&downloadMode=auto`;
            const res1 = await axios.get(api1, { timeout: 15000 });
            if (res1.data?.url) {
                audioUrl = res1.data.url;
            }
        } catch (e) {
            error = e.message;
        }

        // API 2: Yt-dlp API
        if (!audioUrl) {
            try {
                const api2 = `https://yt-dlp-api.herokuapp.com/download?url=${encodeURIComponent(url)}&format=mp3`;
                const res2 = await axios.get(api2, { timeout: 15000 });
                if (res2.data?.download_url) {
                    audioUrl = res2.data.download_url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 3: Archive API
        if (!audioUrl) {
            try {
                const api3 = `https://api.archive.org/metadata/${url}`;
                const res3 = await axios.get(api3, { timeout: 15000 });
                if (res3.data?.result?.[0]?.url) {
                    audioUrl = res3.data.result[0].url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 4: Ezstreamify API
        if (!audioUrl) {
            try {
                const api4 = `https://api.ezstreamify.com/video?url=${encodeURIComponent(url)}&format=mp3`;
                const res4 = await axios.get(api4, { timeout: 15000 });
                if (res4.data?.data?.download_url) {
                    audioUrl = res4.data.data.download_url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 5: Y2mate API
        if (!audioUrl) {
            try {
                const api5 = `https://www.y2mate.com/mates/en68/fetch?type=json&q=${encodeURIComponent(url)}&f=mp3`;
                const res5 = await axios.get(api5, { timeout: 15000 });
                if (res5.data?.result?.url) {
                    audioUrl = res5.data.result.url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 6: Siputzx API
        if (!audioUrl) {
            try {
                const api6 = `https://api.siputzx.my.id/api/d/youtube?url=${encodeURIComponent(url)}`;
                const res6 = await axios.get(api6, { timeout: 15000 });
                if (res6.data?.data?.audio) {
                    audioUrl = res6.data.data.audio;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 7: Ootaizumi API
        if (!audioUrl) {
            try {
                const api7 = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(url)}&format=mp3`;
                const res7 = await axios.get(api7, { timeout: 15000 });
                if (res7.data?.status && res7.data?.result?.download) {
                    audioUrl = res7.data.result.download;
                }
            } catch (e) {
                error = e.message;
            }
        }

        if (!audioUrl) {
            return await reply("❌ Download link not found! Try again later.\n\nError: " + error);
        }

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

*© Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩♡*`
        }, { quoted: mek });

        let audioUrl = null;
        let error = null;

        // API 1: Cobalt API
        try {
            const api1 = `https://api.cobalt.tools/api/json?url=${encodeURIComponent(vid.url)}&vCodec=h264&aFormat=best&downloadMode=auto`;
            const res1 = await axios.get(api1, { timeout: 15000 });
            if (res1.data?.url) {
                audioUrl = res1.data.url;
            }
        } catch (e) {
            error = e.message;
        }

        // API 2: Yt-dlp API
        if (!audioUrl) {
            try {
                const api2 = `https://yt-dlp-api.herokuapp.com/download?url=${encodeURIComponent(vid.url)}&format=mp3`;
                const res2 = await axios.get(api2, { timeout: 15000 });
                if (res2.data?.download_url) {
                    audioUrl = res2.data.download_url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 3: Archive API
        if (!audioUrl) {
            try {
                const api3 = `https://api.archive.org/metadata/${vid.url}`;
                const res3 = await axios.get(api3, { timeout: 15000 });
                if (res3.data?.result?.[0]?.url) {
                    audioUrl = res3.data.result[0].url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 4: Ezstreamify API
        if (!audioUrl) {
            try {
                const api4 = `https://api.ezstreamify.com/video?url=${encodeURIComponent(vid.url)}&format=mp3`;
                const res4 = await axios.get(api4, { timeout: 15000 });
                if (res4.data?.data?.download_url) {
                    audioUrl = res4.data.data.download_url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 5: Y2mate API
        if (!audioUrl) {
            try {
                const api5 = `https://www.y2mate.com/mates/en68/fetch?type=json&q=${encodeURIComponent(vid.url)}&f=mp3`;
                const res5 = await axios.get(api5, { timeout: 15000 });
                if (res5.data?.result?.url) {
                    audioUrl = res5.data.result.url;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 6: Siputzx API
        if (!audioUrl) {
            try {
                const api6 = `https://api.siputzx.my.id/api/d/youtube?url=${encodeURIComponent(vid.url)}`;
                const res6 = await axios.get(api6, { timeout: 15000 });
                if (res6.data?.data?.audio) {
                    audioUrl = res6.data.data.audio;
                }
            } catch (e) {
                error = e.message;
            }
        }

        // API 7: Ootaizumi API
        if (!audioUrl) {
            try {
                const api7 = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(vid.url)}&format=mp3`;
                const res7 = await axios.get(api7, { timeout: 15000 });
                if (res7.data?.status && res7.data?.result?.download) {
                    audioUrl = res7.data.result.download;
                }
            } catch (e) {
                error = e.message;
            }
        }

        if (!audioUrl) {
            return await reply("❌ Download failed! Try again later.\n\nError: " + error);
        }

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
