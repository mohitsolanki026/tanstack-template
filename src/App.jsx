import { routeTree } from './routeTree.gen'
import { RouterProvider, createFileRoute, createRoute, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from './lib/auth/authentication'

const queryClient = new QueryClient();


// Create a new router instance
const router = createRouter({ routeTree, context: { queryClient } })
function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}

export default App

