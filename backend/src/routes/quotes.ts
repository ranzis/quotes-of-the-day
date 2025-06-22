import { Router } from "express";
import { getRandomQuotes } from "../services/favqs";
const router = Router();

router.get("/", async (req, res) => {
  const amount = Math.max(1, Math.min(50, Number(req.query.amount) || 1));
  const tag = req.query.tag as string | undefined;

  try {
    const quotes = await getRandomQuotes(amount, tag);
    res.json({ quotes });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch quotes", details: err.message });
  }
});

export default router;
