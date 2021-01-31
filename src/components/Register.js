import React,{useContext} from 'react'
import authContext from '../contexts/authContext'
import {FaUser,FaLock,FaPhone, FaEnvelope} from 'react-icons/fa'
import './style/form.scss'

export default function Register() {

    const handleSubmite = (e)=>{
        e.preventDefault();
        let fields = {
            username : {
                value: null,
                validator: /^([A-aZ-z][A-zZ-z0-9]{3,63}$)/,
                error: null,
            },
            email:{
                value: null,
                validator: /^[A-zZ-z0-9]{1,64}@[A-zZ-z0-9]{1,64}\.[A-zZ-z0-9]{1,3}$/,
                error: null,
            },
            phone: {
                value: null,
                validator: /^(0||\+213)\-?[567](\-?[0-9]){8}$/,
                error: null,
            },password: {
                value: null,
                validator: /^.{8,64}$/,
                error: null,
            },
            passwordc: {
                value:null,
                validator: /^.{8,64}$/,
                error: null,
            },
        }
        e.target.querySelectorAll(".form-field input").forEach((p)=>{

            for (var i in fields) {
                if(i==p.name){
                    if(fields[i].validator.test(p.value)){
                        fields[i].value = p.value;
                        p.setAttribute("error","false");
                        p.parentElement.parentElement.parentElement.querySelector(".error-field").setAttribute("show","false");
                    }
                    else{
                        fields[i].error = "error";
                        p.setAttribute("error","true");
                        let erl = p.parentElement.parentElement.parentElement.querySelector(".error-field")
                        erl.innerText = "error";
                        erl.setAttribute("show","true");
                    }
                }
            }
         
        });
    } 
    const handleFocus = (e)=>{
        e.preventDefault();
        if(e.target.tagName=="INPUT"){
            e.target.nextSibling?.setAttribute("active","true");
        }
    } 
    const handleBlur = (e)=>{
        e.preventDefault();
        if(e.target.tagName=="INPUT"){
            e.target.nextSibling?.setAttribute("active","false");
        }
    } 
    const handleChange = (e)=>{
        e.preventDefault();
        if(e.target.value != "")
            e.target.nextSibling?.setAttribute("lock","true");
        else
            e.target.nextSibling?.setAttribute("lock","false");
        
    } 
    const [state,setState] = useContext(authContext);

    return (
        <div>
            <form className="form" onBlurCapture={handleBlur} onFocusCapture={handleFocus} onSubmitCapture={handleSubmite} onChangeCapture={handleChange} action="/">
                <div className="form-div">
                    <div className="form-field">
                        <label htmlFor="un"><FaUser/></label>
                        <div className="input-field">
                            <input type="text" id="un" name="username" placeholder=""/>
                            <div className="placeholder">Username</div>
                        </div>
                    </div>
                    <div className="error-field"></div>
                </div>
                <div className="form-div">
                    <div className="form-field">
                        <label htmlFor="em"><FaEnvelope/></label>
                        <div className="input-field">
                            <input type="text" id="em" name="email" placeholder=""/>
                            <div className="placeholder">Email</div>
                        </div>
                    </div>
                    <div className="error-field"></div>
                </div>
                <div className="form-div">
                    <div className="form-field">
                        <label htmlFor="pn"><FaPhone/></label>
                        <div className="input-field">
                            <input type="text" id="pn" name="phone" placeholder=""/>
                            <div className="placeholder">Phone Number</div>
                        </div>
                    </div>
                    <div className="error-field"></div>
                </div>
                <div className="form-div">
                    <div className="form-field">
                        <label htmlFor="ps"><FaLock/></label>
                        <div className="input-field">
                            <input type="password" id="ps" name="password" placeholder=""/>
                            <div className="placeholder">Password</div>
                        </div>
                    </div>
                    <div className="error-field"></div>
                </div>
                <div className="form-div">
                    <div className="form-field">
                        <label htmlFor="pc"><FaLock/></label>
                        <div className="input-field">
                            <input type="password" id="pc" name="passwordc" placeholder=""/>
                            <div className="placeholder">Confirme Password</div>
                        </div>
                    </div>
                    <div className="error-field"></div>
                </div>
                <div className="form-button">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    )
}
