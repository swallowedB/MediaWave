import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import BaseLayout from "./layout/BaseLayout";

export default function Router() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
