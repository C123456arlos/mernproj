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