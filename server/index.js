import express from "express";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);

app.use(notFound);
app.use(errorHandler);

const port = 9000;



app.listen(port,() => {
    connectdb();
    console.log(`App running on port :: ${port}`);
})

