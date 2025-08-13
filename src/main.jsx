import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
import CambioIdioma from "./CambioIdioma";

const MEASUREMENT_ID = "G-BHTGKCZSJQ";
ReactGA.initialize(MEASUREMENT_ID);
ReactGA.send("pageview");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CambioIdioma>
      <HelmetProvider>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </HelmetProvider>
    </CambioIdioma>
  </React.StrictMode>
);
