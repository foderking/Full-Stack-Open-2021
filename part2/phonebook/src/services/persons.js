import axios from 'axios'

const base = './api/persons'

const getPersons = () => {
	const request = axios.get(base)
	return request.then(response => response.data)
}

const addPerson = (person) => {
	const request = axios.post(base, person)
	return request.then(response => response.data)
}

const deletePerson = (id) => {
	const request = axios.delete(`${base}/${id}`)
	return request.then(response => response.data)
}

const changePerson = (id, data) => {
	const request = axios.put(`${base}/${id}`, data)
	return request.then(response => response.data)
}

const object ={ getPersons, addPerson, deletePerson, changePerson}
export default object