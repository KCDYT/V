// ✅ Coded by AHMADTech for AHMAD MD
// ⚙️ YouTube Downloader Commands (Play & Song)

const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

// 🎵 PLAY COMMAND - Download Audio (MP3)
cmd({
    pattern: "play",
    alias: ["music", "mp3", "audio"],
    desc: "Download YouTube audio as MP3",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎧 براہ کرم کوئی گانے کا نام یا لنک بھیجیں!\n\nمثال: `.play Faded Alan Walker`");

        let url = q;
        let videoInfo = null;

        // 🔍 URL detect کریں یا search کریں
        if (q.startsWith('http://') || q.startsWith('https://')) {
            if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
                return await reply("❌ براہ کرم صحیح YouTube لنک بھیجیں!");
            }
            const videoId = getVideoId(q);
            if (!videoId) return await reply("❌ غلط YouTube لنک!");
            const searchFromUrl = await yts({ videoId });
            videoInfo = searchFromUrl;
            url = q;
        } else {
            const search = await yts(q);
            videoInfo = search.videos[0];
            if (!videoInfo) return await reply("❌ کوئی نتیجہ نہیں ملا!");
            url = videoInfo.url;
        }

        // 🖼️ Thumbnail اور معلومات بھیجیں
        await conn.sendMessage(from, {
            image: { url: videoInfo.thumbnail },
            caption: `*🎵 AUDIO DOWNLOADER*\n\n🎤 *گانا:* ${videoInfo.title}\n👤 *آرٹسٹ:* ${videoInfo.author.name}\n⏱️ *مدت:* ${videoInfo.timestamp}\n👁️ *دیکھا گیا:* ${videoInfo.views.toLocaleString()}\n\n*حالت:* ڈاؤن لوڈ ہو رہا ہے...\n\n*© پاور بائی 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩-MD ♡*`
        }, { quoted: mek });

        // API کال کریں - API 1
        let audioUrl = null;
        try {
            const api1 = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(url)}&format=mp3`;
            const res1 = await axios.get(api1, { timeout: 10000 });
            if (res1.data?.status && res1.data?.result?.download) {
                audioUrl = res1.data.result.download;
            }
        } catch (e) {
            console.log("API 1 ناکام، API 2 کو آزما رہے ہیں...");
        }

        // API 2 کو آزمائیں اگر API 1 ناکام ہو
        if (!audioUrl) {
            try {
                const api2 = `https://api.siputzx.my.id/api/d/youtube?url=${encodeURIComponent(url)}`;
                const res2 = await axios.get(api2, { timeout: 10000 });
                if (res2.data?.data?.audio) {
                    audioUrl = res2.data.data.audio;
                }
            } catch (e) {
                console.log("API 2 ناکام، API 3 کو آزما رہے ہیں...");
            }
        }

        // API 3 کو آزمائیں
        if (!audioUrl) {
            try {
                const api3 = `https://www.y2mate.com/mates/en68/fetch?type=json&q=${encodeURIComponent(url)}&f=mp3`;
                const res3 = await axios.get(api3, { timeout: 10000 });
                if (res3.data?.result?.url) {
                    audioUrl = res3.data.result.url;
                }
            } catch (e) {
                console.log("API 3 ناکام");
            }
        }

        if (!audioUrl) {
            return await reply("❌ ڈاؤن لوڈ لنک نہیں ملا! بعد میں کوشش کریں۔");
        }

        const title = videoInfo.title || "Unknown Song";

        // 🎧 Audio فائل بھیجیں
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: mek });

        // ✅ کامیابی کا reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("❌ .play میں error:", e);
        await reply("⚠️ کچھ غلط ہوا! بعد میں کوشش کریں۔");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// 🎶 SONG COMMAND - Download Audio (Alternative)
cmd({
    pattern: "song",
    alias: ["gana", "gaana", "sangeet"],
    desc: "YouTube سے گانہ ڈاؤن لوڈ کریں",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🎼 براہ کرم کوئی گانے کا نام لکھیں!\n\nمثال: `.song Shape of You Ed Sheeran`");

        const search = await yts(q);
        const videos = search.videos;

        if (!videos || videos.length === 0) {
            return await reply("❌ کوئی گانہ نہیں ملا!");
        }

        const vid = videos[0];

        // 🎵 معلومات اور تھمبنیل بھیجیں
        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: `╭━━━❐━⪼
┇ 🎵 *SONG DOWNLOADER*
┇ 
┇ 🎤 *نام:* ${vid.title}
┇ 👤 *آرٹسٹ:* ${vid.author.name}
┇ ⏱️ *مدت:* ${vid.timestamp}
┇ 👁️ *دیکھا گیا:* ${vid.views.toLocaleString()}
┇
┇ *حالت:* 🔄 ڈاؤن لوڈ ہو رہا ہے...
╰━━━❑━⪼

*© پاور بائی 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩-MD ♡*`
        }, { quoted: mek });

        // API کال کریں - API 1
        let audioUrl = null;
        try {
            const api1 = `https://api.ootaizumi.web.id/downloader/youtube?url=${encodeURIComponent(vid.url)}&format=mp3`;
            const res1 = await axios.get(api1, { timeout: 10000 });
            if (res1.data?.status && res1.data?.result?.download) {
                audioUrl = res1.data.result.download;
            }
        } catch (e) {
            console.log("API 1 ناکام، API 2 کو آزما رہے ہیں...");
        }

        // API 2 کو آزمائیں
        if (!audioUrl) {
            try {
                const api2 = `https://api.siputzx.my.id/api/d/youtube?url=${encodeURIComponent(vid.url)}`;
                const res2 = await axios.get(api2, { timeout: 10000 });
                if (res2.data?.data?.audio) {
                    audioUrl = res2.data.data.audio;
                }
            } catch (e) {
                console.log("API 2 ناکام، API 3 کو آزما رہے ہیں...");
            }
        }

        // API 3 کو آزمائیں
        if (!audioUrl) {
            try {
                const api3 = `https://www.y2mate.com/mates/en68/fetch?type=json&q=${encodeURIComponent(vid.url)}&f=mp3`;
                const res3 = await axios.get(api3, { timeout: 10000 });
                if (res3.data?.result?.url) {
                    audioUrl = res3.data.result.url;
                }
            } catch (e) {
                console.log("API 3 ناکام");
            }
        }

        if (!audioUrl) {
            return await reply("❌ ڈاؤن لوڈ نہیں ہو سکا! بعد میں کوشش کریں۔");
        }

        // 🎧 Audio بھیجیں
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${vid.title}.mp3`,
            ptt: false
        }, { quoted: mek });

        // ✅ کامیابی
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error("❌ .song میں error:", e);
        await reply("⚠️ کوئی مسئلہ ہوا! دوبارہ کوشش کریں۔");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// Helper function: Video ID نکالیں
function getVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
}

module.exports = {
    getVideoId
};
