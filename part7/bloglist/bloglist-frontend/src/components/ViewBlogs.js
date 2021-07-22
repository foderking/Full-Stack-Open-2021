import React, { useEffect } from 'react'
import { helper } from '../reducers/Reducer'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import blogService from '../services/blogs'

const ViewBlogs = () =>
{
	const dispatch = useDispatch()
	const setBlogs = (message) => dispatch(helper('blogs', message))

	const all = useSelector(state => state.blogs)
	const url  = useRouteMatch().url


	useEffect(async () => {
		const blogs = await blogService.getAll()

		setBlogs(blogs)
		console.log(blogs, url)
	}, [])


	return (
		<div>
			<h2>Blogs</h2>

			<ul>
				{
					all.map(each =>
						<li key={each.id} >
							<Link to={`${url}/${each.id}`} >
								{each.title}
							</Link>
						</li>
					)
				}
			</ul>

		</div>
	)
}

export default ViewBlogs
