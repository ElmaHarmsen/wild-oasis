import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
    {/* ErrorBoundary will only catch errors on render, not bugs in e.g. event handlers */}
  </React.StrictMode>,
);
