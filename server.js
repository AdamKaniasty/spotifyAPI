var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000; 

const clientId = 'd712b0c67ca6471ead4e8b2287c6e8a9'
const clientSecret = 'e4a6089244fb46bd912baeceb42bad99'
app.use(bodyParser.json());
app.listen(port); 

const login = require('./server/login')
app.use(login)







