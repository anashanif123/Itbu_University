import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const universityCourses = [
  { name: "B.Com ADC", duration: "2 / 4 Years" },
  { name: "BBA ADC", duration: "2 / 4 Years" },
  { name: "B.A ADA", duration: "2 / 4 Years" },
  { name: "B.Sc ADS", duration: "2 / 4 Years" },
  { name: "BBA", duration: "2 / 4 Years" },
  { name: "B.Com", duration: "2 / 4 Years" },
  { name: "B.Ed", duration: "2 / 4 Years" },
  { name: "B.A", duration: "2 / 4 Years" },
  { name: "B.Sc", duration: "2 / 4 Years" },
  { name: "MBA", duration: "2 Years" },
  { name: "M.Com", duration: "2 Years" },
  { name: "M.A", duration: "2 Years" },
  { name: "BSCS", duration: "4 Years" },
  { name: "BS Software Engineering", duration: "4 Years" },
  { name: "Ph.D Social Science", duration: "1.5 Years" },
  { name: "Ph.D IT Management", duration: "2/4 Years" },
  { name: "CA", duration: "2/4 Years" },
  { name: "Data science", duration: "2/4 Years" },
  { name: "MBA ", duration: "1.5 Years" },
  { name: "Civil engineering ", duration: "3 Years" },
];

export default function UniversityCoursesSection() {
  return (
    <section
      id="university-courses"
      className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-sky-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          title="What We Offer in University"
          subtitle="Undergraduate, graduate, and doctoral programs to shape your career"
        />

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {universityCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl shadow-xl bg-white/80 backdrop-blur-md border border-blue-100 hover:shadow-2xl hover:scale-105 transition duration-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-7 h-7 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-700">
                  {course.name}
                </h3>
              </div>
              <p className="text-gray-600 font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-500" /> Duration:{" "}
                {course.duration}
              </p>

              {/* Hover Glow */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
