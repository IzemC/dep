import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
import authContext from '../contexts/authContext'
import {FaBars, FaHeadphonesAlt, FaMicrophoneAltSlash} from 'react-icons/fa'
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
            {state.isAuth ? <></>:<Link to="/">PRODUCT</Link>}
            {state.isAuth ? <></>:<Link to="/">PRICING</Link>}
            <Link to="/">TENDERS</Link>
            {state.isAuth ? <><Link to="/logout">LOG OUT</Link><Link to="/dashboard">DASHBOARD</Link></> : <><Link to="/login">LOG IN</Link><Link to="/register" className="sign-up">SIGN UP</Link></>}
            <Link to="/" className="contact-num"> <FaHeadphonesAlt/>+213999999999</Link>
            <Link to="/about">CONTACT</Link>
        </div>
        <div className="links-dropdownbutton" focus="false">
        <FaBars/>
        <div className="dropdown-menu">
            {state.isAuth ? <></>:<Link to="/">PRODUCT</Link>}
            {state.isAuth ? <></> :<Link to="/">PRICING</Link>}
            <Link to="/">TENDERS</Link>
            {state.isAuth ? <><Link to="/logout">LOG OUT</Link> <Link to="/dashboard">DASHBOARD</Link></>: <><Link to="/login">LOG IN</Link><Link to="/register" className="sign-up">SIGN UP</Link></>}
            <Link to="/" className="contact-num"> <FaHeadphonesAlt/>+213999999999</Link>
            <Link to="/about">CONTACT</Link>
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