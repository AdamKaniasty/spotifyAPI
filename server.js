var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.listen(port); 

const login = require('./server/login')
app.use(login)

const user = require('./server/user')
app.use(user)

const playlist = require('./server/playlist')
app.use(playlist)

const track = require('./server/track')
app.use(track)

const album = require('./server/album')
app.use(album)
