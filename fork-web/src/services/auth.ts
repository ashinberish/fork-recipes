import { axios } from '@/api';
import { useAppStore } from '@/stores';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

type ServerResponse<T = undefined> = {
  message: string;
  success: boolean;
  data?: T;
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
    await axios.post(`/auth/logout/`);
  },

  profile: async (): Promise<AxiosResponse<ServerResponse<User>, unknown>> => {
    const response = await axios.get(`/auth/profile/`);
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response;
  },

  initProfile: async (): Promise<boolean> => {
    /*
    * TODO: Implement a splash screen to show the user that the app is loading
    * 
    * This function is used to initialize the app with the user profile, 
    * checks if the user needs to do any additional setup and then redirects the user to the appropriate page
    *
    * */
   
    try {
      const profileRes = await AuthService.profile();
      useAppStore.setState({ user: profileRes.data.data });
      return true;
    } catch {
      throw new Error(`Failed to fetch user profile`);
    }
  },
};

export default AuthService;
