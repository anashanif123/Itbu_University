import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const madrasaCourses = [
  { name: "Hifz o Quran", description: "Memorization of the Holy Quran with proper guidance." },
  { name: "Tajweed", description: "Learn correct pronunciation and rules of recitation." },
  { name: "Nazra", description: "Basic Quran reading skills with accuracy and fluency." },
  { name: "Arabic", description: "Understand the language of the Quran with grammar and vocabulary." },
];

export default function MadrasaCoursesSection() {
  return (
    <section id="madrasa-courses" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading 
          title="What We Offer in Madrasa" 
          subtitle="Spiritual and academic excellence with Islamic values"
        />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-10">
          {madrasaCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-lg bg-white border border-blue-100 hover:shadow-2xl hover:scale-105 transition transform duration-500 text-center"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">{course.name}</h3>
              <p className="text-gray-600 text-sm">{course.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
