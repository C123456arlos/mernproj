// import{ User }from "../models/User.js"
// import { clerkClient } from '@clerk/express'
// import { getAuth } from "@clerk/express"
// export const protect = async (req, res, next) => {
 
//     const { userId } = getAuth(req)
//     if (!userId) {
//         res.json({ success: false, message: 'not authenticated' })
//     } else {
//        const clerkUser = await clerkClient.users.getUser(userId);
//         const extractEmailFromUserInfo =
//             clerkUser.emailAddresses.find(
//                 (item) => item.id === clerkUser.primaryEmailAddressId,
//             ) || clerkUser.emailAddresses[0];
//         const image = clerkUser.imageUrl
//         const email = extractEmailFromUserInfo.emailAddress;
//         const name = clerkUser.firstName + ' ' + clerkUser.lastName


//         const newlyCreatedDbUser = await User.findOneAndUpdate(
//             {
//                 clerkUserId: userId,
//             },
//             {
//                 clerkUserId: userId,
//                 email,
//                 image,
//                 username: name
//             },
//             {
//                 new: true,
//                 upsert: true,
//                 setDefaultsOnInsert: true,
//             },
//         );
//         const user = userId
//         req.user = newlyCreatedDbUser

//         next()
//     }
// }

// export const protectOwner = async (req, res, next) => {
//     const { userId } = getAuth(req)
//     req.owner = userId
//     next()
// }





import { clerkClient } from "@clerk/express"
export const protectEducator = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)
        if (response.publicMetadata.role !== 'educator') {
            return res.json({success:false, message:'unauthorized access'})
        }
        next()
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}






















































// import { clerkClient } from "@clerk/express"
// export const protectAdmin = async (req, res, next) => {
//     try {
//         const { userId } = req.auth()
//         const user = await clerkClient.users.getUser(userId)
//         if (user.privateMetadata.role !== 'admin') {
//             return res.json({ success: false, message: 'not authorized' })
//         }
//         next()
//     } catch (error) {
//         return res.json({ success: false, message: 'not authorized' })
//     }
// }




// export const protect = async (req, res, next) => {

//     try {


//         console.log('SYNC BODY:', req.body);
//         const { userId } = req.auth
//         // const { userId } = getAuth(req);

//         if (!userId) {
//             throw new AppError(401, "User is not logged in. Means unauth user");
//         }

//         // const clerkUser = await clerkClient.users.getUser(userId);

// const extractEmailFromUserInfo =
//     clerkUser.emailAddresses.find(
//         (item) => item.id === clerkUser.primaryEmailAddressId,
//     ) || clerkUser.emailAddresses[0];

// const email = extractEmailFromUserInfo.emailAddress;

//         // const fullName = [clerkUser.firstName, clerkUser.lastName]
//         //     .filter(Boolean)
//         //     .join(" ")
//         //     .trim();

//         // const name = fullName || clerkUser.username;

//         // const raw = process.env.ADMIN_EMAILS || "";
//         // const adminEmails = new Set(
//         //     raw
//         //         .split(",")
//         //         .map((item) => item.trim().toLowerCase())
//         //         .filter(Boolean),
//         // );

//         // // if the current user is existing user or not
//         // // update/do nothing
//         // // create the user and save in our db with
//         // // role

// const existingUser = await User.findOne({ clerkUserId: userId });
// const shouldBeAdmin = email ? adminEmails.has(email.toLowerCase()) : false;

//         const nextRole =
//             existingUser?.role === "admin"
//                 ? "admin"
//                 : shouldBeAdmin
//                     ? "admin"
//                     : existingUser?.role || "user";

//         const newlyCreatedDbUser = await User.findOneAndUpdate(
//             {
//                 clerkUserId: userId,
//             },
//             {
//                 clerkUserId: userId,
//                 email,
//                 name,
//                 role: nextRole,
//             },
//             {
//                 new: true,
//                 upsert: true,
//                 setDefaultsOnInsert: true,
//             },
//         );
//         req.user = newlyCreatedDbUser
//         console.log(req.user._id)
//         console.log(req.user.role)
//         next()
//         res.status(200).json(
//             {
//                 success: true,
//                 user: {
//                     _id: newlyCreatedDbUser._id,
//                     clerkUserId: newlyCreatedDbUser.clerkUserId,
//                     email: newlyCreatedDbUser.email,
//                     name: newlyCreatedDbUser.name,
//                     // role: newlyCreatedDbUser.role,
//                 },
//             })

//     } catch (error) {
//         return res.json({ success: false, message: 'not authorized' })
//     }
// }



// authRouter.post(
//     "/sync",
//     requireAuth,

//     asyncHandler(async (req, res) => {
//         console.log('SYNC BODY:', req.body);
//         const { userId } = getAuth(req);

//         if (!userId) {
//             throw new AppError(401, "User is not logged in. Means unauth user");
//         }

//         const clerkUser = await clerkClient.users.getUser(userId);

//         const extractEmailFromUserInfo =
//             clerkUser.emailAddresses.find(
//                 (item) => item.id === clerkUser.primaryEmailAddressId,
//             ) || clerkUser.emailAddresses[0];

//         const email = extractEmailFromUserInfo.emailAddress;

//         const fullName = [clerkUser.firstName, clerkUser.lastName]
//             .filter(Boolean)
//             .join(" ")
//             .trim();

//         const name = fullName || clerkUser.username;

//         const raw = process.env.ADMIN_EMAILS || "";
//         const adminEmails = new Set(
//             raw
//                 .split(",")
//                 .map((item) => item.trim().toLowerCase())
//                 .filter(Boolean),
//         );

//         // if the current user is existing user or not
//         // update/do nothing
//         // create the user and save in our db with
//         // role

//         const existingUser = await User.findOne({ clerkUserId: userId });
//         const shouldBeAdmin = email ? adminEmails.has(email.toLowerCase()) : false;

// const nextRole =
//     existingUser?.role === "admin"
//         ? "admin"
//         : shouldBeAdmin
//             ? "admin"
//             : existingUser?.role || "user";

// const newlyCreatedDbUser = await User.findOneAndUpdate(
//     {
//         clerkUserId: userId,
//     },
//     {
//         clerkUserId: userId,
//         email,
//         name,
//         role: nextRole,
//     },
//     {
//         new: true,
//         upsert: true,
//         setDefaultsOnInsert: true,
//     },
// );

//         res.status(200).json(
//             ok({
//                 user: {
//                     id: newlyCreatedDbUser._id,
//                     clerkUserId: newlyCreatedDbUser.clerkUserId,
//                     email: newlyCreatedDbUser.email,
//                     name: newlyCreatedDbUser.name,
//                     role: newlyCreatedDbUser.role,
//                 },
//             }),
//         );
//     }),
// );
