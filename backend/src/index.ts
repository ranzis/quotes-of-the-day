import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import quotesRouter from "./routes/quotes";
import rateLimit from "express-rate-limit";


console.log("Loaded API Key:", process.env.FAVQS_API_KEY); 
const quotesLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 50,
  message: { error: "Rate limit exceeded", details: "Please wait and try again." }
});
const app = express();
app.use(cors());

app.use("/api/quotes", quotesLimiter, quotesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
