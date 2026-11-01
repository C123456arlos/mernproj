// import mongoose from "mongoose"
// const connectDB = async () => {
//     mongoose.connection.on('connected', () => console.log('database connected'))
//     await mongoose.connect(`${process.env.MONGODB_URI}/new-app`)
// }
// export default connectDB
import mongoose from "mongoose"
const connectDB = () => {
    try {
        mongoose.connection.on('connected', () => console.log('database connected'))
        mongoose.connect(`${process.env.MONGODB_URI}/mernapp`)
    } catch (error) {
        console.log(error.message)
    }
}
export default connectDB