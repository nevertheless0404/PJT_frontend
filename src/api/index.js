import axios from 'axios'

function registerUser(userData) {
  // 요청할 URL
  const url = 'api/accounts/v1/registration/'
  return axios.post(url, userData, {
    'Content-Type': 'application/json'
  })
}

function projectIndex() {
  // 요청할 URL
  const url = 'project/'
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function projectCreate(projectData) {
  // 요청할 URL
  const url = 'project/'
  return axios.post(url, projectData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function projectGet(project) {
  // 요청할 URL
  const url = `project/${project}/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function projectUpdate(project, projectData) {
  // 요청할 URL
  const url = `project/${project}/`
  return axios.put(url, projectData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function markdownGet(project) {
  // 요청할 URL
  const url = `${project}/markdown/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function markdownPut(project, update_markdown) {
  // 요청할 URL
  const url = `${project}/markdown/`
  return axios.put(url, update_markdown, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}
// function projectPk() {
//   // 요청할 URL
//   const url = 'recent_project/'
//   // console.log('projectData :', projectData)
//   return axios.get(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + localStorage.getItem('access_token')
//     }
//   })
// }

function memberCreate(pjt_pk, memberEmail) {
  // 요청할 URL
  const url = `memberadmin/${pjt_pk}/`
  return axios.post(url, memberEmail, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function NotificationGet() {
  // 요청할 URL
  const url = `notification`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function todoCreate(pjt_pk, new_data) {
  // 요청할 URL
  const url = `${pjt_pk}/todo/`
  return (
    axios.post(url, new_data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  )
}

function todoList(pjt_pk) {
  // 요청할 URL
  const url = `${pjt_pk}/todo/`
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
  const url = `${pjt_pk}/todo/${update_data.id}/`
  return axios.put(url, update_data[0], {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function todoPut(pjt_pk, update_data) {
  // 요청할 URL
  const url = `${pjt_pk}/todo/${update_data.id}/`
  return axios.put(url, update_data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function todoDel(pjt_pk, update_data) {
  // 요청할 URL
  const url = `${pjt_pk}/todo/${update_data.id}/`
  return (
    axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
  )
}

function isRead(notificationPk) {
  // 요청할 URL
  const url = `isread/${notificationPk}/`
  return axios.put(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function informCreate(pjt_pk, new_inform) {
  const url = `informs/${pjt_pk}/`
  return axios.post(url, new_inform, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function informList(pjt_pk) {
  const url = `informs/${pjt_pk}/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function InformPut(project, informData) {
  // 요청할 URL
  const url = `informs/${project}/detail`
  return axios.put(url, informData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function commentCreate(pjt_pk, todo_pk, new_comment) {
  const url = `${pjt_pk}/todo/${todo_pk}/comment/`
  return axios.post(url, new_comment, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function commentUpdate(pjt_pk, todo_pk, comment_pk, commentData) {
  const url = `${pjt_pk}/todo/${todo_pk}/comment/${comment_pk}/`
  return axios.put(url, commentData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function commentList(pjt_pk, todo_pk) {
  const url = `${pjt_pk}/todo/${todo_pk}/comment/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function commentDelete(pjt_pk, todo_pk, comment_pk) {
  const url = `${pjt_pk}/todo/${todo_pk}/comment/${comment_pk}/`
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

function MemberList(project) {
  // 요청할 URL
  const url = `memberadmin/${project}/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function deleteMember(pjt_pk, user_pk) {
  // 요청할 URL
  const url = `memberadmin/${pjt_pk}/${user_pk}`
  return axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function changeLeader(pjt_pk, user_pk) {
  const url = `changeleader/${pjt_pk}/${user_pk}/`
  return axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

function searchEmail(search) {
  const url = `userlist/${search}`
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
  InformPut,
  commentCreate,
  commentUpdate,
  commentList,
  commentDelete,
  MemberList,
  deleteMember,
  changeLeader,
  searchEmail
}
