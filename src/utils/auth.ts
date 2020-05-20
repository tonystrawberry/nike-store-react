export function getCurrentUser() {
  const user = localStorage.getItem('user')

  console.log("user", user);
  if (!user) return {}

  return JSON.parse(user as string);
}

export function authHeader(){
  const user = localStorage.getItem('user')
  if (!user) return {}

  const accessToken = JSON.parse(user as string);

  if (user && accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': accessToken };
  } else {
    return {};
  }
}
