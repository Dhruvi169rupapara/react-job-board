import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';

function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* The Header will always appear at the top */}
            <Header />

            {/* The actual page content will be injected here */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
