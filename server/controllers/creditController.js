import { Purchase } from "../models/Purchase.js"
import Transaction from "../models/Transaction.js"
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'
import User from "../models/User.js"
import Course from "../models/Course.js"
const plans = [
        {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]
export const getPlans = async (req, res) => {
    try {
        res.json({success:true, plans})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
export const purchasePlan = async (req, res) => {
    try {
      

      




        const {courseId}= req.body
        const { planId } = req.body
        const userId = req.user._id
        
        const plan = plans.find(plan => plan._id === planId)
        if (!plan) {
            return res.json({success:false, message:'invalid plan'})
        }
        const dataPurchase = Purchase.findById('6aebaf1f80a6456a2038f000')
        dataPurchase.status='pending'
        const purchaseData = await Purchase.findOne({courseId})
        console.log(purchaseData)
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
        const transaction = await Transaction.create({
            userId: userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            isPaid:false
        })
        // console.log(purchaseData)
        // const date = Date.now()
        // console.log(date)
        const {origin} = req.headers
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: plan.price * 100,
                        product_data: {
                            name:plan.name
                        }
                    },
                    quantity:1
                }
            ],
            mode:'payment',
            success_url:`${origin}/loading`,
            cancel_url:`${origin}`,
            metadata:{transactionId:transaction._id.toString(), appId:'app', purchaseId:purchaseData._id.toString()},
            // expires_at: Math.floor(Date.now() / 1000) + 30 * 60
        })
        res.json({success:true, url:session.url})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}