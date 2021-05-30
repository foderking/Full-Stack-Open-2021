import React, { useState } from 'react'
// import blogService from './services/blogs'


const Blog = ({ blog, increaseLike, removeBlog }) => {
  const [seeFull, setSee] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {seeFull ?
        <PartBlog blog={blog} /> :
        <FullBlog blog={blog} increaseLike={() => increaseLike(blog)} />
      }
      <button onClick={() => setSee(!seeFull)}>
        {seeFull ? 'see more' : 'see less'}
      </button >
      <button onClick={() => removeBlog(blog)}>
        remove
      </button>
    </div>
  )
}

const PartBlog = ({ blog }) =>
  <>
    {blog.title}  {blog.author}
  </>

const FullBlog = ({ blog, increaseLike }) =>
  <>
    <div>{blog.title}</div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>
      likes {blog.likes}
      <button onClick={increaseLike}>like</button>
    </div>
  </>

export default Blog