import Collection from "../models/collection.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError";


export const createCollection = asyncHandler(async (req, res) => {
    const {name} = req.body;

    if (!name) {
        throw new CustomError("Name is required", 400)
    }

    const collection = await Collection.create({
        name
    })

    res.status(200).json({
        success: true,
        message: "Collection created successfully!",
        collection
    })
})

export const updateCollection = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const {id: collectionId} = req.params;

    if (!name) {
        throw new CustomError("Need a name to update", 400)
    }

    const updatedcollection = await Collection.findByIdAndUpdate(collectionId, {
        name
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message:"Collection updated!",
        updatedcollection
    })
})

export const deleteCollection = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params;

    const collectiontodelete = await Collection.findById(collectionId);

    if (!collectiontodelete) {
        throw new CustomError("Nothing to delete", 400);
    }

    collectiontodelete.remove()

    res.status(200).json({
        success: true, 
        message: "Collection deleted"
    })

})

export const getAllCollection = asyncHandler(async (req, res) => {
    const collectins = await Collection.find();

    if (!collectins) {
        throw new CustomError("No collection found", 400)
    }

    res.status(200).json({
        success: true,
        collectins
    })
})