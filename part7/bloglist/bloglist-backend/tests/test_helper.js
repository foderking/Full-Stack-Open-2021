const blog = require('../models/blog')
const User = require('../models/user')


const getUser = async() => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}


const blogs = {
	first: {
		title: 'Reasonable Doubt',
		author: 'Jay Z',
		url: 'Hov.com',
		likes: 443894
	},
	second: {
		title: 'CLVV',
		author: 'Drake',
		url: 'ovo.com',
		likes: 63290
	},
	valid: {
		title: 'My name is my name',
		author: 'pusha t',
		url: 'darkestbeforedawn.com',
		likes: 12121		
	}, 
	noLike : {
		title: "wahala",
		author: "random",
		url: "/google.com"
	},
	noTitle : {	
		"author": "random", 
		"url": "/google.com" 
	},
	noUrl : {
		"title": "wahala",
		"author": "random"
	},
	none : {
		"author": "random"
	}
}

const comment = {
	first: {
		content: 'asdfasdf hahaha'
	}
}


const users = {
	initial: {
		'username': 'root',
		'name': 'admin'
	},
	invalidPassword: {
		"username": "John Doe",
		"name": "anonymous",
		"password": "o"
	},
	invalidUsername: {
		"username": "J",
		"name": "anonymous",
		"password": "secretpassword"		
	}, 
	validUser: {
		"username": "John Doe",
		"name": "anonymous",
		"password": "secretpassword123"		
	},
	duplicateUser: {
		"username": "root",
		"name": "random",
		"password": "notsosecret123"		
	}	
}

module.exports = { 
	blogs,
	getUser,
	comment,
	users
}