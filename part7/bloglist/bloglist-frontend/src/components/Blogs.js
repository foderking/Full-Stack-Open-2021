import React from 'react'
import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'
import blogService from '../services/blogs'
import LoggedIn from './LoggedIn'
import { useSelector, useDispatch } from 'react-redux'
import { helper } from '../reducers/Reducer'
import { NavLink } from 'react-router-dom'

const Blogs = ({ notify }) =>
{
	const dispatch = useDispatch()
	const login = useSelector(state => state)

	const blogs = login.blogs
	const setBlogs = (message) => dispatch(helper('blogs', message))

	const blogTitle = login.title
	const setTitle = (message) => dispatch(helper('title', message))

	const blogAuthor = login.author
	const setAuthor = (message) => dispatch(helper('author', message))

	const blogUrl = login.url
	const setUrl = (message) => dispatch(helper('url', message))

	const createBlogVis = login.visibility
	const setBlogVis = (message) => dispatch(helper('visibility', message))

	const showWhenVisible = { display: createBlogVis ? '' : 'none' }


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


	return (
		<div>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container-fluid'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item' >
							<NavLink className='nav-link' to='/user'>users</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/blog'>blog</NavLink>
						</li>
						<li>
							<LoggedIn notify={ notify }/>
						</li>
					</ul>
				</div>
			</nav>

			<h2>blogs</h2>

			<div style={showWhenVisible}>
				<CreateBlog handleBlogPost={handleBlogPost} />
			</div>

			<button type="submit" className='btn btn-secondary' onClick={() => setBlogVis(!createBlogVis)} >
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