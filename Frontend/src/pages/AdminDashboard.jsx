import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authAPI, certificatesAPI } from "../services/api";
import { SECURITY_CONFIG, validateFile } from "../config/security";

export default function AdminDashboard() {
  const [rollNumber, setRollNumber] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Check authentication
  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      window.location.href = "/admin";
      return;
    }
    loadCertificates();
  }, []);

  // ✅ Fetch certificates list
  const loadCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificatesAPI.getCertificates({ limit: 50 });
      if (response.success) setCertificates(response.data.certificates);
    } catch (error) {
      if (SECURITY_CONFIG.NODE_ENV === "development")
        console.error("Error loading certificates:", error);
      setMessage("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Upload handler
  const upload = async () => {
    if (!rollNumber.trim() || files.length === 0) {
      setMessage("⚠️ Please enter roll number and select at least one image file");
      return;
    }

    // Validate all files
    for (let file of files) {
      const valid = validateFile(file, ["image/jpeg", "image/png"]);
      if (!valid.valid) {
        setMessage(valid.error);
        return;
      }
    }

    try {
      setUploading(true);
      setMessage("📦 Uploading images & generating PDF...");

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      formData.append("rollNumber", rollNumber.trim());

      const response = await certificatesAPI.uploadCertificate(formData);

      if (response.success) {
        setMessage("✅ Certificate PDF created successfully!");
        setRollNumber("");
        setFiles([]);
        const fileInput = document.getElementById("file-input");
        if (fileInput) fileInput.value = "";
        loadCertificates();
      } else {
        setMessage("❌ Upload failed. Please try again.");
      }
    } catch (error) {
      if (SECURITY_CONFIG.NODE_ENV === "development")
        console.error("Upload error:", error);
      setMessage(error.message || "❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete certificate
  const remove = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        const response = await certificatesAPI.deleteCertificate(id);
        if (response.success) {
          setMessage("🗑️ Certificate deleted successfully!");
          loadCertificates();
        } else {
          setMessage("❌ Failed to delete certificate");
        }
      } catch (error) {
        if (SECURITY_CONFIG.NODE_ENV === "development")
          console.error("Delete error:", error);
        setMessage(error.message || "Failed to delete certificate");
      }
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await authAPI.logout();
      window.location.href = "/admin";
    } catch {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-center lg:text-left"
            >
              <h1 className="text-4xl font-bold mb-2">
                Admin <span className="text-blue-200">Dashboard</span>
              </h1>
              <p className="text-blue-100">Manage student certificates & results</p>
            </motion.div>

            <motion.button
              onClick={logout}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-sm"
            >
              🚪 Logout
            </motion.button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          {message && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-blue-700">
              {message}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">
                Upload Images
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Upload up to <b>5</b> JPG/PNG images to generate a single PDF
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
                Images (JPG / PNG) *
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/jpeg, image/png"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
                className="w-full px-4 py-3 rounded-xl border bg-gray-50 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {files.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {files.length} file{files.length > 1 ? "s" : ""} selected
                </p>
              )}

              <button
                onClick={upload}
                disabled={uploading}
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
              >
                {uploading ? "⏳ Uploading..." : "📤 Upload & Generate PDF"}
              </button>
            </div>

            {/* Certificates Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Certificates
              </h3>

              {loading ? (
                <div className="py-6 text-gray-500">Loading certificates...</div>
              ) : certificates.length === 0 ? (
                <div className="py-6 text-gray-500">
                  No certificates found. Upload one to get started!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-2 px-3">Roll Number</th>
                        <th className="text-left py-2 px-3">PDF</th>
                        <th className="text-left py-2 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.map((c) => (
                        <tr key={c._id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{c.rollNumber}</td>
                          <td className="py-2 px-3">
                            <a
                              href={c.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View PDF
                            </a>
                          </td>
                          <td className="py-2 px-3">
                            <button
                              onClick={() => remove(c._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                            >
                              🗑 Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
