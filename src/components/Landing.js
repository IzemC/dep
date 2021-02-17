import React,{useState} from 'react'
import states from '../states'
import './style/landing.scss'
import { FaArrowDown } from 'react-icons/fa';

export default function Landing() {

    const [isDropdown,setDropdown] = useState(false);
    const [state,setState] = useState(states[Object.keys(states)[Math.round(Math.random()*49)]].name);
    const toggleDropdown = ()=>{
        setDropdown(!isDropdown);
        console.log(isDropdown);
    }
    return (
        <div className="landing">
            <div className="heading-title">
                Rah Wa9t...
            </div>
            <div className="heading-body">
                365Tenders provides ......
            </div>
            <div className="landing-big-button">
                <div className="text">
                    Explore tenders in
                </div>
                <button onClick={toggleDropdown}>
                    {state} <FaArrowDown/>
                    <div className="dropdown" show={isDropdown ?  "true" : "false"}>
                    {
                        Object.keys(states).map((s)=>{
                            return <div className="dropdown-div" onClick={()=>{setState(states[s].name)}}>{states[s].name}</div>
                        })
                    }
                </div>
                </button>

            </div>
        </div>
    )
}
