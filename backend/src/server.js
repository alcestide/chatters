import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js";
import * as path from "node:path";


dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`)
    connectDB()
}
);


