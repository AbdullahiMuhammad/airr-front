import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLoggedUser } from "../../services/user";

export default function UserProfileFull() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await getLoggedUser();
    if (res.success) {
      setUser(res.data);
      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        phone: res.data.phone || "",
      });
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setProfilePic(e.target.files[0]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("phone", form.phone);
      if (profilePic) formData.append("profilePicture", profilePic);

      await axios.put("/api/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await loadUser();
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
          />
          {editMode ? (
            <div className="w-full flex flex-col gap-2">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border rounded-md px-2 py-1 w-full"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="border rounded-md px-2 py-1 w-full"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border rounded-md px-2 py-1 w-full"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="text-sm text-gray-500"
              />
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 w-full disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mt-2 w-full"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold">{user.fullName}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone || "—"}</p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md mt-4"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Right Column: Roles and Reports */}
        <div className="lg:col-span-2 space-y-6">
          {/* Roles */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Roles</h3>
            {user.roles?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {user.roles.map((role) => (
                  <li key={role._id}>
                    <span className="font-medium">{role.name}</span>
                    {role.description && (
                      <span className="text-gray-500 text-sm"> — {role.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No roles assigned.</p>
            )}
          </div>

          {/* Reports */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Reports Involved</h3>
            {user.reports?.length > 0 ? (
              <ul className="divide-y">
                {user.reports.map((rep) => (
                  <li key={rep._id} className="py-2">
                    <div className="flex justify-between">
                      <span>{rep.title}</span>
                      <span className="text-sm text-gray-500">{rep.status}</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Created on {new Date(rep.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No reports available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
