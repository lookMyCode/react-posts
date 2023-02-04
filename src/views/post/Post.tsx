import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../shared/contexts/AuthContext';
import PostHttpService, { Post as PostInterface } from '../../shared/http/PostHttpService';

export function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostInterface>();
  const [commentContent, setCommentContent] = useState('');
  let id: number = +params.id!;
  const {isAuth} = useContext(AuthContext);
  
  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    
    getPost();
  }, []);

  async function getPost() {
    const p = await PostHttpService.fetchPost(id);
    setPost(p);
  }

  async function addComment() {
    try {
      await PostHttpService.addComment({
        body: commentContent.trim(), postId: id
      });
  
      getPost();
      setCommentContent('');
  
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className='text-center'>{post?.title}</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p dangerouslySetInnerHTML={{ __html: post?.body || '' }}></p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <p className="text-end">
            <b>{post?.user?.name}</b>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {post?.comments && post?.comments.map(comment => {
            return <div key={comment.id} className="card mb-3">
              <div className="card-body">
                <h2 className="h6">{comment.email}</h2>
                <p>{comment.body}</p>
              </div>
            </div>
          })}
        </div>
      </div>

      {isAuth && <div className="row">

        <div className="col-12 mb-3 mt-4">
          <hr />
        </div>

        <div className="col-12 mb-2">
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea 
              className="form-control" 
              placeholder='Lorem, ipsum...'
              id='comment'
              value={commentContent}
              onChange={({target}) => setCommentContent(target.value)}
            ></textarea>
          </div>
        </div>

        <div className="col-12">
          <button 
            className="btn btn-primary w-100"
            onClick={addComment}
          >Send</button>
        </div>

      </div>}
    </div>
  )
}
