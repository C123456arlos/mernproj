import mongoose from "mongoose"
// const educatorSchema =new mongoose.Schema({
    // name: { type: String, required: true },
    // email: { type: String, required: true },
    // imageUrl: {
    //     type: String,
    //     required: true
    // },
    // enrolledCourses: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:'Course'
    //     }
    // ]
    // x: {
    //     type: String,
    //     required:true
    // },
    // test: {
    //     type: String,
    //     required:true
    // }
// }, { _id: false })

const enrolledCourses = new mongoose.Schema({
    course: {type:String, required:true},
    lecture: {type:String, required:true},
    chapter: {type:String, required:true},
},{_id:false})
const educatorSchema= new mongoose.Schema({
       name: { type: String, required: true },
    email: { type: String, required: true },
    imageUrl: {
        type: String,
        required: true
    },
    enrolledCourses: [enrolledCourses]
    // enrolledCourses: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:'Course'
    //     }
    // ]
})
const lectureSchema = new mongoose.Schema({
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: { type: Number, required: true },
    lectureUrl: { type: String, required: true },
    isPreviewFree: { type: Boolean, required: true },
    lectureOrder:{type:Number, required:true}
}, {_id:false})
const chapterSchema = new mongoose.Schema({
    chapterId: { type: String, required: true },
    chapterOrder: { type: Number, required: true },
    chapterTitle: { type: String, required: true },
    chapterContent:[lectureSchema]
}, { _id: false })
const courseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseThumbnail: { type: String },
    coursePrice: { type: Number, required: true },
    isPublished: { type: Boolean, default: true },
    discount: { type: Number, required: true, min: 0, max: 100 },
    courseContent: [chapterSchema],
    // test: [testSchema],
    courseRating: [
        {
            userId: {
                type: String
            },
            rating: {
                type: Number, min: 1, max: 5
            }
        }
    ],
    educatorId: [educatorSchema],
    educator: {
        type: String,
        ref: 'User',
        required: true
    },
    // educator: [
    //     {
    //         name: { type: String, required: true },
    // // educator:[ { name: { type: String, required: true },
    // email: { type: String, required: true },
    // imageUrl: {
    //     type: String,
    //     required: true
    // },
    // enrolledCourses: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:'Course'
    //     }
    // ]}],
    enrolledStudents: [{
        type:String, ref:'User'
    }]
}, { timestamps: true, minimize: false, strictPopulate:false })
const Course = mongoose.model('Course', courseSchema)
export default Course