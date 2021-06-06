import React, { useState } from 'react'


const Blog = ({ blog, increaseLike, removeBlog }) => {
	const [seePart, setSee] = useState(true)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			{seePart ?
				<PartBlog blog={blog} /> :
				<FullBlog blog={blog} increaseLike={() => increaseLike(blog)} />
			}
			<button onClick={() => setSee(!seePart)}>
				{seePart ? 'see more' : 'see less'}
			</button >
			<button onClick={() => removeBlog(blog)}>
        remove
			</button>
		</div>
	)
}

const PartBlog = ({ blog }) =>
	<div className='partial'>
		{blog.title}  {blog.author}
	</div>

const FullBlog = ({ blog, increaseLike }) =>
	<div className='full'>
		<div>{blog.title}</div>
		<div>{blog.author}</div>
		<div>{blog.url}</div>
		<div>
      likes <span>{blog.likes}</span>
			<button className='like' onClick={increaseLike}>like</button>
		</div>
	</div>

export default Blog