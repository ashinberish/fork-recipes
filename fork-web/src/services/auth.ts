import { axios } from '@/api';

type ServerResponse = {
  message: string;
  success: boolean;
  errors?: Record<string, string>;
};

const AuthService = {
  login: async (email: string, password: string): Promise<ServerResponse> => {
    const response = await axios.post(`/auth/login/`, {
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
