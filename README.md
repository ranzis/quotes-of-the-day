# Quotes Of The Day

git clone https://github.com/ranzis/quotes-of-the-day.git
cd quotes-of-the-day


## 2. Set up FavQs API Key

Create a `.env` in `/backend`:
FAVQS_API_KEY=your_api_key_here



## 3. Install dependencies

### Backend
cd backend
npm install
```

### Frontend

cd ../frontend
npm install

```

## 4. Run the app

### Backend
npm run dev
```

### Frontend

npm run dev

```

Frontend will be available at http://localhost:5173



## Overview

Production-ready fullstack web app for the TITAN recruitment process:

- **Backend**: Node.js + TypeScript + Express
- **Frontend**: React + TypeScript + MUI
- Integrates with [FavQs API](https://favqs.com/api) to fetch and display random quotes with advanced handling for caching, rate-limiting, pagination, and filtering by tag.

---

## Project Structure

### Backend

```
backend/
  src/
    cache/
      memoryCache.ts       # In-memory cache for API responses
    routes/
      quotes.ts            # Express route for /api/quotes endpoint
    services/
      favqs.ts             # Logic for calling FavQs API, rate-limit, pagination
    types/
      quotes.ts            # Type definitions for Quote, API responses
    index.ts               # Express app entry point
  .env                     # FavQs API Key, etc.
```

### Frontend

```
frontend/
  src/
    api/
      quotes.ts            # API call helper to backend
    components/
      QuoteCard.tsx        # Individual quote display card
      QuoteList.tsx        # Grid/list display of quotes
      QuotesForm.tsx       # Input form: number + tag + button
      QuotesHeader.tsx     # Title and date display
      QuotesResults.tsx    # Handles display of loading/error/results states
      QuotesPage.tsx       # Page composition
      TagSelector.tsx      # Controlled tag input field
    hooks/
      useQuotes.ts         # Custom hook for fetching quotes
    utils/
      utils.ts             # Utilities (e.g., date formatting)
    App.tsx                # App entry
    main.tsx               # ReactDOM render
```

---

## How Requirements Were Addressed

### **Step 1: Endpoint for Random Quotes**

- `/api/quotes?amount=5` returns N random quotes from FavQs.
- **Pagination:** Since FavQs is paginated, backend randomly selects different pages when needed.
- **Edge-case**: Ensures `amount` is clamped to allowed bounds (1–50), both server and client side.

### **Step 2: React App (Quotes Of The Day)**

- **UI** to enter desired amount, press a button, and fetch/display quotes (with authors).
- **Clean, responsive, accessible design.**
- All states are handled (initial, loading, error, empty).
- Button is disabled while fetching.

### **Step 3: Filter by Tag**

- Both backend and frontend accept a tag (optional).
- If tag is provided, backend passes it through to FavQs API for server-side filtering.
- **UI**: TagSelector input with validation and max length.

### **Caching, Rate Limiting, Retry, Pagination**

- **Caching:**
  - In-memory (LRU) cache per query (amount + tag).
  - TTL set to 10 minutes (configurable).
  - Greatly reduces API calls for popular queries.
- **Rate-Limit Handling:**
  - Simple rate limiter (memory counter per minute).
  - If limit is reached, returns from cache or shows user-friendly error.
  - If FavQs returns 429, retries with exponential backoff up to a safe limit.
- **Pagination:**
  - Fetches from multiple pages if needed to ensure random and varied results.
  - Avoids repeating quotes within the same response.
- **Retry Logic:**
  - Handles transient errors gracefully and informs user on persistent failures.

### **Other Notes from Assignment**

- **Database**: Not used, but design is ready for Redis/similar if scaling required.
- \*\*Emphasis on modular, type-safe, easily-testable code.
- \*\*All business logic split into dedicated service layers and hooks.
- **README**: This document provides full coverage per the instructions.

---

## Component Breakdown

### **Backend**

- `memoryCache.ts`: General-purpose cache by query key, with expiry.
- `favqs.ts`: API abstraction for FavQs, including pagination, error and rate-limit handling.
- `quotes.ts` (route): Orchestrates requests, sanitizes input, randomizes, and combines results.
- `quotes.ts` (types): TypeScript interfaces for clarity and safety.

### **Frontend**

- `QuotesHeader.tsx`: Title and date display, always visible.
- `QuotesForm.tsx`:
  - Number input (amount, 1–50).
  - TagSelector for tag input (with validation).
  - Submit button ("Get Quotes").
- `QuotesResults.tsx`:
  - Handles all output states: loading spinner, error message, empty state, or list.
- `QuoteList.tsx`: Renders the grid of quotes.
- `QuoteCard.tsx`: Single quote + author.
- `TagSelector.tsx`: Separate input, re-used for clear separation.
- `useQuotes.ts`: Custom hook with react-query logic for fetching, caching, and error state.

---

## Backend Architecture

- **Express API** on `/api/quotes` accepts `amount` (required) and `tag` (optional).
- All parameter validation handled server-side.
- **Service layer** handles:
  - Caching
  - Rate-limit counting and safe retries
  - Pagination logic (multiple calls if needed to gather enough quotes)
  - Merges and randomizes results, ensuring no duplicates.

---

## Frontend Architecture

- **React** app (with Vite) for fast, modern DX.
- **Component-based structure** with clean separation between presentation, logic, and data fetching.
- **Hooks** for all data side-effects (fetching, error/loading state).
- **Material UI (MUI)** for modern accessibility and theming.
- **Form** disables submit during loading, clamps inputs.
- All error and empty states are clear to user.

---

## Edge Cases & Error Handling

- **Invalid amount** (<1 or >50): Clamped both UI and backend.
- **Empty/invalid tag**: Filter ignored gracefully, no errors.
- **FavQs API errors**:
  - Network/API failures show user-friendly error.
  - Rate limit fallback to cache or error message.
- **No results for tag**: Shows "No quotes found for this tag."
- **Duplicate quotes in result**: Backend ensures no repeats for single request.

---

## Performance & Quality

- **Backend**:
  - Caching and batching reduce calls to FavQs (especially on high traffic).
  - Async/await everywhere, no blocking calls.
  - Error/retry logic is isolated and testable.
- **Frontend**:
  - Renders only what is needed (list is memoized).
  - minimal re-renders.
- **Types**: TypeScript end-to-end for fewer bugs and clear interfaces.

---

#
