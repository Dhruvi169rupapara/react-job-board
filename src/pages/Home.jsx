import {useAuth} from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";

function Home() {
    const {user} = useAuth();

    console.log('Home page - user:', user);

    return (
        <div className={'p-20'}>
            <h1>Home Page (Public)</h1>
            <p>Anyone can see this page.</p>
            <Link to={'/login'}>Go to Login</Link>
        </div>
    );
}

export default Home;
