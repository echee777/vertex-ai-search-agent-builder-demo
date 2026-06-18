import axios from "axios";

const HOST = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:8000" : "";
/**
 * Sends a search request to the backend API.
 *
 * @param {string} query The search query to use.
 * @returns {Promise<object|null>} A promise that resolves with the search results, or null if an error occurred.
 */

async function search(payload) {
  try {
    const response = await axios.post(`${HOST}/search`, {
      query: payload.query,
      pageSize: payload.page_size,
      summary_result_count: payload.summary_result_count,
      max_snippet_count: payload.max_snippet_count,
      max_extractive_segment_count: payload.max_extractive_segment_count,
      max_extractive_answer_count: payload.max_extractive_answer_count,
    }, {
      headers: {
        "X-API-Key": localStorage.getItem("search_password") || "",
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    if (error.response?.status === 401) {
      return { error: "unauthorized" };
    }
    return null;
  }
}

export { search };
