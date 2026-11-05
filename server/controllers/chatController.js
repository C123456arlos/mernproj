import Chat from "../models/Chat.js"
import { Purchase } from "../models/Purchase.js"

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id
        const chatData = {
            userId,
            messages: [],
            name: 'new chat',
            username:req.user.name
        }
        await Chat.create(chatData)
        res.json({success:true, message:'chat created'})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
        // const purchaseData = await Purchase.find()
        // const purchaseData = await Purchase.findByIdAndUpdate('6aebaf1f80a6456a2038f000', { status: 'completed' }, { new: true })
        // console.log('purchaseData', purchaseData)
        // await purchaseData.save()
        //    const purchase = await Purchase.findOne({ _id: '6aebaf1f80a6456a2038f000' })
        //             purchase.status = 'pending'
        res.json({success:true, chats})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id
        const { chatId } = req.body
        await Chat.deleteOne({ _id: chatId, userId })
        res.json({success:true, message:'chat deleted'})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}