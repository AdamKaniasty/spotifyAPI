import "./Modal.scss"
import axios from "axios"
import editButton from "../../assets/edit.png"
import {useState, useEffect} from "react"
export default function Modal(props){
    const src = props.playlist.images[0].url
    const [clicked,setClicked] = useState(false)
    const [tracklist,setTracklist] = useState(null)
    useEffect(()=>{
        axios.post("./getTracksOnPlaylist",props.playlist).then((res)=>{
            setTracklist(res.data)
        })
    },[props.playlist.id])

    
    return(
        <div className="playlist" onClick={()=>setClicked(!clicked)}>
            <img src={src} alt="img"/>
            {!clicked ? <div className="glass"/>:<div className="glassMore"/>}
            {!clicked && <h1>{props.playlist.name}</h1>}
            {clicked && <ol>{tracklist.slice(0,25).map((track,index)=>{
                let trackName = track;
                if(trackName.length > 15){
                    trackName = trackName.substring(0,17) + "..."
                }
                return(
                    <li key={index} className="trackName">{index+1 +". "+ trackName}</li>
                )
            })}
            {tracklist.length - 9 > 0 && <li style={{alignSelf:"center",color:"#e8efef"}}>{tracklist.length - 9} more...</li>}
            </ol>}
            {clicked && <img src={editButton} alt="edit" className="edit"/>}
            
            
        </div>
    )
}