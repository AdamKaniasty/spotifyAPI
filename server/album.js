const express = require('express');
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const clientId = 'd712b0c67ca6471ead4e8b2287c6e8a9'
const clientSecret = 'e4a6089244fb46bd912baeceb42bad99'

const spotifyApi =  new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: 'http://localhost:3000/dashboard'
})
fs.readFile("server/_token.txt", "utf8", (err, data) => {
    if(err){ 
        console.log(err)
        return
    }
    spotifyApi.setAccessToken(data);
})

router.post('/getAlbum',async (req, res) => {
    const id = req.body.id
    const album = await spotifyApi.getAlbum(id)
    res.send(album)
    
})




module.exports = router