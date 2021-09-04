import {useEffect,useState} from "react"
import axios from "axios"
export default function Home (){

    const [code,setCode] = useState(null)

    useEffect(()=>{
        axios.get('/getLoginUrl')
            .then(res=>setCode(res.data))
            .catch(err=>{console.log(err)})
    },[])
    

    return(
        <div className="home">
            <h1>home</h1>
            {code && <a href={code}>login</a>}
        </div>
    )
}