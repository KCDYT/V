// PLAY - YouTube Audio Search & Download
// ══════════════════════════════════════════════════════════
   
case 'play':
case 'song': {
  if (!text) return reply(`🎵 Provide a song name`)

  try {
    await bad.sendMessage(m.chat, { react: { text: '🎶', key: m.key } })

    const yts = require('yt-search')
    const axios = require('axios')

    // 1️⃣ YouTube Search
    const search = await yts(text)
    if (!search.videos.length) {
      await bad.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return reply('❌ No results found')
    }

    const video = search.videos[0]

    // 2️⃣ API Call
    const api = `https://api.ootaizumi.web.id/downloader/youtube`
    const { data } = await axios.get(api, {
      params: {
        url: video.url,
        format: 'mp3'
      }
    })

    if (!data.status || !data.result?.download) {
      throw new Error('Download failed')
    }

    const result = data.result

    // 3️⃣ Send Audio
    await bad.sendMessage(
      m.chat,
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
      { quoted: m }
    )

    await bad.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error(e)
    await bad.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    reply('⚠️ Error while processing the request')
  }
}
break
