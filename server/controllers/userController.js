import Course from '../models/Course.js'
import { Purchase } from "../models/Purchase.js"
import { User } from "../models/User.js"
import Stripe from 'stripe'
export const getUserData = async (req, res) => {
    try {
        const clerkId = req.auth.userId
        const userId = await User.findOne({clerkId})
        console.log('id', userId)
        const id = userId._id
        console.log('id', id)
        // console.log(req.auth)
        // console.log('courseData', course)
        // console.log('userId', userId)
        // const user = await User.findOne({userId})
        const user = await User.findById(id)
        // const course = await Course.findById('6ae8f4d32d2bb7ac2eccef78')
        // console.log('course', course)
        console.log('user', user)
        console.log('user', user)
        if (!user) {
            return res.json({success:false, message:'user not found'})
        }
        res.json({success:true, user})
    } catch (error) {
        res.json({success:false, messge:error.message})
    }












    // try {
    //     const courses = await Course.find({ isPublished: true }).populate({path:'educator'})
    //     .select(['-courseContent', '-enrolledStudents'])
    //     // // const courses = await Course.findOne({ coursePrice: 0 })
    //     // const users = await Course.updateMany({}, {
    //     //     $set: {
    //     //         educator:
    //     //         {
    //     //             x: 1, test: 0 
                        
    //     //             }
    //     //     }
    //     // })

    //     const educatorId = req.auth.userId
    //     const user = await User.findOne({ educatorId })
    //      await Course.updateMany({}, {
    //         $set: {
    //             educator: {
    //                 email: user.email, name: user.name,
    //                 imageUrl: user.image,
    //                 enrolledCourses: {}
    //                 // enrolledCourses: {course:1, lecture:1, chapter:1}
    //     } } })
        
    //     console.log(user)

    //     res.json({success:true, courses})
    // } catch (error) {
    //     res.json({success:false, message:error.message})
    // }

















    // try {
    //     console.log(req.auth)
    //     const userId = req.auth.userId
    //     const user = await User.findById(userId)
    //     // const user = await User.findById(clerkId)
    //     if (!user) {
    //         return res.json({success:false, message:'user not found'})
    //     }
    //     res.json({success:true, user})
    // } catch (error) {
    //     res.json({success:false, messge:error.message})
    // }
        // const educatorId = req.auth.userId
        // const user = await User.findOne({ educatorId })
        // console.log('userData',user)
    const educatorId = req.auth.userId
    const user = await User.findOne({ educatorId })
    //   if (!user) {
    //         return res.json({success:false, message:'user not found'})
    // }
    //  res.json({success:true, user})
}
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')
        res.json({success:true, enrolledCourses:userData.enrolledCourses})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
// import { User } from "../models/User.js"

// export const getUserData = async (req, res) => {
//     // try {
//     //     console.log(req.auth)
//     const userId = req.auth.userId
//     console.log('userId',userId)
//     //     const user = await User.findById(userId)
//     //     // const user = await User.findById(clerkId)
//     //     if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     //     }
//     //     res.json({success:true, user})
//     // } catch (error) {
//     //     res.json({success:false, messge:error.message})
//     // }
//     // try {
//     //     console.log(req.auth)
//     //     const userId = req.auth.userId
//     //     const user = await User.findById(userId)
//     //     // const user = await User.findById(clerkId)
//     //     if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     //     }
//     //     res.json({success:true, user})
//     // } catch (error) {
//     //     res.json({success:false, messge:error.message})
//     // }
//         // const educatorId = req.auth.userId
//         // const user = await User.findOne({ educatorId })
//         // console.log('userData',user)
//     // const educatorId = req.auth.userId
//     // const user = await User.findOne({ educatorId })
    
//     //   if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     // }
//     //  res.json({success:true, user})
//     //     const  userId  = req.auth.userId
//     // console.log('userId', userId)
// }
// export const userEnrolledCourses = async (req, res) => {
//     try {
//             const educatorId = req.auth.userId
//     const userData = await User.findOne({ educatorId })
//         res.json({ success: true, enrolledCourses: userData.enrolledCourses })
//     } catch (error) {
//         res.json({success:false, message:error.message})
//     }
//     // try {
//     //     const userId = req.auth.userId
//     //     const userData = await User.findById(userId)
//     //         // .populate('enrolledCourses')
//     //     res.json({success:true, enrolledCourses:userData.enrolledCourses})
//     // } catch (error) {
//     //     res.json({success:false, message:error.message})
//     // }
// }
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const clerkUserId = req.auth.userId
        const user = await User.findOne({ clerkUserId })
        const id = user._id.toString('')
        const userData = await User.findById(id)
        const courseData = await Course.findById(courseId)
        if (!userData || !courseData) {
            return res.json({success:false, message:'data not found'})
        }
        const purchaseData = {
            courseId: courseData._id,
            userId:user._id,
            amount:(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }

        const newPurchase = await Purchase.create(purchaseData)
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.CURRENCY.toLowerCase()
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity:1
        }]
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                pruchaseId:newPurchase._id.toString()
            }
        })
        res.json({success:true, session_url:session.url})
    } catch (error) {
        res.json({success:false, error:error.message})
    }
}







// export const getUserData = async (req, res) => {
//     try {
//         const clerkId = req.auth.userId
//         const userId = await User.findOne({clerkId})
//         console.log('id', userId)
//         const id = userId._id
//         console.log('id', id)
//         // console.log(req.auth)
//         // console.log('courseData', course)
//         // console.log('userId', userId)
//         // const user = await User.findOne({userId})
//         // const user = await User.findById()
//         const user = await User.findById(id)
//         if (!user) {
//             return res.json({success:false, message:'user not found'})
//         }
//         res.json({success:true, user})
//     } catch (error) {
//         res.json({success:false, messge:error.message})
//     }
//     // try {
//     //     console.log(req.auth)
//     //     const userId = req.auth.userId
//     //     const user = await User.findById(userId)
//     //     // const user = await User.findById(clerkId)
//     //     if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     //     }
//     //     res.json({success:true, user})
//     // } catch (error) {
//     //     res.json({success:false, messge:error.message})
//     // }
//         // const educatorId = req.auth.userId
//         // const user = await User.findOne({ educatorId })
//         // console.log('userData',user)
//     const educatorId = req.auth.userId
//     const user = await User.findOne({ educatorId })
//     //   if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     // }
//     //  res.json({success:true, user})
// }







// export const getUserData = async (req, res) => {
//     // try {
//     //     const clerkId = req.auth.userId
//     //     const userId = await User.findOne({clerkId})
//     //     console.log('id', userId)
//     //     const id = userId._id
//     //     console.log('id', id)
//     //     // console.log(req.auth)
//     //     // console.log('courseData', course)
//     //     // console.log('userId', userId)
//     //     // const user = await User.findOne({userId})
//     //     const user = await User.findById(id)
//     //     if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     //     }
//     //     res.json({success:true, user})
//     // } catch (error) {
//     //     res.json({success:false, messge:error.message})
//     // }












//     try {
//         const courses = await Course.find({ isPublished: true }).populate({path:'educator'})
//         .select(['-courseContent', '-enrolledStudents'])
//         // // const courses = await Course.findOne({ coursePrice: 0 })
//         // const users = await Course.updateMany({}, {
//         //     $set: {
//         //         educator:
//         //         {
//         //             x: 1, test: 0 
                        
//         //             }
//         //     }
//         // })

//         const educatorId = req.auth.userId
//         const user = await User.findOne({ educatorId })
//          await Course.updateMany({}, {
//             $set: {
//                 educator: {
//                     email: user.email, name: user.name,
//                     imageUrl: user.image,
//                     enrolledCourses: {}
//                     // enrolledCourses: {course:1, lecture:1, chapter:1}
//         } } })
        
//         console.log(user)

//         res.json({success:true, courses})
//     } catch (error) {
//         res.json({success:false, message:error.message})
//     }

















//     // try {
//     //     console.log(req.auth)
//     //     const userId = req.auth.userId
//     //     const user = await User.findById(userId)
//     //     // const user = await User.findById(clerkId)
//     //     if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     //     }
//     //     res.json({success:true, user})
//     // } catch (error) {
//     //     res.json({success:false, messge:error.message})
//     // }
//         // const educatorId = req.auth.userId
//         // const user = await User.findOne({ educatorId })
//         // console.log('userData',user)
//     const educatorId = req.auth.userId
//     const user = await User.findOne({ educatorId })
//     //   if (!user) {
//     //         return res.json({success:false, message:'user not found'})
//     // }
//     //  res.json({success:true, user})
// }