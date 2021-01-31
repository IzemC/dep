import React,{useEffect} from 'react'
import Navbar from './components/Navbar'
import Content from './components/Content'
import BottomBanner from './components/BottomBanner'
import {BrowserRouter as Router } from 'react-router-dom'
import {AuthStore} from './contexts/authContext'
import './style/app.scss'

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
        <Navbar/>
        <Content/>
        <BottomBanner/>
        </Router>
        </AuthStore>
    );

}



export default App
