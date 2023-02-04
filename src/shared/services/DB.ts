import { IComment, ICommentWithoutId, IPost, IPostWithoutId, IUser } from './../models/interfaces';
import axios from "axios";


const DB_NAME = '__DB';


export default class DB {

  static init() {
    this.fetchData();
  }

  static getDB(): any {
    let db: any = localStorage.getItem(DB_NAME);
    if (!db) {
      db = {};
    }

    try {
      let n = 0;
      while (typeof(db) === 'string') {
        if (n >= 5) {
          db = {};
          break;
        }

        db = JSON.parse(db);

        ++n;
      }
    } catch(_) {
      db = {};
    }

    this.setupDB(db);
    return db;
  }

  static setupDB(db: any) {
    localStorage.setItem(DB_NAME, JSON.stringify(db));
  }

  static async fetchData() {
    const db = this.getDB();
    let {posts, comments, users} = db;

    if (!posts?.length) {
      posts = await this.fetchPosts();
    }
    if (!comments?.length) {
      comments = await this.fetchComments();
    }
    if (!users?.length) {
      users = await this.fetchUsers();
    }

    db.posts = posts;
    db.comments = comments;
    db.users = users;

    this.setupDB(db);
  }

  static async fetchPosts() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return res.data;
  }

  static async fetchComments() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
    return res.data;
  }

  static async fetchUsers() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    return res.data;
  }

  static getPosts(): IPost[] {
    const db = this.getDB();
    return db.posts;
  }
  static getPost(id: number): IPost | undefined {
    const posts = this.getPosts();
    return posts.find(post => post.id === id);
  }

  static getUserById(id: number): IUser | undefined {
    const db = this.getDB();
    return db.users.find((user: IUser) => user.id === id);
  }

  static getCommentsByPostId(id: number): IComment[] {
    const db = this.getDB();
    return db.comments.filter((comment: IComment) => comment.postId === id);
  }

  static findUserByEmail(email: string): IUser | undefined {
    const db = this.getDB();
    return db.users.find((user: IUser) => user.email.toLowerCase().trim() === email.toLowerCase().trim());
  }

  static createUser({email, name}: {email: string, name: string}): IUser | undefined {
    const user = this.findUserByEmail(email);
    if (user) return;

    const db = this.getDB();
    const newUser: IUser = {
      email,
      id: Date.now(),
      name,
    }

    db.users.push(newUser);
    this.setupDB(db);
    return newUser;
  }

  static addComment(commentData: ICommentWithoutId): IComment {
    const db = this.getDB();
    const comment = {...commentData, id: Date.now()};
    db.comments.push(comment);
    this.setupDB(db);
    return comment;
  }

  static createPost(postData: IPostWithoutId): IPost {
    const db = this.getDB();
    const post = {...postData, id: Date.now()};
    db.posts.push(post);
    this.setupDB(db);
    return post;
  }
}