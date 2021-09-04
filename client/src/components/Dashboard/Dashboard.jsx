import "./Dashboard.scss"
import axios from "axios"
import {useEffect,useState} from "react"
import PlaylistItem from "../PlaylistItem/Modal"
export default function Dashboard (){
    const [user,setUser] = useState(null)
    useEffect(()=>{
        axios.get("/getUser").then((res)=>{
            setUser(res.data)
        })
    },[])

    return(
        <div className="dashboard">
            <div className="bg"/>
            <h1>Playlists</h1>
            <div className="playlists">
                {user && user.playlists.items.map((playlist,index)=>{
                    return(
                        <PlaylistItem key={index} playlist={playlist}/>
                    )
                })}
            </div>
        </div>
    )
}