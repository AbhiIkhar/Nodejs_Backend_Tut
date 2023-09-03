import {app} from "./app.js";
import dbConnection  from "./data/database.js"


dbConnection();

console.log(process.env.PORT);
console.log(process.env.JWT_SECRET);

app.listen(4000,()=>{
    console.log(`Server is listening on port :${process.env.PORT} in
    ${process.env.NODE_ENV} Mode`);
})