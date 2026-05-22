import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request Interceptor: Automatically attach the Auth token to every outgoing request
axiosInstance.interceptors.request.use(
    (config) => {
        // Dynamically get the latest user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                // If your backend uses JWT tokens under user.token or user.tokenName
                const token = user?.token;

                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error parsing user credentials from localStorage:', error);
            }
        }
        return config;
    },
    (error) => {
        // Handle request configuration errors
        return Promise.reject(error);
    }
);

// Response Interceptor: Globally handle API responses and common HTTP errors
axiosInstance.interceptors.response.use(
    (response) => {
        // Return response directly if successful
        return response;
    },
    (error) => {
        // Handle various HTTP error status codes
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized: Token has expired or is invalid
                    console.warn('Session expired. Redirecting to login...');

                    // 1. Clear session details
                    localStorage.removeItem('user');

                    // 2. Redirect the user to login page
                    // We use window.location.href to force a page reload and clean state
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login?expired=true';
                    }
                    break;

                case 403:
                    // Forbidden: Authenticated user but lacks permissions
                    console.error('Access Denied: You do not have permissions to perform this action.');
                    break;

                case 404:
                    // Not Found: Endpoint or resource does not exist
                    console.error('Resource not found:', error.config.url);
                    break;

                case 500:
                    // Internal Server Error
                    console.error('Server Error: Something went wrong on the backend. Please try again later.');
                    break;

                default:
                    // Other errors (e.g. 400 Bad Request, 422 Unprocessable Entity)
                    console.error(`API Error (${status}):`, data?.message || error.message);
            }
        } else if (error.request) {
            // Network Error: Request made but no response received (e.g. Server down)
            console.error('Network Error: Unable to connect to the server. Please check your internet connection.');
        } else {
            // Something went wrong setting up the request
            console.error('Error setting up the request:', error.message);
        }

        // Return the rejected promise so the calling component can still catch and handle local errors if needed
        return Promise.reject(error);
    }
);

export default axiosInstance;
