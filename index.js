import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app=express();
const PORT=8000;

import userRouter from './routes/user.routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose.connect('mongodb+srv://Recursive123:recursive123@recursive1.za2hlzu.mongodb.net/?retryWrites=true&w=majority&appName=Recursive1')
.then((e)=>console.log("MongoDB Connected"));


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

//app.use(express.json)
app.use("/uploads",express.static("uploads"));
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
    return res.render("home.ejs");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user',userRouter);
app.listen(PORT, () => {console.log(`Server started at PORT: ${PORT}`);});