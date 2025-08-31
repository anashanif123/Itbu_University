import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeading from "../components/SectionHeading";
import logo from "../assets/itbu-logo.jpg";

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
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x * 0.02,
            y: -mousePosition.y * 0.02,
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* HERO */}
      <section id="home" className="relative min-h-screen bg-center bg-cover flex items-center"
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1950&q=80')"}}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 border border-white/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 border border-white/10 rounded-full"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="text-center">
            <motion.div
              initial={{opacity:0,y:50}} 
              animate={{opacity:1,y:0}} 
              transition={{duration:1, ease: "easeOut"}}
              className="text-white"
            >
              {/* Logo with Animation */}
              <motion.div
                initial={{scale:0.8, opacity:0}}
                animate={{scale:1, opacity:1}}
                transition={{duration:0.8, delay:0.2}}
                className="mb-8 flex justify-center"
              >
                <img src={logo} alt="ITBU" className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 object-contain drop-shadow-2xl"/>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.8, delay:0.4}}
                className="text-6xl lg:text-7xl font-extrabold leading-tight"
              >
                Build the Future with{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  ITBU
                </span>
              </motion.h1>

              <motion.p 
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.8, delay:0.6}}
                className="text-xl text-gray-200 mt-6 max-w-2xl mx-auto leading-relaxed"
              >
                Institute of Technology & Business University — Secure & smart online results with cutting-edge technology.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.8, delay:0.8}}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button 
                  onClick={()=>nav("/result")}
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🚀 Check Results
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <a href="#institutions"
                  className="px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-black font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                  📖 Explore Streams
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.8, delay:1}}
                className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-300"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>24/7 Available</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">ITBU</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of result management with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.6, delay:i*0.1}}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Impact in <span className="text-blue-400">Numbers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Trusted by learners & educators worldwide
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}  
                transition={{duration:0.6, delay:i*0.1}}
                className="text-center group"
              >
                <motion.div
                  whileHover={{scale:1.05}}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-4xl lg:text-5xl font-extrabold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONS */}
      <section id="institutions" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8}}
            className="text-center mb-16"
          >
            <SectionHeading title="Select Your Stream" subtitle="Madrasa • School • Coaching" />
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{opacity:0, y:30}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.6, delay:i*0.1}}
                whileHover={{scale:1.02, y:-10}}
                className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-white border border-gray-100"
                onClick={()=>nav("/result")}
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={card.img} alt={card.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"/>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
                    {card.icon}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                  
                  <button className={`w-full py-3 px-6 rounded-full bg-gradient-to-r ${card.color} text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}>
                    Check {card.name} Results
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white text-center py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8}}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to unlock your result?
          </motion.h2>
          
          <motion.p
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8, delay:0.2}}
            className="text-xl text-gray-300 mb-8"
          >
            Fast • Secure • Verified • Instant
          </motion.p>
          
          <motion.button
            initial={{opacity:0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.8, delay:0.4}}
            onClick={()=>nav("/result")}
            className="group px-12 py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-2"
          >
            <span className="flex items-center gap-3">
              🎓 Check Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="group-hover:translate-x-2 transition-transform duration-300"
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
