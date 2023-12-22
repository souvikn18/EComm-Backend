import dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/ecomm",
    JWT_SECRET: process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",

    S3_ACCESS_KEY: "KEY VALUE",
    S3_SECRET_ACCESS_KEY: "SECRET KEY VALUE",
    S3_BUCKET_NAME: "BUCKET NAME",
    S3_REGION: "REGION NAME"
}

export default config;