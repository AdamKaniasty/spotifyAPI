const express = require('express');
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const axios = require('axios');
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

router.post('/getTrack',async (req, res) => {
    const id = req.body.id
    const track = await spotifyApi.getAudioFeaturesForTrack(id)
    fs.readFile("server/_token.txt", "utf8", (err, data) => {
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + data
          }
      
        axios.get(`https://api.spotify.com/v1/tracks/${id}`,{headers: headers})
            .then((resp)=>res.send({data:resp.data,features:track.body}))
    
    })
})




module.exports = router