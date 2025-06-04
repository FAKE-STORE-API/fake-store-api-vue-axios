import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', () => {
  const adminAccount = { username: 'admin', password: 'admin123' };

  const isLoggedIn = ref(false);

  const login = (username: string, password: string) => {
    console.log('Attempting to log in with:', username, password);
    if (username === adminAccount.username && password === adminAccount.password) {
      isLoggedIn.value = true;
      return true;
    }
    isLoggedIn.value = false;
    return false;
  };

  const logout = () => {
    isLoggedIn.value = false;
  };

  return { isLoggedIn, login, logout };
});
