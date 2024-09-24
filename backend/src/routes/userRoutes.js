const express = require("express");
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRole = require("../middlewares/roleMiddleware");
const router = express.Router();

//only adin can access this router
router.get('/admin',verifyToken,authorizeRole("admin"),(req,res)=>{
    res.json({message: "Welcome admin"});
});

//All can access this router
router.get('/user',verifyToken,authorizeRole("admin","user"),(req,res)=>{
    res.json({message: "Welcome user"});
});

module.exports = router;