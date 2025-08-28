# 🎓 College RAG Assistant

A **college-focused Retrieval-Augmented Generation (RAG)** system that enables students, staff, and administrators to query domain-specific data such as **attendance**, **results**, **general college info**, and more using natural language.

---

## 🚀 Features

- ✅ Role-based access (Student / Staff / Admin)
- 📄 Upload and parse unstructured data (attendance, results, etc.)
- 🔍 Semantic search using Qdrant vector store
- 🤖 LLM-powered answers using open-source models
- 📊 Admin dashboard to manage data and monitor usage
- 🔐 Secure authentication and metadata tagging
- 💡 High accuracy in multi-domain RAG via isolated vector collections

---

## 🧠 LLM & Vector Store

- **LLMs Used**: Open-source models (e.g., Mistral, LLaMA2, etc.)
- **Vector Store**: [Qdrant](https://qdrant.tech) with separate collections per domain (e.g., `attendance`, `results`, `general_info`) for accuracy
- **Chunking**: Adaptive chunking for optimized context retrieval
- **Retrieval**: Top-K with optional metadata filtering

---

## 🧾 Use Cases

- Student queries:  
  - “What is my attendance in DBMS?”
  - “Show my 3rd semester result.”

- Admin workflows:  
  - Upload daily attendance from `.txt` or `.csv`  
  - Tag data with semester/subject metadata  
  - Monitor user interaction via dashboard

---

## 🧱 Tech Stack

### Backend
- 🔹 FastAPI
- 🔹 Qdrant (Vector DB)
- 🔹 PostgreSQL (Structured data like user info, attendance metadata)
- 🔹 Python for parsing & LLM integration

### Frontend
- ⚛️ React.js
- 🎨 TailwindCSS
- 🔐 Auth (based on role & email/username)

---

## 📂 Folder Structure

college-rag-assistant/
│
├── backend/
│ ├── app/
│ │ ├── routes/
│ │ ├── models/
│ │ ├── utils/ ← file parsing, vector embedding, retrieval logic
│ │ └── main.py
│ ├── db/ ← PostgreSQL models & queries
│ └── vector/ ← Qdrant integration scripts
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ └── App.jsx
│
├── data_uploads/ ← Sample CSV/TXT files
└── README.md

---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🛡️ Roles & Login Design

**Students:**

- Login with ID card number (username) & phone number (password)
- Can query only their data

**Staff/Admin:**

- Login with college email
- Admin can upload data and view dashboards

---

## 📈 Future Enhancements

- Password reset & change flow
- Tool-calling for automated querying of PostgreSQL
- Dashboard analytics (upload logs, query stats)
- Custom LLM fine-tuning for domain-specific accuracy

---

## 🧠 How RAG Works Here

Data uploaded → parsed → chunked → embedded → stored in Qdrant.

Metadata includes subject, semester, role type.

LLM is prompted with context from vector store to generate accurate answers.

Critical domains like attendance use dedicated vector collections for precision.
