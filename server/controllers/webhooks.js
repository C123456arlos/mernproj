import Stripe from 'stripe'
import Transaction from '../models/Transaction.js'
import User from '../models/User.js'
import { Purchase } from '../models/Purchase.js'
import Course from '../models/Course.js'
export const stripeWebhooks = async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const sig = request.headers['stripe-signature']
    let event
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return response.status(400).send(`webhook error ${error.message}`)
    }
    try {
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent:paymentIntent.id
                })
                const session = sessionList.data[0]
                const { transactionId, appId, purchaseId } = session.metadata
                if (appId === 'app') {
                     const purchaseData = await Purchase.findById(purchaseId)
        purchaseData.status = 'pending'
                    console.log(purchaseData)
                    await purchaseData.save()
        const courseDataId = purchaseData.courseId.toString()
        console.log('coursedataid', courseDataId)
        const courseData = await Course.findById(courseDataId)
                    courseData.enrolledStudents.push(purchaseData.userId)
                    await courseData.save()
        console.log('courseData', courseData)
        const userData = await User.findById(purchaseData.userId)
        userData.enrolledCourses.push(purchaseData.courseId)
                    console.log(userData) 
                    await userData.save()
                    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false })
                    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } })
                    transaction.isPaid = 'app'
                    await transaction.save()
                } else {
                    return response.json({received:true, message:'ignored event invalid app'})
                }
                break;
            }
            default:
                console.log('unhandled event type', event.type)
                break;
        }
        response.json({received:true})
    } catch (err) {
        console.error('webhook processing error', err)
        response.status(500).send('internal server error')
    }
}