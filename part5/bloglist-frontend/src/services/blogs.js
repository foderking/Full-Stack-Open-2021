import axios from 'axios'
const baseUrl = '/api/blogs'

let token 

const setToken = newToken => {
  return `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post =  async blog => {
	token = setToken(window.localStorage.activeUser)
	console.log('trying to post create blog with toke:', token)

  const config = {    
		headers: { Authorization: token}
	}

	const data = {
		title: blog.blogTitle,
		author: blog.blogAuthor,
		url: blog.blogUrl
	}

	const response = await axios.post(baseUrl, data, config)
	return response.data
}



const exp = { getAll, post, setToken }
export default exp