import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login");
    await register(form.name, form.email, form.password);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded mb-4"
              value={form.name}
              onChange={(e) =>
                setformData({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded mb-4"
              value={form.email}
              onChange={(e) =>
                setformData({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded mb-4"
              value={form.password}
              onChange={(e) =>
                setformData({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button className="w-full bg-blue-600 text-white p-3 rounded">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
