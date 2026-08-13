/**
 * Service: ClassService
 * Handles classes (both Live and Recorded) creation and queries.
 */

import { mockClient } from './api/mockClient';

export const classService = {
  async getAllClasses() {
    const classes = await mockClient.getAll('classes');
    const modules = await mockClient.getAll('modules');
    const programs = await mockClient.getAll('programs');

    return classes.map((c) => ({
      ...c,
      module: modules.find((m) => m.id === c.moduleId) || null,
      program: programs.find((p) => p.id === c.programId) || null
    }));
  },

  async getClassById(id) {
    const cls = await mockClient.getById('classes', id);
    if (!cls) return null;

    const module = await mockClient.getById('modules', cls.moduleId);
    const program = await mockClient.getById('programs', cls.programId);

    return {
      ...cls,
      module,
      program
    };
  },

  async getLiveClasses() {
    const all = await this.getAllClasses();
    return all.filter((c) => c.type === 'live');
  },

  async getRecordedClasses() {
    const all = await this.getAllClasses();
    return all.filter((c) => c.type === 'recorded');
  },

  async getClassesByModule(moduleId) {
    const classes = await mockClient.find('classes', (c) => c.moduleId === moduleId);
    return classes.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async getClassesByProgram(programId) {
    const classes = await mockClient.find('classes', (c) => c.programId === programId);
    return classes.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createClass(classData) {
    return mockClient.create('classes', {
      ...classData,
      status: classData.status || (classData.type === 'live' ? 'scheduled' : 'active')
    });
  },

  async updateClass(id, updates) {
    return mockClient.update('classes', id, updates);
  },

  async deleteClass(id) {
    return mockClient.delete('classes', id);
  }
};
