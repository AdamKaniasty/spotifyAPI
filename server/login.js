const { default: axios } = require('axios');
const express = require('express');
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['user-read-private', 'user-read-email'],
    redirectUri = 'http://localhost:3000/user',
    state = 7096234460271344,
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
    console.log(req.body)

    res.end()
})
module.exports = router