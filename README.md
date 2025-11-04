# 📈 SIGNAL – Real-Time Stock Market Platform

**Signal** is a full-featured, real-time stock market web application built with **Next.js**.  
It provides **live stock data**, **interactive charts**, **AI-powered search**, **daily financial news**, and a personalized **watchlist** — all in one elegant interface.

---

## 🚀 Features

### 🔹 Real-Time Market Data
Get up-to-the-second price updates and key market metrics for your favorite stocks using live APIs.

### 🔹 Interactive Charts
Visualize market trends with dynamic TradingView-powered charts and advanced analytics.

### 🔹 AI-Powered Search
Easily search for any company or stock symbol using intelligent autocomplete backed by AI-enhanced logic.

### 🔹 Personalized Watchlist
Add, view, and manage your favorite stocks.  
Your watchlist persists seamlessly and syncs with your account.

### 🔹 Buy/Sell Simulation
Simulate buy and sell actions to understand market movements and portfolio behavior.

### 🔹 Daily Financial News
Stay informed with curated, real-time market headlines and insights.

### 🔹 Authentication
Secure sign-in and session management with `better-auth` and server-side protection.

---

## 🖼️ Screenshots

### 🔐 Sign In  
![Sign In](https://github.com/user-attachments/assets/594d1e54-f09a-4ce4-a117-3c54f0a2f866)

### 📊 Dashboard  
![Dashboard](https://github.com/user-attachments/assets/ea7702d4-88f0-4ac0-a5be-3b728109a17d)

### 💹 Stock Detail – AAPL  
![Stock Page](https://github.com/user-attachments/assets/d7ab54be-fa56-48c9-a7ac-f1f8372806f7)

### ⭐ Watchlist  
![Watchlist](https://github.com/user-attachments/assets/3b9f02f9-095d-4a50-ba2d-58cdf0312622)

---

## 🧠 Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| **Frontend** | [Next.js 14](https://nextjs.org), React 18, TypeScript, Tailwind CSS |
| **Charts** | TradingView Widget |
| **Auth** | [Better Auth](https://github.com/better-auth) |
| **Database** | MongoDB (via Mongoose) |
| **API Integration** | Finnhub / Marketstack (for live stock data) |
| **State Management** | React Context + Server Actions |
| **UI Components** | Shadcn/UI, Lucide Icons |
| **Deployment** | Vercel |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repo 
```bash
git clone https://github.com/moyaqoob/signal.git
cd signal
npm install
npm run dev 
