import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PostHttpService from '../../shared/http/PostHttpService';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  async function createPost() {
    try {
      const post = await PostHttpService.createPost({
        title, body: content
      });

      navigate(`/post/${post.id}`);
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
          <h1 className="text-center">Create post</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-2">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id='title'
              value={title}
              onChange={({target}) => setTitle(target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} id='content' />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <button 
            className="btn btn-primary w-100"
            onClick={createPost}
          >Create post</button>
        </div>
      </div>
    </div>
  )
}
