import useAuthListener from "./hook/useAuthListener";
import Router from "./routes/Router";
import { Toaster } from "sonner";

export default function App() {
  useAuthListener();
  return (
    <>
      <Router />
      <Toaster richColors position="top-center" />
    </>
  );
}
