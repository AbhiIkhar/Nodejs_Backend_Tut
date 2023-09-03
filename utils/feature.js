import jwt from "jsonwebtoken";


export const sendCookie = async (user,res,message,statusCode=200) =>{

    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
    // console.log("manasda");

    res.status(statusCode).cookie("token",token,
    {
        httpOnly: true,
        maxAge  : 15*60*1000,
        samesite: process.env.NODE_ENV === "Development" ? "lax":"none", // because our frontend and backend will be at different url
        secure:process.env.NODE_ENV === "Development" ? false:true,
    }
    ).json(
        {
            success:true,
            message,
        }
    );

    
}