# Developer Guidelines & Commands

## Build, Test, and Run Commands

### Backend (Python/FastAPI)
- **Install dependencies**: `cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
- **Run local server**: `cd backend && uvicorn main:app --reload`

### Frontend (React)
- **Install dependencies**: `cd frontend && npm install`
- **Run local server**: `cd frontend && npm start`
- **Production build**: `cd frontend && npm run build`

---

## Security & Credential Rules

> [!IMPORTANT]
> **No Hardcoded Credentials Policy**
> Under no circumstances should the system password `coleystoxins` (or any other secrets/passwords) be committed to the codebase or configuration files (including `cloudbuild.yaml`, `backend/.env`, or frontend source files).

### Local Environment
- Keep `SEARCH_PASSWORD = "your_secret_password"` as a placeholder in `backend/.env` or any checked-in template.
- Use a local `.env` file (which is ignored by Git in `.gitignore`) for local custom secrets.

### Production Environment
- Configure environment variables like `SEARCH_PASSWORD` directly in the **Google Cloud Run Console** (or via Google Secret Manager) as runtime environment variables.
- Do NOT add secrets directly to the `--set-env-vars` flag in `cloudbuild.yaml`.

### History Scrubbing & Regression Prevention
- If any secret is accidentally committed:
  1. Amend the commit immediately: `git commit --amend`
  2. Expire local reflogs: `git reflog expire --expire=now --all`
  3. Prune/collect garbage: `git gc --prune=now --aggressive`
  4. Force-push to remote: `git push -f origin <branch_name>`
