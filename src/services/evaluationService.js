/**
 * Service: EvaluationService
 * Handles initial assessments and goal diagnosis.
 */

import { mockClient } from './api/mockClient';

export const evaluationService = {
  async getByStudentId(studentId) {
    return mockClient.findOne('evaluations', (e) => e.studentId === studentId);
  },

  async getAllEvaluations() {
    return mockClient.getAll('evaluations');
  },

  async saveEvaluation(evaluationData) {
    const existing = await mockClient.findOne('evaluations', (e) => e.studentId === evaluationData.studentId);
    if (existing) {
      return mockClient.update('evaluations', existing.id, {
        ...evaluationData,
        completedAt: new Date().toISOString()
      });
    }
    return mockClient.create('evaluations', {
      ...evaluationData,
      completedAt: new Date().toISOString()
    });
  }
};
