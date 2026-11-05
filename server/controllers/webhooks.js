import Stripe from 'stripe'
import Transaction from '../models/Transaction.js'
import User from '../models/User.js'
import { Purchase } from '../models/Purchase.js'
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
                const { transactionId, appId } = session.metadata
                if (appId === 'app') {
                    const purchase = await Purchase.findByIdAndUpdate('6aebaf1f80a6456a2038f000', { status: 'completed' }, { new: true })
                    await purchase.save()
                    //  const purchaseData = await Purchase.findByIdAndUpdate('6aebaf1f80a6456a2038f000', { status: 'pending' }, { new: true })
                    // await purchaseData.save()
                    // const purchase = await Purchase.findOne({ _id: '6aebaf1f80a6456a2038f000' })
                    // purchase.status = 'pending'
                    // await purchase.save()
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