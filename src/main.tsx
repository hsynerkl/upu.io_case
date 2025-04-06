import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "@/assets/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// kütüphanenin react-19 desteği sorunları yüzünden productta görünmeyen devde görünen ref hata uyarısını ignoreladım
const originalConsoleError = console.error;

console.error = (...args) => {
  if (
    !args.some(
      (arg) =>
        typeof arg === "string" &&
        (arg.includes("react-beautiful-dnd") ||
          arg.includes("Invariant failed"))
    )
  ) {
    originalConsoleError(...args);
  }
};

const router = createRouter({
  routeTree,
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "rgb(34 197 94)",
              color: "#fff",
              border: "1px solid rgb(22 163 74)",
              borderRadius: "0.5rem",
              padding: "12px",
              fontSize: "0.875rem",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "rgb(34 197 94)",
            },
          },
        }}
        position="top-right"
        containerStyle={{
          top: "1rem",
          right: "1rem",
        }}
      />
    </QueryClientProvider>
  );
}
