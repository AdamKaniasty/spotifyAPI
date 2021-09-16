const express = require('express');
const router = express.Router()
const fs = require('fs');
var SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['user-read-private', 'user-read-email','playlist-read-private',
                'playlist-modify-private','playlist-read-collaborative'],
    redirectUri = 'http://localhost:3000/user',
    state = Math.round(Math.random()*(3974697236472-5365342534)+5365342534),
    clientId = 'd712b0c67ca6471ead4e8b2287c6e8a9',
    showDialog = false,
    responseType = 'token';


router.get('/getLoginUrl',(req, res) => {
    var spotifyApi = new SpotifyWebApi({
        redirectUri: redirectUri,
        clientId: clientId
      });
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state,showDialog,responseType);
    res.send(authorizeURL)
})
router.post('/saveToken',(req, res) => {
    const token = req.body.token
    fs.writeFile("server/_token.txt",token.token,"utf-8",(err)=>{
        if(err) console.log(err)
    })
    res.end()
})
module.exports = router