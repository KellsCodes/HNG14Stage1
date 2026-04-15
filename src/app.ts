import express from "express";
import cors from "cors";
import responseTime from "response-time";
import mainRouter from "./routes/routes";

const app = express();
const PORT = 5001;

// Global Middlewares
app.use(cors());
app.use(express.json());

// Adds "X-Response-Time" header ti response
app.use(responseTime());

// Apply routes
app.use("/", mainRouter);
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
