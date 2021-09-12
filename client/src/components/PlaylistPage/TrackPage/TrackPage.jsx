import "./TrackPage.scss"
import {useState} from "react"
import Display from "../../DisplayModal/Modal"
function msToTime(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    
  }

export default function Page (props){

    const tracks = props.tracks.items
    const [selected,setSelected] = useState(null)

    const handleSelect = (index)=>{
        if (selected === null || selected !== index) setSelected(index)
        if (selected === index) setSelected(null)
    }

    return(
        <div className="TrackPage">
            <div className="tracks">
                {tracks.map((track,index)=>{
                    return(
                        <div>
                            <div key={index} className="track" onClick={()=>handleSelect(index)} 
                                style={selected === index ? {backgroundColor:"rgba(59, 57, 57, 0.8)"}:null}
                            >
                                <span>{index + 1}</span>
                                <img src={track.track.album.images[0].url} alt="cover"/>
                                <div className="names">
                                    <span>{track.track.name}</span>
                                    <span>{track.track.artists.map(artist => {return artist.name +" "})}</span>
                                </div>
                                <span className="time">{msToTime(track.track.duration_ms)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="suggested">
                <Display item={tracks[selected]}/>
            </div>
            
        </div>
    )
}