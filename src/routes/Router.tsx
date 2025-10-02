import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Browse from "../pages/browse/Browse";
import Home from "../pages/home/Home";
import BaseLayout from "./layouts/BaseLayout";
import { fetchHomeData } from "./loader/home.loader";
import { fetchBrowse } from "./loader/browse.loader";

const router = createBrowserRouter([
  {
    Component: BaseLayout,
    children: [
      {
        path: "/",
        loader: fetchHomeData,
        Component: Home,
      },
      {
        path: "/browse",
        loader: fetchBrowse,
        Component: Browse,
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
