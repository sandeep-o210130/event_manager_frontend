import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ()=>{
    const [formData,setFormData] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("https://event-manager-backend-3l2j.onrender.com/api/auth/login",formData)
        .then((res)=>{
            localStorage.setItem("token",res.data.token);
            navigate("/");
        })
        .catch(()=>alert("Invalid Credentials"));
    };

    return(
        <div className="container mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" onChange={handleChange} type="email" placeholder="Email" required className="form-control my-2"></input>
                <input name="password" onChange={handleChange} type="password" placeholder="Password" className="form-control my-2" required></input>
                <button className="btn btn-success">Login</button>
            </form>
        </div>
    )
}

export default Login;