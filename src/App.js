import "./App.css";
import Crud from "./components/Crud";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <h1 className="text-center bg-black text-white p-5 font-bold text-2xl shadow">
        Welcome To Crud Opretion
      </h1>
      <QueryClientProvider client={queryClient}>
        <Crud />
      </QueryClientProvider>
    </>
  );
}

export default App;
