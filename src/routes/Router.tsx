import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import BaseLayout from "./layouts/BaseLayout";
import { fetchThumbnail } from "./loader/home.loader";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    Component: BaseLayout,
    children: [
      {
        path: "/",
        loader: fetchThumbnail,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default function Route() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
