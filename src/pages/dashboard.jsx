import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        if (!user) return;

        try {
            const res = await axios.get("https://event-manager-backend-3l2j.onrender.com/api/events/dashboard", {
                headers: { "Auth": `${user.id}` }
            });
            setEvents(res.data);
        } catch (error) {
            console.log("Error fetching events:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.log("Invalid token:", error);
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (user) fetchEvents();
    }, [user]);

    useEffect(() => {
        const interval = setInterval(fetchEvents, 2000);
        return () => clearInterval(interval);
    }, [user]);

    return user ? (
        <div className="container mt-4">
            <h2>Welcome To Campus Events:</h2>
            <h3>Your Registered Events</h3>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>{event.name} - {event.date}</li>
                ))}
            </ul>
        </div>
    ) : (<p>Loading ...</p>);
};

export default Dashboard;
