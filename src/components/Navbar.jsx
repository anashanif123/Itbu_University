import logo from "../assets/itbu-logo.jpg";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} className="h-12 w-12 object-contain" alt="ITBU"/>
          <div className="font-extrabold tracking-tight text-xl">
            ITBU <span className="text-blue-600">University</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#institutions" className="hover:text-blue-600">Institutions</a>
          <a href="#stats" className="hover:text-blue-600">Stats</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
        <a href="/result" className="rounded-full px-5 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Check Results
        </a>
      </div>
    </header>
  );
}
