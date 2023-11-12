import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";


export const register = async (req,res,next)=>{
   try {
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    
    
    if(user) return next(new ErrorHandler("User already Exist",404));

    const hashPassword = await bcrypt.hash(password,10);
    // user database is created
    user = await User.create({name,email,password:hashPassword});
    sendCookie(user,res,"Registered Successfully",201);
   } catch (error) {
     next(error);
   }
};

export const login = async (req,res,next)=>{
    try {
       // const {name,email,password} = req.body;
    // const isthere = await User.findOne({email});
    // if(!isthere){
    //     redirect();
    // }
    const {email,password} = req.body;
    console.log("email :"+email, "password: "+password);
    
    // we have to do select because in select req body we mention
    // select = false;
    const user = await User.findOne({email}).select("+password");
    console.log(user.password);
    
    if(!user) return next(new ErrorHandler("Invalid Email or Password",404));

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",404));

    sendCookie(user,res,"Login Successfully",200); 
    } catch (error) {
        next(error);
    }
}

export const getMyDetails = (req,res)=>{
    // // const {id} = req.body;
    // // const {id} = req.query;
    // const {id} = req.params;
    // const user = await User.findById(id);

    // // console.log(req.params);
    // res.json({
    //     success:true,
    //     user,
    // });

    // const id = "If we have a ID";

    // const {token} = req.cookies;
    // // console.log(token);

    // if(!token) return res.status(404).json({
    //     success:false,
    //     message:"Login First",
    // });
  
    // const decode = jwt.verify(token,jwtSecret);
    // const user = await User.findById(decode._id);
    res.status(200).json({
        success:true,
        user : req.user,
    })

}

export const logout = (req,res)=>{
   
    res
    .status(200)
    .cookie("token","",{
        expires:new Date(Date.now()),
        samesite: process.env.NODE_ENV === "Development" ? "lax":"none", // because our frontend and backend will be at different url
        secure:process.env.NODE_ENV === "Development" ? false:true,
    })
    .json({
        success:true,
        message:"Successfully Logout",
        user:req.user,
    });
}
