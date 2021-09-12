import "./Modal.scss"
import axios from "axios"
import { FaArrowRight } from "react-icons/fa"
import {useState, useEffect} from "react"
import {useHistory } from "react-router-dom";
export default function Modal(props){
    const src = props.playlist.images[0].url
    const [clicked,setClicked] = useState(false)
    const [tracklist,setTracklist] = useState(null)

    const history = useHistory()

    useEffect(()=>{
        axios.post("/getTracksOnPlaylist",props.playlist).then((res)=>{
            setTracklist(res.data)
        })
    },[props.playlist])

    
    const handleEdit = (id) =>{
        let path = `/dashboard/${id}`
        history.push(path)
    }

    return(
        <div className="playlist" onClick={()=>setClicked(!clicked)}>
            <img src={src} alt="img"/>
            {!clicked ? <div className="glass"/>:<div className="glassMore"/>}
            {!clicked && <h1>{props.playlist.name}</h1>}
            {clicked && <ol>{tracklist.slice(0,25).map((track,index)=>{
                let trackName = track;
                if(trackName.length > 18){
                    trackName = trackName.substring(0,15) + "..."
                }
                return(
                    <li key={index} className="trackName">{index+1 +". "+ trackName}</li>
                )
            })}
            {tracklist.length - 25 > 0 && <li style={{alignSelf:"center",color:"#e8efef"}}>{tracklist.length - 25} more...</li>}
            </ol>}
            {clicked && <div className="edit" onClick={()=>handleEdit(props.playlist.id)}><FaArrowRight/></div>}
            
            
        </div>
    )
}