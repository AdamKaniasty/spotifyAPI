import "./Page.scss"
import {useEffect,useState} from "react"
import axios from "axios"
import {useParams} from "react-router-dom";

import Tracks from "./TrackPage/TrackPage"
import Graphs from "./GraphPage/GraphPage"
import Info from  "./InfoPage/InfoPage"

export default function Page (){

    let {id} = useParams()
    const [playlist,setPlaylist] = useState(null)
    const [page,setPage] = useState(0)
    useEffect(()=>{
        axios.post("/getPlaylist",{id:id}).then((res)=>{
            setPlaylist(res.data)
        })
    },[id])
    
    return(
        <div className="PlaylistPage">
            {playlist && <div>
                <div className="title">
                    <img src={playlist.images[0].url} alt="cover"/>
                    <h1>{playlist.name}</h1>
                </div>
                <div className="navbar">
                    <div className="btn" onClick={()=>setPage(0)} id={page === 0 ? "selected" : null}>Tracks</div>
                    <div className="btn" onClick={()=>setPage(1)} id={page === 1 ? "selected" : null} >Graphs</div>
                    <div className="btn" onClick={()=>setPage(2)} id={page === 2 ? "selected" : null} >Info</div>

                </div>
                <div className="modalField">
                    {page === 0 && <Tracks tracks={playlist.tracks}/>}
                    {page === 1 && <Graphs/>}
                    {page === 2 && <Info/>}
                </div>
                
            
            </div>}
        </div>
    )
}