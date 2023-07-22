import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getToken, getUserFromLocalStorage, removeUserFromLocalStorage} from "../../utils/Utils";


export function ProtectedRoute() {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const token = getToken()
        console.log(location.pathname.includes('login'))
        if(location.pathname.includes('login')){
            removeUserFromLocalStorage()
        } else if (!token) {
            navigate('/login' , {replace : true})
        } else {
            navigate(location.pathname)
        }
    }, [])
    return (<></>)
}


