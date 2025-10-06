import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorState from "../components/common/ErrorState";
import NotFound from "../pages/NotFound";
import BaseLayout from "./layouts/BaseLayout";
import { redirectIfAuth, requireAuth } from "./loader/auth.loader";
import { fetchBrowse } from "./loader/browse.loader";
import { mediaDetailLoader } from "./loader/detail.loader";
import { fetchHomeData } from "./loader/home.loader";
import Loading from "../components/common/Loading";

const router = createBrowserRouter([
  {
    Component: BaseLayout,
    errorElement: <ErrorState />,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        path: "/",
        loader: fetchHomeData,
        lazy: () =>
          import("../pages/home/Home").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "/browse",
        loader: fetchBrowse,
        lazy: () =>
          import("../pages/browse/Browse").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "/detail/:type/:id",
        loader: mediaDetailLoader,
        lazy: () =>
          import("../pages/detail/MediaDetail").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
  {
    path: "/my",
    loader: requireAuth,
    lazy: () =>
      import("../pages/my/MyPage").then((m) => ({
        Component: m.default,
      })),
  },
  {
    path: "/login",
    loader: redirectIfAuth,
    lazy: () =>
      import("../pages/auth/Login").then((m) => ({
        Component: m.default,
      })),
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
