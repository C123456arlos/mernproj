import stripe from 'stripe'
import {User} from '../models/User.js'
import { Webhook } from 'svix'
import { Purchase } from '../models/Purchase.js'
import Course from '../models/Course.js'
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
export const stripeWebhooks = async (request, response) => {
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)   
    const sig = request.headers['stripe-signature']
    // const payload = request.body.toString()
    const body= request.body
    const payload = JSON.stringify(body)
    let event
    try {
        // event= stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
        event= stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
         console.log('stripe error', error)
        response.status(400).send(`webhook event error ${error.message}`)     
    }
    try {
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object
            const paymentIntentId = paymentIntent.id
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })
            const { purchaseId } = session.data[0].metadata
            console.log('purchaseId', purchaseId)
            const purchaseData = await Purchase.findById(purchaseId)
            console.log('purchaseData', purchaseData)
            const userData = await User.findById(purchaseData.userId)
            const courseData = await Course.findById(purchaseData.courseId.toString())
            courseData.enrolledStudents.push(userData)
            await courseData.save()
            userData.enrolledCourses.push(courseData._id)
            await userData.save()
            purchaseData.status = 'completed'
            await purchaseData.save()
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object
            const paymentIntentId = paymentIntent.id
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })
            const { purchaseId } = session.data[0].metadata
            const purchaseData = await Purchase.findById(purchaseId)
            purchaseData.status = 'failed'
            await purchaseData.save()
            break;
        }
        default:
            console.log(`unhandled event type ${event.type}`)
    }
        response.json({ received: true })
    } catch (error) {
        console.log('stripe error', error)
        response.status(400).send(`webhook err ${error.message}`)
    }
}
// 9:59



// import stripe from 'stripe'
// import Booking from '../models/Bookings.js'
// // import { inngest } from '../inngest/index.js'
// export const stripeWebhooks = async (request, response) => {
//     console.log(request, 'request from stripewebhooks')
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
//     const sig = request.headers['stripe-signature']
//     let event
//     try {
//         event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (error) {
//         return response.status(400).send(`webhook error ${error.message}`)
//     }
//     try {
//         switch (event.type) {
//             case 'payment_intent.succeeded': {
//                 const paymentIntent = event.data.object
//                 const sessionList = await stripeInstance.checkout.sessions.list({
//                     payment_intent: paymentIntent.id
//                 })
//                 const session = sessionList.data[0]
//                 const { bookingId } = session.metadata
//                 await Booking.findByIdAndUpdate(bookingId, {
//                     isPaid: true,
//                     paymentLink: ''
//                 })
//                 // await inngest.send({
//                 //     name: 'app/show.booked',
//                 //     data: { bookingId }
//                 // })
//                 break;
//             }
//             default:
//                 console.log('unhandled event type', event.type)
//         }
//         response.json({
//             received: true
//         })
//     } catch (err) {
//         console.log('webhook processing error', err)
//         response.status(500).send('internal server error')
//     }
// }
