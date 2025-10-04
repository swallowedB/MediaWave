import { redirect } from "react-router-dom";
import { auth } from "../../lib/firebase"

export const requireAuth = () => {
  const user = auth.currentUser;
  if(!user){
    return redirect('/login');
  }
  return null;
}

export const redirectIfAuth = () => {
  const user = auth.currentUser;
  if (user) {
    return redirect("/");
  }
  return null;
};