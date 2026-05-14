const { cmd } = require('../command');

// Boy DP URLs
const boyDpUrls = {
    url1: 'https://files.catbox.moe/y1l7ed.jpg',
    url2: 'https://files.catbox.moe/4kujce.jpg',
    url3: 'https://files.catbox.moe/vrrn72.jpg',
    url4: 'https://files.catbox.moe/7w87wk.jpg',
    url5: 'https://files.catbox.moe/jf7cwz.jpg',
    url6: 'https://files.catbox.moe/gc3c1g.jpg',
    url7: 'https://files.catbox.moe/nufhim.jpg',
    url8: 'https://files.catbox.moe/yfce44.jpg',
    url9: 'https://files.catbox.moe/gdhv0h.jpg',
    url10: 'https://files.catbox.moe/ptwcm0.jpg',
    url11: 'https://files.catbox.moe/3upyka.jpg',
    url12: 'https://files.catbox.moe/erj2f8.jpg',
    url13: 'https://files.catbox.moe/g50vs5.jpg',
    url14: 'https://files.catbox.moe/1jta5y.jpg',
    url15: 'https://files.catbox.moe/siph10.jpg',
    url16: 'https://files.catbox.moe/mxlbfq.jpg',
    url17: 'https://files.catbox.moe/3aqy6x.jpg',
    url18: 'https://files.catbox.moe/0qvy21.jpg',
    url19: 'https://files.catbox.moe/szdoa0.jpg',
    url20: 'https://files.catbox.moe/3upyka.jpg',
    url21: 'https://files.catbox.moe/jadoal.jpg',
    url22: 'https://files.catbox.moe/yfce44.jpg'
};

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// ✅ Sare patterns - har image ke liye 6 patterns
const allPatterns = [
    { patterns: ["boydp1", "boyDP1", "bdp1", "boy1", "larkadp1", "bdp1"], url: boyDpUrls.url1 },
    { patterns: ["boydp2", "boyDP2", "bdp2", "boy2", "larkadp2", "bdp2"], url: boyDpUrls.url2 },
    { patterns: ["boydp3", "boyDP3", "bdp3", "boy3", "larkadp3", "bdp3"], url: boyDpUrls.url3 },
    { patterns: ["boydp4", "boyDP4", "bdp4", "boy4", "larkadp4", "bdp4"], url: boyDpUrls.url4 },
    { patterns: ["boydp5", "boyDP5", "bdp5", "boy5", "larkadp5", "bdp5"], url: boyDpUrls.url5 },
    { patterns: ["boydp6", "boyDP6", "bdp6", "boy6", "larkadp6", "bdp6"], url: boyDpUrls.url6 },
    { patterns: ["boydp7", "boyDP7", "bdp7", "boy7", "larkadp7", "bdp7"], url: boyDpUrls.url7 },
    { patterns: ["boydp8", "boyDP8", "bdp8", "boy8", "larkadp8", "bdp8"], url: boyDpUrls.url8 },
    { patterns: ["boydp9", "boyDP9", "bdp9", "boy9", "larkadp9", "bdp9"], url: boyDpUrls.url9 },
    { patterns: ["boydp10", "boyDP10", "bdp10", "boy10", "larkadp10", "bdp10"], url: boyDpUrls.url10 },
    { patterns: ["boydp11", "boyDP11", "bdp11", "boy11", "larkadp11", "bdp11"], url: boyDpUrls.url11 },
    { patterns: ["boydp12", "boyDP12", "bdp12", "boy12", "larkadp12", "bdp12"], url: boyDpUrls.url12 },
    { patterns: ["boydp13", "boyDP13", "bdp13", "boy13", "larkadp13", "bdp13"], url: boyDpUrls.url13 },
    { patterns: ["boydp14", "boyDP14", "bdp14", "boy14", "larkadp14", "bdp14"], url: boyDpUrls.url14 },
    { patterns: ["boydp15", "boyDP15", "bdp15", "boy15", "larkadp15", "bdp15"], url: boyDpUrls.url15 },
    { patterns: ["boydp16", "boyDP16", "bdp16", "boy16", "larkadp16", "bdp16"], url: boyDpUrls.url16 },
    { patterns: ["boydp17", "boyDP17", "bdp17", "boy17", "larkadp17", "bdp17"], url: boyDpUrls.url17 },
    { patterns: ["boydp18", "boyDP18", "bdp18", "boy18", "larkadp18", "bdp18"], url: boyDpUrls.url18 },
    { patterns: ["boydp19", "boyDP19", "bdp19", "boy19", "larkadp19", "bdp19"], url: boyDpUrls.url19 },
    { patterns: ["boydp20", "boyDP20", "bdp20", "boy20", "larkadp20", "bdp20"], url: boyDpUrls.url20 },
    { patterns: ["boydp21", "boyDP21", "bdp21", "boy21", "larkadp21", "bdp21"], url: boyDpUrls.url21 },
    { patterns: ["boydp22", "boyDP22", "bdp22", "boy22", "larkadp22", "bdp22"], url: boyDpUrls.url22 },
];

// ✅ Auto loop
allPatterns.forEach(({ patterns, url }, index) => {
    patterns.forEach((pat) => {
        cmd({
            pattern: pat,
            desc: `Boy DP ${index + 1}`,
            category: "boydp",
            react: "👦",
            filename: __filename
        },
        async (conn, mek, m, { from, reply }) => {
            try {
                await conn.sendMessage(from, {
                    image: { url },
                    mimetype: 'image/jpeg',
                    caption
                }, { quoted: mek });
            } catch (e) {
                console.error(`Error in ${pat}:`, e);
                await reply("Failed to send image. Please try again.");
            }
        });
    });
});
