import mongoose from "mongoose"
const connectDB = () => {
    try {
        mongoose.connection.on('connected', () => console.log('database connected'))
        mongoose.connect(`${process.env.MONGODB_URI}/my-new-app`)
    } catch (error) {
        console.log(error.message)
    }
}
export default connectDB
// import mongoose from "mongoose"
// const connectDB = () => {
//     try {
//         mongoose.connection.on('connected', () => console.log('database connected'))
//         mongoose.connect(`${process.env.MONGODB_URI}/new-app`)
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// export default connectDB