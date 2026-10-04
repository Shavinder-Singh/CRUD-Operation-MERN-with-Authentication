import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext.jsx";

const DeleteAccount = () => {
  const { DeleteAccount } = useContext(AuthContext);
  const [formdata, setFormData] = useState({
    currentPassword: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await DeleteAccount(
      formdata.currentPassword,
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>

            <input
              type="password"
              placeholder="Enter current password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              value={formdata.currentPassword}
              onChange={(e) =>
                setFormData({
                  ...formdata,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>

        

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
