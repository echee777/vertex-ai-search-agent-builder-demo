/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";
import ResponseItem from "./components/SearchResponseList";
import ParameterPanel from "./components/ParameterPanel";
import { SearchProvider, SearchContext } from "./context/SearchContext";

/**
 * The main application component.
 *
 * Renders the search bar, summary, and search results.
 *
 * @returns {JSX.Element} The JSX element representing the application.
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const savedPassword = localStorage.getItem("search_password");
    if (savedPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim() !== "") {
      localStorage.setItem("search_password", passwordInput);
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Password cannot be empty.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center text-white">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            Restricted Access
          </h1>
          <p className="text-slate-300 text-sm mb-6">
            Please enter the system password to access the search portal.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-slate-400 text-white transition-all"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-xs font-semibold">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 rounded-lg text-white font-bold tracking-wide transition-all shadow-lg shadow-sky-500/20"
            >
              Unlock Application
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <SearchProvider>
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen flex flex-col items-center">
        <div className="w-full px-4 pt-16">
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Vertex AI Search Engine Demo
          </h1>
          <div className="flex w-full items-start justify-start mb-8 ml-4">
            <SearchComponent />
          </div>

          <div className="bg-white rounded-md p-4 w-full mb-8">
            <div className="flex items-start">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png"
                alt="gemini"
                className="w-6 h-6 mr-4"
              />
              <div className="block">
                <p className="text-xs">Summary</p>
                <SearchContext.Consumer>
                  {({ searchResults }) => (
                    <h1 className="text-xl font-medium text-start mb-6">
                      {searchResults && searchResults.summary
                        ? searchResults.summary.summaryText
                        : "Summary will appear here for your answers"}
                    </h1>
                  )}
                </SearchContext.Consumer>
              </div>
            </div>
          </div>
          <div className="flex items-baseline">
            <ParameterPanel />
            <SearchContext.Consumer>
              {({ searchResults }) => (
                <div className="flex w-3/4 flex-col space-y-4 overflow-y-auto">
                  <ResponseItem response={searchResults} />
                </div>
              )}
            </SearchContext.Consumer>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;
