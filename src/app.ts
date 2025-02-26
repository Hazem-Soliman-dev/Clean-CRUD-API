import express from "express";
import cors from "cors";

import countryRoutes from "./routes/country.routes";
import stateRoutes from "./routes/state.routes";
import cityRoutes from "./routes/city.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("src/uploads"));
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/cities", cityRoutes);

app.use("/*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    routes: ["/api/countries", "/api/states", "/api/cities", "/uploads"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  });
});

export default app;
