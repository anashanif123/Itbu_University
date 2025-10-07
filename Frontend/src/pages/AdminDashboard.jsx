import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authAPI, certificatesAPI } from "../services/api";
import { SECURITY_CONFIG, validateFile } from "../config/security";

export default function AdminDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      window.location.href = "/admin";
      return;
    }
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificatesAPI.getCertificates({ limit: 50 });
      if (response.success) {
        setCertificates(response.data.certificates);
      }
          } catch (error) {
        // Only log errors in development
        if (SECURITY_CONFIG.NODE_ENV === 'development') {
          console.error('Error loading certificates:', error);
        }
        setMessage("Failed to load certificates");
      } finally {
      setLoading(false);
    }
  };

  const upload = async () => {
    if (!rollNumber.trim() || !file) {
      setMessage("Please enter roll number and select a PDF file");
      return;
    }

    // Validate file
    const fileValidation = validateFile(file);
    if (!fileValidation.valid) {
      setMessage(fileValidation.error);
      return;
    }

    try {
      setUploading(true);
      setMessage("Uploading certificate...");

      const formData = new FormData();
      formData.append('certificate', file);
      formData.append('rollNumber', rollNumber.trim());

      const response = await certificatesAPI.uploadCertificate(formData);
      
      if (response.success) {
        setMessage("Certificate uploaded successfully!");
        // Reset form
        setRollNumber("");
        setFile(null);
        const fileInput = document.getElementById("file-input");
        if (fileInput) fileInput.value = "";
        // Reload certificates
        loadCertificates();
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      // Only log errors in development
      if (SECURITY_CONFIG.NODE_ENV === 'development') {
        console.error('Upload error:', error);
      }
      setMessage(error.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        const response = await certificatesAPI.deleteCertificate(id);
        if (response.success) {
          setMessage("Certificate deleted successfully!");
          loadCertificates();
        } else {
          setMessage("Failed to delete certificate");
        }
      } catch (error) {
        // Only log errors in development
        if (SECURITY_CONFIG.NODE_ENV === 'development') {
          console.error('Delete error:', error);
        }
        setMessage(error.message || "Failed to delete certificate");
      }
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      window.location.href = "/admin";
    } catch (error) {
      // Only log errors in development
      if (SECURITY_CONFIG.NODE_ENV === 'development') {
        console.error('Logout error:', error);
      }
      // Force logout even if API call fails
      window.location.href = "/admin";
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
              onClick={logout}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              🚪 Logout
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
                      Roll Number *
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
                      PDF File *
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
                    disabled={uploading}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </span>
                    ) : (
                      "📤 Upload Certificate"
                    )}
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
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Certificates</h3>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Total: {certificates.length} certificates
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2 text-gray-600">Loading certificates...</span>
                  </div>
                ) : certificates.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📄</div>
                    <p>No certificates found. Upload your first certificate above!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm sm:text-base">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">Roll Number</th>
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">PDF File</th>
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificates.map((certificate) => (
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
                              {certificate.pdfUrl ? (
                                <a
                                  href={certificate.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  <span>📄</span>
                                  <span className="hidden sm:inline">{certificate.fileName}</span>
                                </a>
                              ) : (
                                <span className="text-gray-400">No PDF</span>
                              )}
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
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}