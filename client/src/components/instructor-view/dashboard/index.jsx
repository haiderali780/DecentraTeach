import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {DollarSign, Users} from 'lucide-react';
import {useContext} from 'react';
import {AuthContext} from '@/context/auth-context';

function InstructorDashboard({listOfCourses}) {
  const {auth} = useContext(AuthContext);
  // function calculateTotalStudentsAndProfit() {

  //   const {totalStudents, totalProfit, studentList} = listOfCourses.reduce(
  //     (acc, course) => {
  //       const studentCount = course.students.length;
  //       acc.totalStudents += studentCount;
  //       acc.totalProfit += course.pricing * studentCount;

  //       course.students.forEach(student => {
  //         acc.studentList.push({
  //           courseTitle: course.title,
  //           studentName: student.studentName,
  //           studentEmail: student.studentEmail,
  //         });
  //       });

  //       return acc;
  //     },
  //     {
  //       totalStudents: 0,
  //       totalProfit: 0,
  //       studentList: [],
  //     }
  //   );

  //   return {
  //     totalProfit,
  //     totalStudents,
  //     studentList,
  //   };
  // }
  function calculateTotalStudentsAndProfit() {
    const {totalStudents, totalProfit, studentList} = listOfCourses.reduce(
      (acc, course) => {
        // Only process courses where the instructorId matches the logged-in user
        if (course.instructorId === auth?.user?._id) {
          const studentCount = course.students.length;
          acc.totalStudents += studentCount;
          acc.totalProfit += course.pricing * studentCount;

          course.students.forEach(student => {
            acc.studentList.push({
              courseTitle: course.title,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          });
        }

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );

    return {
      totalProfit,
      totalStudents,
      studentList,
    };
  }

  console.log(calculateTotalStudentsAndProfit());

  const config = [
    {
      icon: Users,
      label: 'Total Students',
      value: calculateTotalStudentsAndProfit().totalStudents,
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: calculateTotalStudentsAndProfit().totalProfit,
    },
  ];

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {config.map((item, index) => (
          <Card key={index} className='w-full justify-start mb-2 border-2 border-teal-500 font-semibold py-2 px-4 rounded-lg shadow-md transform hover:shadow-teal transition-all duration-300 hover:shadow-2xl'  >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{item.label}</CardTitle>
              <item.icon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className='w-full justify-start mb-2 border-2 border-teal-500 font-semibold py-2 px-4 rounded-lg shadow-md transform hover:shadow-teal transition-all duration-300 hover:shadow-2xl'>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculateTotalStudentsAndProfit().studentList.map((studentItem, index) => (
                  <TableRow key={index} className="hover:bg-gold transform transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-md">
                    <TableCell className='font-medium'>{studentItem.courseTitle}</TableCell>
                    <TableCell>{studentItem.studentName}</TableCell>
                    <TableCell>{studentItem.studentEmail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
    // <div>
    //   <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
    //     {config.map((item, index) => (
    //       <Card
    //         key={index}
    //         className={`transition-transform duration-300 transform border-2 border-transparent
    //       hover:border-yellow-300 hover:bg-purple-800 hover:text-yellow-300
    //       bg-gradient-to-br from-purple-900 via-purple-700 to-yellow-500
    //       shadow-lg p-4`}
    //       >
    //         <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
    //           <CardTitle className='text-sm font-medium'>{item.label}</CardTitle>
    //           <item.icon className='h-4 w-4 text-yellow-300' />
    //         </CardHeader>
    //         <CardContent>
    //           <div className='text-2xl font-bold'>{item.value}</div>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>

    //   <Card
    //     className={`transition-transform duration-300 transform border-2 border-transparent
    //   hover:border-yellow-300 hover:text-yellow-300
    //   bg-gradient-to-br from-purple-900 via-purple-700 to-yellow-500
    //   shadow-lg p-4`}
    //   >
    //     <CardHeader>
    //       <CardTitle className='text-yellow-300'>Students List</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <div className='overflow-x-auto'>
    //         <Table className='w-full'>
    //           <TableHeader>
    //             <TableRow>
    //               <TableHead className='text-yellow-300'>Course Name</TableHead>
    //               <TableHead className='text-yellow-300'>Student Name</TableHead>
    //               <TableHead className='text-yellow-300'>Student Email</TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {calculateTotalStudentsAndProfit().studentList.map((studentItem, index) => (
    //               <TableRow
    //                 key={index}
    //                 className='hover:bg-gray-800 transition-colors duration-200'
    //               >
    //                 <TableCell className='font-medium text-white hover:text-yellow-300'>
    //                   {studentItem.courseTitle}
    //                 </TableCell>
    //                 <TableCell className='text-white hover:text-yellow-300'>
    //                   {studentItem.studentName}
    //                 </TableCell>
    //                 <TableCell className='text-white hover:text-yellow-300'>
    //                   {studentItem.studentEmail}
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}

export default InstructorDashboard;
