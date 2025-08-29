# 🚀 BFHL API

A REST API built with **Node.js + Express**, designed for the BFHL assignment.  
The API takes an array of values (numbers, alphabets, special characters) and returns structured results.

---

## 📌 Features

- Accepts an array as input via `POST /bfhl`.
- Splits input into:
  - Odd numbers
  - Even numbers
  - Alphabets (converted to uppercase)
  - Special characters
- Calculates the **sum** of all numbers.
- Creates a **concat string**:
  - All alphabet characters are reversed.
  - Alternating caps are applied (e.g., `["a","b","c"]` → `"CbA"`).
- Includes user details (`user_id`, `email`, `roll_number`).
- Health check endpoint at `GET /bfhl`.

---## 📂 Project Structure

bfhl-api/
├── server.js # Express app
├── package.json # Dependencies
└── vercel.json # Vercel deployment config

yaml
Copy code

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/bfhl-api.git
cd bfhl-api
npm install
Run locally:

bash
Copy code
npm start
Server will run on:

arduino
Copy code
http://localhost:3000