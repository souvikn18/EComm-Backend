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
    S3_REGION: "REGION NAME",

    SMTM_MAIL_HOST: process.env.SMTM_MAIL_HOST,
    SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
    SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    SMTP_SENDER_EMAILL: process.env.SMTP_SENDER_EMAILL
}

export default config;