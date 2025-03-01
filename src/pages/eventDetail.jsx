import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const EventDetail = ()=>{
    const Navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();
    console.log(id);
    const [event,setEvent] = useState(null);

    useEffect(()=>{
        axios.get(`https://event-manager-backend-3l2j.onrender.com/api/events/${id}`).then((res)=>{
            setEvent(res.data);
        })
    },[id]);

    const registerForEvent = ()=>{
        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login to register for the event");
            return;
        }
        console.log(`details:-${location.state.id}`);
        console.log(location.state.id);
        axios.post(`https://event-manager-backend-3l2j.onrender.com/api/events/${id}`,{},{headers:{"Auth":`${location.state.id}`}})
        .then(()=>{
            alert("registered successfully");
        })
        .catch(()=>{
            alert("Not registered");
        })

        Navigate("/dashboard");
    };

    const editted = ()=>{
        Navigate(`/edit/${id}`,{state:{id:location.state.id}})
    }

    return event ? (
        <div className="container mt-4">
            <h2>{event.name}</h2>
            <p>{event.date}  | {event.location}</p>
            <p>{event.description}</p>

            <button className="btn btn-success" onClick={registerForEvent}>Register</button> &nbsp; &nbsp;

            <button className="btn btn-danger" onClick={editted}>Edit</button>
        </div>
    ) : <p>loading...</p>;
};

export default EventDetail;