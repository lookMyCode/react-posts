// import { useNavigate } from "react-router-dom";
import { AuthHttpService } from "../http/AuthHttpService";

export function notAuthGuard(): boolean {
  // const navigate = useNavigate();
  const isAuth = !!AuthHttpService.currentUser?.id;
  // if (isAuth) {
  //   navigate('/');
  // }

  return !isAuth;
}