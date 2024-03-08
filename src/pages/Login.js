import React from "react"
import Sidebar from '../components/navbar/Sidebar'
import '../index.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userStore } from "../stores/UserStore"
import Footer from '../components/footer/footer';



function Login(){
    const updateName = userStore((state) => state.updateName);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values,[name]:value}))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(inputs);
        updateName(inputs.username);
        navigate('/Home', {replace: true})
    }

    return(
        <div className="Login" id="profile-outer-container">
            <div className="page-wrap" id="login-page-wrap"> 
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter your username:
                        <input type="text" 
                        name="username" 
                        defaultValue={inputs.username || ""}
                        onChange={handleChange}
                        />
                    </label>

                    <label>Enter your password:
                    <input type="text" 
                        name="password" 
                        defaultValue={inputs.password || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <input type="submit" value="login"/>

                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login