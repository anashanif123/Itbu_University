import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { authAPI } from "../services/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const login = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setMessage("Logging in...");
      const response = await authAPI.login(form.username, form.password);
      
      if (response.success) {
        setMessage("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.message || "Login failed. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8}}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Admin <span className="text-blue-200">Portal</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Secure access to manage ITBU University certificates and results
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Form */}
      <section className="py-16">
        <div className="mx-auto max-w-md px-6">
          <motion.div
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:0.2}}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Admin Login
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({...form, username: e.target.value})}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{opacity:0, y:10}}
                  animate={{opacity:1, y:0}}
                  className={`p-4 rounded-xl border ${
                    message.includes("successful") 
                      ? "bg-green-50 border-green-200 text-green-700" 
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {message.includes("successful") ? "✅" : "ℹ️"}
                    </span>
                    <span className="font-medium">{message}</span>
                  </div>
                </motion.div>
              )}

              {/* Login Button */}
              <button
                onClick={login}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                🔑 Login to Dashboard
              </button>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 text-lg">💡</span>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Demo Credentials</p>
                  <p><strong>Username:</strong> admin</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
              </div>
            </div>

          
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Admin <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools to manage your institution's results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📤", title: "Upload Results", description: "Add new student certificates and results" },
              { icon: "📊", title: "Manage Data", description: "View, edit, and delete existing records" },
              { icon: "🔒", title: "Secure Access", description: "Protected admin portal with authentication" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.6, delay:i*0.1}}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
