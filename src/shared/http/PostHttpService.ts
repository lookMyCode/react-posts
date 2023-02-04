import { IComment } from './../models/interfaces';
import { IPost, IUser } from "../models/interfaces";
import DB from "../services/DB";


export type OrderBy = 'title' | 'content' | 'default';

export interface PostItem extends IPost {
  user?: IUser,
  commentsCount: number
}

export interface Post extends IPost {
  user?: IUser,
  comments: IComment[],
}

export interface IFetchPostsModel {
  filter: string,
  limit: number,
  orderBy: OrderBy,
  desc: boolean,
}

export default class PostHttpService {

  static async fetchPosts(model: IFetchPostsModel): Promise<{
    posts: PostItem[], counter: number
  }> {
    const posts = DB.getPosts();
    let postItems: PostItem[] = posts
      .map(post => {
        const user = DB.getUserById(post.userId);
        const comments = DB.getCommentsByPostId(post.id);
        return {
          ...post,
          user,
          commentsCount: comments.length,
        }
      })
      .filter(post => {
        return post.title.includes(model.filter.trim()) || post.body.includes(model.filter.trim());
      });

    if (model.orderBy === 'title' || model.orderBy === 'content') {
      const k = model.orderBy === 'title' ? 'title' : 'body';
      const x = model.desc ? -1 : 1;
      postItems = postItems.sort((a, b) => {
        if (a[k] > b[k]) return 1 * x;
        if (a[k] < b[k]) return -1 * x;
        return 0;
      })
    }

    const counter = postItems.length;
    postItems.length = Math.min(postItems.length, model.limit);
    return {
      posts: postItems,
      counter,
    }
  }

  static async fetchPost(id: number): Promise<Post|undefined> {
    const post = DB.getPost(id);
    if (!post) return;

    const user = DB.getUserById(post.userId);
    const comments = DB.getCommentsByPostId(post.id);
    return {
      ...post,
      user,
      comments: comments,
    }
  }

  static async addComment({body, postId}: {body: string, postId: number}): Promise<IComment> {
    const userInLS = localStorage.getItem('currentUser');
    if (!userInLS || userInLS === 'undefined' || userInLS === 'null') throw new Error('Not autorized');

    const user: IUser = JSON.parse(userInLS);
    return DB.addComment({
      body,
      postId,
      email: user.email,
    });
  }

  static async createPost({title, body}: {title: string, body: string}): Promise<IPost> {
    const userInLS = localStorage.getItem('currentUser');
    if (!userInLS || userInLS === 'undefined' || userInLS === 'null') throw new Error('Not autorized');

    const user: IUser = JSON.parse(userInLS);
    return DB.createPost({
      title,
      body,
      userId: user.id,
    });
  }
}