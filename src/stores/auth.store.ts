import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('user', {
  state: () => ({
    token: '',
    user: {
      name: '',
      email: '',
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
        name: '',
        email: '',
      };
      this.token = '';
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
