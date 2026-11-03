import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    lectureId: { type: String,},
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)





































// import mongoose from 'mongoose'
// const userSchema = mongoose.Schema({
//     clerkUserId: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     // _id: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     enrolledCourses: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref:'Course'
//         }
//     ],
//     lectureId: { type: String,},
// }, { timestamps: true })

// export const User = mongoose.model('User', userSchema)





























// import mongoose from 'mongoose'
// const userSchema = mongoose.Schema({
//         clerkUserId: {
//         type: String,
//         required: true
//     },
//     _id: { type: String, required: true },
//     // _id: { type: mongoose.Schema.Types.ObjectId, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     imageUrl: {
//         type: String,
//         required: true
//     },
//     enrolledCourses: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref:'Course'
//         }
//     ]
// }, { timestamps: true })
// const lectureSchema = new mongoose.Schema({
//     lectureId: { type: String, required: true },
//     lectureTitle: { type: String, required: true },
//     lectureDuration: { type: Number, required: true },
//     lectureUrl: { type: String, required: true },
//     isPreviewFree: { type: Boolean, required: true },
//     lectureOrder:{type:Number, required:true}
// }, {_id:false})
// const chapterSchema = new mongoose.Schema({
//     chapterId: { type: String, required: true },
//     chapterOrder: { type: Number, required: true },
//     chapterTitle: { type: String, required: true },
//     chapterContent:[lectureSchema]
// }, { _id: false })
// const courseSchema = new mongoose.Schema({
//     courseTitle: { type: String, required: true },
//     courseDescription: { type: String, required: true },
//     courseThumbnail: { type: String },
//     coursePrice: { type: Number, required: true },
//     isPublished: { type: Boolean, default: true },
//     discount: { type: Number, required: true, min: 0, max: 100 },
//     courseContent: [chapterSchema],
//     courseRating: [
//         {
//             userId: {
//                 type: String
//             },
//             rating: {
//                 type: Number, min: 1, max: 5
//             }
//         }
//     ],
//     // educator: {
//     //     type: String,
//     //     ref: 'User',
//     //     required: true
//     // },
//     educator:[userSchema],
//     enrolledStudents: [{
//         type:String, ref:'User'
//     }]
// }, { timestamps: true, minimize: false, strictPopulate:false })

// export const User = mongoose.model('User', userSchema)
