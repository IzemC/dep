import React,{createContext,useState} from 'react';

const authContext = createContext();


export const AuthStore = ({children})=>{

const [state,setState] = useState({isAuth: false});
return (
    <authContext.Provider value={[state,setState]}>{children}</authContext.Provider>
);

}

export default authContext