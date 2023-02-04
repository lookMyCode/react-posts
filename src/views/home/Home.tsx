import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostCard } from '../../shared/components/post_card/PostCard';
import PostHttpService, { OrderBy, PostItem, IFetchPostsModel as IModel } from '../../shared/http/PostHttpService';


const DEFAULT_LIMIT = 12;
const DEFAULT_ORDER_BY = 'default';


// React is trash
export const Home = () => {
  let counter = 0;
  let postsLen = 0;
  let loading = false;
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [model, setModel] = useState<IModel>({
    limit: DEFAULT_LIMIT, 
    orderBy: DEFAULT_ORDER_BY,
    desc: false,
    filter: ''
  });
  const [filterValue, setFilterValue] = useState('');

  const pageRef = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;
  
  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, []);
  
  useEffect(() => {
    parseQP();
  }, [searchParams]);

  async function parseQP() {
    const limit = model.limit || DEFAULT_LIMIT;
    const orderBy = searchParams.get('orderBy');
    const orderType = searchParams.get('orderType');
    const filter = searchParams.get('filter');

    setFilterValue(filter || '');
    setModel({
      limit: limit && +limit ? +limit : DEFAULT_LIMIT,
      orderBy: orderBy=== 'title' || orderBy === 'content' ? orderBy : 'default',
      desc: !!(orderType && orderType.toLowerCase() === 'desc'),
      filter: filter || ''
    });

    fetchPosts();
  }

  async function fetchPosts() {
    loading = true;
    const data = await PostHttpService.fetchPosts(model);
    counter = data.counter;
    setPosts(data.posts.map(p => {
      const div = document.createElement('div');
      div.innerHTML = p.body;
      const text = div.innerText;
      p.body = text.length > 100 ? text.substring(0, 97) + '...' : text;
      return p;
    }));
    
    postsLen = data.posts.length;
    loading = false;
  }

  function setupQP() {
    setSearchParams({
      orderBy: model.orderBy,
      orderType: model.desc ? 'desc' : 'asc',
      filter: model.filter
    });
  }

  function onFilterChange(e: any) {
    const {value} = e.target;
    setFilterValue(value);
  }

  function setupFilter() {
    model.limit = DEFAULT_LIMIT;
    model.filter = filterValue;
    setupQP();
  }

  function onScroll() {
    if (loading) return;
    if (!counter || !postsLen) return;
    if (postsLen >= counter) return;
    
    const page = pageRef.current;

    const windowHeight = window.innerHeight;
    const rect = page.getBoundingClientRect();
    const {height, top} = rect;
    if ( (Math.round(height)) - (windowHeight + Math.abs(top)) > 250 ) return;
    model.limit = Math.min(model.limit + 12, counter);
    setModel(model);
    fetchPosts();
  }

  return (
    <div 
      className="bg-light" 
      ref={pageRef}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1 className='text-center'>Posts</h1>
          </div>
        </div>

        <div className="row">

        <div className="col-12 col-md-4 mb-4">
            <div className="form-group">
              <label htmlFor="filter">Filter</label>
              <div className="input-group">
                <input 
                  type="text"
                  className="form-control" 
                  id="filter"
                  value={filterValue}
                  onChange={onFilterChange}
                  onBlur={setupFilter}
                />
                <button 
                  className="btn btn-primary"
                  onClick={setupFilter}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="form-group">
              <label htmlFor="order_by">Order by</label>
              <select 
                className="form-control" 
                id="order_by"
                value={model.orderBy}
                onChange={e => {
                  model.orderBy = e.target.value as OrderBy;
                  setupQP();
                }}
              >
                <option value="default">Default</option>
                <option value="title">Title</option>
                <option value="content">Content</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <div className="form-group">
              <label htmlFor="order_type">Order type</label>
              <select 
                className="form-control" 
                id="order_type"
                value={model.desc ? 'desc' : 'asc'}
                onChange={e => {
                  model.desc = e.target.value === 'desc';
                  setupQP();
                }}
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
          </div>

        </div>

        <div className="row">

          {
            posts.map(post => {
              return <PostCard 
                post={post} 
                key={post.id}
              />
            })
          }

        </div>
      </div>
    </div>
  )
}
