const express = require("express");
const dotenv = require('dotenv').config();
const dbConnect = require("./config/dbConnect"); //importing dbconnect function
const app = express();
const authRoutes = require("./routes/authRoutes");



dbConnect(); //calling function to connect to database
// middleware
app.use(express.json());

// Routes
app.use("/api/auth",authRoutes);
// start the server
const PORT = process.env.PORT || 7002; //process= to get value from .env || or operator
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${PORT} `);
    
}) 
