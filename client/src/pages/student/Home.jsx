import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialSection from '../../components/student/TestimonialSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero></Hero>
      <Companies></Companies>
      <CoursesSection></CoursesSection>
      <TestimonialSection></TestimonialSection>
      <CallToAction></CallToAction>
      <Footer></Footer>
    </div>
  )
}

export default Home