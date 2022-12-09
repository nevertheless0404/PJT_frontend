import axios from 'axios'

function registerUser(userData) {
  // 요청할 URL
  const url = 'http://127.0.0.1:8000/api/accounts/v1/registration/'
  console.log('userData :', userData)
  return axios.post(url, userData, {
    'Content-Type': 'application/json'
  })
}

function projectIndex() {
  // 요청할 URL
  const url = 'http://127.0.0.1:8000/project/'
  // console.log('projectData :', projectData)
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
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

// function projectPk() {
//   // 요청할 URL
//   const url = 'http://127.0.0.1:8000/recent_project/'
//   // console.log('projectData :', projectData)
//   return axios.get(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + localStorage.getItem('access_token')
//     }
//   })
// }

function memberCreate(memberData) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/memberadmin/${memberData.id}/`
  console.log('memberData :', memberData)
  console.log(url)
  return axios.post(url, memberData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function todoCreate(pjt_pk, new_data) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${pjt_pk}/todo/`
  console.log('뉴데이터 : ', new_data)
  return (
    axios.post(url, new_data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }),
    console.log('post 요청 후 데이터 :', new_data)
  )
}

function todoList(pjt_pk) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${pjt_pk}/todo/`
  // console.log('projectData :', projectData)
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function todoPut(pjt_pk, update_data) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${pjt_pk}/todo/${update_data.id}/`
  console.log('update 데이터 : ', update_data)
  return (
    axios.put(url, update_data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }),
    console.log('put 요청 후 데이터 :', update_data)
  )
}

function todoDel(pjt_pk, update_data) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${pjt_pk}/todo/${update_data.id}/`
  console.log('update 데이터 : ', update_data)
  return (
    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }),
    console.log('del 요청 후 데이터 :', update_data)
  )
}
// 함수 export
export {
  registerUser,
  projectIndex,
  projectCreate,
  memberCreate,
  todoCreate,
  todoList,
  todoPut,
  todoDel
}
