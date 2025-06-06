// import InstructorCourses from '@/components/instructor-view/courses';
import InstructorDashboard from '@/components/instructor-view/dashboard';
import AdminDashboard from '@/components/admin-view/dashboard';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent} from '@/components/ui/tabs';
import {AuthContext} from '@/context/auth-context';
import {InstructorContext} from '@/context/instructor-context';
import {fetchInstructorCourseListService, adminStatsService} from '@/services';
import {BarChart, Book, LogOut} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
function AdminDashboardpage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);

  const {resetCredentials} = useContext(AuthContext);
  const {instructorCoursesList, setInstructorCoursesList} = useContext(InstructorContext);
  const {auth} = useContext(AuthContext);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  }; //for mobile

  const [isMenuOpen, setIsMenuOpen] = useState(false); // for mobile

  async function fetchAllCourses() {
    const response = await adminStatsService();
    setStats(response.data);

    // if (response?.success) setInstructorCoursesList(response?.data);
    // console.log(response?.data);
    // if (response?.success) {
    //   const filteredCourses = response?.data?.filter(
    //     course => course.instructorId === auth?.user?._id
    //   );
    //   setInstructorCoursesList(filteredCourses);
    // }
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <AdminDashboard listOfCourses={stats} />,
    },
    // {
    //   icon: Book,
    //   label: 'Courses',
    //   value: 'courses',
    //   component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    // },
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  console.log(instructorCoursesList, 'instructorCoursesList');
  return (
    <div className='relative flex h-full min-h-screen bg-gray-100'>
      {/* Hamburger Button - Only visible on mobile */}
      <div className='md:hidden p-4 absolute top-4 right-4'>
        <Button
          className='w-10 h-10 bg-teal-500 text-white rounded-full'
          onClick={handleMenuToggle}
        >
          <span className='text-xl'>&#9776;</span>
        </Button>
      </div>

      {/* Sidebar - Always visible on desktop, hidden on mobile */}
      <aside className='hidden md:block w-64 bg-gradient-to-b from-teal-500 to-blue-500 shadow-md rounded-lg p-4 border-2 border-teal-400 font-semibold'>
        <div className='p-4'>
          <h2 className='text-2xl font-bold mb-4'>Admin View</h2>
          <nav>
            {menuItems.map(menuItem => (
              <Button
                className='w-full justify-start mb-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition hover:translate-y-[-2px] hover:shadow-lg hover:from-blue-500 hover:to-purple-500'
                key={menuItem.value}
                variant={activeTab === menuItem.value ? 'secondary' : 'ghost'}
                onClick={
                  menuItem.value === 'logout' ? handleLogout : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className='mr-2 h-4 w-4' />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Dropdown Menu - Only visible on mobile when hamburger is clicked */}
      {isMenuOpen && (
        <div className='absolute right-0 top-16 bg-teal-500 w-64 shadow-md p-4 rounded-lg z-50 md:hidden'>
          <div className='text-white font-semibold'>
            <h2 className='text-xl font-bold mb-4'>Instructor View</h2>
            <nav>
              {menuItems.slice(0, 3).map(menuItem => (
                <Button
                  className='w-full justify-start mb-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition hover:translate-y-[-2px] hover:shadow-lg hover:from-blue-500 hover:to-purple-500'
                  key={menuItem.value}
                  variant={activeTab === menuItem.value ? 'secondary' : 'ghost'}
                  onClick={
                    menuItem.value === 'logout' ? handleLogout : () => setActiveTab(menuItem.value)
                  }
                >
                  <menuItem.icon className='mr-2 h-4 w-4' />
                  {menuItem.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map(menuItem => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );

  //   const instructorStats = stats?.instructorStats || [];

  //   const instructorCount = stats?.instructorCount || 0;
  //   const studentCount = stats?.studentCount || 0;
  //   const courseCount = stats?.courseCount || 0;

  //   return (
  //     <div className='admin-dashboard'>
  //       <h1>Admin Dashboard</h1>
  //       <div className='dashboard-stats'>
  //         <div className='stat-card'>
  //           <h2>Instructors</h2>
  //           <p>{instructorCount}</p>
  //         </div>
  //         <div className='stat-card'>
  //           <h2>Students</h2>
  //           <p>{studentCount}</p>
  //         </div>
  //         <div className='stat-card'>
  //           <h2>Courses</h2>
  //           <p>{courseCount}</p>
  //         </div>
  //       </div>

  //       {/* Instructors Table */}
  //       <div className='instructors-table'>
  //         <h2>Instructor Details</h2>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Instructor Name</th>

  //               <th>Courses</th>
  //               <th>Total Students</th>
  //               <th>Total Revenue</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {instructorStats.length > 0 ? (
  //               instructorStats.map((instructor, index) => (
  //                 <tr key={index}>
  //                   <td>{instructor.instructorName}</td>
  //                   {/* <td>{instructor.email}</td>
  //                   <td>{instructor.courseCount}</td> */}
  //                   <td>{instructor.courses.length}</td>

  //                   <td>{instructor.totalStudents}</td>
  //                   <td>${instructor.totalRevenue.toFixed(2)}</td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan='5'>No instructors available.</td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
}

export default AdminDashboardpage;
