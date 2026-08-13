/**
 * Service: ResourceService
 * Handles educational materials, downloadable guides, articles, and infographics.
 */

import { mockClient } from './api/mockClient';

export const resourceService = {
  async getAllResources() {
    const resources = await mockClient.getAll('resources');
    const programs = await mockClient.getAll('programs');
    const modules = await mockClient.getAll('modules');

    return resources.map((r) => ({
      ...r,
      program: programs.find((p) => p.id === r.programId) || null,
      module: modules.find((m) => m.id === r.moduleId) || null
    }));
  },

  async getResourcesByProgram(programId) {
    return mockClient.find('resources', (r) => r.programId === programId);
  },

  async getResourcesByModule(moduleId) {
    return mockClient.find('resources', (r) => r.moduleId === moduleId);
  },

  async createResource(resourceData) {
    return mockClient.create('resources', {
      ...resourceData,
      createdAt: new Date().toISOString()
    });
  },

  async updateResource(id, updates) {
    return mockClient.update('resources', id, updates);
  },

  async deleteResource(id) {
    return mockClient.delete('resources', id);
  }
};
