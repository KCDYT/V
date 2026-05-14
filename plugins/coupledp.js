const { cmd } = require('../command');

// Couple DP URLs
const coupleDpUrls = {
    url1: 'https://files.catbox.moe/b1o0kp.jpg',
    url2: 'https://files.catbox.moe/3ovw4e.jpg',
    url3: 'https://files.catbox.moe/ubg3fb.jpg',
    url4: 'https://files.catbox.moe/izlx32.jpg',
    url5: 'https://files.catbox.moe/6kvhkt.jpg',
    url6: 'https://files.catbox.moe/y0tkz9.jpg',
    url7: 'https://files.catbox.moe/nzbf1k.jpg',
    url8: 'https://files.catbox.moe/zuy3qn.jpg',
    url9: 'https://files.catbox.moe/z5qtah.jpg',
    url10: 'https://files.catbox.moe/6clonp.jpg',
    url11: 'https://files.catbox.moe/p83bjn.jpg',
    url12: 'https://files.catbox.moe/2bgvp8.jpg',
    url13: 'https://files.catbox.moe/g6c4i7.jpg',
    url14: 'https://files.catbox.moe/1h7n5a.jpg',
    url15: 'https://files.catbox.moe/k5458j.jpg',
    url16: 'https://files.catbox.moe/1l9cr3.jpg',
    url17: 'https://files.catbox.moe/ew0j67.jpg',
    url18: 'https://files.catbox.moe/pi0thx.jpg',
    url19: 'https://files.catbox.moe/msgvm8.jpg',
    url20: 'https://files.catbox.moe/s1vola.jpg',
    url21: 'https://files.catbox.moe/5x3sze.jpg',
    url22: 'https://files.catbox.moe/phe2wh.jpg'
};

const caption = `*_Powered by 𝐀͢ͱ꧊ϻ͒͜𝛂͜𝛛🚩_*`;

// ✅ Sare patterns ek jagah define karo
const allPatterns = [
    // URL 1
    { patterns: ["cp1", "coupleDP1", "cdp1", "couple1", "loveDP1", "ldp1"], url: coupleDpUrls.url1 },
    // URL 2
    { patterns: ["cp2", "coupleDP2", "cdp2", "couple2", "loveDP2", "ldp2"], url: coupleDpUrls.url2 },
    // URL 3
    { patterns: ["cp3", "coupleDP3", "cdp3", "couple3", "loveDP3", "ldp3"], url: coupleDpUrls.url3 },
    // URL 4
    { patterns: ["cp4", "coupleDP4", "cdp4", "couple4", "loveDP4", "ldp4"], url: coupleDpUrls.url4 },
    // URL 5
    { patterns: ["cp5", "coupleDP5", "cdp5", "couple5", "loveDP5", "ldp5"], url: coupleDpUrls.url5 },
    // URL 6
    { patterns: ["cp6", "coupleDP6", "cdp6", "couple6", "loveDP6", "ldp6"], url: coupleDpUrls.url6 },
    // URL 7
    { patterns: ["cp7", "coupleDP7", "cdp7", "couple7", "loveDP7", "ldp7"], url: coupleDpUrls.url7 },
    // URL 8
    { patterns: ["cp8", "coupleDP8", "cdp8", "couple8", "loveDP8", "ldp8"], url: coupleDpUrls.url8 },
    // URL 9
    { patterns: ["cp9", "coupleDP9", "cdp9", "couple9", "loveDP9", "ldp9"], url: coupleDpUrls.url9 },
    // URL 10
    { patterns: ["cp10", "coupleDP10", "cdp10", "couple10", "loveDP10", "ldp10"], url: coupleDpUrls.url10 },
    // URL 11
    { patterns: ["cp11", "coupleDP11", "cdp11", "couple11", "loveDP11", "ldp11"], url: coupleDpUrls.url11 },
    // URL 12
    { patterns: ["cp12", "coupleDP12", "cdp12", "couple12", "loveDP12", "ldp12"], url: coupleDpUrls.url12 },
    // URL 13
    { patterns: ["cp13", "coupleDP13", "cdp13", "couple13", "loveDP13", "ldp13"], url: coupleDpUrls.url13 },
    // URL 14
    { patterns: ["cp14", "coupleDP14", "cdp14", "couple14", "loveDP14", "ldp14"], url: coupleDpUrls.url14 },
    // URL 15
    { patterns: ["cp15", "coupleDP15", "cdp15", "couple15", "loveDP15", "ldp15"], url: coupleDpUrls.url15 },
    // URL 16
    { patterns: ["cp16", "coupleDP16", "cdp16", "couple16", "loveDP16", "ldp16"], url: coupleDpUrls.url16 },
    // URL 17
    { patterns: ["cp17", "coupleDP17", "cdp17", "couple17", "loveDP17", "ldp17"], url: coupleDpUrls.url17 },
    // URL 18
    { patterns: ["cp18", "coupleDP18", "cdp18", "couple18", "loveDP18", "ldp18"], url: coupleDpUrls.url18 },
    // URL 19
    { patterns: ["cp19", "coupleDP19", "cdp19", "couple19", "loveDP19", "ldp19"], url: coupleDpUrls.url19 },
    // URL 20
    { patterns: ["cp20", "coupleDP20", "cdp20", "couple20", "loveDP20", "ldp20"], url: coupleDpUrls.url20 },
    // URL 21
    { patterns: ["cp21", "coupleDP21", "cdp21", "couple21", "loveDP21", "ldp21"], url: coupleDpUrls.url21 },
    // URL 22
    { patterns: ["cp22", "coupleDP22", "cdp22", "couple22", "loveDP22", "ldp22"], url: coupleDpUrls.url22 },
];

// ✅ Auto loop - har pattern ke liye command register hogi
allPatterns.forEach(({ patterns, url }, index) => {
    patterns.forEach((pat) => {
        cmd({
            pattern: pat,
            desc: `Couple DP ${index + 1}`,
            category: "coupledp",
            react: "💑",
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
