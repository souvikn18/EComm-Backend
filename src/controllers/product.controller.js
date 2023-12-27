import mongoose from "mongoose";
import formidable from "formidable";
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../service/customError.js"
import fs from 'fs'
import { s3FileUpload, s3fileDelete } from "../service/fileUpload.js";
import config from "../config/index.js";
import Product from "../models/product.schema.js"


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({multiples: true, keepExtensions: true});

    form.parse(req, async function(err, fields, files){
        if (err) {
            throw new CustomError(err.message || "Something went wrong", 500)
        }

        let productId = new mongoose.Types.ObjectId().toHexString()

        console.log(fields, files);

        if (!fields.name || !fields.price || !fields.collectionId) {
            throw new CustomError("Required fields", 500);
        }

        let imgArrayResp = Promise.all(
            Object.keys(files).map(async (file, index) => {
                const element = file[filekey];
                const data = fs.readFileSync(element.filepath)

                const upload = await s3FileUpload({
                    bucketName: config.S3_BUCKET_NAME,
                    key: `pruducts/${productId}/photos_${index + 1}.png`,
                    body: data,
                    contentType: element.mimetype
                })

                return{
                    secure_url : upload.Location
                }
            })
        )

        let imgArray = await imgArrayResp;

        const product = await Product.create({
            _id: productId,
            photo: imgArray,
            ...fields
        })

        if (!product) {
            throw new CustomError("Product creation failed", 500)
        }

        res.status(200).json({
            success: true,
            message: "Product added successfully",
            product
        })

    })
})

export const getAllProduct = asyncHandler(async(req, res) => {

    const products = await Product.find({})

    if (!products) {
        throw new CustomError("No products found", 404)
    }

    res.status(200).json({
        success: true,
        products
    })
})

export const getProductbyId = asyncHandler(async (req, res) => {
    const{id: productId} = req.params;

    const product = await Product.findById({productId})

    if (!product) {
        throw new CustomError("Product not found", 404);
    }

    res.status(200).json({
        success:true,
        product
    })
})

export const getProductbyCollectionId = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params;

    const product = await Product.findById({collectionId});

    if (!product) {
        throw new CustomError("Product not found", 404)
    }

    res.status(200).json({
        success:true,
        product
    })
})

export const deleteProduct = asyncHandler(async(req, res) => {
    const {id: productId} = req.params;

    const product = await Product.findById({productId});

    if (!product) {
        throw new CustomError("No products to be deleted", 500)
    }

    const deletePhoto = Promise.all(
        Product.photo.map(async(ele, index) => {
            await s3fileDelete({
                bucketName: config.S3_BUCKET_NAME,
                key: `products/${product._id.toString()}/photo_${index + 1}.png`
            })
        })
    )

    await deletePhoto;

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Deleted successfully"
    })
})

//For update remove photo and upload new photo : like a combo of addProduct and deleteProduct