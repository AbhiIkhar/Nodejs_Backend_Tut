import mongoose from "mongoose";

export default function dbConnection() {
    // console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "BackendAPI",
    }).then(() => console.log("DB connected"))
        .catch((e) => console.log(e));
}