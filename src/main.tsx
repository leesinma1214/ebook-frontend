import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AuthProvider from "./context/AuthProvider.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <HeroUIProvider>
            <App />
          </HeroUIProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
