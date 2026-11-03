import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middleware/authMiddleware.js'
const educatorRouter = express.Router()
educatorRouter.get('/update-role', updateRoleToEducator)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)
export default educatorRouter




// {
//  "courseTitle": "python crash course",
//         "courseDescription": "1",
//         "coursePrice": 49.99,
//         "discount": 20,
//         "courseContent": [
//             {
//                 "chapterId": "chapter1",
//                 "chapterOrder": 1,
//                 "chapterTitle": "getting started with javascript",
//                 "chapterContent": [
//                     {
//                         "lectureId": "lecture1",
//                         "lectureTitle": "what is javascript",
//                         "lectureDuration": 16,
//                         "lectureUrl": "https://youtu.be/CBWnBi-awSA",
//                         "isPreviewFree": true,
//                         "lectureOrder": 1
//                     }
//                         ]
//                 "educator": "123",
//                 "enrolledStudents": [
//                     'user1',
//                     'user2'
//                 ],
//                 'courseRatings': [
//                     {
//                         'userId': '1',
//                         'rating': 5,
//                         '_id':'1'
//                     }
//                 ],
//                 'createdAt': '2024-12-17T08:16:53.622Z',
//                 'updatedAt': '2024-12-31T05:31:27.290Z',
//                 '__v': 2,
//                 // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
//             },
//         ],
//         'courseThumbnail':'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'}





// {
//     "courseTitle": "python crash course",
//         "courseDescription": "1",
//             "coursePrice": 49.99,
//                 "discount": 20,
//                     "courseContent": [
//                         {
//                             "chapterId": "chapter1",
//                             "chapterOrder": 1,
//                             "chapterTitle": "getting started with javascript",
//                             "chapterContent": [
//                                 {
//                                     "lectureId": "lecture1",
//                                     "lectureTitle": "what is javascript",
//                                     "lectureDuration": 16,
//                                     "lectureUrl": "https://youtu.be/CBWnBi-awSA",
//                                     "isPreviewFree": true,
//                                     "lectureOrder": 1
//                                 }
//                             ]
//                         }
//                     ]
// }