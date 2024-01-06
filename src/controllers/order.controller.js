import Order from "../models/order.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../service/customError.js"

export const placeOrder = asyncHandler(async (req, res) => {
    const {id: orderId} = req.params;
    const {product, user, address, phone, ammount, coupon, transactionId, status} = req.body;
})