// import { useNavigate } from "react-router-dom";
import { AuthHttpService } from "../http/AuthHttpService";

export function authGuard(): boolean {
  // const navigate = useNavigate();
  const isAuth = !!AuthHttpService.currentUser?.id;
  // if (!isAuth) {
  //   navigate('/login');
  // }

  return isAuth;
}