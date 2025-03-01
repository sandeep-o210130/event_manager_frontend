import {Link,useNavigate} from "react-router-dom";

const Navabar = ()=>{
    const token = localStorage.getItem("token");
    const Navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem("token");
        Navigate("/login");

    };

    return(
        <nav className="navbar navbar-dark bg-dark px-4">
            <Link to="/" className="navbar-brand">Campus Events</Link>
            <div>
                {!token ?(
                    <>
                        <Link to="/login" className="btn btn-outline-light mx-2">Login</Link>
                        <Link to="/register" className="btn btn-outline-light">Register</Link>
                    </>
                ):(
                    <>
                    <Link to="/dashboard" className="btn btn-outline-light mx-2">DashBoard</Link>
                    <Link to="/createEvent" className="btn btn-outline-light mx-2">Create Event</Link>
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                    </>
                )
                }
            </div>
        </nav>
    )
}

export default Navabar;