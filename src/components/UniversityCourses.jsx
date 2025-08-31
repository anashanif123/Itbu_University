import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const universityCourses = [
  { name: "B.Com ADC", description: "2-Year Associate Degree in Commerce." },
  { name: "BBA ADC", description: "2-Year Associate Degree in Business Administration." },
  { name: "B.A ADA", description: "2-Year Associate Degree in Arts." },
  { name: "B.Sc ADS", description: "2-Year Associate Degree in Science." },
  { name: "BBA", description: "4-Year degree in Business Administration." },
  { name: "B.Com", description: "4-Year degree in Commerce and Finance." },
  { name: "B.Ed", description: "4-Year degree in Education." },
  { name: "B.A", description: "4-Year degree in Arts and Humanities." },
  { name: "B.Sc", description: "4-Year degree in Science." },
  { name: "MBA", description: "2-Year Master's degree in Business Administration." },
  { name: "M.Com", description: "2-Year Master's degree in Commerce." },
  { name: "M.A", description: "2-Year Master's degree in Arts." },
  { name: "BSCS", description: "4-Year degree in Computer Science." },
  { name: "BS Software Engineering", description: "4-Year degree in Software Engineering." },
  { name: "Ph.D Social Science", description: "1.5-Year doctoral program in Social Sciences." },
  { name: "Ph.D IT Management", description: "2 to 4-Year doctoral program in IT Management." },
];

export default function UniversityCoursesSection() {
  return (
    <section id="university-courses" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading 
          title="What We Offer in University" 
          subtitle="Undergraduate, graduate, and doctoral programs to shape your career"
        />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {universityCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-lg bg-white border border-blue-100 hover:shadow-2xl hover:scale-105 transition transform duration-500 text-center"
            >
              <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">{course.name}</h3>
              <p className="text-gray-600 text-sm">{course.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
