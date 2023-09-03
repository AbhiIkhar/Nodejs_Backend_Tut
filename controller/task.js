import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;


        await Task.create({
            title,
            description,
            user: req.user, // How this will come so for that we will make 
            // sure that task will created by person who is Login
        });

        res.status(201).json({
            success: true,
            message: "Task added Successfully",
        })
    } catch (error) {
        next(error);
    }

};

export const getMyTask = async (req, res, next) => {

    try {
        const userId = req.user._id;

        // to match particular field you need to put it in curly braces
        const tasks = await Task.find({ user: userId });
        res.status(201).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Task Not Found", 404));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(201).json({
            success: true,
            message: "Updated Successsfully",
        });
    } catch (error) {
        next(error);
    }
};
export const deleteTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        // await Task.findByIdAndDelete(id); 

        if (!task) return next(new ErrorHandler("Task Not Found", 404));

        await task.deleteOne();

        res.status(201).json({
            success: true,
            message: "Deleted Successfully",
        });
    } catch (error) {
        next(error);
    }
};