var Transformers = require('./transformers')

getPlaylistTracks = async (id,spotify)=>{
    const playlist = await spotify.getPlaylist(id)
    const items =  playlist.body.tracks.items
    return await items.map( track => {
        return {
            artists: Transformers.Artists(track.track.artists),
        }
    })
}

class Playlist{
    constructor(id,spotify){
        this._id = id
        this.spotify = spotify
        this.tracks = getPlaylistTracks(this._id,this.spotify)
    }

    
}


module.exports.Playlist = Playlist