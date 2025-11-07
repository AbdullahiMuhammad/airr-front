import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../component/input/InputField";
import FileUploadField from "../../component/input/FileUploadField";
import { InputTextarea } from "../../component/input/InputField";
import { signUp } from "../../services/auth";
import logo from '../../assets/logo.png'
import { incidentForm } from "../../services/incident-form";
import statesAndLGAs from "../../assets/data.js/states";




export default function IncidentForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    state: "",
    localGov: "",
    address: "",
    fileRef: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setForm({ ...form, state: value, localGov: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (files) => {
    setForm({ ...form, fileRef: files });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.state || !form.localGov || !form.address) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await incidentForm(form);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center overflow-y-auto justify-center bg-gradient-to-br from-green-600 via-black to-yellow-500 px-4 py-8">
      <div className="w-full max-w-[700px] h-auto flex flex-col gap-4 bg-white rounded-2xl shadow-xl p-4 sm:p-10 relative">
        <div className="absolute inset-0  rounded-2xl  bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>

        <img src={logo} alt="logo" width={100} height={100} className="self-center" />
        <h1 className="text-center text-2xl font-bold mb-6 text-green-700 tracking-tight">
          Incident Reporting Form
        </h1>

        {/* Scrollable form container */}
        <div className="max-h-[70vh]   pr-2 ">
          <form onSubmit={handleRegister} className="space-y-3 pb-5  relative z-10">
            
        
            {/* Title */}
            <InputField
              label="Incident Title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            {/* Description */}
            <InputTextarea
              label="Description"
              type="text"
              name="description"
              value={form.description}
              cNmae='min-h-30'
              onChange={handleChange}
            />

            {/* State Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select State</option>
                {Object.keys(statesAndLGAs).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Local Government Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local Government
              </label>
              <select
                name="localGov"
                value={form.localGov}
                onChange={handleChange}
                disabled={!form.state}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">
                  {form.state ? "Select Local Government" : "Select a State first"}
                </option>
                {form.state &&
                  statesAndLGAs[form.state].map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
              </select>
            </div>

            {/* Address */}
            <InputTextarea
              label="Address"
              type="textarea"
              name="address"
              value={form.address}
              cNmae='min-h-20'
              onChange={handleChange}
            />
             {/* Upload Field */}
              <FileUploadField
              files={form.fileRef}
              onChange={handleFileChange}
              label="Upload Files"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
