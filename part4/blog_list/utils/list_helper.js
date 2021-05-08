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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}