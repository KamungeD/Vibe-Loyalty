import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import loyaltyRoutes from "./routes/loyaltyRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", (_req, res) => {
  res.send("Vibe Loyalty App Backend is running!");
});

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/loyalty", loyaltyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});