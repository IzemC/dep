import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
import authContext from '../contexts/authContext'
import {FaBars} from 'react-icons/fa'
import './style/navbar.scss'


const Logo = ()=>{

    return (
        <div className="logo">
            loGo
        </div>
    );

} 

const Links = ()=>{
    const [state,setState]= useContext(authContext)
    return (
    <>
        <div className="links">
            <Link to="/">Home</Link>
            {state.isAuth ? <><Link to="/logout">Logout</Link><Link to="/dashboard">Dashboard</Link></> : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
            <Link to="/about">About</Link>
        </div>
        <div className="links-dropdownbutton" focus="false">
        <FaBars/>
        <div className="dropdown-menu">
            <Link to="/">Home</Link>
            {state.isAuth ? <><Link to="/logout">Logout</Link> <Link to="/dashboard">Dashboard</Link></>: <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
            <Link to="/about">About</Link>
        </div>
        </div>
    </>
    );

} 






const Navbar = ()=>{


    return (
        <>
            <div className="navbar" down="false">
                <Logo/>
                <Links/>
            </div>
            <div className="navbar navbar-sticky" down="false">
                <Logo/>
                <Links/>
            </div>
        </>
    );

}



export default Navbar