import React from "react";
import { AuthHttpService } from "../http/AuthHttpService";


export const AuthContext = React.createContext({isAuth: !!AuthHttpService.currentUser?.id, setIsAuth: (newIsAuth: boolean) => {}});