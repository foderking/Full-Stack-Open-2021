import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ( { blog }  ) =>
{
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			<div className='partial'>
				<Link to={`/blog/${blog.id}`} >
					{blog.title}
				</Link>
			</div>
		</div>
	)
}

export default Blog