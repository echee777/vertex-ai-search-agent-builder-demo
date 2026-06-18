# Project Notes & Context

## Codelab Reference
This repository is used in the following Google Codelab:
* **Title:** Building a Google-quality Search System with Vertex AI
* **URL:** https://codelabs.developers.google.com/build-google-quality-rag

## Local Testing & Environment Setup

### Backend Setup (Python)
The backend Python virtual environment is successfully created and configured.
* **Interpreter path:** `backend/venv/bin/python`
* **Dependencies:** `google-cloud-discoveryengine`, `google-cloud-storage`, `fastapi`, `coloredlogs`, `python-multipart`

To run the backend locally:
```sh
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

### Frontend Setup (Node.js)
Frontend dependencies are successfully installed.

To run the frontend locally:
```sh
cd frontend
npm run start
```
