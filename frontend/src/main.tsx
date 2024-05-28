import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Components
import App from "./App"

// Context
import { AuthContextProvider } from "./context/auth/AuthContext"
import { ProductContextProvider } from "./context/product/ProductContext"
import { UserContextProvider } from "./context/user/UserContext"

// Styles
import "./index.css"

/**
 * Create a QueryClient instance with custom default options.
 * 
 * The `cacheTime` is set to 24 hours, meaning that query results will be cached
 * for that duration.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // @ts-ignore
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // Provide the QueryClient to the application.
  <QueryClientProvider client={queryClient}>
    {/* Provide Product context */}
    <ProductContextProvider>
      {/* Provide User context */}
      <UserContextProvider>
        {/* Provide Auth context */}
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UserContextProvider>
    </ProductContextProvider>
  </QueryClientProvider>
)

