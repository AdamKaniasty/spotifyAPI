var SpotifyWebApi = require('spotify-web-api-node');
var Playlist = require("../../server/playlist")

const clientId = 'd712b0c67ca6471ead4e8b2287c6e8a9'
const clientSecret = 'e4a6089244fb46bd912baeceb42bad99'

const Main = async ()=>{

  var scopes = ['user-read-private', 'user-read-email']
  var state = 61274329387644426387996723
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: "https://example.com/callback",
  });

  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);  
  spotifyApi.setAccessToken(code)

  const playlistId = '2MUuswyN770ANJf5ZUY6wq'
  
}

Main()