import { QueryClient, QueryClientProvider } from "react-query";
import Launches from "./pages/Launches/Launches";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Launches />
      </QueryClientProvider>
    </div>
  );
}

export default App;
