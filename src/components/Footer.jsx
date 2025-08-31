import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";


export default function Footer() {
  const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: "Facebook", icon: <FaFacebookF />, url: "#" },
  { name: "Twitter", icon: <FaTwitter />, url: "#" },
  { name: "Instagram", icon: <FaInstagram />, url: "#" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, url: "#" },
  { name: "YouTube", icon: <FaYoutube />, url: "#" },
];


  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "Check Result", url: "/result" },
    { name: "Admin Login", url: "/admin" },
    { name: "About Us", url: "#about" },
    { name: "Contact", url: "#contact" },
    { name: "Privacy Policy", url: "#privacy" },
  ];

  const contactInfo = [
    { icon: "📧", text: "universityitbu@gmail.com" },
    { icon: "📞", text: "+923092163536" },
    { icon: "📍", text: "Main campus building  korangi No 7 Karachi," },
    { icon: "🕒", text: "Mon-Fri: 9:00 AM - 6:00 PM" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                ITBU
              </div>
              <div>
                <h4 className="text-white font-bold text-lg sm:text-xl">ITBU University</h4>
                <p className="text-blue-400 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              Institute of Technology & Business University — a modern learning hub dedicated
              to empowering students with cutting-edge technology and business knowledge for a brighter future.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h5 className="text-white font-semibold mb-3 text-sm sm:text-base">Stay Updated</h5>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 sm:px-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm"
                />
                <button className="px-4 py-2 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-medium text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((c, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="text-base sm:text-lg">{c.icon}</span>
                  <span className="text-xs sm:text-sm">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-gray-400 text-sm w-full md:w-auto">Follow us:</span>
              <div className="flex gap-2 sm:gap-3">
             {socialLinks.map((social, index) => (
  <a
    key={index}
    href={social.url}
    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center text-base sm:text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
    title={social.name}
  >
    {social.icon}
  </a>
))}
              </div>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-gray-400 text-sm">© {currentYear} ITBU University. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">Made with ❤️ for better education</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
