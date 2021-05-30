import React, { useState } from 'react'


const Blog = ({blog}) => {
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
        <FullBlog blog={blog} />
      }
      <button onClick={() => setSee(!seeFull)}>
        {seeFull ? 'see more' : 'see less'} 
      </button>
    </div>  
  )
}

const PartBlog = ({blog}) => 
  <>
    {blog.title}  {blog.author}
  </>

const FullBlog = ({blog}) =>
  <>
    <div>{blog.title}</div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>
      likes {blog.likes}
      <button>like</button>
    </div>
  </>

export default Blog