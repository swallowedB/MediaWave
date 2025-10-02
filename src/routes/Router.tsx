import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import BaseLayout from "./layouts/BaseLayout";
import { fetchThumbnail } from "./loader/home.loader";
import NotFound from "../pages/NotFound";

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
