import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// import { render } from '@testing-library/react'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'


const increaseLike = async(blog) => {
	const newBlog = { ...blog, likes: blog.likes + 1 }
	const response = await blogService.update(newBlog)

	const temp = blogs.find(each => each.id === response.id)

	const newb = { ...temp, likes: response.likes }
	const t = blogs.map(
		each => each.id === temp.id ? newb : each
	)
	setBlogs(t)
}

const removeBlog = async(blog) => {
	console.log(user.username, blog.user.username)
	if ( window.confirm(`Remove "${blog.title}" by ${blog.author}?`) && user.username === blog.user.username) {
		const id = blog.id

		await blogService.del(blog)

		const t = await blogService.getAll()
		setBlogs(t)
		console.log(id, 'removed')
	}
	else {
		if (user.username !== blog.user.username) {
			notify(`Blog wasn't created by ${user.username}`, 'error')
		}
		console.log('blog wasn\'t deleted')
	}

}

const blog = {
	title: 'what the fuck',
	author: 'Mashishi kishimoto',
	url: 'www.google.com',
	likes: 4902449
}

test('authors and title only are displayed by default', () => {
	const component = render(
		<Blog
			blog={blog}
			increaseLike={increaseLike}
			removeBlog={removeBlog}
		/>
	)
	const div = component.container.querySelector('.partial')

	expect(div).toHaveTextContent('what the fuck')
	expect(div).toHaveTextContent('Mashishi kishimoto')
})


test('clicking button shows url and likes', () => {
	// const mockHandler = jest.fn()

	const component = render(
		<Blog
			blog={blog}
			increaseLike={increaseLike}
			removeBlog={removeBlog}
		/>
	)
	const button = component.getByText('see more')
	fireEvent.click(button)

	const div = component.container.querySelector('.full')
	expect(div).toHaveTextContent('www.google.com')
	expect(div).toHaveTextContent('4902449')
})

test('clicking like twice', () => {
	const mockHandler = jest.fn()

	const component = render(
		<Blog
			blog={blog}
			increaseLike={mockHandler}
			removeBlog={removeBlog}
		/>
	)
	const button = component.getByText('see more')
	fireEvent.click(button)

	const like= component.getByText('like')
	fireEvent.click(like)
	fireEvent.click(like)

	expect(mockHandler.mock.calls).toHaveLength(2)
})