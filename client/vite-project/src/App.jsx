import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import Register from "./pages/Register";
import Login  from "./pages/Login";  
import UpdatePassword from "./pages/UpdatePassword";
import DeleteAccount from "./pages/DeleteAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updatepassword/:id" element={<UpdatePassword />} />
          <Route path="/deleteaccount/:id" element={<DeleteAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
