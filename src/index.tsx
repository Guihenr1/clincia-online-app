import { createRoot } from "react-dom/client";
import { router } from "./App";
import "./style.css";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

const rootElement = document.getElementById("root");
let root: any;
if (rootElement !== null) root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
