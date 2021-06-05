import React from 'react'
import PropTypes from 'prop-types'
import InputComp from './InputComp'

const CreateBlog = ({ handleBlogPost, blogTitle, setTitle, blogAuthor, setAuthor, blogUrl, setUrl }) => {
	CreateBlog.propTypes = {
		handleBlogPost : PropTypes.func.isRequired,
		blogTitle: PropTypes.string.isRequired,
		setTitle : PropTypes.func.isRequired,
		blogAuthor : PropTypes.string.isRequired,
		setAuthor : PropTypes.func.isRequired,
		blogUrl : PropTypes.string.isRequired,
		setUrl: PropTypes.func.isRequired
	}

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
				<button type='submit'>create</button>
			</form>

		</div>
	)
}


export default CreateBlog