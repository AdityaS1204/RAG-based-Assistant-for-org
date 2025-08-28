# Role-Based RAG Chatbot

A Retrieval-Augmented Generation (RAG) based chatbot with role-based access control (RBAC). This repository tracks development progress and tasks for building a secure, scalable, and intelligent document query system.

---

## Tasks in Progress

### 1. Text Extraction from Images & Image PDFs
- Objective: Identify and integrate the most accurate OCR (Optical Character Recognition) method for extracting text from:
  - Scanned PDFs
  - Image-based documents (JPG, PNG, etc.)
- Tools under consideration:
  - Tesseract OCR
  - EasyOCR
  - Google Vision API
  - PaddleOCR
- Evaluation Criteria:
  - Accuracy
  - Support for tables and handwriting (if applicable)
  - Language support
  - Speed and scalability

### 2. Admin Dashboard Design
- Goal: Create a user-friendly and functional admin dashboard that allows monitoring and management of:
  - User roles and permissions
  - Uploaded documents
  - Chatbot usage analytics
  - System status and logs
- Tech Stack:
  - React + Tailwind CSS
  - shadcn/ui components
  - Framer Motion (for transitions)
  - Backend integration with FastAPI
  
---

## Coming Next
- Chat UI for students/staff
- Role-specific access to uploaded documents
- Upload, parse & vectorize documents securely

---
