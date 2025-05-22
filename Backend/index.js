import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import savingsRoutes from "./routes/savingsRoutes.js";
import recurringTransactionRoutes from "./routes/recurringTransactionRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import taxRoutes from "./routes/taxRoutes.js";
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();
app.use(morgan("dev"));

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://new-finance-one.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);


// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/recurring-transactions", recurringTransactionRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/tax", taxRoutes);

// ✅ Add this route to handle GET /
app.get("/", (req, res) => {
  res.send("✅ Finance API is live and connected to MongoDB!");
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
