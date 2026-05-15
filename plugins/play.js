// ✅ Coded for YouTube Music Download
// ⚙️ 5 BEST Working APIs (2026)

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

        // API 1: MXONE API (BEST)
        try {
            console.log("Trying API 1: MXONE API...");
            const api1 = `https://api.mxone.net/youtube?youtube?url=${encodeURIComponent(url)}&type=mp3`;
                const res2 = await axios.get(api2, { timeout: 20000 });
                if (res2.data?.data?.url) {
                    audioUrl = res2.data.data.url;
                    console.log("✅ API 2 Success!");
                }
            } catch (e) {
                console.log("❌ API 2 Failed:", e.message);
            }
        }

        // API 3: AKUARI API
        if (!audioUrl) {
            try {
                console.log("Trying API 3: AKUARI API...");
                const api3 = `https://api.akuari.my.id/downloader/ytmp3?url=${encodeURIComponent(url)}`;
                const res3 = await axios.get(api3, { timeout: 20000 });
                if (res3.data?.result?.download_url) {
                    audioUrl = res3.data.result.download_url;
                    console.log("✅ API 3 Success!");
                }
            } catch (e) {
                console.log("❌ API 3 Failed:", e.message);
            }
        }

        // API 4: FATIHAPU API
        if (!audioUrl) {
            try {
                console.log("Trying API 4: FATIHAPU API...");
                const api4 = `https://fatihapu.my.id/api/ytmp3?url=${encodeURIComponent(url)}`;
                const res4 = await axios.get(api4, { timeout: 20000 });
                if (res4.data?.mp3) {
                    audioUrl = res4.data.mp3;
                    console.log("✅ API 4 Success!");
                }
            } catch (e) {
                console.log("❌ API 4 Failed:", e.message);
            }
        }

        // API 5: DHRUV API
        if (!audioUrl) {
            try {
                console.log("Trying API 5: DHRUV API...");
                const api5 = `https://dhruvaapi.my.id/download/youtube?url=${encodeURIComponent(url)}&type=mp3`;
                const res5 = await axios.get(api5, { timeout: 20000 });
                if (res5.data?.result?.url) {
                    audioUrl = res5.data.result.url;
                    console.log("✅ API 5 Success!");
                }
            } catch (e) {
                console.log("❌ API 5 Failed:", e.message);
            }
        }

        if (!audioUrl) {
            return await reply("❌ Download failed! All APIs are not responding.\n\nTry again later or use a different song.");
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

*© Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩-MD ♡*`
        }, { quoted: mek });

        let audioUrl = null;

        // API 1: MXONE API
        try {
            console.log("Trying API 1: MXONE API...");
            const api1 = `https://api.mxone.net/youtube?url=${encodeURIComponent(vid.url)}`;
            const res1 = await axios.get(api1, { timeout: 20000 });
            if (res1.data?.mp3) {
                audioUrl = res1.data.mp3;
                console.log("✅ API 1 Success!");
            }
        } catch (e) {
            console.log("❌ API 1 Failed:", e.message);
        }

        // API 2: MOTOX API
        if (!audioUrl) {
            try {
                console.log("Trying API 2: MOTOX API...");
                const api2 = `https://api.motox.cc/download/youtube?url=${encodeURIComponent(vid.url)}&type=mp3`;
                const res2 = await axios.get(api2, { timeout: 20000 });
                if (res2.data?.data?.url) {
                    audioUrl = res2.data.data.url;
                    console.log("✅ API 2 Success!");
                }
            } catch (e) {
                console.log("❌ API 2 Failed:", e.message);
            }
        }

        // API 3: AKUARI API
        if (!audioUrl) {
            try {
                console.log("Trying API 3: AKUARI API...");
                const api3 = `https://api.akuari.my.id/downloader/ytmp3?url=${encodeURIComponent(vid.url)}`;
                const res3 = await axios.get(api3, { timeout: 20000 });
                if (res3.data?.result?.download_url) {
                    audioUrl = res3.data.result.download_url;
                    console.log("✅ API 3 Success!");
                }
            } catch (e) {
                console.log("❌ API 3 Failed:", e.message);
            }
        }

        // API 4: FATIHAPU API
        if (!audioUrl) {
            try {
                console.log("Trying API 4: FATIHAPU API...");
                const api4 = `https://fatihapu.my.id/api/ytmp3?url=${encodeURIComponent(vid.url)}`;
                const res4 = await axios.get(api4, { timeout: 20000 });
                if (res4.data?.mp3) {
                    audioUrl = res4.data.mp3;
                    console.log("✅ API 4 Success!");
                }
            } catch (e) {
                console.log("❌ API 4 Failed:", e.message);
            }
        }

        // API 5: DHRUV API
        if (!audioUrl) {
            try {
                console.log("Trying API 5: DHRUV API...");
                const api5 = `https://dhruvaapi.my.id/download/youtube?url=${encodeURIComponent(vid.url)}&type=mp3`;
                const res5 = await axios.get(api5, { timeout: 20000 });
                if (res5.data?.result?.url) {
                    audioUrl = res5.data.result.url;
                    console.log("✅ API 5 Success!");
                }
            } catch (e) {
                console.log("❌ API 5 Failed:", e.message);
            }
        }

        if (!audioUrl) {
            return await reply("❌ Download failed! Try again later.");
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
