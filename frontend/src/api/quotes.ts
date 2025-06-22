import axios from "axios";
import { Quote } from "../../../backend/src/types/quotes";

const API_BASE = "http://localhost:4000/api/quotes";

export async function fetchQuotes(amount: number, tag?: string): Promise<Quote[]> {
  const params: any = { amount };
  if (tag) params.tag = tag;

  const res = await axios.get<{ quotes: Quote[] }>(API_BASE, { params });
  return res.data.quotes;
}
