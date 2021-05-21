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


module.exports = { 
	initialNotes, 
	postBlog, 
	noLike,
	noTitle,
	noUrl,
	none
}