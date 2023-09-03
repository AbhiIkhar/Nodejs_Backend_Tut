import express, { json } from "express";
import { register,login,logout,getMyDetails } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
export const userRouter = express.Router();



// userRouter.get("/all",getAlluser);

userRouter.post("/new", register);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

// Here to give a dynamic url 
// should use : /userid/:id
// /userid/abhi --> abhi is id
// userRouter.get("/userid/special",special);
// // Try to put your dynamic route at last
userRouter.get("/me",isAuthenticated,getMyDetails);

export default userRouter;