// import { Webhook } from "svix"
// import User from '../models/User.js'
// export const clerkWebhooks = async (req, res) => {
//     try {
//         // const whook = new Webhook('whsec_yx60XjgRyO6XR0MbExSc6E4TeXl7k3hP')
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
//         // let evt
//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers['svix-id'],
//             'svix-timestamp': req.headeres['svix-timestamp'],
//             'svix-signature':req.headers['svix-signature']
//         })
//         // evt = whook.verify(JSON.stringify(req.body), {
//         //     "svix-id": req.headers['svix-id'],
//         //     'svix-timestamp': req.headeres['svix-timestamp'],
//         //     'svix-signature':req.headers['svix-signature']
//         // })
//         // console.log('evt', evt)
//         // const eventType= evt.type
//         const { data, type } = req.body
//         // switch (eventType) {
//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + ' ' + data.last_name,
//                     imageUrl: data.image_url,
//                 }
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.updated': {
//                       const userData = {
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + ' ' + data.last_name,
//                     imageUrl: data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }
//             default:
//                 break;
//         }
//     } catch (error) {
//         res.json({success:false, message:error.message})
//     }
// }


import User from '../models/User.js'
import { Webhook } from 'svix'
const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-signature': req.headers['svix-signature'],
            'svix-timestamp': req.headers['svix-timestamp']
        }
        await whook.verify(JSON.stringify(req.body), headers)
        const { data, type } = req.body
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + '' + data.last_name,
                    image: data.image_url,
                }
                await User.create(userData)
                break;
            }
            case 'user.updated': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + '' + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                break;
            }
            default:
                break;
        }
        res.json({ success: true, message: 'webhook received' })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
export default clerkWebhooks




// import { httpRouter } from "convex/server"
// import { Webhook } from 'svix'
// import { api } from './_generated/api'
// import { httpAction } from "./_generated/server"
// const http = httpRouter()
// http.route({
//     path: '/clerk-webhook', 
//     method: 'POST',
//     handler: httpAction(async (ctx, request) => {

//         const webhookSecret = 'whsec_duoJu5O4OzrieUJgGip+sq5bJXf5zTiH'
//         // console.log(webhookSecret, 'webhooksecret')
//         if (!webhookSecret) {
//             throw new Error('missing CLERK_WEBHOOK_SECRET environment variable')
//         }
//         const svix_id = request.headers.get('svix-id')
//         // console.log('svix-id', svix_id)
//         const svix_signature = request.headers.get('svix-signature')
//         // console.log('svix-signature', svix_signature)
//         const svix_timestamp = request.headers.get('svix-timestamp')
//         // console.log('svix-timestamp', svix_timestamp)
//         if (!svix_id || !svix_signature || !svix_timestamp) {
//             return new Response('error occurred no svix headers', {
//                 status:400
//             })
//         }
//                 const headers = {
//   "svix-id": svix_id,
//   "svix-timestamp": svix_timestamp,
//   "svix-signature": svix_signature,
// };
// console.log('headers ', headers)
//         // const payload = '{"test":123}'
//         const payload = await request.json()
        
//         const body = JSON.stringify(payload)
        
//         const wh = new Webhook('whsec_duoJu5O4OzrieUJgGip+sq5bJXf5zTiH')
//         let evt: any
//         try {
//             // evt = wh.verify(body, headers) as any
//             evt = wh.verify(body, {
//                 'svix-id': svix_id,
//                 'svix-timestamp': svix_timestamp,
//                 'svix-signature':svix_signature
//             }) as any

//         console.log('evt', evt)
//         } catch (error) {
//             console.error('error verifying webhook', error)
//           return new Response('error occurred', {status:400})  
//         }
//         // const eventType = payload.type
//         const eventType = evt.type
        
//         if (eventType === 'user.created') {
//             // const { id, email_addresses, first_name, last_name, image_url } = payload.data
//             const { id, email_addresses, first_name, last_name, image_url } = evt.data
//             const email = email_addresses[0].email_address
//             const name = `${first_name || ''}${last_name || ''}`.trim()
//             try {
//                 await ctx.runMutation(api.users.createUser, {
//                     email, fullName: name, image: image_url, clerkId: id,
//                     username:email.split('@')[0]
//                 })
//             } catch (error) {
//                 console.log('error creating user', error)
//                 return new Response('error creating user', {status:500})
//             }
//         }
//         return new Response('webhook processed successfully', {status:200})
//     })
// })
// export default http