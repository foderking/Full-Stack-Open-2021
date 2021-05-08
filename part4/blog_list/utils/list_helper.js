const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	total = 
		blogs
			.map(each => each.likes)
			.reduce((sum, item) => sum + item, 0)
	return total
}

module.exports = {
	dummy,
	totalLikes
}