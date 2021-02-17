import React,{useEffect} from 'react'
import Navbar from './components/Navbar'
import Content from './components/Content'
import BottomBanner from './components/BottomBanner'
import {BrowserRouter as Router } from 'react-router-dom'
import {AuthStore} from './contexts/authContext'
import './components/style/app.scss'
import img from './bgbg.jpg'

const App = ()=>{

  useEffect(()=>{

        window.onscroll = window.onscroll || function (e){
            document.querySelectorAll(".links-dropdownbutton").forEach(p=>p.setAttribute("focus","false"));
            let el = document.getElementsByClassName("navbar-sticky")[0];
            let d = el.getAttribute("down");
            let bias = parseInt(getComputedStyle(el.parentElement).fontSize.split(/[a-zA-Z]/)[0]);
            if(window.scrollY > (el.offsetHeight-0.5*bias)){
                if(d != "true")
                    el.setAttribute("down","true");
            }else{
                if(d != "false")
                el.setAttribute("down","false");
            }
        };
    
  

        window.onclick = window.onclick || function (e){
            var el = e.target;
            var t = false; 
            do{
            el = el.parentElement;
            el?.classList.forEach(c=>{ 
            if(c=="links-dropdownbutton") {
                t = true;
            }
            });
            }while(el && el.tagName != "BODY" && t!=true);
            if(t)
            el.setAttribute("focus",el.getAttribute("focus")=="true" ? "false" : "true");
            else
            document.querySelectorAll(".links-dropdownbutton").forEach(p=>p.setAttribute("focus","false"));
            };
    
    },[]);    
    
    return (
        <AuthStore>
            <Router>
                <div style={{backgroundImage:"url("+img+")",backgroundSize:"100% auto",width:"100vw",backgroundRepeat:"no-repeat",height:"100vh",position:"absolute",top:"0",zIndex:"-2"}}>
                    <div style={{backgroundColor:"#0069A380" ,zIndex:"-1" ,width:"100%",height:"100%"}} />
                </div>
                <Navbar/>
                <Content/>
                <BottomBanner/>
            </Router>
        </AuthStore>
    );

}



export default App
