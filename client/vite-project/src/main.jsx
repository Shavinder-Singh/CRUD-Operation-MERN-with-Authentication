import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PostProvider } from "./context/PostsContext.jsx";
import { OrderProvider } from "./context/Ordercontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <OrderProvider>
        <App />
        </OrderProvider>
      </PostProvider>
    </AuthProvider>
  </StrictMode>,
);
