import axios from 'axios'

const API = axios.create({
  baseURL: 'https://lang-app-64jf.onrender.com'
})

export default API