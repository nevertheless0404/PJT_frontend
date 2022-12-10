import axios from 'axios'

function registerUser(userData) {
  // 요청할 URL
  const url = 'http://127.0.0.1:8000/api/accounts/v1/registration/'
  return axios.post(url, userData, {
    'Content-Type': 'application/json'
  })
}

function projectIndex() {
  // 요청할 URL
  const url = 'http://127.0.0.1:8000/project/'
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
  return axios.post(url, projectData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function projectGet(project) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/project/${project}/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function projectUpdate(project, projectData) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/project/${project}/`
  return axios.put(url, projectData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function markdownGet(project) {
  // 요청할 URL
  console.log('웨 안 뒈 마 크 다 운')
  const url = `http://127.0.0.1:8000/${project}/markdown/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function markdownPut(project, update_markdown) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${project}/markdown/`
  return (
    axios.put(url, update_markdown, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  )
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
  return axios.post(url, memberData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function NotificationGet() {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/notification`
  return axios.get(url, {
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

function todoPutDrag(pjt_pk, update_data) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${pjt_pk}/todo/${update_data.id}/`
  return (
    axios.put(url, update_data[0], {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  )
}

function todoPut(pjt_pk, update_data) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/${pjt_pk}/todo/${update_data.id}/`
  return (
    axios.put(url, update_data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
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

function isRead(notificationPk) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/isread/${notificationPk}`
  return axios.put(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function informCreate(pjt_pk, new_inform) {
  const url = `http://127.0.0.1:8000/informs/${pjt_pk}/`
  return axios.post(url, new_inform, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function informList(pjt_pk) {
  const url = `http://127.0.0.1:8000/informs/${pjt_pk}/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function InformPut(project, informData) {
  console.log(informData)
  // 요청할 URL
  const url = `http://127.0.0.1:8000/informs/${project}/detail`
  return axios.put(url, informData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

// function MemberList(project, memberData) {
//   const url = `http://127.0.0.1:8000/memberadmin/${project}/${memberData}/`
//   return axios.get(url, {
//     headers: {
//       'Content-Type': 'applications/json',
//       Authorization: 'Bearer' + localStorage.getItem('access_token')
//     }
//   })
// }

function  MemberList(project) {
  // 요청할 URL
  const url = `http://127.0.0.1:8000/memberadmin/${project}/`
  console.log
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

// 함수 export
export {
  registerUser,
  projectIndex,
  projectCreate,
  markdownGet,
  markdownPut,
  projectGet,
  projectUpdate,
  memberCreate,
  NotificationGet,
  todoCreate,
  todoList,
  todoPut,
  todoPutDrag,
  todoDel,
  isRead,
  informCreate,
  informList,
  MemberList,
  InformPut
}
