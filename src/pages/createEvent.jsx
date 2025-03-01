import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const CreateEvent = ()=>{
    const [formData,setFormData] = useState({name:"",date:"",location:"",description:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        let token = localStorage.getItem("token");
        let user = jwtDecode(token);
        console.log(`In create Event:-${user}`);
        axios.post("https://event-manager-backend-3l2j.onrender.com/api/events",formData,{headers:{"Auth":user.id}})
        .then(()=>
            {   
                console.log("EVENTS ADDED BRO SUCCESSFULLY");
                navigate("/")
            }
        )
        .catch(()=>alert("Error creating event"))
    };


    return(
        <div className="container mt-4">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Event Name" required className="form-control my-2" onChange={handleChange}></input>
                <input name="date" type="date" required className="form-control my-2" onChange={handleChange}></input>
                <input name="location" type="text" placeholder="Location" required className="form-control my-2" onChange={handleChange}></input>
                <input name="description" type="text" placeholder="Description" required className="form-control my-2" onChange={handleChange}></input>
                <button className="btn btn-primary" type="submit">Create Event</button>
            </form>
        </div>
    )
}

export default CreateEvent;