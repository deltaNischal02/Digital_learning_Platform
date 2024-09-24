const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization 
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split("")[1];
        if(!token){
            return res.send(401).json({message:"No Token, authorization denied"});
        }
        try {
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
            console.log("The decoded user is : ", req.user);
            next();
        } catch (error) {
            res.status(400).json({message:"TOken is not valid"});
        }
    }
    else
    {
        res.status(404).json({mesage:"ERROR"})
    }

};
module.exports = verifyToken;