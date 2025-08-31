import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const collegeCourses = [
  { name: "Pre Medical", description: "Foundation for future doctors and medical professionals." },
  { name: "Pre Engineering", description: "Strong base in mathematics and physics for engineering." },
  { name: "General Science", description: "Comprehensive science education for diverse fields." },
  { name: "Commerce", description: "Business, finance and accounting-focused curriculum." },
  { name: "Arts", description: "Creative and analytical programs in humanities and arts." },
];

export default function CollegeCoursesSection() {
  return (
    <section id="college-courses" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading 
          title="What We Offer in College" 
          subtitle="Comprehensive intermediate programs for bright futures"
        />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {collegeCourses.map((course, i) => (
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
