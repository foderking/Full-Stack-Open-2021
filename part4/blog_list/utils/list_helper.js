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

// const bloogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0
//   }  
// ]
// mostLikes(bloogs)
			
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog, 
	mostBlogs,
	mostLikes
}