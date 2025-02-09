import {courseCategories} from '@/config';
import banner from '../../../../public/banner-img.png';
import {Button} from '@/components/ui/button';
import img from './az.jpg';
import {useContext, useEffect} from 'react';
import {StudentContext} from '@/context/student-context';
import {checkCoursePurchaseInfoService, fetchStudentViewCourseListService} from '@/services';
import {AuthContext} from '@/context/auth-context';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

function StudentHomePage() {
  const {studentViewCoursesList, setStudentViewCoursesList} = useContext(StudentContext);
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  const SlideLeft = delay => {
    return {
      initial: {
        opacity: 0,
        x: 50,
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          delay: delay,
          ease: 'easeInOut',
        },
      },
    };
  };

  const [ref, inView] = useInView({
    triggerOnce: true, // Ensures the animation triggers only once
    threshold: 0.1, // Adjusts how much of the element needs to be visible
  });

  const animationVariants = {
    hidden: {opacity: 0, x: 100}, // Start off-screen to the right
    visible: {opacity: 1, x: 0}, // Animate to fully visible and in position
  };
  
  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem('filters');
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    navigate('/courses');
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(getCurrentCourseId, auth?.user?._id);

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      <section className='flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8'>
        {/* Text Section */}
        <motion.div
          className='lg:w-1/2 lg:pr-12 '
          initial={{opacity: 0, x: -50}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.8, ease: 'easeOut'}}
        >
          <h1 className='text-4xl text-teal font-bold mb-4'>Learning that gets you</h1>
          <p className='text-xl '>Skills for your present and your future. Get Started with US</p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className='lg:w-1/2 mb-8 lg:mb-0'
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, ease: 'easeOut', delay: 0.3}}
        >
          <img src={img} className='w-full h-auto rounded-lg shadow-lg' />
        </motion.div>
      </section>

      <section className='py-12 px-6 lg:px-12 bg-gray-50'>
        <div className='container'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8'>Course Categories</h2>
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'
            ref={ref}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: {opacity: 0, x: 100},
              visible: {opacity: 1, x: 0, transition: {staggerChildren: 0.2, duration: 0.8}},
            }}
          >
            {courseCategories.map(categoryItem => (
              <motion.div
                key={categoryItem.id}
                className='flex items-center justify-center'
                variants={animationVariants}
              >
                <Button
                  // className='bg-white font-semibold shadow-md rounded-xl p-6 flex items-center justify-center text-lg text-gray-700 border border-teal hover:bg-white hover:border-gold hover:text-gold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out'
                  className="bg-white font-semibold shadow-md rounded-xl p-6 flex items-center justify-center text-lg text-gray-700 border border-teal hover:bg-white hover:border-gold hover:text-gold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out text-[clamp(1rem,_2vw,_1.5rem)]"

                  style={{
                    aspectRatio: '1 / 1', // Keeps buttons perfectly square
                    width: '100%', // Ensures it fills the grid cell
                  }}
                  onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
                >
                  {categoryItem.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className='py-12 px-4 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>Featured Courses</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map(courseItem => (
              <motion.div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className='border rounded-lg border-teal overflow-hidden shadow cursor-pointer'
                whileHover={{
                  scale: 1.1,
                  rotateX: 30, // Increased rotation on X-axis for stronger 3D effect
                  rotateY: 30, // Increased rotation on Y-axis for stronger 3D effect
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)', // Deeper shadow for more depth
                  zIndex: 10, // Bring the card to the front
                  transition: {
                    duration: 0.5, // Slower transition for a more dramatic effect
                    ease: 'easeInOut',
                  },
                }}
                whileTap={{
                  scale: 0.98, // Slight scale-down when clicked for feedback
                  transition: {duration: 0.2},
                }}
                initial={{opacity: 0, y: 100}} // Initial position below screen
                animate={{opacity: 1, y: 0}} // Animate to original position (slide up)
                transition={{
                  duration: 0.6, // Duration of entrance
                  ease: 'easeOut', // Easing for smooth transition
                  delay: 0.2, // Slight delay for a staggered effect
                }}
                style={{
                  perspective: '1000px', // This gives depth to the card
                }}
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className='w-full h-40 object-cover'
                />
                <div className='p-4'>
                  <h3 className='font-bold mb-2'>{courseItem?.title}</h3>
                  <p className='text-sm text-gray-700 mb-2'>{courseItem?.instructorName}</p>
                  <p className='font-bold text-[16px]'>${courseItem?.pricing}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <h1>No Courses Found</h1>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;

export const FadeUp = delay => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: 'easeInOut',
      },
    },
  };
};
