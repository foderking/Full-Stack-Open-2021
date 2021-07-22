import React from 'react'
import LoggedIn from './LoggedIn'
import blogService from '../services/blogs'
import InputComp from '../components/InputComp'
import { useDispatch, useSelector } from 'react-redux'
import { helper } from '../reducers/Reducer'
import { useParams } from 'react-router-dom'

const AllBlog = ({ notify }) =>
{
	const id = useParams().id
	const all = useSelector(state => state.blogs)
	const comment  =  useSelector(state => state.comment)

	const dispatch = useDispatch()
	const setBlogs = (message) => dispatch(helper('blogs', message))
	const setComment = (message) => dispatch(helper('comment', message))

	const blog  = all.find( each => each.id === id)



	const increaseLike = async() =>
	{
		const newBlog = { ...blog, likes: blog.likes + 1 }

		console.log(newBlog, blog)

		await blogService.update(newBlog)

		const t = await blogService.getAll()
		console.log(t)

		setBlogs(t)
		notify(`${newBlog.title} liked` , 'success')
	}

	async function handleComment(e)
	{
		e.preventDefault()

		await blogService.postComment(id, comment)
		const t = await blogService.getAll()

		setBlogs(t)
		setComment('')

		notify('new comment added', 'success')
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

				<button  className='btn btn-secondary' onClick={increaseLike}>like</button>
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

			<form onSubmit={handleComment}>
				<div>
					<InputComp
						type='text'
						value={comment}
						change={setComment}
					/>

					<button  className='btn btn-secondary'>
						add comment
					</button>
				</div>
			</form>
		</div>
	)
}

export default AllBlog