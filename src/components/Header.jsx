import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-blue-400 text-white p-4 flex justify-between items-center shadow-md">
            <h5 className="text-xl font-bold">React Job Board</h5>
            <nav className="flex gap-4 items-center">
                <Link to="/" className="hover:underline text-white">Home</Link>

                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <Link to="/dashboard" className="hover:underline text-white">Dashboard</Link>
                        ) : (
                            <Link to="/jobs" className="hover:underline text-white">Jobs</Link>
                        )}
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded font-semibold hover:bg-gray-100">
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
