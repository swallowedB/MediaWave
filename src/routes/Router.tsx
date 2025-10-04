import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Browse from "../pages/browse/Browse";
import Home from "../pages/home/Home";
import BaseLayout from "./layouts/BaseLayout";
import { fetchHomeData } from "./loader/home.loader";
import { fetchBrowse } from "./loader/browse.loader";
import ErrorState from "../components/common/ErrorState";
import MyPage from "../pages/my/MyPage";
import { requireAuth } from "./loader/auth.loader";

const router = createBrowserRouter([
  {
    Component: BaseLayout,
    errorElement: <ErrorState />,
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
    path: "/my",
    loader: requireAuth,
    Component: MyPage,
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
