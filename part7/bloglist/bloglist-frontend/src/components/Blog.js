import React, { useState } from 'react'
import blogService from '../services/blogs'
import { helper } from '../reducers/Reducer'
import { useSelector, useDispatch } from 'react-redux'


const Blog = ( { notify, blog }  ) => {
	const [seePart, setSee] = useState(true)
	const dispatch = useDispatch()
	const login = useSelector(state => state)

	const blogs = login.blogs
	const setBlogs = (message) => dispatch(helper('blogs', message))

	const user = login.user

	const increaseLike = async(blog) =>
	{
		const newBlog = { ...blog, likes: blog.likes + 1 }
		const response = await blogService.update(newBlog)

		const temp = blogs.find(each => each.id === response.id)

		const newb = { ...temp, likes: response.likes }
		const t = blogs.map(
			each => each.id === temp.id ? newb : each
		)
		setBlogs(t)
		notify(`${newb.title} liked` , 'success')
	}

	const removeBlog = async(blog) =>
	{
		console.log(user.username, blog.user.username)

		if ( window.confirm(`Remove "${blog.title}" by ${blog.author}?`) && user.username === blog.user.username) {
			const id = blog.id

			await blogService.del(blog)

			const t = await blogService.getAll()
			setBlogs(t)
			console.log(id, 'removed')
			notify(`Blog created by ${user.username}`, 'success')
		}

		else {
			if (user.username !== blog.user.username) {
				notify(`Blog wasn't created by ${user.username}`, 'error')
			}

			console.log('blog wasn\'t deleted')
		}
	}


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