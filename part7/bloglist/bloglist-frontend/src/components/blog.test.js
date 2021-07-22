import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
// import { render } from '@testing-library/react'
import Blog from './Blog'
// import CreateBlog from './CreateBlog'
import { render, fireEvent } from '@testing-library/react'



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
			increaseLike={() => {}}
			removeBlog={() => {}}
		/>
	)
	const div = component.container.querySelector('.partial')

	expect(div).toHaveTextContent('what the fuck')
	expect(div).toHaveTextContent('Mashishi kishimoto')
})


test('clicking button shows url and likes', () => {
	const component = render(
		<Blog
			blog={blog}
			increaseLike={() => {}}
			removeBlog={() => {}}
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
			removeBlog={() => {}}
		/>
	)
	const button = component.getByText('see more')
	fireEvent.click(button)

	const like= component.getByText('like')
	fireEvent.click(like)
	fireEvent.click(like)

	expect(mockHandler.mock.calls).toHaveLength(2)
})

// test('submitting forms', () => {
// 	const [blogTitle, setTitle] = useState('')
// 	const [blogAuthor, setAuthor] = useState('')
// 	const [blogUrl, setUrl] = useState('')

// 	const handleBlogPost = jest.fn()

// 	const component = render(
// 		< CreateBlog  handleBlogPost={handleBlogPost} blogTitle={blogTitle} setTitle={setTitle} blogAuthor={blogAuthor} setAuthor={setAuthor} blogUrl={blogUrl} setUrl={setUrl} />
// 	)
// 	const author = component.container.querySelector('#Author')
//   const form = component.container.querySelector('form')

// 	fireEvent.change(author, {
//     target: { value: 'testing of forms could be easier' }
//   })
//   fireEvent.submit(form)

//   expect(createNote.mock.calls).toHaveLength(1)
//   expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
// })