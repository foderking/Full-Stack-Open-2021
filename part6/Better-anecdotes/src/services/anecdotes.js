import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const put = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data)
  return response.data
}

export default { getAll, post, put }