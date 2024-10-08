const User = require("../database/models/User.js");
const bcrypt = require('bcryptjs');
const { createError } = require("../utils/error.js");
const { use } = require("../routes/hotels.js");
const jwt = require('jsonwebtoken');

const register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword
        }); 
        newUser.save();
        res.status(201).json("created successfully")
    } catch (error) {
        next(error)
    }

}


const login = async (req, res, next) => {
  try {
    const user = User.findOne({username:req.body.username});
    if(!user) return next(createError(404,"User not found!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect) return     res.status(404).json("Password is incorrect ");

    const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT);

   const {password,isAdmin,...otherDetails} = user._doc;
   res.cookie('access token',token,{
    httpOnly:true
   }).status(201).json({...otherDetails});
  } catch (error) {
    next(error);
  }
};


module.exports = {
    register,
    login
}