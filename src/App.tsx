import Router from "./routes/Router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Router />
      <Toaster richColors position="top-center" />
    </>
  );
}
