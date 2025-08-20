import app from "./app.js";
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT ?? 8000;

connectDB()
    .then(
        app.listen(PORT, () => {
            console.log(`Server is listeing at:${PORT}`);
        }),
    )
    .catch((error) => {
        console.error(`DATABASE CONNECTION ERROR: ${error.message}`);
        process.exit(1);
    });
