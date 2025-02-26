import "reflect-metadata";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import app from "./app";

const PORT = process.env.PORT || 5000;

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on localhost:${PORT}`));
  })
  .catch((error) => console.log("❌ Database connection error:", error));
