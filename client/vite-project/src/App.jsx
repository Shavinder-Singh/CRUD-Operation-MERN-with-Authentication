import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Register from "./pages/Register";
import Login  from "./pages/Login";  
import UpdatePassword from "./pages/UpdatePassword";
import DeleteAccount from "./pages/DeleteAccount";
// Posts Routes
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ViewDetailPage from "./pages/ViewDetailPage";


function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/viewdetail/:id" element={<ViewDetailPage />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updatepassword/:id" element={<UpdatePassword />} />
          <Route path="/deleteaccount/:id" element={<DeleteAccount />} />
          {/* Post Routes */}
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/editpost/:id" element={<CreatePost />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
