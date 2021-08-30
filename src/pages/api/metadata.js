const axios = require('axios')
const { isMinted, allowCors } = require('../../utils/utils')

const handler = async (req, res) => {
    try {
        const fullUrl = `https://${req.headers.host}`
        const tokenId = req.query.id

        const minted = await isMinted(tokenId)
        if (!minted) return res.status(400).json({ error: 'This token has not been minted.' })

        const url = `http://ipfs.io/ipfs/QmNs1GRHxYkFxrESQ7vkgAnp4FZLUoHpCFgsr42966Z66M/${tokenId}`
        const { data } = await axios.get(url)
        data.image = `${fullUrl}/api/image?id=${tokenId}`
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'An error occurred.' })
    }
}

module.exports = allowCors(handler)
