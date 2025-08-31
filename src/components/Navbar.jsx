import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/itbu-logo.jpg";
import AdmissionOpenTicker from "./AdmissionOpenTicker";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
<AdmissionOpenTicker />

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {/* Logo */}
      <img 
        src={logo} 
        className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 object-contain" 
        alt="ITBU"
      />
      <div className="font-extrabold tracking-tight text-xl sm:text-2xl lg:text-3xl">
        ITBU <span className="text-blue-600">University</span>
      </div>
    </div>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#institutions" className="hover:text-blue-600">Institutions</a>
          <a href="#stats" className="hover:text-blue-600">Stats</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <a href="#course" className="hover:text-blue-600">Course</a>
        </nav>

        {/* CTA */}
        <a href="/result" className="hidden sm:inline-block rounded-full px-4 sm:px-5 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 text-sm sm:text-base">
          Check Results
        </a>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-800 p-2">
          {open ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-4 space-y-4">
          <a href="/" className="block hover:text-blue-600">Home</a>
          <a href="#institutions" className="block hover:text-blue-600">Institutions</a>
          <a href="#stats" className="block hover:text-blue-600">Stats</a>
          <a href="#contact" className="block hover:text-blue-600">Contact</a>
          <a href="#course" className="hover:text-blue-600">Course</a>

          <a href="/result"  className="block rounded-lg bg-blue-600 text-white px-4 py-2 text-center font-semibold hover:bg-blue-700">
            Check Results
          </a>
        </div>
      )}
    </header>
  );
}
