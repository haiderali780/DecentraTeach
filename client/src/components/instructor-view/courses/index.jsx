import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {courseCurriculumInitialFormData, courseLandingInitialFormData} from '@/config';
import {InstructorContext} from '@/context/instructor-context';
import {Delete, Edit} from 'lucide-react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

function InstructorCourses({listOfCourses}) {
  const navigate = useNavigate();
  const {setCurrentEditedCourseId, setCourseLandingFormData, setCourseCurriculumFormData} =
    useContext(InstructorContext);

  return (
    <Card  className = 'border-2 border-teal'>
      <CardHeader className='flex justify-between flex-row items-center'>
        <CardTitle className='text-3xl font-extrabold'>All Courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate('/instructor/create-new-course');
          }}
          className='p-6 bg-gold text-white hover:bg-teal'
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map(course => (
                    <TableRow className='hover:bg-gold'>
                      <TableCell className='font-medium'>{course?.title}</TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>${course?.students?.length * course?.pricing}</TableCell>
                      <TableCell className='text-right'>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
