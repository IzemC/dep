import React,{useContext,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import authContext from '../contexts/authContext'

export default function Logout() {
    const history = useHistory();
    const [state,setState] = useContext(authContext);
    useEffect(() => {
             
        setState({isAuth:false})
 
    }, [])
    return (
        <>
            {history.replace("/")}
        </>
    )
}
