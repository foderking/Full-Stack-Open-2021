import React from 'react'
import InputComp from './InputComp'
import { helper } from '../reducers/Reducer'
import { useSelector, useDispatch } from 'react-redux'



const CreateBlog = ({ handleBlogPost }) =>
{
	const dispatch = useDispatch()
	const login = useSelector(state => state)

	const blogTitle = login.title
	const setTitle = (message) => dispatch(helper('title', message))

	const blogAuthor = login.author
	const setAuthor = (message) => dispatch(helper('author', message))

	const blogUrl = login.url
	const setUrl = (message) => dispatch(helper('url', message))


	return (
		<div>
			<h2>Create Blog</h2>

			<form onSubmit={handleBlogPost}>
				<InputComp
					desc='Title'
					type='text'
					value={blogTitle}
					change={setTitle}
				/>
				<InputComp
					desc='Author'
					type='text'
					value={blogAuthor}
					change={setAuthor}
				/>
				<InputComp
					desc='Url'
					type='text'
					value={blogUrl}
					change={setUrl}
				/>

				<button  className='btn btn-secondary' type='submit'>create</button>
			</form>
		</div>
	)
}


export default CreateBlog