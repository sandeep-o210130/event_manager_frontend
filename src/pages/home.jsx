import { useEffect,useState } from "react";

import axios from "axios";

import {Link} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = ()=>{
    const [events,setEvents] = useState([]);
    const [user,setUser] = useState(null);
    useEffect(()=>{
        try{
            const token = localStorage.getItem("token");
            const user = jwtDecode(token);
            console.log(user);
            setUser(user);
            axios.get("https://event-manager-backend-3l2j.onrender.com/api/events").then((res)=>{
                setEvents(res.data);
            });
        }
        catch(err){
            console.log("error bro because token was not set");
        }
    },[]);

    return ( user ?
        (<div className="container mt-4">
            <h2>Upcoming Events</h2>
            <div className="row">
                {events.map((event)=>(
                    <div className="col-md-4" key={event._id}>
                        <div className="card my-3 p-3">
                            <h5>{event.name}</h5>
                            <p>{event.date} | {event.location}</p>
                            <Link to={`/event/${event._id}`} state={user} className="btn btn-primary">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>) : (<p className="py-3 px-3">First Login or Register</p>)
    )
}

export default Home;