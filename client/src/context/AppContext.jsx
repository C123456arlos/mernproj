import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useAuth } from '@clerk/react'
import { toast } from 'react-hot-toast'
import { dummyCourses } from '../assets/assets'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const { getToken } = useAuth()
    const { user } = useUser()
    const [isOwner, setIsOwner] = useState(false)
    const [showHotelReg, setShowHotelReg] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])
    const [rooms, setRooms] = useState([])
    const currency = import.meta.env.VITE_CURRENCY
    const navigate=useNavigate()
    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])
   
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }
    useEffect(() => {
        fetchAllCourses()
    }, [allCourses])
    
    useEffect(() => {
        fetchAllCourses()
        fetchUserEnrolledCourses()
    })
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating+=rating.rating
        })
        return totalRating/course.courseRatings.length
    }
    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizeDuration(time*60*1000, {units:['h', 'm']})
    }
    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture)=>time += lecture.lectureDuration
        ))
        return humanizeDuration(time*60*1000, {units:['h', 'm']})
    }
    const calculateLecturesNum = (course) => {
        let totalLectures = 0
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures+=chapter.chapterContent.length
            }
        })
        return totalLectures
    } 
    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses)
    }
    useEffect(() => {
         fetchUserEnrolledCourses()
    }, [enrolledCourses])
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })

            if (data.success) {
                setIsOwner(data.role === 'hotelOwner')

                setSearchedCities(data.recentSearchedCities)
            } else {
                setTimeout(() => {
                    fetchUser()
                }, 5000)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const logToken = async () => {
        console.log(await getToken())
    }
    useEffect(() => {
        if (user) {
            logToken()
        }
    }, [user])
    useEffect(() => {
        if (user) {
            fetchUser()
        }
    }, [user])
    useEffect(() => {
        fetchRooms()
    }, [])
    console.log(rooms)
    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, axios,
        showHotelReg, setShowHotelReg, searchedCities, setSearchedCities,
        rooms, setRooms,       currency, allCourses, navigate,
        calculateRating, isEducator, setIsEducator, calculateLecturesNum, calculateCourseDuration,
        calculateChapterTime, enrolledCourses, fetchUserEnrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext)








// import axios from 'axios'
// import { createContext, useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useUser, useAuth } from '@clerk/react'
// import { toast } from 'react-hot-toast'

// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
// export const AppContext = createContext()
// // export const AppContext = createContext()
// export const AppProvider = ({ children }) => {
//     const { getToken } = useAuth()
//     const [isOwner, setIsOwner] = useState(false)
//     const [showHotelReg, setShowHotelReg] = useState(false)
//     const [searchedCities, setSearchedCities] = useState([])
//     const [rooms, setRooms] = useState([])
//     const { user } = useUser()
//     const currency = import.meta.env.VITE_CURRENCY
//     const navigate=useNavigate()
//     const [allCourses, setAllCourses] = useState([])
//     const [isEducator, setIsEducator] = useState(true)
//     const [enrolledCourses, setEnrolledCourses] = useState([])
   
//     const fetchAllCourses = async () => {
//         setAllCourses(dummyCourses)
//     }
//     useEffect(() => {
//         fetchAllCourses()
//     }, [allCourses])
    
//     const calculateRating = (course) => {
//         if (course.courseRatings.length === 0) {
//             return 0
//         }
//         let totalRating = 0
//         course.courseRatings.forEach(rating => {
//             totalRating+=rating.rating
//         })
//         return totalRating/course.courseRatings.length
//     }
//     const calculateChapterTime = (chapter) => {
//         let time = 0
//         chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
//         return humanizeDuration(time*60*1000, {units:['h', 'm']})
//     }
//     const calculateCourseDuration = (course) => {
//         let time = 0
//         course.courseContent.map((chapter) => chapter.chapterContent.map(
//             (lecture)=>time += lecture.lectureDuration
//         ))
//         return humanizeDuration(time*60*1000, {units:['h', 'm']})
//     }
//     const calculateLecturesNum = (course) => {
//         let totalLectures = 0
//         course.courseContent.forEach(chapter => {
//             if (Array.isArray(chapter.chapterContent)) {
//                 totalLectures+=chapter.chapterContent.length
//             }
//         })
//         return totalLectures
//     }
//     const fetchUserEnrolledCourses = async () => {
//         setEnrolledCourses(dummyCourses)
//     }
//     useEffect(() => {
//          fetchUserEnrolledCourses()
//     }, [enrolledCourses])
//     const fetchRooms = async () => {
//         try {
//             const { data } = await axios.get('/api/rooms')
//             if (data.success) {
//                 setRooms(data.rooms)
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }
//     const fetchUser = async () => {
//         try {
//             const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })

//             if (data.success) {
//                 setIsOwner(data.role === 'hotelOwner')

//                 setSearchedCities(data.recentSearchedCities)
//             } else {
//                 setTimeout(() => {
//                     fetchUser()
//                 }, 5000)
//             }
//         } catch (error) {
//             toast.error(error.message)
//         }
//     }
//     useEffect(() => {
//         if (user) {
//             fetchUser()
//         }
//     }, [user])
//     useEffect(() => {
//         fetchRooms()
//     }, [])
//     console.log(rooms)
//     const value = {
//         currency, navigate, user, getToken, isOwner, setIsOwner, axios,
//         showHotelReg, setShowHotelReg, searchedCities, setSearchedCities,
//         rooms, setRooms,       currency, allCourses, navigate,
//         calculateRating, isEducator, setIsEducator, calculateLecturesNum, calculateCourseDuration,
//         calculateChapterTime, enrolledCourses, fetchUserEnrolledCourses
//     }
//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }
// export const useAppContext = () => useContext(AppContext)





// // import axios from 'axios'
// // import { createContext, useContext, useEffect, useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { useUser, useAuth } from '@clerk/react'
// // import { toast } from 'react-hot-toast'

// // axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
// // export const AppContext = createContext()
// // export const AppProvider = ({ children }) => {
// //     const currency = import.meta.env.VITE_CURRENCY || '$'
// //     const navigate = useNavigate()
// //     const { user } = useUser()
// //     const { getToken } = useAuth()
// //     const [isOwner, setIsOwner] = useState(false)
// //     const [showHotelReg, setShowHotelReg] = useState(false)
// //     const [searchedCities, setSearchedCities] = useState([])
// //     const [rooms, setRooms] = useState([])
// //     const fetchRooms = async () => {
// //         try {
// //             const { data } = await axios.get('/api/rooms')
// //             if (data.success) {
// //                 setRooms(data.rooms)
// //             } else {
// //                 toast.error(data.message)
// //             }
// //         } catch (error) {
// //             toast.error(error.message)
// //         }
// //     }
// //     const fetchUser = async () => {
// //         try {
// //             const { data } = await axios.get('/api/user', { headers: { Authorization: `Bearer ${await getToken()}` } })

// //             if (data.success) {
// //                 setIsOwner(data.role === 'hotelOwner')

// //                 setSearchedCities(data.recentSearchedCities)
// //             } else {
// //                 setTimeout(() => {
// //                     fetchUser()
// //                 }, 5000)
// //             }
// //         } catch (error) {
// //             toast.error(error.message)
// //         }
// //     }
// //     useEffect(() => {
// //         if (user) {
// //             fetchUser()
// //         }
// //     }, [user])
// //     useEffect(() => {
// //         fetchRooms()
// //     }, [])
// //     console.log(rooms)
// //     const value = {
// //         currency, navigate, user, getToken, isOwner, setIsOwner, axios,
// //         showHotelReg, setShowHotelReg, searchedCities, setSearchedCities,
// //         rooms, setRooms
// //     }
// //     return (
// //         <AppContext.Provider value={value}>
// //             {children}
// //         </AppContext.Provider>
// //     )
// // }
// // export const useAppContext = () => useContext(AppContext)
