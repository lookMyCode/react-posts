import { FC } from "react";
import { Home } from "./views/home/Home";
import { Login } from "./views/login/Login";
import { NotFound } from "./views/not_found/NotFound";
import { Post } from "./views/post/Post";
import { PostEditor } from "./views/post_editor/PostEditor";
import { Registration } from "./views/registration/Registration";

const routes: {path: string, component: FC,}[] = [
  {path: '/', component: Home,},
  {path: '/login', component: Login,},
  {path: '/registration', component: Registration,},
  {path: '/post/:id', component: Post,},
  {path: '/post_editor', component: PostEditor,},
  {path: '/404', component: NotFound,},
];

export default routes;