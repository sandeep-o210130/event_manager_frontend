import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Edit = ()=>{
    const [formData,setFormData] = useState({name:"",date:"",location:"",description:""});
    const Navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    console.log(id);

    useEffect(()=>{
        axios.get(`https://event-manager-backend-3l2j.onrender.com/api/events/${id}`).then((res)=>{
            setFormData(res.data);
        })
        .catch(()=>{
            alert("failed to load event details");
        })
    },[id]);


    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);

        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login to edit for the event");
            return;
        }
        axios.put(`https://event-manager-backend-3l2j.onrender.com/api/events/edit/${id}`,formData,{headers:{"Auth":location.state.id}})
        .then(()=>{
            alert("edited successfully");
        })
        .catch(()=>{
            alert("You Are Not An Adminstrator");
        })

        Navigate("/");
    };
    
    

    return formData.name? (
        <div className="container mt-4">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" value={formData.name} required className="form-control my-2" onChange={handleChange}></input>
                <input name="date" type="date" value={formData.date} required className="form-control my-2" onChange={handleChange}></input>
                <input name="location" type="text" value={formData.location} required className="form-control my-2" onChange={handleChange}></input>
                <input name="description" type="text" value={formData.description} required className="form-control my-2" onChange={handleChange}></input>
                <button className="btn btn-success" type="submit">Edit</button>
            </form>
        </div>
    ) : (<p>loading...</p>);
};

export default Edit;