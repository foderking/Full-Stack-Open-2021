import React from 'react'
import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from '../reducers/Reducer'
import blogService from '../services/blogs'

const Blogs = ({ notify }) => {
	const dispatch = useDispatch()
	const login = useSelector(state => state)


	const blogs = login.blogs
	const setBlogs = (message) => dispatch(helper('blogs', message))

	const user = login.user
	const setUser = (message) => dispatch(helper('user', message))

	const blogTitle = login.title
	const setTitle = (message) => dispatch(helper('title', message))

	const blogAuthor = login.author
	const setAuthor = (message) => dispatch(helper('author', message))

	const blogUrl = login.url
	const setUrl = (message) => dispatch(helper('url', message))

	const createBlogVis = login.visibility
	const setBlogVis = (message) => dispatch(helper('visibility', message))



	const handleLogout = (event) =>
	{
		event.preventDefault()

		notify('logged out successfully' , 'success')
		setUser(null)
	}



	const handleBlogPost = async(event) =>
	{
		event.preventDefault()
		console.log('creating new blog')

		try {
			const newBlog = await blogService.post({
				blogTitle,
				blogAuthor,
				blogUrl
			})

			const temp  = await blogService.getAll()
			setBlogs(temp)

			setTitle('')
			setAuthor('')
			setUrl('')

			setBlogVis(false)

			notify(`${newBlog.title} posted successfully` , 'success')
		}

		catch (exception) {
			notify(exception.response.data.error, 'error')
		}
	}

	const showWhenVisible = { display: createBlogVis ? '' : 'none' }


	return (
		<div>
			<h2>blogs</h2>

			<form onSubmit={handleLogout}>
				{user.username} is logged in
				<button type="submit" >logout</button>
			</form>

			<div style={showWhenVisible}>
				<CreateBlog handleBlogPost={handleBlogPost} />
			</div>

			<button type="submit" onClick={() => setBlogVis(!createBlogVis)} >
				{createBlogVis ? 'cancel' : 'create blog'}
			</button>

			<div id='showBlog'>
				{
					blogs
						.sort( (a, b) => {
							return b.likes - a.likes
						})
						.map(blog =>
							<Blog
								key={blog.id}
								blog={blog}
								notify={notify}
							/>
						)
				}
			</div>

		</div>
	)
}


export default Blogs