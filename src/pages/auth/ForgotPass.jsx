import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import InputField from "../../component/input/InputField";
import logo from "../../assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      console.log("Reset email sent:", res.data);
    } catch (err) {
      console.error("Reset failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-black to-yellow-500 px-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Org Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-6 text-green-700 tracking-tight">
          Forgot Password
        </h1>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-5 relative z-10">
          <Link
            to="/"
            className="text-sm text-green-600 hover:text-green-700 hover:underline transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
