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

router.post("/getTracksOnPlaylist", async (req,res) =>{
    const id = req.body.id
    const tracks = await spotifyApi.getPlaylist(id)

    const tracklist = tracks.body.tracks.items.map(track=>{
        return track.track.name
    })
   
    res.send(tracklist)
})

router.post("/getPlaylist", async (req,res) =>{
    const id = req.body.id
    const data = await spotifyApi.getPlaylist(id)   
    res.send(data.body)
})
module.exports = router