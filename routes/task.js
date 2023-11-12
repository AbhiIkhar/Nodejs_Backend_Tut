import express from "express";
import { getMyTask, newTask,updateTask,deleteTask } from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const taskRouter =  express.Router();

/*
The express. Router() function is used to create a new router object. 
This function is used when you want to create a new router object 
in your program to handle requests. Multiple requests can be easily 
differentiated with the help of the Router() function in Express.
const taskRouter = express.Router();
*/

// because it should be secure
taskRouter.post("/new",isAuthenticated,newTask);

// to get the task of specific user 

taskRouter.post("/myTask",isAuthenticated,getMyTask);

/* The router.route() function returns an instance of a single route 
that you can then use to handle HTTP verbs with optional middleware.
You can also use the router.route() function to avoid duplicate route 
naming as well as typing errors. 
*/
taskRouter.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated, deleteTask);

export default taskRouter;