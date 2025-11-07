import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black text-white fixed w-full z-50 shadow-md">
        <div className="text-2xl font-bold text-yellow-400">NMPDRA</div>
        <ul className="flex space-x-4 md:space-x-6 text-white font-medium">
          <li>
            <Link to="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/reporting-incident"
              className="bg-yellow-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Report Incident
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 md:px-20 bg-gradient-to-br from-green-400 via-yellow-300 to-black text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Rapid Incident Reporting
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          Report maritime or port emergencies instantly to NMPDRA for immediate response.
        </p>
        <Link
          to="/reporting-incident"
          className="bg-yellow-400 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Report Incident
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-20 bg-white text-black">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">About NMPDRA</h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-center">
          The National Maritime and Ports Disaster Response Agency (NMPDRA) ensures rapid emergency response,
          safety, and effective management of maritime and port disasters nationwide. 
        </p>
      </section>

      {/* Login Section */}
      <section id="login" className="py-20 px-6 md:px-20 bg-black text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Login</h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-center mb-6">
          Access your account to manage incidents, track reports, and communicate with response teams.
        </p>
        <div className="flex justify-center">
          <Link
            to="/login"
            className="bg-yellow-400 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Report Incident Section */}
      <section id="report" className="py-20 px-6 md:px-20 bg-gradient-to-r from-green-400 via-yellow-300 to-black text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Report an Incident</h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-center mb-6">
          Quickly submit details of an incident and alert our emergency response team immediately.
        </p>
        <div className="flex justify-center">
          <Link
            to="/reporting-incident"
            className="bg-black hover:bg-yellow-400 text-yellow-400 hover:text-black font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Report Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        &copy; 2025 NMPDRA | All Rights Reserved
      </footer>
    </div>
  );
};

export default LandingPage;
