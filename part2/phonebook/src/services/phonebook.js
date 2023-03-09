import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (newObject) => axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, changedObject) => axios.put(`${baseUrl}/${id}`, changedObject).then(response => response.data)

const del = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, del }