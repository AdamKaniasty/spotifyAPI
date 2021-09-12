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

router.get("/getUser",async (req,res) =>{
    const user = await spotifyApi.getMe()
    const playlists = await spotifyApi.getUserPlaylists(user.body.id)
    res.send({
        user:user.body,
        playlists: playlists.body
    })
})
router.get("/playing",async (req,res)=>{
    const song = await spotifyApi.getMyCurrentPlayingTrack()
    res.send({
        song: song.body.item
    })
})

module.exports = router