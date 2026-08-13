/**
 * Service: ProgramService
 * Manages educational programs, modules, and structure.
 */

import { mockClient } from './api/mockClient';

export const programService = {
  async getPrograms() {
    return mockClient.getAll('programs');
  },

  async getProgramById(id) {
    return mockClient.getById('programs', id);
  },

  async getProgramWithCurriculum(programId) {
    const program = await mockClient.getById('programs', programId);
    if (!program) return null;

    const allModules = await mockClient.find('modules', (m) => m.programId === programId);
    const sortedModules = allModules.sort((a, b) => (a.order || 0) - (b.order || 0));

    const allClasses = await mockClient.find('classes', (c) => c.programId === programId);
    const allResources = await mockClient.find('resources', (r) => r.programId === programId);

    const modulesWithContent = sortedModules.map((mod) => ({
      ...mod,
      classes: allClasses
        .filter((c) => c.moduleId === mod.id)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
      resources: allResources.filter((r) => r.moduleId === mod.id)
    }));

    return {
      ...program,
      modules: modulesWithContent
    };
  },

  async createProgram(programData) {
    return mockClient.create('programs', {
      ...programData,
      status: programData.status || 'published',
      createdAt: new Date().toISOString()
    });
  },

  async updateProgram(id, updates) {
    return mockClient.update('programs', id, updates);
  },

  async deleteProgram(id) {
    return mockClient.delete('programs', id);
  },

  // Module management
  async getModulesByProgram(programId) {
    const modules = await mockClient.find('modules', (m) => m.programId === programId);
    return modules.sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createModule(moduleData) {
    return mockClient.create('modules', moduleData);
  },

  async updateModule(id, updates) {
    return mockClient.update('modules', id, updates);
  },

  async deleteModule(id) {
    return mockClient.delete('modules', id);
  }
};
