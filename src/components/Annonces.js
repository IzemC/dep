import React,{useEffect,useState} from 'react'
import {FaSearch,FaPlusCircle,FaMinusCircle,FaCalendar,FaMapMarkerAlt} from 'react-icons/fa'
import './style/annonces.scss'
import data from '../data'
import dataA from '../dataA'
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


function Annonces() {

    const _data = JSON.parse(data);   
    const regEx = /(:?<[\s\S]+?>|&[\s\S]+?;)/g;
    const [state,setState] = useState(null);
    const [query,setQuery] = useState("");
    const search = ()=>{
        let query = document.querySelector("#search-input").value;
        setQuery(query);
    }

    useEffect(async()=>{
        let res;
        try{
        res = await axios.get('/api/posts');
        }catch(e){
        setState(dataA);
        console.log(e);
        return;
        }
        setState(res.data);
    },[]);



    const clickHandler = (e)=>{
        let el = e.target.parentElement.parentElement;
        el?.setAttribute("show",el.getAttribute("show") == "true" ? "false" : "true");
    }


    return (
        <div className="annonces">
            <div className="search-zone">
                <input type="text" id="search-input"/>
                <button onClick={search} >
                    <FaSearch />
                </button>
            </div>
            <div className="header-container">
                <div className="header">
                    Annonces
                </div>
            </div>
            <div className="annonce-zone">
                <div className="filters">
                {_data.map(e=>{
                    return (
                    <div className="filter-type" key={e["key"]}> 
                        <div onClick={clickHandler} className="filter-cat"> 
                            <div className="title">
                                {e["title"]}
                            </div>
                            <FaPlusCircle className="plus"/> 
                            <FaMinusCircle className="minus"/> 
                        </div> 
                        <div className="filter-sub-cat" > {e["categories"].map(k=>{
                            return(
                                    <div value={k["value"]}>
                                    <div className="sub-title">{k["label"]}</div>
                                    
                                    {k["subs"].map(j=>{
                                        return (
                                            <div className="filter-check" value={j["value"]}>
                                        <input type="checkbox"></input>  {j["label"]}
                                            </div>
                                        );
                                    })}

                                    </div>
                            );
                        })}
                        </div>   
                    </div>

                    );

                    })}
                </div>
                {state ? <div className="cards">{state.map(s=>{  console.log(s.sectors);    return  (s.title.toLowerCase().includes(query.toLowerCase()) || s.client.toLowerCase().includes(query.toLowerCase()) || s.client.toLowerCase().includes(query.toLowerCase())|| s.location?.toLowerCase().includes(query.toLowerCase())  ||s.sectors.replaceAll(regEx,"").toLowerCase().includes(query.toLowerCase()) )  ? (
                    <div className="card">
                        <div className="card-head">
                            {s.title}
                        </div>
                        <div className="card-content">
                            <b>Client : </b>{s.client}<br/>
                            <br/>
                            <b>Secteur : </b>{s.sectors.replaceAll(regEx,"")}
                        </div>
                        <div className="card-footer">
                            <div className="o-date"><FaCalendar />{s.open ? s.open : "non Specifie"} </div>
                            <div className="c-date"><FaCalendar /> {s.close ? s.close : "non Specifie"}</div>
                            <div className="loc"><FaMapMarkerAlt />{s.location ? s.location : "non Specifie"}</div>
                        </div>
                    </div>): <></>}) }
                </div>: <div className="loader"><Loader type="Puff" color="#00BFFF" height={100} width={100}/></div>}
            </div> 
        </div>
    )
}


export default Annonces

