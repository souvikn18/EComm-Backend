import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import route from "./routes/index.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

app.use("/api/v1", route)

app.get("/", (_req, res) => {
    res.send("Hello there")
})

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false, 
        message: "Route not found"
    })
})

export default app;