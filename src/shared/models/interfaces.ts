export interface IPostWithoutId {
  body: string,
  title: string,
  userId: number,
}

export interface IPost extends IPostWithoutId {
  id: number,
}

export interface IUser {
  id: number,
  name: string,
  username?: string,
  email: string,
  address?: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone?: string,
  website?: string,
  company?: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
}

export interface ICommentWithoutId {
  postId: number,
  name?: string,
  email: string,
  body: string,
}

export interface IComment extends ICommentWithoutId {
  id: number,
}