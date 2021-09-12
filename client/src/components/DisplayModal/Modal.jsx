import "./Modal.scss"
import {useState,useEffect} from "react"
import {FaStopCircle,FaRegPlayCircle} from "react-icons/fa"
export default function Modal (props){
    
    const [item,setItem] = useState(null)
    const [playing,setPlaying] = useState(false)
    const [audio,setAudio] = useState(null)
    useEffect(()=>{
        try{
            setItem(props.item)
        }
        catch(e){}
    },[props.item])

    useEffect(()=>{
        try{
            if(item.track.preview_url) setAudio(new Audio(item.track.preview_url))
        }
        catch(e){}
        
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
    console.log(item)

    

    return(
        <div className="DisplayModal">
            <div className="History">

            </div>
            {(item && item.track) && 
                <div className="track">
                    <img src={item.track.album.images[0].url} alt="cover"/>
                    <h1>{item.track.name}</h1>
                    <div className="line"/>
                    <div className="artists" style={{marginBottom:"2vh"}}>
                        <h2>Artists</h2>
                        {item.track.artists.map((artist,index) => (
                                <h3 key={index}>{artist.name}</h3>   
                        ))}
                    </div>
                    <h2>Album</h2>
                    <h3>{item.track.album.name}</h3>
                    {(audio && playing) && 
                        
                        <FaStopCircle onClick={()=>controlMusic()} id="controls"/>
                    }
                    {(audio && !playing) && 
                        <FaRegPlayCircle onClick={()=>controlMusic()} id="controls"/>
                    }

                </div>
            }
        </div>
            
    )
}