import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { helper } from '../reducers/Reducer'
import { useParams } from 'react-router-dom'
import LoggedIn from './LoggedIn'
import blogService from '../services/blogs'

const AllBlog = ({ notify }) => {
	const id = useParams().id
	const all = useSelector(state => state.blogs)

	const dispatch = useDispatch()


	const setBlogs = (message) => dispatch(helper('blogs', message))


	const blog  = all.find( each => each.id === id)

	const increaseLike = async() =>
	{
		const newBlog = { ...blog, likes: blog.likes + 1 }
		console.log(newBlog, blog)
		await blogService.update(newBlog)

		const t = await blogService.getAll()
		console.log(t)

		// const temp = blogs.find(each => each.id === response.id)

		// const newb = { ...temp, likes: response.likes }
		// const t = blogs.map(
		// 	each => each.id === temp.id ? newb : each
		// )

		setBlogs(t)
		// notify(`${newBlog.title} liked` , 'success')
	}



	console.log(all , blog)
	return (
		<div>
			<h2>Blogs</h2>
			<LoggedIn notify={ notify } />

			<h2>{blog.title}</h2>
			<div>
				<a href={`https://${blog.url}`}> {blog.url} </a>
				likes <span>{blog.likes}</span>
				<button className='like' onClick={increaseLike}>like</button>
			</div>
			added by {blog.author}

			<h3>comments</h3>
			<ul>
				{
					blog.comments.map(
						each => <li key={each.id}>{each.content}</li>
					)
				}
			</ul>
		</div>
	)
}

export default AllBlog
