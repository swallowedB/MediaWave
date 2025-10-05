import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";
import Loading from "./components/common/Loading";
import useAuthListener from "./hook/useAuthListener";
import Router from "./routes/Router";
import { fetchBookmarks } from "./store/bookmarkSlice";
import type { AppDispatch, RootState } from "./store/store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.loading.active);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookmarks(user.uid));
    }
  }, [user, dispatch]);

  useAuthListener();
  return (
    <>
      {isLoading && <Loading />}
      <Router />
      <Toaster richColors position="top-center" />
    </>
  );
}
