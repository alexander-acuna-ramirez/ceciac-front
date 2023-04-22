import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('userData', {
  state: () => ({
    token: '',
    user: {
      id: '',
      name: '',
      email: '',
      network: false,
    },
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isAuthenticated: (state) => state.token != '',
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: any) {
      this.user = user;
    },
    logout() {
      this.user = {
        id: '',
        name: '',
        email: '',
        network: false,
      };
      this.token = '';
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
