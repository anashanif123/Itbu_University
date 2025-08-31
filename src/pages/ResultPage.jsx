import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResultPage() {
  const [roll, setRoll] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const search = () => {
    if (!roll.trim()) {
      setMessage("Please enter a roll number");
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    // Simulate search delay
    setTimeout(() => {
      setLoading(false);
      setMessage("This is a demo version. In a real application, this would search the database for results.");
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <Navbar />
    
<br/>
<br/>
<br/>
      {/* Search Section */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, delay:0.2}}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10"
          >
            {/* Search Form */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
                Result Search
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Enter your roll number to access your result
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number
                  </label>
                  <input
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your roll number (e.g., ITBU2024001)"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                  />
                </div>
                
                <button 
                  onClick={search}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      🔍 Search Result
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <motion.div
                initial={{opacity:0, y:10}}
                animate={{opacity:1, y:0}}
                className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center gap-2 text-blue-700">
                  <span className="text-xl">ℹ️</span>
                  <span className="font-medium">{message}</span>
                </div>
              </motion.div>
            )}

            {/* Demo Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⚠️</span>
              </div>
              <h3 className="font-semibold text-yellow-900 mb-2">Demo Version</h3>
              <p className="text-yellow-800 text-sm">
                This is a frontend demo. In a production environment, this would connect to a backend database to search for actual student results.
              </p>
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
              Why Choose <span className="text-blue-600">ITBU</span> Results?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your results instantly with our secure and reliable system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Instant Access", description: "Get your results within seconds" },
              { icon: "🔒", title: "100% Secure", description: "Your data is completely protected" },
              { icon: "📱", title: "Mobile Friendly", description: "Access from any device, anywhere" }
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

      <Footer />
    </div>
  );
}
