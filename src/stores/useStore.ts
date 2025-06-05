import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ElMessage } from 'element-plus';

import router from '@/router';

import type { userRegistrationStore } from '@/models/types';

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registeredUsers: JSON.parse(
      localStorage.getItem('registeredUsers') || '[]',
    ) as userRegistrationStore[],
    isLoading: false,
  }),

  getters: {
    getUsers: (state) => state.registeredUsers,
  },
  actions: {
    async registerUser(userData: userRegistrationStore): Promise<boolean> {
      this.isLoading = true;

      await new Promise((resolve) => setTimeout(resolve, 600));
      const { firstName, lastName, email, contactNumber, password, confirmPassword } = userData;

      const isExistingUser = this.registeredUsers.some(
        (user) => user.email === email || user.contactNumber === contactNumber,
      );

      if (isExistingUser) {
        ElMessage({
          message: 'User already exists with the same email and/or contact number.',
          grouping: true,
          type: 'error',
        });
        this.isLoading = false;
        return false;
      }

      const id = uuidv4();

      this.registeredUsers.push({
        id,
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        confirmPassword,
        role: 'isCustomer',
      });

      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

      ElMessage({
        message: 'User registered successfully!',
        grouping: true,
        type: 'success',
      });

      this.isLoading = false;

      return true;
    },

    async updateUser(updatedUser: userRegistrationStore): Promise<boolean> {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 600));

      const index = this.registeredUsers.findIndex((u) => u.id === updatedUser.id);

      if (index === -1) {
        ElMessage({
          message: 'User not found.',
          type: 'error',
        });
        this.isLoading = false;
        return false;
      }

      const isDuplicate = this.registeredUsers.some(
        (user, i) =>
          i !== index &&
          (user.email === updatedUser.email || user.contactNumber === updatedUser.contactNumber),
      );

      if (isDuplicate) {
        ElMessage({
          message: 'Another user already has this email or contact number.',
          type: 'error',
        });
        this.isLoading = false;
        return false;
      }

      this.registeredUsers[index] = { ...updatedUser };

      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

      ElMessage({
        message: 'User updated successfully!',
        type: 'success',
      });

      this.isLoading = false;

      return true;
    },

    async deleteUser(id: string): Promise<boolean> {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 400));
      const index = this.registeredUsers.findIndex((u) => u.id === id);
      if (index === -1) {
        ElMessage({
          message: 'User not found.',
          type: 'error',
        });
        this.isLoading = false;
        return false;
      }
      this.registeredUsers.splice(index, 1);
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
      ElMessage({
        message: 'User deleted successfully!',
        type: 'success',
      });
      this.isLoading = false;
      return true;
    },
  },
});

export const useAuthenticationStore = defineStore('authentication', {
  state: () => ({
    isLoggedIn: false,
    user: null as {
      id: string;
      email: string;
      lastName: string;
      contactNumber: string;
      role: string;
    } | null,
  }),
  getters: {
    isAtuhenticated: (state) => state.isLoggedIn,
    getUserEmail: (state) => state.user?.email || '',
  },
  actions: {
    login(email: string, password: string) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find(
        (u: { email: string; password: string }) => u.email === email && u.password === password,
      );
      if (user) {
        this.isLoggedIn = true;
        this.user = {
          id: user.id,
          email: user.email,
          lastName: user.lastName,
          role: user.role,
          contactNumber: user.contactNumber,
        };
        localStorage.setItem(
          'loginStatus',
          JSON.stringify({ id: user.id, email: user.email, loggedIn: true }),
        );

        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem('loginStatus');
      router.push('/');
      ElMessage({
        message: 'Logged out successfully!',
        grouping: true,
        type: 'success',
      });
    },
    checkLoginStatus() {
      const loginStatus = localStorage.getItem('loginStatus');
      if (loginStatus) {
        const { id, email, loggedIn } = JSON.parse(loginStatus);
        if (loggedIn) {
          this.isLoggedIn = true;
          this.user = { id, email, lastName: '', contactNumber: '', role: 'isCustomer' };
        }
      }
    },
  },
});
