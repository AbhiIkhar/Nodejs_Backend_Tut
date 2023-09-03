import mongoose from "mongoose";

export default function dbConnection() {
    // console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "BackendAPI",
    }).then((c) => console.log(`DB connected with ${c.connection.host}`))
        .catch((e) => console.log(e));
}