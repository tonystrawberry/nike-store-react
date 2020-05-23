export function getCurrentUser() {
  const user = localStorage.getItem('user')
  if (!user) return {}
  return JSON.parse(user as string)
}

export function authHeader(){
  const user = localStorage.getItem('user')
  if (!user) return { 'x-access-token': '' }

  const userJson = JSON.parse(user as string);

  if (user && userJson.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': userJson.accessToken }
  } else {
    return { 'x-access-token': ''}
  }
}

export function logoutUser(){
  localStorage.removeItem('user')
}
