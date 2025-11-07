import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../component/input/InputField";
import logo from "../../assets/logo.png";
import { loginUser } from "../../services/auth";




export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- useNavigate hook

  const handleLogin = async (e) => {
     e.preventDefault();
     if (!email || !password) {
       toast.error("Please enter both email and password");
     return;
   }

  try {
    const response = await loginUser({ email, password });
    if (response.success) {
      localStorage.setItem("token", response.token);
      toast.success(response.message);
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while logging in. Please try again.");
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
          Organization Title
        </h1>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-5 space-y-1 relative z-10">
          <Link
            to="/forgot-password"
            className="text-sm text-green-600 hover:text-green-700 hover:underline transition"
          >
            Forgot Password?
          </Link>
          <div>
            <Link
              to="/register"
              className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
