import axios from 'axios';

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`/auth/login`, {
      email,
      password,
    });
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data;
  },
  logout: async () => {
    await axios.post(`/auth/logout`);
  },
};

export default AuthService;
