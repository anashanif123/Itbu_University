import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"; 
import Landing from "./pages/Landing";
import ResultPage from "./pages/ResultPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Analytics /> 
    </BrowserRouter>
  );
}
