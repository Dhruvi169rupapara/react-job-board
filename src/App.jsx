import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import Layout from "./components/Layout.jsx";
import {store} from "./redux/store.js";
import {Provider} from "react-redux";
import AdminJobs from "./pages/Admin/AdminJobs.jsx";
import AdminJobDetails from "./pages/Admin/AdminJobDetails.jsx";

function App() {

  return (
      <Provider store={store}>
          <AuthProvider>
              <BrowserRouter>
                  <Routes>

                      <Route element={ <ProtectedRoute isPublic /> }>
                          <Route path="/login" element={<Login />} />
                      </Route>

                      <Route element={ <Layout /> }>
                          <Route path="/" element={<Home />} />

                          <Route element={ <ProtectedRoute allowedRoles={["admin"]} /> }>
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/admin-jobs" element={<AdminJobs />} />
                              <Route path="/admin-job/:id" element={<AdminJobDetails />} />
                          </Route>

                          <Route element={ <ProtectedRoute allowedRoles={["user"]} /> }>
                              <Route path="/jobs" element={<Jobs />} />
                          </Route>
                      </Route>

                  </Routes>
              </BrowserRouter>
          </AuthProvider>
      </Provider>
  )
}

export default App
