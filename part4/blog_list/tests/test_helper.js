const blog = require('../models/blog')
const User = require('../models/user')


const initialNotes = [
	{
	  title: 'foder',
	  author: 'king',
	  url: '.com',
	  likes: 4
	},
	{
	  title: 'sudo',
	  author: 'amsh',
	  url: 'root/api',
	  likes: 6
	}
]

const postBlog = {
  title: 'shhudo',
  author: 'ah',
  url: '/ri',
  likes: 9
}

const noLike = {
  "title": "wahala",
  "author": "random",
  "url": "/google.com"
}

const noTitle = {	
	"author": "random", 
	"url": "/google.com" 
}

const noUrl = {
  "title": "wahala",
  "author": "random"
}

const none = {"author": "random"}

const getUser = async() => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { 
	initialNotes, 
	postBlog, 
	noLike,
	noTitle,
	noUrl,
	none,
	getUser
}