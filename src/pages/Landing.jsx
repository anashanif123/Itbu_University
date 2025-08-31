import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import AdmissionOpenTicker from "../components/AdmissionOpenTicker";
import CoursesSection from "../components/CoursesSection";

export default function Landing() {
  const nav = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cards = [
    {
      name: "Madrasa",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Madarsa_rahamtul_uloom_students_read_Al_Quran-ul-Kareem.jpg",
      description: "Traditional Islamic education with modern approach",
      icon: "🕌",
      color: "from-blue-600 to-blue-800"
    },
    {
      name: "School",
      img: "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?auto=format&fit=crop&w=1200&q=80",
      description: "Comprehensive primary and secondary education",
      icon: "🏫",
      color: "from-blue-600 to-blue-800"
    },
    {
      name: "Coaching",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpFFFsJkaUjb_GgneW_5gvK06lbntbP3lqGw&s",
      description: "Specialized coaching and skill development",
      icon: "📚",
      color: "from-blue-600 to-blue-800"
    },
  ];

  const stats = [
    { label: "Enrolled Students", value: "5,000+", icon: "👥", color: "text-blue-600" },
    { label: "Expert Faculty", value: "300+", icon: "🎓", color: "text-blue-600" },
    { label: "Certificates Issued", value: "10,000+", icon: "🏆", color: "text-blue-600" },
    { label: "Years of Excellence", value: "15+", icon: "⭐", color: "text-blue-600" },
  ];

  const features = [
    { icon: "🔒", title: "Secure Results", description: "End-to-end encrypted result verification" },
    { icon: "⚡", title: "Instant Access", description: "Get results within seconds of submission" },
    { icon: "📱", title: "Mobile Friendly", description: "Access from any device, anywhere" },
    { icon: "✅", title: "Verified Data", description: "All results are officially verified" },
  ];

  return (
    <div className="font-sans relative overflow-hidden">
      <Navbar/>
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ x: mousePosition.x * 0.01, y: mousePosition.y * 0.01 }}
          className="absolute top-20 left-20 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: -mousePosition.x * 0.02, y: -mousePosition.y * 0.02 }}
          className="absolute bottom-20 right-20 w-32 sm:w-40 h-32 sm:h-40 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* HERO */}
     <section
  id="home"
  className="relative min-h-screen bg-center bg-cover flex items-center"
  style={{
    backgroundImage:
      "url('https://mbastudiespk.wordpress.com/wp-content/uploads/2016/04/picture1.jpg?w=500')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>


        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
       
          {/* Main Heading */}
          <motion.h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-white">
            Build the Future with{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">ITBU</span>
          </motion.h1>

          <motion.p className="text-base sm:text-lg lg:text-xl text-gray-200 mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed px-2">
            Institute of Technology & Business University — Secure & smart online results with cutting-edge technology.
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center px-2">
            <button onClick={()=>nav("/result")}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition transform hover:-translate-y-1 shadow-lg">
              🚀 Check Results
            </button>
            <a href="#institutions"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-black font-semibold transition transform hover:-translate-y-1 shadow-lg text-center">
              📖 Explore Streams
            </a>
          </div>
        </div>
      </section>
  <CoursesSection/>
      {/* FEATURES */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Why Choose ITBU?" subtitle="Experience the future of result management with our cutting-edge platform" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100 text-center">
                <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Impact in Numbers" subtitle="Trusted by learners & educators worldwide" />
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-6 sm:p-8 text-center border border-white/20">
                <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                <div className={`text-2xl sm:text-4xl font-extrabold ${stat.color}`}>{stat.value}</div>
                <p className="text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONS */}
      <section id="institutions" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Select Your Stream" subtitle="Madrasa • School • Coaching" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, i) => (
              <div key={i} onClick={()=>nav("/result")} className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100">
                <div className="relative h-52 sm:h-64 lg:h-72">
                  <img src={card.img} alt={card.name} className="h-full w-full object-cover"/>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-4xl">{card.icon}</div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-2xl font-bold mb-2">{card.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">{card.description}</p>
                  <button className={`w-full py-2 sm:py-3 px-4 rounded-full bg-gradient-to-r ${card.color} text-white font-semibold`}>
                    Check {card.name} Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white text-center py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to unlock your result?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
            Fast • Secure • Verified • Instant
          </p>
          <button onClick={()=>nav("/result")}
            className="px-8 sm:px-12 py-3 sm:py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 font-bold text-lg sm:text-xl shadow-lg">
            🎓 Check Now →
          </button>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
