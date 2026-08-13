/**
 * Service: ExerciseService
 * Manages the movement & biomechanics pedagogical library.
 */

import { mockClient } from './api/mockClient';

export const exerciseService = {
  async getAllExercises() {
    return mockClient.getAll('exercises');
  },

  async getExerciseById(id) {
    return mockClient.getById('exercises', id);
  },

  async getExercisesByCategory(category) {
    if (!category || category === 'all') {
      return mockClient.getAll('exercises');
    }
    return mockClient.find('exercises', (e) => e.category === category);
  },

  async createExercise(exerciseData) {
    return mockClient.create('exercises', {
      ...exerciseData,
      createdAt: new Date().toISOString()
    });
  },

  async updateExercise(id, updates) {
    return mockClient.update('exercises', id, updates);
  },

  async deleteExercise(id) {
    return mockClient.delete('exercises', id);
  }
};
