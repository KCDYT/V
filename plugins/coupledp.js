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

// Couple DP 1
cmd({ pattern: "cp1", desc: "Couple DP 1", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url1 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp1:", e); await reply("Failed to send image."); }
});

// Couple DP 2
cmd({ pattern: "cp2", desc: "Couple DP 2", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url2 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp2:", e); await reply("Failed to send image."); }
});

// Couple DP 3
cmd({ pattern: "cp3", desc: "Couple DP 3", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url3 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp3:", e); await reply("Failed to send image."); }
});

// Couple DP 4
cmd({ pattern: "cp4", desc: "Couple DP 4", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url4 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp4:", e); await reply("Failed to send image."); }
});

// Couple DP 5
cmd({ pattern: "cp5", desc: "Couple DP 5", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url5 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp5:", e); await reply("Failed to send image."); }
});

// Couple DP 6
cmd({ pattern: "cp6", desc: "Couple DP 6", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url6 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp6:", e); await reply("Failed to send image."); }
});

// Couple DP 7
cmd({ pattern: "cp7", desc: "Couple DP 7", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url7 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp7:", e); await reply("Failed to send image."); }
});

// Couple DP 8
cmd({ pattern: "cp8", desc: "Couple DP 8", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url8 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp8:", e); await reply("Failed to send image."); }
});

// Couple DP 9
cmd({ pattern: "cp9", desc: "Couple DP 9", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url9 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp9:", e); await reply("Failed to send image."); }
});

// Couple DP 10
cmd({ pattern: "cp10", desc: "Couple DP 10", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url10 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp10:", e); await reply("Failed to send image."); }
});

// Couple DP 11
cmd({ pattern: "cp11", desc: "Couple DP 11", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url11 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp11:", e); await reply("Failed to send image."); }
});

// Couple DP 12
cmd({ pattern: "cp12", desc: "Couple DP 12", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url12 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp12:", e); await reply("Failed to send image."); }
});

// Couple DP 13
cmd({ pattern: "cp13", desc: "Couple DP 13", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url13 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp13:", e); await reply("Failed to send image."); }
});

// Couple DP 14
cmd({ pattern: "cp14", desc: "Couple DP 14", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url14 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp14:", e); await reply("Failed to send image."); }
});

// Couple DP 15
cmd({ pattern: "cp15", desc: "Couple DP 15", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url15 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp15:", e); await reply("Failed to send image."); }
});

// Couple DP 16
cmd({ pattern: "cp16", desc: "Couple DP 16", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url16 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp16:", e); await reply("Failed to send image."); }
});

// Couple DP 17
cmd({ pattern: "cp17", desc: "Couple DP 17", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url17 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp17:", e); await reply("Failed to send image."); }
});

// Couple DP 18
cmd({ pattern: "cp18", desc: "Couple DP 18", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url18 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp18:", e); await reply("Failed to send image."); }
});

// Couple DP 19
cmd({ pattern: "cp19", desc: "Couple DP 19", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url19 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp19:", e); await reply("Failed to send image."); }
});

// Couple DP 20
cmd({ pattern: "cp20", desc: "Couple DP 20", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url20 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp20:", e); await reply("Failed to send image."); }
});

// Couple DP 21
cmd({ pattern: "cp21", desc: "Couple DP 21", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url21 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp21:", e); await reply("Failed to send image."); }
});

// Couple DP 22
cmd({ pattern: "cp22", desc: "Couple DP 22", category: "coupledp", react: "💑", filename: __filename },
async (conn, mek, m, { from, reply }) => {
    try { await conn.sendMessage(from, { image: { url: coupleDpUrls.url22 }, mimetype: 'image/jpeg', caption }, { quoted: mek });
    } catch (e) { console.error("Error in cp22:", e); await reply("Failed to send image."); }
});
