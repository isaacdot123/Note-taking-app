import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "../src/middleware/rateLimiter.js";
import dotenv from "dotenv";                        //access dotenv variables
import cors from "cors";



dotenv.config();                                    //display the dotenv variables

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);
connectDB().then(()=> {
    app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
})


//mongodb+srv://dumaplinisaac13_db_user:isaac@cluster0.pf5bzh1.mongodb.net/?appName=Cluster0