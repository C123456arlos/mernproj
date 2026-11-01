import swe from '../assets/app-development.png'
import logo from '../assets/building.png'
import user from '../assets/user.png'
import star from '../assets/star.png'
import starfill from '../assets/starfill.png'
import graduate from '../assets/graduate.png'
export const assets = {
    logo, user,star, starfill, graduate
}
export const dummyEducatorData = {
    "_id": "1",
    "name": "person",
    "email": "mail@example.com",
    "imageUrl": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    "createdAt": "2024-12-12T10:56:17.930Z",
    "updatedAt": "2024-12-12T10:56:17.930Z",
    "_v":0
}
export const dummyTestimonial = [
    {
        name: "person name",
        role: "swe 1 @ amazon",
        image: swe,
        rating: 5,
        feedback:'using the app for nearly two years and it has been incredibly user-friendly'
    },
    {
        name: "person two",
        role: "swe 2 @ samsung",
        image: swe,
        rating: 4,
        feedback:'using the app for nearly two years and it has been incredibly user-friendly'
    }
]
export const dummyDashboardData = {
    'totalEarnings': 707.38,
    'enrolledStudentsData': [
        {
            'courseTitle': 'introduction to javascript',
            'student': {
                "_id": '1',
                "name": 'two',
                "imageUrl": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            }
        },
        {
            'courseTitle': 'introduction to javascript',
            'student': {
                "_id": '2',
                "name": 'two',
                "imageUrl": "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            }
        }
    ],
    'totalCourses':2
}
export const dummyStudentEnrolled = [
    {
        "student": {
            "_id": "1",
            "name": "three",
            'imageUrl':"https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
        },
        "courseTitle": "introduction to javascript",
        "purchaseDate":"2024-12-20T08:39:55.509Z"
    }
]
export const dummyCourses = [
    {
        "_id": "1",
        "courseTitle": "python crash course",
        // "courseRatings":5,
           'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
        ],
              'enrolledStudents': [
                    'user1',
                    'user2'
                ],
        "courseDescription": "<h2>learn the basics of javascript</h2><div><p>javascript is a versatile programming language that powers the web</p><p>this course is perfect for beginners</p><li>create dynamic web applications</li><li>create dynamic web applications</li></div>",
        'coursePrice': 49.99,
        'isPublished': true,
        'discount': 20,
        'courseContent': [
            {
                'chapterId': 'chapter1',
                'chapterOrder': 1,
                'chapterTitle': 'getting started with javascript',
                'chapterContent': [
                    {
                        'lectureId': 'lecture1',
                        'lectureTitle': 'what is javascript',
                        'lectureDuration': 16,
                        'lectureUrl': 'https://youtu.be/CBWnBi-awSA',
                        'isPreviewFree': true,
                        'lectureOrder': 1,
                    },
                    {
                                'lectureId': 'lecture2',
                                'lectureTitle': 'what is javascript',
                       'lectureDuration':19,
                        'lectureUrl': 'https://youtu.be/',
                                'isPreviewFree': true,
                                'lectureOrder':1
                    }
                        ],
                'educator': '123',
                'enrolledStudents': [
                    'user1',
                    'user2'
                ],
                'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
                ],
                'createdAt': '2024-12-17T08:16:53.622Z',
                'updatedAt': '2024-12-31T05:31:27.290Z',
                '__v': 2,
                // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
            },
        ],
        'courseThumbnail':'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    },
    {
        "_id": "2",
        "courseTitle": "introduction to javascript",
        // "courseRatings":5,
           'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
        ],
              'enrolledStudents': [
                    'user1',
                    'user2'
                ],
       "courseDescription": "<h2>learn the basics of javascript</h2><div><p>javascript is a versatile programming language that powers the web</p><p>this course is perfect for beginners</p><li>create dynamic web applications</li></div>",
        'coursePrice': 49.99,
        'isPublished': true,
        'discount': 20,
        'courseContent': [
            {
                'chapterId': 'chapter1',
                'chapterOrder': 1,
                'chapterTitle': 'getting started with javascript',
                'chapterContent': [
                    {
                        'lectureId': 'lecture1',
                        'lectureTitle': 'what is javascript',
                        'lectureDuration': 16,
                        'lectureUrl': 'https://youtu.be/CBWnBi-awSA',
                        'isPreviewFree': true,
                        'lectureOrder': 1,
                    },
                    {
                                'lectureId': 'lecture2',
                                'lectureTitle': 'what is javascript',
                       'lectureDuration':19,
                        'lectureUrl': 'https://youtu.be/',
                                'isPreviewFree': true,
                                'lectureOrder':1
                    }
                        ],
                'educator': '123',
                'enrolledStudents': [
                    'user1',
                    'user2'
                ],
                // 'courseRatings': [
                //     {
                //         'userId': '1',
                //         'rating': 5,
                //         '_id':'1'
                //     }
                // ],
                'createdAt': '2024-12-17T08:16:53.622Z',
                'updatedAt': '2024-12-31T05:31:27.290Z',
                '__v': 2,
                // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
            },
        ],
        
        'courseThumbnail':'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    },
    {
        "_id": "3",
        "courseTitle": "introduction to javascript",
        // "courseRatings":5,
           'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
        ],
              'enrolledStudents': [
                    'user1',
                    'user2'
                ],
       "courseDescription": "<h2>learn the basics of javascript</h2><div><p>javascript is a versatile programming language that powers the web</p><p>this course is perfect for beginners</p><li>create dynamic web applications</li></div>",
        'coursePrice': 49.99,
        'isPublished': true,
        'discount': 20,
        'courseContent': [
            {
                'chapterId': 'chapter1',
                'chapterOrder': 1,
                'chapterTitle': 'getting started with javascript',
                'chapterContent': [
                    {
                        'lectureId': 'lecture1',
                        'lectureTitle': 'what is javascript',
                        'lectureDuration': 16,
                        'lectureUrl': 'https://youtu.be/CBWnBi-awSA',
                        'isPreviewFree': true,
                        'lectureOrder': 1,
                    },
                    {
                                'lectureId': 'lecture2',
                                'lectureTitle': 'what is javascript',
                       'lectureDuration':19,
                        'lectureUrl': 'https://youtu.be/',
                                'isPreviewFree': true,
                                'lectureOrder':1
                    }
                        ],
                'educator': '123',
                'enrolledStudents': [
                    'user1',
                    'user2'
                ],
                'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
                ],
                'createdAt': '2024-12-17T08:16:53.622Z',
                'updatedAt': '2024-12-31T05:31:27.290Z',
                '__v': 2,
                // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
            },
        ],
        'courseThumbnail':'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    },
    {
        "_id": "4",
        "courseTitle": "introduction to javascript",
        // "courseRatings":5,
           'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
        ],
              'enrolledStudents': [
                    'user1',
                    'user2'
                ],
        "courseDescription": "<h2>learn the basics of javascript</h2><div><p>javascript is a versatile programming language that powers the web</p><p>this course is perfect for beginners</p><li>create dynamic web applications</li><li>create dynamic web applications</li></div>",
        'coursePrice': 49.99,
        'isPublished': true,
        'discount': 20,
        'courseContent': [
            {
                'chapterId': 'chapter1',
                'chapterOrder': 1,
                'chapterTitle': 'getting started with javascript',
                'chapterContent': [
                    {
                        'lectureId': 'lecture1',
                        'lectureTitle': 'what is javascript',
                        'lectureDuration': 16,
                        'lectureUrl': 'https://youtu.be/CBWnBi-awSA',
                        'isPreviewFree': true,
                        'lectureOrder': 1,
                    },
                    {
                                'lectureId': 'lecture2',
                                'lectureTitle': 'what is javascript',
                       'lectureDuration':19,
                        'lectureUrl': 'https://youtu.be/',
                                'isPreviewFree': true,
                                'lectureOrder':1
                    }
                        ],
                'educator': '123',
                'enrolledStudents': [
                    'user1',
                    'user2'
                ],
                'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
                ],
                'createdAt': '2024-12-17T08:16:53.622Z',
                'updatedAt': '2024-12-31T05:31:27.290Z',
                '__v': 2,
                // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
            },
            {
                'chapterId': 'chapter2',
                'chapterOrder': 1,
                'chapterTitle': 'getting started with javascript',
                'chapterContent': [
                    {
                        'lectureId': 'lecture1',
                        'lectureTitle': 'what is javascript',
                        'lectureDuration': 16,
                        'lectureUrl': 'https://youtu.be/CBWnBi-awSA',
                        'isPreviewFree': true,
                        'lectureOrder': 1,
                    },
                    {
                                'lectureId': 'lecture2',
                                'lectureTitle': 'what is javascript',
                       'lectureDuration':19,
                        'lectureUrl': 'https://youtu.be/',
                                'isPreviewFree': true,
                                'lectureOrder':1
                    }
                        ],
                'educator': '123',
                'enrolledStudents': [
                    'user1',
                    'user2'
                ],
                'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
                ],
                'createdAt': '2024-12-17T08:16:53.622Z',
                'updatedAt': '2024-12-31T05:31:27.290Z',
                '__v': 2,
                // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
            },
            {
                'chapterId': 'chapter3',
                'chapterOrder': 1,
                'chapterTitle': 'getting started with javascript',
                'chapterContent': [
                    {
                        'lectureId': 'lecture1',
                        'lectureTitle': 'what is javascript',
                        'lectureDuration': 16,
                        'lectureUrl': 'https://youtu.be/CBWnBi-awSA',
                        'isPreviewFree': true,
                        'lectureOrder': 1,
                    },
                    {
                                'lectureId': 'lecture2',
                                'lectureTitle': 'what is javascript',
                       'lectureDuration':19,
                        'lectureUrl': 'https://youtu.be/',
                                'isPreviewFree': true,
                                'lectureOrder':1
                    }
                        ],
                'educator': '123',
                'enrolledStudents': [
                    'user1',
                    'user2'
                ],
                'courseRatings': [
                    {
                        'userId': '1',
                        'rating': 5,
                        '_id':'1'
                    }
                ],
                'createdAt': '2024-12-17T08:16:53.622Z',
                'updatedAt': '2024-12-31T05:31:27.290Z',
                '__v': 2,
                // 'courseThumbnail':'https://img.youtube.com/vi/lpx2xFkapIk'
            }
        ],
        'courseThumbnail':'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    }
]