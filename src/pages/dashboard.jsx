import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Dashboard = ()=>{
    const [user,setUser] = useState(null);
    const [events,setEvents] = useState([]);
    const navigate = useNavigate();

    const fetchEvents = ()=>{
        if(!user)
            return;

        axios.get("https://event-manager-backend-3l2j.onrender.com/api/events/dashboard",{headers:{"Auth":`${user.id}`}}).then((res)=>{
            console.log(user);
            console.log(res.data);
            setEvents(res.data);
        })
        .catch(()=>{
            console.log("Error bro");
        })
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            console.log("TOKEN NOT SET PROPERLY");
            navigate("/login");
            return;
        }
        console.log("TOKEN BRO:-",token);
            const decoded = jwtDecode(token);
            console.log(decoded);
            setUser(decoded);
    },[navigate]);


    useEffect(()=>{
        fetchEvents();
    },[user]);



    return user ? (
        <div className="container mt-4">
            <h2>Welcome To Campus Events:</h2>
            <h3>Your Registered Events</h3>
            <ul>
                {events.map((event)=>(
                    <li key={event._id}>{event.name} - {event.date}</li>
                ))}
            </ul>
        </div>
    )   : (<p>Loading ...</p>);
};

export default Dashboard;