import axios from 'axios'

function registerUser(userData) {
  // 요청할 URL
  const url = 'http://127.0.0.1:8000/api/accounts/v1/registration/'
  console.log('userData :', userData)
  return axios.post(url, userData, {
    'Content-Type': 'application/json'
  })
}

function projectCreate(projectData) {
  // 요청할 URL
  const url = 'http://127.0.0.1:8000/project/'
  console.log('projectData :', projectData)
  return axios.post(url, projectData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}
// 함수 export
export { registerUser, projectCreate }
