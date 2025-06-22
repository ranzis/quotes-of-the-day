import axios from "axios";
import { cache } from "../cache/memoryCache";
import { Quote } from "../types/quotes";

const API_KEY = process.env.FAVQS_API_KEY!;
const BASE_URL = "https://favqs.com/api/quotes";

const fetchQuotesFromFavqs = async (page = 1, tag?: string): Promise<Quote[]> => {
  const url = `${BASE_URL}?page=${page}` + (tag ? `&filter=${encodeURIComponent(tag)}` : "");
  const cacheKey = `quotes_${page}_${tag || ""}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached as Quote[];
console.log("API_KEY used:", API_KEY); 
  const res = await axios.get(url, {
    headers: { Authorization: `Token token="${API_KEY}"` },
  });

  const quotes: Quote[] = res.data.quotes.map((q: any) => ({
    id: q.id,
    body: q.body,
    author: q.author,
    tags: q.tags,
  }));

  cache.set(cacheKey, quotes);

  return quotes;
};

export async function getRandomQuotes(amount: number, tag?: string): Promise<Quote[]> {
  let allQuotes: Quote[] = [];
  let page = 1;
  const maxPages = 10;

  while (allQuotes.length < amount && page <= maxPages) {
    const quotes = await fetchQuotesFromFavqs(page, tag);
    if (quotes.length === 0) break;
    allQuotes = [...allQuotes, ...quotes];
    page++;
  }


  if (tag) {
    allQuotes = allQuotes.filter(
      q => Array.isArray(q.tags) && q.tags.includes(tag)
    );
  }


  allQuotes = allQuotes.sort(() => Math.random() - 0.5);
  return allQuotes.slice(0, amount);
}
