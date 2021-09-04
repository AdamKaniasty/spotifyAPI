import {useEffect, useState} from "react";
import {useLocation,Redirect} from "react-router-dom"
import axios from "axios"
export default function User (){
    const location = useLocation()
    const [token,setToken] = useState(null)

    useEffect(()=>{
        const hash = location.hash.split(/=|&/)
        const token = {
            "token":hash[1],
            "token_type":hash[3],
            "exp":hash[5]
        }
        axios.post("/saveToken",{token:token}).then((res)=>setToken(token))

    },[location])
    


    return(
        <div className="user">
           {!token && <h1>Loading...</h1>}
            {token && <Redirect to="/dashboard" />}
        </div>
    )
}