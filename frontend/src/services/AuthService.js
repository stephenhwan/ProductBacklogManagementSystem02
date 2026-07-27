import apiClient from './ApiClient'

export const AuthService = {
  //[httpPost]
  async register ({fullName, email, password}){
    const { data } = await apiClient.post('/auth/register', {
      fullName,
      email,
      password,
    })
    localStorage.setItem('pbms_token', data.token)
    return data
  },
  //[httpPost]
  async login({ email, password}) {
    const { data } = await apiClient.post('/auth/login', {
      email, 
      password
    })
    localStorage.setItem('pbms_token', data.token)
    return data
  },

  async logout() {
    localStorage.removeItem('pbms_token')
  },

  async getSession() {
    const token = localStorage.getItem('pbms_token')
    if(!token) return null
    try{
      const { data: user } = await apiClient.get('/auth/me')
      return { user, token }

    } catch {
      localStorage.removeItem('pbms_token')
      return null
    }
  },
}

export default AuthService