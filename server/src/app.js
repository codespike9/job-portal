const express=require("express");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");

const apiRouter=require("./routes/apiRouter");
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api',apiRouter);

module.exports=app;
