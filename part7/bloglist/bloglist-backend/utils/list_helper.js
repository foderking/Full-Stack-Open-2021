lodash = require('lodash')

const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	const total = 
		blogs
			.map(each => each.likes)
			.reduce((sum, item) => sum + item, 0)
	return total
}

const favoriteBlog = blogs => {
	const maxlike = 
		blogs
			.map(each => each.likes)
			.reduce((acc, other) => Math.max(acc, other), 0)
	const blog = blogs.find(blogs => blogs.likes === maxlike)
	return blog
}

const mostBlogs = blogs => {
	let transformed = lodash.groupBy(blogs, 'author')
	let result = lodash.mapValues(transformed, each => each.length)
	let author = Object.keys(result).reduce( (a, b) => result[a] > result[b] ? a : b );
	console.log({ author: author, blogs: result[author] })
	return { author: author, blogs: result[author] }
}

const mostLikes = blogs => {
	let transformed = lodash.groupBy(blogs, 'author')
	let result = lodash.mapValues(transformed, each => each.map(each => each.likes).reduce((a, b) => a + b), 0)
	let author = Object.keys(result).reduce( (a, b) => result[a] > result[b] ? a : b );
	console.log({ author: author, blogs: result[author] })
	return { author: author, blogs: result[author] }
}

			
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog, 
	mostBlogs,
	mostLikes
}