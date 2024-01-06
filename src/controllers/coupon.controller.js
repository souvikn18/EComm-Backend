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

export const UpdateCoupon = asyncHandler(async (req, res) => {
    const {action} = req.body;
    const {id: coupunId} = req.params;

    const couponToUpdate = await Coupon.findByIdAndUpdate(coupunId, {
        active: action
    }, {
        new: true,
        runValidators: true
    })

    if (!couponToUpdate) {
        throw new CustomError("Nothing to update", 500)
    }

    res.status(200).json({
        success: true,
        message: "Coupon updated successfully!",
        couponToUpdate
    })
})

export const DisableCoupon = asyncHandler(async(req, res) => {
    const {active} = req.body;

    if (!active) {
        throw new CustomError("Coupon is already disabled", 500)
    }

    const couponToDisable = await Coupon.findOne({active})

    if (!couponToDisable) {
        throw new CustomError("No coupon found to disable", 404)
    }

    const disabledCoupon = couponToDisable.set(false)

    res.status(200).json({
        success: true, 
        message: "Coupon diabled",
        disabledCoupon
    })
})

export const getAllCoupon = asyncHandler(async(req, res) => {
    const coupon = await Coupon.find({})

    if (!coupon) {
        throw new CustomError("No coupon found", 404)
    }

    res.status(200).json({
        success: true,
        coupon
    })
})

export const deleteCoupon = asyncHandler(async(req, res) => {
    const {id: couponId} = req.params

    const couponToDelete = await Coupon.findByIdAndDelete(couponId)

    if (!couponToDelete) {
        throw new CustomError("Coupon not found", 400)
    }

    res.status(200).json({
        success: true,
        message: "Coupon deleted"
    })
})