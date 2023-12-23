require("dotenv").config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router.js');

app.use(express.json());
app.use("/api/users",userRouter)

app.listen(4100,()=>{
    console.log("server is up and running on port: " + process.env.APP_PORT);
})