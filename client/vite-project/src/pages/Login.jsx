import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [ formdata, setFormData ] = useState({
    email:"",
    password:"",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formdata.email, formdata.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black"
              value={formdata.email}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black"
              value={formdata.password}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <span className="text-black font-medium cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
