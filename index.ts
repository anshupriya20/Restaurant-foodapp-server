import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute";
import restaurantRoute from "./routes/restaurantRoute";
import menuRoute from "./routes/menuRoute";
// import orderRoute from "./routes/orderRoute";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const DIRNAME = path.resolve();

// Middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
// app.use("/api/v1/order", orderRoute);

app.use(express.static(path.join(DIRNAME, "client/dist")));
app.use("*", (_: any, res: { sendFile: (arg0: any) => void; }) => {
    res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening at port ${PORT}`);
});
