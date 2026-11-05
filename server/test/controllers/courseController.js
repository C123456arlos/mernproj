import Course from "../models/Course.js"
import { User } from "../models/User.js"
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .populate({ path: 'educatorId' })
        .select(['-courseContent', '-enrolledStudents'])
        // const courses = await Course.findOne({ coursePrice: 0 })
        // const users = await Course.updateMany({}, {
        //     $set: {
        //         educator:
        //         {
        //             x: 1, test: 0 
                        
        //             }
        //     }
        // })
        const clerkUserId = req.auth.userId
        console.log('clerkId clerkId clerkId', clerkUserId)
        const clerkUser = await User.findOne({clerkUserId})
        console.log('clerkUser',clerkUser)
        const id = clerkUser._id.toString()
        console.log('id', id)
        const user = await User.findById(id)
        console.log('user', user)
        // const educatorId = req.auth.userId
        // const clerkUser = await User.findOne(educatorId)
        // const id= clerkUser._id.toString()
        // // const user = await User.findOne('6aea3bee5b8e27bab5ba9535')
        // const user = await User.findOne({ id })
         await Course.updateMany({}, {
            $set: {
                educatorId: {
                    email: user.email, name: user.name,
                    imageUrl: user.image,
                    enrolledCourses: {}
                    // enrolledCourses: {course:1, lecture:1, chapter:1}
        } } })
        
        // console.log(user)

        res.json({success:true, courses})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export const getCourseId = async (req, res) => {
    const { id } = req.params
    try {
        const courseData = await Course.findById(id).populate({ path: 'educator' })
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl=''
                }
            })
        })    
        res.json({success:true, courseData})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}











export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId
        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)
        if (!userData || !courseData) {
            return res.json({success:false, message:'data not found'})
        }
        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount:(courseData.coursePrice - courseData.discount * courseData.coursePrice/100).toFixed(2)
        }
        const newPurchase = await Purchase.create(purchaseData)
        const stripeInstance= new Stripe(process.env.STRIPE_SECRET_KEY)
    } catch (error) {
        
    }
}




// import Hotel from "../models/Hotel.js"
// import { v2 as cloudinary } from 'cloudinary'
// import Room from "../models/Room.js"
// import User from "../models/User.js"


// export const createRoom = async (req, res) => {
//     try {
//         console.log(req.files, 'reapfiles path')
//         const { clerkUserId } = req.user
//         const { roomType, pricePerNight, amenities } = req.body
//         const { _id } = req.user
//         const owner = req.user._id
//         // const hotel = await Hotel.find()
//         // const hotel = await Hotel.findById({ _id: _id })
//         const hotel = await Hotel.findOneAndUpdate({
//             owner: {
//                 _id: req.user.clerkUserId
//                 ,
//             }
//         })
//         console.log(hotel)
//         const ownerHotel = await User.findOneAndUpdate({
//             clerkUserId
//         }, { name: owner.name, image: owner.image })
//         // const userHotel = await Hotel.findOneAndUpdate({
//         //     owner: { _id: req.user._id }
//         // }, {
//         //     owner: { owner: { image: ownerHotel.image } }
//         // })
//         console.log(ownerHotel, 'testtestestst')
//         // console.log(hotel, '1234567890test')
//         // console.log(ownerHotel, '123testtststest')
//         // const hotel = await Hotel.findOne({ owner: { owner: req.auth.userId } })
//         // const hotel = await Hotel.findOne({ owner })
//         if (!hotel) return res.json({ success: false, message: 'no hotel found' })
//         console.log(hotel)
//         const uploadImages = req.files.map(async (file) => {
//             const response = await cloudinary.uploader.upload(file.path)
//             return response.secure_url
//         })
//         const hotelData = await Hotel.findOne({ owner: req.auth.userId })
//         const images = await Promise.all(uploadImages)
//         await Room.create({
//             hotel: { _id: hotelData._id.toString() },
//             // hotel: {
//             //     _id: hotel._id,
//             //     image: ownerHotel.image
//             // },
//             // {
//             //     owner: { image: ownerHotel.image }
//             // },

//             roomType,
//             pricePerNight: +pricePerNight,
//             amenities: JSON.parse(amenities),
//             images
//         })
//         res.json({ success: true, message: 'room created successfully' })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }
// export const getRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find({ isAvailable: true }).populate({
//             path: 'hotel',
//             populate: {
//                 path: 'owner.owner',
//                 select: 'image'
//             }
//         }).sort({ createdAt: -1 })
//         res.json({ success: true, rooms })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }
// export const getOwnerRooms = async (req, res) => {
//     try {


//         const hotelData = await Hotel.findOne({ owner: req.auth.userId })
//         console.log(hotelData, 'test')
//         console.log(hotelData._id.toString(), 'testestestest')
//         // const roomsData = await Room.find()
//         // const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate('hotel')
//         const rooms = await Room.find({ hotel: { _id: hotelData._id.toString() } }).populate('hotel')
//         console.log(rooms, 'testrooms')
//         res.json({ success: true, rooms })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// export const toggleRoomAvailability = async (req, res) => {
//     try {
//         const { roomId } = req.body
//         const roomData = await Room.findById(roomId)
//         roomData.isAvailable = !roomData.isAvailable
//         await roomData.save()
//         res.json({ success: true, message: 'room availability updated' })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }


// MyModel.updateMany({}, { $set: { notInSchema: 1 } });