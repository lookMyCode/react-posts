import React from 'react'
import { Link } from 'react-router-dom'
import { PostItem } from '../../http/PostHttpService'

export function PostCard({post}: {post: PostItem}) {

  return (
    <div className="col-12 col-lg-6 mb-3">
      <Link className="card card-link h-100" to={'/post/' + post.id}>
        <div className="card-body">
          <h2 className="h5">{post.title}</h2>
          <p>{post.body}</p>
          {
            post.user && <h3 className="h6 text-end">{post.user.name}</h3>
          }
          <p className='text-warning'>
            <i className="fa-solid fa-comment"></i>
            <span className="ms-2">{post.commentsCount}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}
