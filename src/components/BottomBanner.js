import React from 'react'
import {FaTwitter , FaLinkedin, FaPhone, FaEnvelope} from 'react-icons/fa';
import './style/bottombanner.scss'
const BottomBanner = ()=>{

    return (
    <div className="footer">
        <div className="contact">
            <div className="contact-title"> Contact </div>
            <br/>
            <div className="contact-info"> <span><FaPhone/></span> +213 (0) 666777333</div> 
            <br/>
            <div className="contact-info"><span><FaEnvelope/></span> services@gmail.com</div>
        </div> 
        <div className="follow-us" >
            <FaTwitter className="follow-logo"/> <FaLinkedin className="follow-logo"/>
        </div>
        <div className=""></div>
    </div>
    );

}


export default BottomBanner