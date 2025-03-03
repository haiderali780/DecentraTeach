const User = require('../../models/User'); // Assuming you have a User model
const Course = require('../../models/Course');

const getInstructorStats = async (req, res) => {
  try {
    // Step 1: Count the number of instructors and students
    const instructorCount = await User.countDocuments({role: 'instructor'});
    const studentCount = await User.countDocuments({role: 'user'});

    // Step 2: Fetch all courses
    const courses = await Course.find();

    // Step 3: Group courses by instructor
    const instructorStats = {};

    courses.forEach(course => {
      const {instructorId, instructorName, title, pricing, students} = course;

      // Calculate the student count (ensure it's at least 0)
      const studentCountForCourse = students ? students.length : 0;

      // Calculate the revenue (price * student count)
      const revenue = studentCountForCourse > 0 ? pricing * studentCountForCourse : 0;

      // If instructor doesn't exist in instructorStats, add them
      if (!instructorStats[instructorId]) {
        instructorStats[instructorId] = {
          instructorName,
          courses: [],
          totalRevenue: 0,
          totalStudents: 0,
        };
      }

      // Push course details for this instructor, even if the course has no students
      instructorStats[instructorId].courses.push({
        courseTitle: title,
        studentCount: studentCountForCourse,
        revenue,
      });

      // Update total revenue and student count for the instructor
      instructorStats[instructorId].totalRevenue += revenue;
      instructorStats[instructorId].totalStudents += studentCountForCourse;
    });

    // Step 4: Prepare the response data (all instructors will be included)
    const result = Object.values(instructorStats);

    // Step 5: Send the response with the stats and counts
    res.json({
      instructorCount,
      studentCount,
      instructorStats: result,
    });
  } catch (error) {
    console.error('Error fetching instructor stats:', error);
    res.status(500).json({message: 'Server error'});
  }
};

module.exports = {getInstructorStats};
