
const transformArtist = (artists) => {
    return artists.map(artist =>{
        return {
            name: artist.name
        }
    })
     
}


module.exports.Artists = transformArtist