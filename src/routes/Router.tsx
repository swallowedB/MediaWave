import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import BaseLayout from "./layout/BaseLayout";
import Home from "../pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
