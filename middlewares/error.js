// To use our own customize status code

class ErrorHandler extends Error{
    
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddleware = (err,req,res,next)=>{
   
    // To give a default error message .... 
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500 ; // 500 is internal server error
    console.log("message "+ err.message);
    console.log("statusCode: "+ err.statusCode);
    res.status(404).json({
      success:false,
      message:err.message,
   });
};

export default ErrorHandler;