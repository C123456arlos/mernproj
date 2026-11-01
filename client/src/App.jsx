import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import AddCourse from './pages/educator/AddCourse'
import Navbar from './components/student/Navbar'
import 'quill/dist/quill.snow.css'

const App = () => {
  const isEducatorRoute=useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && 
      <Navbar></Navbar>
      }
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/course-list' element={<CoursesList></CoursesList>}></Route>
        <Route path='/course-list/:input' element={<CoursesList></CoursesList>}></Route>
        <Route path='/course/:id' element={<CourseDetails></CourseDetails>}></Route>
        <Route path='/my-enrollments' element={<MyEnrollments></MyEnrollments>}></Route>
        <Route path='/player/:courseId' element={<Player></Player>}></Route>
        <Route path='/loading/:path' element={<Loading></Loading>}></Route>
        <Route path='/educator' element={<Educator></Educator>}>
    <Route path='/educator' element={<Dashboard></Dashboard>}></Route>
          <Route path='add-course' element={<AddCourse></AddCourse>}></Route>
          <Route path='my-courses' element={<MyCourses></MyCourses>}></Route>
          <Route path='student-enrolled' element={<StudentsEnrolled></StudentsEnrolled>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App