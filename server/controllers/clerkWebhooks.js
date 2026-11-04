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

// export const stripeWebhooks = async (request, response) => {
//     console.log('request stripe', request)
//     const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
//     const sig = request.headers['stripe-signature']
//     // const payload = request.body.toString()
//     const body= request.body
//     const payload = JSON.stringify(body)
//     let event
//     try {
//         // event= stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//         event= stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (error) {
//          console.log('stripe error', error)
//         response.status(400).send(`webhook event error ${error.message}`)
//     }
//     try {
    // switch (event.type) {
    //     case 'payment_intent.succeeded': {
    //         const paymentIntent = event.data.object
    //         const paymentIntentId = paymentIntent.id
    //         const session = await stripeInstance.checkout.sessions.list({
    //             payment_intent:paymentIntentId
    //         })
    //         const { purchaseId } = session.data[0].metadata
    //         console.log('purchaseId', purchaseId)
    //         const purchaseData = await Purchase.findById(purchaseId)
    //         console.log('purchaseData', purchaseData)
    //         const userData = await User.findById(purchaseData.userId)
    //         const courseData = await Course.findById(purchaseData.courseId.toString())
    //         courseData.enrolledStudents.push(userData)
    //         await courseData.save()
    //         userData.enrolledCourses.push(courseData._id)
    //         await userData.save()
    //         purchaseData.status = 'completed'
    //         await purchaseData.save()
    //         break;
    //     }
    //     case 'payment_intent.payment_failed': {
    //         const paymentIntent = event.data.object
    //         const paymentIntentId = paymentIntent.id
    //         const session = await stripeInstance.checkout.sessions.list({
    //             payment_intent:paymentIntentId
    //         })
    //         const { purchaseId } = session.data[0].metadata
    //         const purchaseData = await Purchase.findById(purchaseId)
    //         purchaseData.status = 'failed'
    //         await purchaseData.save()
    //         break;
    //     }
    //     default:
    //         console.log(`unhandled event type ${event.type}`)
    // }
//         response.json({ received: true })
//     } catch (error) {
//         console.log('stripe error', error)
//         response.status(400).send(`webhook err ${error.message}`)
//     }
// }
const body=
{
    "id": "evt_3UY3BoIHXFA0eb7y1Xe2zaFI",
        "object": "event",
            "api_version": "2025-11-17.clover",
                "created": 1793794877,
                    "data": {
        "object": {
            "id": "pi_3UY3BoIHXFA0eb7y1u21L9uP",
                "object": "payment_intent",
                    "allowed_payment_method_types": [
                        "card",
                        "link"
                    ],
                        "amount": 100,
                            "amount_capturable": 0,
                                "amount_details": {
                "tip": { }
            },
            "amount_received": 100,
                "application": null,
                    "application_fee_amount": null,
                        "automatic_payment_methods": null,
                            "canceled_at": null,
                                "cancellation_reason": null,
                                    "capture_method": "automatic_async",
                                        "client_secret": "pi_3UY3BoIHXFA0eb7y1u21L9uP_secret_KY8RvmYnEAs0FsaYFBzLtRfiN",
                                            "confirmation_method": "automatic",
                                                "created": 1793794876,
                                                    "currency": "usd",
                                                        "customer": null,
                                                            "customer_account": null,
                                                                "description": null,
                                                                    "excluded_payment_method_types": null,
                                                                        "last_payment_error": null,
                                                                            "latest_charge": "ch_3UY3BoIHXFA0eb7y1RK697wA",
                                                                                "livemode": false,
                                                                                    "managed_payments": {
                "enabled": false
            },
            "metadata": { },
            "next_action": null,
                "on_behalf_of": null,
                    "payment_details": {
                "customer_reference": null,
                    "order_reference": "cs_test_a1CBXA8JUnhaovcsBK318zKqyKjeUyg5ExdDtmp4YppXuxJhDebO5lUETo"
            },
            "payment_method": "pm_1UY3BnIHXFA0eb7yiWFDL48x",
                "payment_method_configuration_details": null,
                    "payment_method_options": {
                "card": {
                    "installments": null,
                        "mandate_options": null,
                            "network": null,
                                "request_three_d_secure": "automatic"
                },
                "link": {
                    "persistent_token": null
                }
            },
            "payment_method_types": [
                "card",
                "link"
            ],
                "payment_record": null,
                    "presentment_details": {
                "presentment_amount": 1257,
                    "presentment_currency": "bob"
            },
            "processing": null,
                "receipt_email": null,
                    "review": null,
                        "setup_future_usage": null,
                            "shared_payment_granted_token": null,
                                "shipping": null,
                                    "source": null,
                                        "statement_descriptor": null,
                                            "statement_descriptor_suffix": null,
                                                "status": "succeeded",
                                                    "transfer_data": null,
                                                        "transfer_group": null
        }
    },
    "livemode": false,
        "pending_webhooks": 3,
            "request": {
        "id": null,
            "idempotency_key": "8311e35b-414c-4268-a1f9-cd92e781951c"
    },
    "type": "payment_intent.succeeded"
}








export const stripeWebhooks = async (request, response) => {
 console.log(request, 'request from stripewebhooks')
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
    const sig = request.headers['stripe-signature']
    console.log('sig', sig)
    const payload = JSON.stringify(body)
    // const endpointSecret='whsec_oRI74zxcSnxFOBhPSesgy15UvtvgbZBr'
    let event
    try {
        event = stripeInstance.webhooks.constructEvent(payload,
 sig,
 'whsec_QibV8vJroeRScGnM6INgPUqUkJkrpExy')
    } catch (error) {
        return response.status(400).send(`webhook error ${error.message}}`)
    }
    try {
        //     switch (event.type) {
        // case 'payment_intent.succeeded': {
        //     const paymentIntent = event.data.object
        //     const paymentIntentId = paymentIntent.id
        //     const session = await stripeInstance.checkout.sessions.list({
        //         payment_intent:paymentIntentId
        //     })
        //     const { purchaseId } = session.data[0].metadata
            
        //     const purchaseData = await Purchase.findById(purchaseId)
            
        //     const userData = await User.findById(purchaseData.userId)
        //     const courseData = await Course.findById(purchaseData.courseId.toString())
            courseData.enrolledStudents.push('6aea3bee5b8e27bab5ba9535')
            // courseData.enrolledStudents.push(userData)
            await courseData.save()
            userData.enrolledCourses.push('6aeb8e8268d5597ad9b5ba7c')
            // userData.enrolledCourses.push(courseData._id)
            await userData.save()
            purchaseData.status = 'completed'
            await purchaseData.save()
            // break;
        // }
        // case 'payment_intent.payment_failed': {
        //     const paymentIntent = event.data.object
        //     const paymentIntentId = paymentIntent.id
        //     const session = await stripeInstance.checkout.sessions.list({
        //         payment_intent:paymentIntentId
        //     })
        //     const { purchaseId } = session.data[0].metadata
        //     const purchaseData = await Purchase.findById(purchaseId)
        //     purchaseData.status = 'failed'
        //     await purchaseData.save()
        //     break;
        // }
        // default:
        //     console.log(`unhandled event type ${event.type}`)
    // }
        response.json({
            received: true
        })
    } catch (err) {
        console.log('webhook processing error', err)
        response.status(500).send('internal server error')
    }
}





// 9:59















































// import stripe from 'stripe'
// import {User} from '../models/User.js'
// import { Webhook } from 'svix'
// import { Purchase } from '../models/Purchase.js'
// import Course from '../models/Course.js'
// const clerkWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
//         const headers = {
//             'svix-id': req.headers['svix-id'],
//             'svix-signature': req.headers['svix-signature'],
//             'svix-timestamp': req.headers['svix-timestamp']
//         }
//         await whook.verify(JSON.stringify(req.body), headers)
//         const { data, type } = req.body
//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     username: data.first_name + '' + data.last_name,
//                     image: data.image_url,
//                 }
//                 await User.create(userData)
//                 break;
//             }
//             case 'user.updated': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     username: data.first_name + '' + data.last_name,
//                     image: data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 break;
//             }
//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id)
//                 break;
//             }
//             default:
//                 break;
//         }
//         res.json({ success: true, message: 'webhook received' })
//     } catch (error) {
//         console.log(error.message)
//         res.json({ success: false, message: error.message })
//     }
// }
// export default clerkWebhooks

// // export const stripeWebhooks = async (request, response) => {
// //     console.log('request stripe', request)
// //     const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
// //     const sig = request.headers['stripe-signature']
// //     // const payload = request.body.toString()
// //     const body= request.body
// //     const payload = JSON.stringify(body)
// //     let event
// //     try {
// //         // event= stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
// //         event= stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET)
// //     } catch (error) {
// //          console.log('stripe error', error)
// //         response.status(400).send(`webhook event error ${error.message}`)
// //     }
// //     try {
//     // switch (event.type) {
//     //     case 'payment_intent.succeeded': {
//     //         const paymentIntent = event.data.object
//     //         const paymentIntentId = paymentIntent.id
//     //         const session = await stripeInstance.checkout.sessions.list({
//     //             payment_intent:paymentIntentId
//     //         })
//     //         const { purchaseId } = session.data[0].metadata
//     //         console.log('purchaseId', purchaseId)
//     //         const purchaseData = await Purchase.findById(purchaseId)
//     //         console.log('purchaseData', purchaseData)
//     //         const userData = await User.findById(purchaseData.userId)
//     //         const courseData = await Course.findById(purchaseData.courseId.toString())
//     //         courseData.enrolledStudents.push(userData)
//     //         await courseData.save()
//     //         userData.enrolledCourses.push(courseData._id)
//     //         await userData.save()
//     //         purchaseData.status = 'completed'
//     //         await purchaseData.save()
//     //         break;
//     //     }
//     //     case 'payment_intent.payment_failed': {
//     //         const paymentIntent = event.data.object
//     //         const paymentIntentId = paymentIntent.id
//     //         const session = await stripeInstance.checkout.sessions.list({
//     //             payment_intent:paymentIntentId
//     //         })
//     //         const { purchaseId } = session.data[0].metadata
//     //         const purchaseData = await Purchase.findById(purchaseId)
//     //         purchaseData.status = 'failed'
//     //         await purchaseData.save()
//     //         break;
//     //     }
//     //     default:
//     //         console.log(`unhandled event type ${event.type}`)
//     // }
// //         response.json({ received: true })
// //     } catch (error) {
// //         console.log('stripe error', error)
// //         response.status(400).send(`webhook err ${error.message}`)
// //     }
// // }
// const body=
// {
//     "id": "evt_3UY3BoIHXFA0eb7y1Xe2zaFI",
//         "object": "event",
//             "api_version": "2025-11-17.clover",
//                 "created": 1793794877,
//                     "data": {
//         "object": {
//             "id": "pi_3UY3BoIHXFA0eb7y1u21L9uP",
//                 "object": "payment_intent",
//                     "allowed_payment_method_types": [
//                         "card",
//                         "link"
//                     ],
//                         "amount": 100,
//                             "amount_capturable": 0,
//                                 "amount_details": {
//                 "tip": { }
//             },
//             "amount_received": 100,
//                 "application": null,
//                     "application_fee_amount": null,
//                         "automatic_payment_methods": null,
//                             "canceled_at": null,
//                                 "cancellation_reason": null,
//                                     "capture_method": "automatic_async",
//                                         "client_secret": "pi_3UY3BoIHXFA0eb7y1u21L9uP_secret_KY8RvmYnEAs0FsaYFBzLtRfiN",
//                                             "confirmation_method": "automatic",
//                                                 "created": 1793794876,
//                                                     "currency": "usd",
//                                                         "customer": null,
//                                                             "customer_account": null,
//                                                                 "description": null,
//                                                                     "excluded_payment_method_types": null,
//                                                                         "last_payment_error": null,
//                                                                             "latest_charge": "ch_3UY3BoIHXFA0eb7y1RK697wA",
//                                                                                 "livemode": false,
//                                                                                     "managed_payments": {
//                 "enabled": false
//             },
//             "metadata": { },
//             "next_action": null,
//                 "on_behalf_of": null,
//                     "payment_details": {
//                 "customer_reference": null,
//                     "order_reference": "cs_test_a1CBXA8JUnhaovcsBK318zKqyKjeUyg5ExdDtmp4YppXuxJhDebO5lUETo"
//             },
//             "payment_method": "pm_1UY3BnIHXFA0eb7yiWFDL48x",
//                 "payment_method_configuration_details": null,
//                     "payment_method_options": {
//                 "card": {
//                     "installments": null,
//                         "mandate_options": null,
//                             "network": null,
//                                 "request_three_d_secure": "automatic"
//                 },
//                 "link": {
//                     "persistent_token": null
//                 }
//             },
//             "payment_method_types": [
//                 "card",
//                 "link"
//             ],
//                 "payment_record": null,
//                     "presentment_details": {
//                 "presentment_amount": 1257,
//                     "presentment_currency": "bob"
//             },
//             "processing": null,
//                 "receipt_email": null,
//                     "review": null,
//                         "setup_future_usage": null,
//                             "shared_payment_granted_token": null,
//                                 "shipping": null,
//                                     "source": null,
//                                         "statement_descriptor": null,
//                                             "statement_descriptor_suffix": null,
//                                                 "status": "succeeded",
//                                                     "transfer_data": null,
//                                                         "transfer_group": null
//         }
//     },
//     "livemode": false,
//         "pending_webhooks": 3,
//             "request": {
//         "id": null,
//             "idempotency_key": "8311e35b-414c-4268-a1f9-cd92e781951c"
//     },
//     "type": "payment_intent.succeeded"
// }








// export const stripeWebhooks = async (request, response) => {
//  console.log(request, 'request from stripewebhooks')
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
//     const sig = request.headers['stripe-signature']
    
//     const payload = JSON.stringify(body)
//     // const endpointSecret='whsec_oRI74zxcSnxFOBhPSesgy15UvtvgbZBr'
//     let event
//     try {
//         event = stripeInstance.webhooks.constructEvent(payload,
//  sig, 'whsec_QibV8vJroeRScGnM6INgPUqUkJkrpExy')
//     } catch (error) {
//         return response.status(400).send(`webhook error ${error.message}}`)
//     }
//     try {
//         // switch (event.type) {
//         //     case 'payment_intent.succeeded': {
//         //         const paymentIntent = event.data.object
//         //         const sessionList = await stripeInstance.checkout.sessions.list({
//         //             payment_intent: paymentIntent.id
//         //         })
//         //         const session = sessionList.data[0]
//         //         const { bookingId } = session.metadata
//         //         await Purchase.findByIdAndUpdate(bookingId, {
//         //             isPaid: true,
//         //             paymentLink: ''
//         //         })
//         //         // await inngest.send({
//         //         //     name: 'app/show.booked',
//         //         //     data: { bookingId }
//         //         // })
//         //         break;
//         //     }
//         //     default:
//         //         console.log('unhandled event type', event.type)
//         // }
//             switch (event.type) {
//         case 'payment_intent.succeeded': {
//             const paymentIntent = event.data.object
//             const paymentIntentId = paymentIntent.id
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent:paymentIntentId
//             })
//             const { purchaseId } = session.data[0].metadata
//             console.log('purchaseId', purchaseId)
//             const purchaseData = await Purchase.findById(purchaseId)
//             console.log('purchaseData', purchaseData)
//             const userData = await User.findById(purchaseData.userId)
//             const courseData = await Course.findById(purchaseData.courseId.toString())
//             courseData.enrolledStudents.push(userData)
//             await courseData.save()
//             userData.enrolledCourses.push(courseData._id)
//             await userData.save()
//             purchaseData.status = 'completed'
//             await purchaseData.save()
//             break;
//         }
//         case 'payment_intent.payment_failed': {
//             const paymentIntent = event.data.object
//             const paymentIntentId = paymentIntent.id
//             const session = await stripeInstance.checkout.sessions.list({
//                 payment_intent:paymentIntentId
//             })
//             const { purchaseId } = session.data[0].metadata
//             const purchaseData = await Purchase.findById(purchaseId)
//             purchaseData.status = 'failed'
//             await purchaseData.save()
//             break;
//         }
//         default:
//             console.log(`unhandled event type ${event.type}`)
//     }
//         response.json({
//             received: true
//         })
//     } catch (err) {
//         console.log('webhook processing error', err)
//         response.status(500).send('internal server error')
//     }
// }





// // 9:59



// // import stripe from 'stripe'
// // import Booking from '../models/Bookings.js'
// // // import { inngest } from '../inngest/index.js'
// // export const stripeWebhooks = async (request, response) => {
//     // console.log(request, 'request from stripewebhooks')
//     // const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
//     // const sig = request.headers['stripe-signature']
//     // let event
//     // try {
//     //     event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     // } catch (error) {
//     //     return response.status(400).send(`webhook error ${error.message}`)
//     // }
//     // try {
//     //     switch (event.type) {
//     //         case 'payment_intent.succeeded': {
//     //             const paymentIntent = event.data.object
//     //             const sessionList = await stripeInstance.checkout.sessions.list({
//     //                 payment_intent: paymentIntent.id
//     //             })
//     //             const session = sessionList.data[0]
//     //             const { bookingId } = session.metadata
//     //             await Booking.findByIdAndUpdate(bookingId, {
//     //                 isPaid: true,
//     //                 paymentLink: ''
//     //             })
//     //             // await inngest.send({
//     //             //     name: 'app/show.booked',
//     //             //     data: { bookingId }
//     //             // })
//     //             break;
//     //         }
//     //         default:
//     //             console.log('unhandled event type', event.type)
//     //     }
//     //     response.json({
//     //         received: true
//     //     })
//     // } catch (err) {
//     //     console.log('webhook processing error', err)
//     //     response.status(500).send('internal server error')
//     // }
// // }
