import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../component/input/InputField";
import logo from "../../assets/logo.png";
import { signUp } from "../../services/auth";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password || !form.confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await signUp(form); // Pass the form object
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-black to-yellow-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>

        <div className="flex justify-center mb-6">
          <img src={logo} alt="Org Logo" className="w-16 h-16 object-contain" />
        </div>

        <h1 className="text-center text-3xl font-bold mb-6 text-green-700 tracking-tight">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4 relative z-10">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
    
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-5 relative z-10">
          <Link
            to="/"
            className="text-sm text-green-600 hover:text-green-700 hover:underline transition"
          >
            Back to Login
          </Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
