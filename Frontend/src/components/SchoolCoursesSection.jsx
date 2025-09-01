import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const schoolCourses = [
  { name: "Computer Science (Part I / II)", description: "Strong foundation in programming, IT, and computer studies." },
  { name: "Science", description: "Comprehensive science education for secondary level students." },
  { name: "General Science", description: "Broader science subjects with applied learning." },
  { name: "Arts", description: "Focus on humanities, literature, and social sciences." },
  { name: "Technical School Certificate", description: "Skill-based technical education for practical learning." },
  { name: "Electrical School Certificate", description: "Hands-on training in electrical systems and practices." },
];

export default function SchoolCoursesSection() {
  return (
    <section id="school-courses" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading 
          title="What We Offer in School" 
          subtitle="Comprehensive education streams for secondary students"
        />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {schoolCourses.map((course, i) => (
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
