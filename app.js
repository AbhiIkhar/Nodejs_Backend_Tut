import express from "express";
import { userRouter } from "./routes/user.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
config({
    path:"./data/config.env",
});


// Using cors --- > It is use for connecting frontend and backend

app.use(cors({ 
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials: true, // to send the credential like cookies to frontend 
}));


/*
 IMP Notes: 
   The req.body property contains key-value pairs of data submitted 
   in the request body. By default, it is undefined and is populated 
   when you use a middleware called body-parsing such as 
   express.urlencoded() or express.json(). 
*/
app.use(express.json());


// it parses incoming requests with json payloads and it is based on 
// body parser
/*
IMP NOTES:
   The cookieParser middleware in Node.js is used to parse cookies from 
   incoming HTTP requests. When you use cookieParser in your app.js file 
   or any other file that's part of your Express.js application, it sets 
   up a middleware that runs for all incoming HTTP requests, by default.

   1.When a client makes an HTTP request to your server, 
     the cookieParser middleware is executed for that request. 
     It parses any cookies present in the request headers 
     and attaches them to the req.cookies object, making them accessible 
     for the duration of that request.

   2.These parsed cookies are then available to all the route handlers and
     middleware functions that run after the cookieParser middleware in the
     request-response cycle. This means that you can access cookies from
     any part of your Express.js application, not just in the app.js file.




*/

app.use(cookieParser());

// for setting default paths for this routers
app.use("/api/v1/users",userRouter);

app.use("/api/v1/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("Started");
})


// Code for error middleware 
// It will be call when we give call to next()

app.use(errorMiddleware);