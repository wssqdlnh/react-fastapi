import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter, parseSearchWith, stringifySearchWith } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import reportWebVitals from "./reportWebVitals.ts";
import { Provider } from "./components/ui/provider.tsx";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 1000 * 60 * 5,

  // urlにおけるパラメータ逆直列化方式の設定
  parseSearch: parseSearchWith((value) =>
    JSON.parse(decodeFromBinary(value))),

  // urlにおけるパラメータの直列化方式の設定
  stringifySearch: stringifySearchWith((value) =>
    encodeToBinary(JSON.stringify(value))
  ),
});

function decodeFromBinary(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function encodeToBinary(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
