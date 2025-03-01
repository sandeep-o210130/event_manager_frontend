import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = ()=>{
    const [formData,setFormData] = useState({name:"",email:"",password:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("You are in submitting stage");
        axios.post("https://event-manager-backend-3l2j.onrender.com/api/auth/register",formData)
        .then(()=>
            {
                console.log("OK REGISTERED SUCCESSFULLY");
                navigate("/login")
            }
            )
        .catch((err)=>
            {
                alert("User Exists try with another mail")
                navigate("/register")
            }
            )
            
    }

    return(
        <div className="container mt-4">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Name" className="form-control my-2" required onChange={handleChange}></input>
                <input name="email" type="email" placeholder="Email" required className="form-control my-2" onChange={handleChange}></input>
                <input name="password" type="password" placeholder="Password" required className="form-control my-2" onChange={handleChange}></input>
                <button className="btn btn-success">Register</button>
            </form>
        </div>
    )
}

export default Register