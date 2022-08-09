import axiosClient from "./axios-client"

interface LoginPayload {
  username: string,
  password: string
  remember?: boolean | undefined;
}
export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/login', payload);
  },
  logout() {
    return axiosClient.post('/logout');
  },
  getProfile() {
    return axiosClient.get('/profile')
  }
}