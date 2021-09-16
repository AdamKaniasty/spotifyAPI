import "./Modal.scss"
import {useState,useEffect} from "react"
import axios from "axios"
import hexRgb from 'hex-rgb';
import {FaStopCircle,FaRegPlayCircle} from "react-icons/fa"
import { ColorExtractor } from 'react-color-extractor'
export default function Modal (props){
    
    const [itemType,setType] = useState(null)
    const [item,setItem] = useState(null)
    const [playing,setPlaying] = useState(false)
    const [audio,setAudio] = useState(null)
    const [analysis,setAnalysis] = useState(null)
    const [colors,setColors] = useState(null)
    const [history,setHistory] = useState(null)
    const [current,setCurrent] = useState(0)

    function msToTime(ms) {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        
    }
    
    useEffect(()=>{
        try{
            axios.post("/getFeaturesForTrack",{id:item.track.id})
                .then(res=>{
                    setAnalysis(res.data)
                })
        }
        catch(e){}
    },[props.item])

    useEffect(()=>{
        try{
            if(item.track.preview_url) setAudio(new Audio(item.track.preview_url))
        }
        catch(e){}
        return () => {
            setPlaying(false)
            try{
                audio.pause()
            }
            catch(e){}
        };
        
    },[item])
    const controlMusic = () =>{
        audio.volume = 0.2
        if(playing){ 
            audio.pause()
            setPlaying(!playing)
        }
        else{
            audio.play()
            setPlaying(!playing)
        }
    }
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

    return(
        <div className="DisplayModal" style={(colors && item) ? {background:`linear-gradient(180deg, rgb(${colors}) 0%, rgba(18,18,18,0) 100%)`}:null}>
            <div className="History">

            </div>
            {(item && item.track) && 
                <div className="track" >
                    <ColorExtractor getColors={(colors)=>colorHandle(colors)}>
                        <img src={item.track.album.images[0].url} alt="cover"/>
                    </ColorExtractor>
                    <h1>{item.track.name}</h1>
                    <div className="line"/>
                    <div className="artists" >
                        <h2>Artists</h2>
                        {item.track.artists.map((artist,index) => (
                                <h3 key={index}>{artist.name}</h3>   
                        ))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                       <h2>Album</h2>
                       <h3>{item.track.album.name}</h3>
                    </div>
                    <div style={{display:"flex",alignItems:"baseline"}}>
                       <h2>Duration</h2>
                       <h3>{msToTime(item.track.duration_ms)}</h3>
                    </div>
                    <div style={{display:"flex",alignItems:"baseline"}}>
                       <h2>Realeased on:</h2>
                       <h3>{item.track.album.release_date}</h3>
                    </div>

                    {(audio && playing) && 
                        
                        <FaStopCircle onClick={()=>controlMusic()} id="controls"/>
                    }
                    {(audio && !playing) && 
                        <FaRegPlayCircle onClick={()=>controlMusic()} id="controls"/>
                    }

                </div>
            }
            {(item && item.album) && 
                <div className="track" >
                    <ColorExtractor getColors={(colors)=>colorHandle(colors)}>
                        {/* <img src={item.track.album.images[0].url} alt="cover"/> */}
                    </ColorExtractor>
                    {/* <h1>{item.track.name}</h1> */}
                    <div className="line"/>
                </div>
            }
            {!item && <h1 className="help">Click a track</h1>}
        </div>
            
    )
}