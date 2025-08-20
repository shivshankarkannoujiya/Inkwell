import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`,
        );

        console.log(
            `MONGODB CONNECTED SUCCESSFULLY !! DB HOST: ${connectionInstance.connection.host}`,
        );

        mongoose.connection.on("error", (error) => {
            console.error(
                `MONGODB CONNECTION ERROR !! ERROR: ${error.message}`,
            );
        });

        mongoose.connection.on("disconnected", () => {
            console.log(`MONGODB DISCONNECTED !!`);
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log(`MONGODB DISCONNECTED DUE TO APP TERMINATION !!`);
            process.exit(0);
        });
    } catch (error) {
        console.error(`MONGODB CONNECTION FAILED !! ERROR: ${error.message}`);
        process.exit(1);
    }
};

export { connectDB };
