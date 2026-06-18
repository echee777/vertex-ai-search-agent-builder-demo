# Project Fixes & Authentication Notes

## 1. Implemented Simple Authentication
A simple authentication layer is implemented to protect access to the search portal:
* **Frontend Password Prompt**: In [App.js](file:///Users/ctwins/Documents/code/study/vertex-ai-search-agent-builder-demo/frontend/src/App.js#L28), the application prompts the user for a password. It stores the input password in `localStorage` under `search_password` and attempts to unlock the application by sending it with API calls.
* **Backend Authorization**: In [main.py](file:///Users/ctwins/Documents/code/study/vertex-ai-search-agent-builder-demo/backend/main.py#L18), the backend checks incoming HTTP requests for an `X-API-Key` header (relayed by [backend.js](file:///Users/ctwins/Documents/code/study/vertex-ai-search-agent-builder-demo/frontend/src/api/backend.js#L22)). It compares this key against the `SEARCH_PASSWORD` environment variable. If they do not match, it returns an HTTP `401 Unauthorized` error.

---

## 2. Completed Bug Fixes

### Global References Duplication
* **Bug**: In [SearchResponseList.js:L33](file:///Users/ctwins/Documents/code/study/vertex-ai-search-agent-builder-demo/frontend/src/components/SearchResponseList.js#L33), the frontend extracted references globally from the main response:
  ```javascript
  const references = response?.summary?.summaryWithMetadata?.references?.[0]?.chunkContents;
  ```
  It then rendered this global reference list inside the `getItem` loop for *each* matched document. This caused the exact same global references list (regardless of which file the cited text actually belongs to) to be duplicated and rendered under every file supersection card.
* **Fix**: Refactored [SearchResponseList.js](file:///Users/ctwins/Documents/code/study/vertex-ai-search-agent-builder-demo/frontend/src/components/SearchResponseList.js) to dynamically scan the global `references` array and filter citations specific to each document. It matches by either `ref.document === item.document.name`, matching `ref.title === docTitle`, or matching the GCP resource document ID suffix. Now, each document card only displays references that are actually derived from that file, and uncited documents display no references block.

