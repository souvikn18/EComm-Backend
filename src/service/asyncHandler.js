//this is a higher order function that will take normal functions as parameters and converts those functions into async-await format

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        })
    }
}

export default asyncHandler;