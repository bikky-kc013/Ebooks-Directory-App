const express=require("express");
const app=express();
app.use(express.json());
const dotenv=require("dotenv");
dotenv.config();
const createError=require("http-errors");
const { connection }=require("./config/connection");
connection();
const { router }=require("./routes/bookRoute");


app.use(router);


app.get("/home",async(req,res,next)=>{
    res.send("This is a Home page");
});


app.use(async(req,res,next)=>{
    next(createError.NotFound("This page does  not exists"));
});

app.use(async(err,req,res,next)=>{
    res.status(500).json({
        message:err.message
    });
});


const PORT=process.env.PORT || 3000

app.listen(PORT, "127.0.0.1",()=>{
    console.log(`Listening to the port ${PORT}`);
})