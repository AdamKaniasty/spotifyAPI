import "./Modal.scss"
import {useState,useEffect} from "react"
import axios from "axios"
import hexRgb from 'hex-rgb';
import { ColorExtractor } from 'react-color-extractor'
export default function Modal (props){
    const [type,setType] = useState(props.type)
    const [id,setId] = useState(props.item)
    const [item,setItem] = useState(null)
    const [loading,setLoading] = useState(false)
    const [colors,setColors] = useState(null)
    const [history,setHistory] = useState([])
    const [curr,setCurr] = useState(1)

    const colorHandle = (colors)=>{
        const rgb = colors.map(x => hexRgb(x))
        let r=0,g=0,b=0;
        let x = rgb.length
        for(let i=0; i<x; i++){
            r += rgb[i].red
            g += rgb[i].green
            b += rgb[i].blue
        }
        setColors(Math.round(r/x) + "," + Math.round(g/x) + "," + Math.round(b/x))
    }
    const pushToHistory = (id,type)=>{
        if(id !== null && type !== null){
            if(history === null) 
            setHistory({id:id,type:type})
            else{
                let newHistory = history
                newHistory.push({id:id,type:type})
                setHistory(newHistory)
            }
        }
    }

    const switchToAlbum = (id) => {
        setLoading(true)
        setType(1);
        setId(id);
    }


    function msToTime(ms) {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        
    }

    useEffect(()=>{
        setItem(null)
        setId(props.item)
        setType(props.type)
    },[props.item])

    useEffect(async () =>{
        console.log("Current id: " + id + " of type: " + type)
        setLoading(true)
        pushToHistory(id,type)
        if(type === 0){
            const res = await axios.post("/getTrack",{"id":id})
            setItem(res.data)
        }
        else if(type === 1){
            const res = await axios.post("/getAlbum",{"id":id})
            console.log(res.data.body)
            setItem(res.data.body)
        }
        setLoading(false)

    },[id,type])
    return(
        <div className="DisplayModal" style={(colors && item) ? {background:`linear-gradient(180deg, rgb(${colors}) 0%, rgba(18,18,18,0) 100%)`}:null}>
            <div className="History">
                <button onClick={()=>console.log(history)}>History</button>
                <button onClick={()=>console.log(item)}>Item</button>
            </div>
            {(type === 0 && item && !loading) && <div className="track">
                <ColorExtractor getColors={(colors)=>colorHandle(colors)}>
                    <img src={item.data.album.images[0].url} alt="cover"/>
                </ColorExtractor>
                <h1>{item.data.name}</h1>
                    <div className="line"/>
                    <div className="artists" >
                        <h2>Artists</h2>
                        {item.data.artists.map((artist,index) => (
                                <h3 key={index}>{artist.name}</h3>   
                        ))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                       <h2>Album</h2>
                       <h3 onClick={()=>switchToAlbum(item.data.album.id)}>{item.data.album.name}</h3>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                       <h2>Duration</h2>
                       <h3>{msToTime(item.data.duration_ms)}</h3>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                       <h2>Realeased on:</h2>
                       <h3>{item.data.album.release_date}</h3>
                    </div>
            </div>}
            {(type === 1 && item && !loading) && <div className="album">
                <ColorExtractor getColors={(colors)=>colorHandle(colors)}>
                    <img src={item.images[0].url} alt="cover"/>
                </ColorExtractor>
                <h1>{item.name}</h1>
                <div className="line"/>
                <div className="infoWrapper">
                    <div className="artists" >
                        <h2>Artists</h2>
                        {item.artists.map((artist,index) => (
                            <h3 key={index}>{artist.name}</h3>   
                        ))}
                    </div>
                    <div className="vLine"/>
                    <div style={{display:"flex",flexDirection:"column"}}>
                       <h2>Realeased on:</h2>
                       <h3>{item.release_date}</h3>
                    </div>
                    <div className="vLine"/>
                    <div style={{display:"flex",flexDirection:"column"}}>
                       <h2>Total tracks:</h2>
                       <h3>{item.total_tracks}</h3>
                    </div>
                </div>
                <div className="tracks" style={item.tracks.items.length > 4 ? {overflowY:"auto"}:{overflowY:"hidden"}}>
                        {item.tracks.items.map((track,index)=>{
                            console.log(track)
                        return(
                            <div>
                                <div key={index} className="track">
                                    <span>{index + 1}</span>
                                    <div className="names">
                                        <span>{track.name.length < 36 ? track.name:track.name.slice(0,32)+"..."}</span>
                                        <span>{track.artists.map(artist => {return artist.name +" "})}</span>
                                    </div>
                                    <span className="time">{msToTime(track.duration_ms)}</span>
                                </div>
                            </div>
                        )
                        })}
                    </div>





            </div>}
            {loading && <div className="loading">
                <h1>...</h1>
            </div>}
        </div>
    )
}