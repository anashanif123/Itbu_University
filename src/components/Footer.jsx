export default function Footer() {
    return (
      <footer id="contact" className="bg-black text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-3">About ITBU</h4>
            <p className="text-sm opacity-80">
              Institute of Technology & Business University — a modern learning hub.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white" href="/">Home</a></li>
              <li><a className="hover:text-white" href="/result">Check Result</a></li>
              <li><a className="hover:text-white" href="/admin">Admin Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-3">Contact</h4>
            <p className="text-sm opacity-80">info@itbu.university</p>
          </div>
        </div>
        <div className="text-center text-xs py-4 border-t border-white/10">
          © {new Date().getFullYear()} ITBU – All rights reserved.
        </div>
      </footer>
    );
  }
  