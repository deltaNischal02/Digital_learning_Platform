const User = require("../models/userModel");
const bcrypt = require("bcryptjs"); //to decrypt pasword
const jwt = require("jsonwebtoken"); //unsucessfull login are given token

// register
const register = async (req, res) => {
  try {
    const { username, password, role, phoneNumber, level, department } =
      req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedpassword,
      role,
      phoneNumber,
      level,
      department,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User Registered with username ${username}` });
  } catch (error) {
    res
    .status(500)
    .json({message:`SOmething went wrong`})
  }
};
// login
const login = async (req,res) => {
    try {
        const { username, password } = req.body;
        const  user = await User.findOne({username});
            //if username not found in database
        if(!user){
            return res.status(404).json({message:`User with username ${username} not found`})
        }
        // creating token to user
        const token = jwt.sign(
            {id:user._id,role: user.role}.process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(200).json({token});
            // comparing password 
        const isMatch = await bcrypt.comapre(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:`Incorrect Password`})
        }

  } catch (error) {
    res
    .status(500)
    .json({message:`SOmething went wrong`});
  }
};

module.exports = {
  register,
  login,
};
