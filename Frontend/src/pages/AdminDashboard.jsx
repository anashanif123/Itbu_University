import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authAPI, certificatesAPI } from "../services/api";
import { SECURITY_CONFIG, validateFile } from "../config/security";

export default function AdminDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [files, setFiles] = useState([]); // Multiple files now
  const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
      if (SECURITY_CONFIG.NODE_ENV === "development") {
        console.error("Error loading certificates:", error);
      }
      setMessage("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const upload = async () => {
    if (!rollNumber.trim() || files.length === 0) {
      setMessage("Please enter roll number and select image files");
      return;
    }

    // Validate all files
    for (let file of files) {
      const fileValidation = validateFile(file, ["image/jpeg", "image/png"]);
      if (!fileValidation.valid) {
        setMessage(fileValidation.error);
        return;
      }
    }

    try {
      setUploading(true);
      setMessage("Uploading images and generating PDF...");

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file)); // ✅ multiple images
      formData.append("rollNumber", rollNumber.trim());

      const response = await certificatesAPI.uploadCertificate(formData);

      if (response.success) {
        setMessage("Certificate PDF created and uploaded successfully!");
        setRollNumber("");
        setFiles([]);
        const fileInput = document.getElementById("file-input");
        if (fileInput) fileInput.value = "";
        loadCertificates();
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      if (SECURITY_CONFIG.NODE_ENV === "development") {
        console.error("Upload error:", error);
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
        if (SECURITY_CONFIG.NODE_ENV === "development") {
          console.error("Delete error:", error);
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
      if (SECURITY_CONFIG.NODE_ENV === "development") {
        console.error("Logout error:", error);
      }
      window.location.href = "/admin";
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center lg:text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                Admin <span className="text-blue-200">Dashboard</span>
              </h1>
              <p className="text-blue-100 text-base">
                Manage certificates and results for ITBU University students
              </p>
            </motion.div>

            <motion.button
              onClick={logout}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-sm"
            >
              🚪 Logout
            </motion.button>
          </div>
        </div>
      </section>

      {/* Upload & List Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8"
            >
              <div className="flex items-center gap-2 text-blue-700">
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
            >
              <div className="bg-white rounded-2xl shadow-xl border p-8">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                  Upload Images
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  Upload multiple images to create a PDF certificate
                </p>

                <label className="block font-medium text-gray-700 mb-2">
                  Roll Number *
                </label>
                <input
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Enter roll number"
                  className="w-full px-4 py-3 mb-4 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
                />

                <label className="block font-medium text-gray-700 mb-2">
                  Images (JPG or PNG) *
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles([...e.target.files])}
                  className="w-full px-4 py-3 rounded-xl border bg-gray-50 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />

                <button
                  onClick={upload}
                  disabled={uploading}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
                >
                  {uploading ? "Uploading..." : "📤 Upload & Create PDF"}
                </button>
              </div>
            </motion.div>

            {/* Certificates Table */}
            {/* (keep your existing table code as is) */}
          </div>
        </div>
      </section>
    </div>
  );
}
