/**
 * Service: AuthService
 * Manages user sessions, authentication simulation, and profile updates.
 */

import { mockClient } from './api/mockClient';

const CURRENT_USER_KEY = 'yessi_current_user_id';

export const authService = {
  async login(email) {
    const user = await mockClient.findOne('users', (u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('No se encontró ningún usuario con ese correo electrónico.');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, user.id);
    }
    return user;
  },

  async register({ name, email, role = 'student', bio = '' }) {
    const existing = await mockClient.findOne('users', (u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('Ya existe un usuario registrado con este correo electrónico.');
    }

    const newUser = await mockClient.create('users', {
      name,
      email,
      role,
      bio,
      avatar: `https://images.unsplash.com/photo-${role === 'instructor' ? '1594381898411-846e7d193883' : '1535713875002-d1d0cf377fde'}?w=200&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString()
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, newUser.id);
    }
    return newUser;
  },

  async getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const userId = localStorage.getItem(CURRENT_USER_KEY);
    if (!userId) {
      // Default to student 1 if not set for initial test convenience
      const users = await mockClient.getAll('users');
      const defaultUser = users.find((u) => u.role === 'student') || users[0];
      if (defaultUser) {
        localStorage.setItem(CURRENT_USER_KEY, defaultUser.id);
        return defaultUser;
      }
      return null;
    }
    return mockClient.getById('users', userId);
  },

  async switchUser(userId) {
    const user = await mockClient.getById('users', userId);
    if (!user) throw new Error('Usuario no encontrado');
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, user.id);
    }
    return user;
  },

  async logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    return { success: true };
  },

  async getAllUsers() {
    return mockClient.getAll('users');
  },

  async getStudents() {
    return mockClient.find('users', (u) => u.role === 'student');
  },

  async getInstructor() {
    return mockClient.findOne('users', (u) => u.role === 'instructor');
  },

  async updateProfile(userId, updates) {
    return mockClient.update('users', userId, updates);
  }
};
