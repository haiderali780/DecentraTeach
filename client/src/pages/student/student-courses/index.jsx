import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
    }
    console.log(response);
  }
  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
        studentBoughtCoursesList.map((course, index) => (
          <motion.div
            key={course.id}
            className='flex flex-col transition-transform duration-300 hover:shadow-teal transform hover:scale-105 hover:rotate-3d bg-gray-100 hover:bg-gray-200 border-2 rounded-lg border-gray-300 hover:border-gold hover:shadow-teal hover:shadow-xl'
            initial={{ opacity: 0, y: index % 2 === 0 ? -100 : 100 }} // Cards come from top or bottom based on index
            animate={{ opacity: 1, y: 0 }} // Cards slide into the original position
            transition={{
              duration: 0.6, // Duration of the animation
              ease: 'easeOut', // Easing for smooth transition
              delay: index * 0.1, // Staggered delay for each card
            }}
          >
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
              </motion.div>

          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses found</h1>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;
