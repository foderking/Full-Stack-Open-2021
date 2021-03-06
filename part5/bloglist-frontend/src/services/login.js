import axios from 'axios'

const baseUrl = '/api/login'

const login = async credentials => {
	console.log('trying to login')
	const response = await axios.post(baseUrl, credentials)
	return response.data
}


const exp = { login }
export default exp