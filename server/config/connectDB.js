import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
    } catch (error) {
        console.log(
            `Error whilst connecting to mongo database: ${error.message}`
        );
    }
}

export default connectDB;
