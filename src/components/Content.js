import React,{useContext} from 'react'
import {Route,Switch,useHistory} from 'react-router-dom';
import authContext from '../contexts/authContext'
import './style/content.scss'
import Annonces from './Annonces'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import About from './About'


const Content = ()=>{
    const [state,setState] = useContext(authContext);
    const history = useHistory();
    
    return (
        <div className="content">
            <Switch>
                <Route path={/^\/([hH]ome)?$/}>
                    {state.isAuth ? <Annonces/> : <Landing/>}
                </Route>
                <Route path={/^\/[Aa]bout$/}>
                    <About/>
                </Route>
                <Route path={/^\/[rR]egister$/}>
                    {state.isAuth ?  <>{history.replace("/")}</> : <Register/> }
                </Route>
                <Route path={/^\/[Ll]ogin$/}>
                    {state.isAuth ?  <>{history.replace("/")}</> : <Login/> }
                </Route>
                <Route path={/^\/[Ll]ogout$/}>
                    <Logout/>
                </Route>
                <Route path={/[\s\S]*/}>
                    <div className="">Not Found !</div>
                </Route>
            </Switch>
        </div>
    );

}



export default Content