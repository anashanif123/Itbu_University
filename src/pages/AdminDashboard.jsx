import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [category, setCategory] = useState("madrasa");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Demo data for display
  const demoCertificates = [
    { _id: "1", rollNumber: "ITBU2024001", category: "madrasa", pdfUrl: "#", fileName: "demo_certificate.pdf" },
    { _id: "2", rollNumber: "ITBU2024002", category: "school", pdfUrl: "#", fileName: "demo_certificate.pdf" },
    { _id: "3", rollNumber: "ITBU2024003", category: "coaching", pdfUrl: "#", fileName: "demo_certificate.pdf" }
  ];

  const upload = () => {
    if (!rollNumber.trim() || !file) {
      setMessage("Please fill all fields and select a file");
      return;
    }

    setMessage("This is a demo version. In a real application, this would upload the file to the server.");
    
    setRollNumber("");
    setCategory("madrasa");
    setFile(null);

    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";
  };

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      setMessage("This is a demo version. In a real application, this would delete the certificate from the database.");
    }
  };

  const categoryOptions = [
    { value: "madrasa", label: "Madrasa", icon: "🕌" },
    { value: "school", label: "School", icon: "🏫" },
    { value: "coaching", label: "Coaching", icon: "📚" }
  ];

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <section className="pt-28 pb-12 sm:pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Admin <span className="text-blue-200">Dashboard</span>
              </h1>
              <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto lg:mx-0">
                Manage certificates and results for ITBU University students
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onClick={() => (window.location.href = "/admin")}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              🚪 Back to Login
            </motion.button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-8"
            >
              <div className="flex items-center gap-2 text-blue-700 text-sm sm:text-base">
                <span className="text-lg">ℹ️</span>
                <span className="font-medium">{message}</span>
              </div>
            </motion.div>
          )}

          {/* Demo Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6 mb-8"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span className="text-yellow-600 text-xl sm:text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1 text-sm sm:text-base">Demo Version</h3>
                <p className="text-yellow-800 text-xs sm:text-sm">
                  This is a frontend demo. In a production environment, this would connect to a backend database and Cloudinary for file management.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl">📤</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Upload Certificate</h3>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">Add new student results</p>
                </div>

                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Roll Number
                    </label>
                    <input
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="Enter roll number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      PDF File
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  <button
                    onClick={upload}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    📤 Upload Certificate
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Certificates List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Demo Certificates</h3>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Total: {demoCertificates.length} certificates
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">Roll Number</th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">PDF</th>
                        <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoCertificates.map((certificate) => (
                        <motion.tr
                          key={certificate._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-3 sm:py-4 px-3 sm:px-4 font-medium text-gray-900">
                            {certificate.rollNumber}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4">
                            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                              {categoryOptions.find(opt => opt.value === certificate.category)?.icon}
                              {certificate.category.charAt(0).toUpperCase() + certificate.category.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4">
                            <span className="inline-flex items-center gap-2 text-gray-500 font-medium">
                              <span>📄</span>
                              <span className="hidden sm:inline">Demo PDF</span>
                            </span>
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-4">
                            <button
                              onClick={() => remove(certificate._id)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors duration-200"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
