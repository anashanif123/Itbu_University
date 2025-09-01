import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const coachingCourses = [
  { name: "CIT (Certificate in Information Technology)", description: "Foundation in computer applications and IT skills." },
  { name: "DIT (Diploma in Information Technology)", description: "Comprehensive IT diploma covering advanced topics." },
  { name: "Graphics Designing", description: "Learn creative design tools and professional graphics skills." },
  { name: "Web Development", description: "Master front-end & back-end web technologies." },
  { name: "MS Office Advanced", description: "Advance your productivity with Excel, Word & PowerPoint." },
  { name: "IT Management Diploma", description: "Leadership and IT resource management skills." },
  { name: "Typing Master Diploma", description: "Boost typing speed and accuracy with certification." },
  { name: "Electrical Diploma", description: "Learn practical and theoretical electrical systems." },
  { name: "Electronic Diploma", description: "Understand circuits, devices and electronics fundamentals." },
  { name: "Robotics & Artificial Intelligence", description: "Future-ready skills in robotics & AI technologies." },
];

export default function CoachingCoursesSection() {
  return (
    <section id="coaching-courses" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading 
          title="What We Offer in Coaching" 
          subtitle="Professional diplomas and skill development programs"
        />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {coachingCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-lg bg-white border border-blue-100 hover:shadow-2xl hover:scale-105 transition transform duration-500"
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
