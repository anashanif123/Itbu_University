import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const courses = [
  { name: "BBA", duration: "3/4 Years" },
  { name: "B.Com", duration: "3/4 Years" },
  { name: "B.Ed", duration: "2/4 Years" },
  { name: "B.A", duration: "3/4 Years" },
  { name: "M.Com", duration: "2/4 Years" },
  { name: "MBA", duration: "2/4 Years" },
  { name: "B.Sc", duration: "3/4 Years" },
  { name: "M.A", duration: "2/4 Years" },
];

export default function CoursesSection() {
  return (
    <section className="relative w-full px-6 lg:px-20 py-24 bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Student Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/138017387/photo/asian-college-student.jpg?s=612x612&w=0&k=20&c=2UDa5P72h-2TbvhJ5btBRpLw1lxr81t9n-ISCJFwaLs="
              alt="Student with books"
              className="rounded-3xl shadow-2xl max-h-[600px] object-cover"
            />
            {/* Decorative blue glow */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 blur-3xl opacity-30 -z-10"></div>
          </div>
        </motion.div>

        {/* Right: Course Cards */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12"
          >
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Courses
            </span>
          </motion.h2>

          {/* Floating Grid of Cards */}
          <div className="grid sm:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
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
                  <BookOpen className="w-4 h-4 text-sky-500" /> Duration: {course.duration}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-sky-400/10 opacity-0 hover:opacity-100 transition"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
