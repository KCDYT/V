// AHMAD MD

const { cmd } = require('../command');

cmd({
    pattern: "channelstatus",
    alias: ["chnlstatus", "cstatus", "chupdate"],
    desc: "Post an update/status to your connected channel with media or text",
    category: "owner",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { text, reply, isCreator }) => {
    // Check if user is owner
    if (!isCreator) return reply("❌ This command is only for owners!");
    
    // ✅ AAPKI REAL CHANNEL JID YAHA FIT KAR DI HAI
    const channelJid = "120363424787100672@newsletter"; 
    
    try {
        // Get the quoted message
        const quotedMsg = m.quoted;
        
        // Get mime type properly
        const mimeType = quotedMsg ? (quotedMsg.msg || quotedMsg).mimetype || '' : '';
        
        // Get caption/text
        const caption = text?.trim() || "";
        
        // Check if there's content to send
        if (!quotedMsg && !caption) {
            return reply(
                `⚠️ Reply to media or provide text!\n\n` +
                `Examples:\n` +
                `• .channelstatus Join our official channel!\n` +
                `• Reply to an image with: .channelstatus`
            );
        }
        
        // Send loading reaction
        await conn.sendMessage(m.chat, { react: { text: "⏳", key: mek.key } });
        
        let messageContent = {};
        
        // If there's quoted media
        if (quotedMsg) {
            // Download media
            const mediaBuffer = await quotedMsg.download();
            if (!mediaBuffer) throw new Error("Failed to download media");
            
            // Handle different media types based on mimeType
            if (mimeType.startsWith('image/')) {
                messageContent = {
                    image: mediaBuffer,
                    caption: caption || "",
                    mimetype: mimeType
                };
            } 
            else if (mimeType.startsWith('video/')) {
                messageContent = {
                    video: mediaBuffer,
                    caption: caption || "",
                    mimetype: mimeType
                };
            } 
            else if (mimeType.startsWith('audio/')) {
                const isPTT = quotedMsg.message?.audioMessage?.ptt || false;
                messageContent = {
                    audio: mediaBuffer,
                    mimetype: isPTT ? 'audio/ogg; codecs=opus' : 'audio/mp4',
                    ptt: isPTT
                };
            }
            else {
                // Fallback detection by message type
                const msgType = Object.keys(quotedMsg.message || {})[0];
                
                if (msgType === 'imageMessage') {
                    messageContent = {
                        image: mediaBuffer,
                        caption: caption || "",
                        mimetype: 'image/jpeg'
                    };
                }
                else if (msgType === 'videoMessage') {
                    messageContent = {
                        video: mediaBuffer,
                        caption: caption || "",
                        mimetype: 'video/mp4'
                    };
                }
                else if (msgType === 'audioMessage' || msgType === 'pttMessage') {
                    messageContent = {
                        audio: mediaBuffer,
                        mimetype: msgType === 'pttMessage' ? 'audio/ogg; codecs=opus' : 'audio/mp4',
                        ptt: msgType === 'pttMessage'
                    };
                }
                else {
                    return reply("❌ Unsupported media type! Please reply to an image, video, or audio file.");
                }
            }
        } 
        // If only text
        else if (caption) {
            messageContent = {
                text: caption
            };
        }
        
        // Channel par message send ho raha hai
        await conn.sendMessage(channelJid, messageContent);
        
        // Success reaction and confirmation
        await conn.sendMessage(m.chat, { react: { text: "✅", key: mek.key } });
        await reply("📢 Status successfully posted to your Channel!");
        
    } catch (error) {
        console.error("Channel Status Error:", error);
        reply(`❌ Error: ${error.message}`);
        await conn.sendMessage(m.chat, { react: { text: "❌", key: mek.key } });
    }
});
                
