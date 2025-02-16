import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {DollarSign, Users} from 'lucide-react';
import {useContext} from 'react';
import {AuthContext} from '@/context/auth-context';

function AdminDashboard({listOfCourses}) {
  const {auth} = useContext(AuthContext);

  const instructorStats = listOfCourses?.instructorStats || [];

  const instructorCount = listOfCourses?.instructorCount || 0;
  const studentCount = listOfCourses?.studentCount || 0;


  const config = [
    {
      icon: Users,
      label: 'Total Instructors',
      value: instructorCount,
    },
    {
      icon: Users,
      label: 'Total Students',
      value: studentCount,
    },
  ];

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {config.map((item, index) => (
          <Card
            key={index}
            className='w-full justify-start mb-2 border-2 border-teal-500 font-semibold py-2 px-4 rounded-lg shadow-md transform hover:shadow-teal transition-all duration-300 hover:shadow-2xl'
          >
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
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>Instructor Name</TableHead>
                  <TableHead>Course Count</TableHead>
                  <TableHead>Student Count</TableHead>
                  <TableHead>Total Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructorStats.length > 0 ? (
                  instructorStats.map((instructor, index) => (
                    <TableRow
                      key={index}
                      className='hover:bg-gold transform transition-transform duration-200 hover:translate-y-[-2px] hover:shadow-md'
                    >
                      <TableCell className='font-medium'>{instructor.instructorName}</TableCell>
                      <TableCell>{instructor.courses.length}</TableCell>
                      <TableCell>{instructor.totalStudents}</TableCell>
                      <TableCell>${instructor.totalRevenue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan='4' className='text-center'>
                      No instructors available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
    
  );
}

export default AdminDashboard;
