import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Router />
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  );
}
