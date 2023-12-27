import Coupon from "../models/coupon.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../service/customError.js"

export const AddCoupon = asyncHandler(async (req, res) => {
    const {code, discount} = req.body;

    if (!code) {
        throw new CustomError("Code is required", 500)
    }

    const coupon = await Coupon.create({
        code,
        discount
    })

    if (!coupon) {
        throw new CustomError("No coupon found", 404)
    }

    res.status(200).json({
        success: true,
        message: "Coupon added successfully",
        coupon
    })

})