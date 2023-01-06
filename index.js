const express = require ("express");
const app = express();
const dotenv = require("dotenv");
const route = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('DB Connection Success!'))
    .catch((err)=>{
        console.log(err)
    });

app.use('/', route);
app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend is running!");
})