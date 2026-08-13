/**
 * Service: ProgressService
 * Tracks and calculates student progress through classes and programs.
 */

import { mockClient } from './api/mockClient';

export const progressService = {
  async getProgressByStudent(studentId) {
    return mockClient.find('progress', (p) => p.studentId === studentId);
  },

  async getProgressForClass(studentId, classId) {
    return mockClient.findOne('progress', (p) => p.studentId === studentId && p.classId === classId);
  },

  async markClassCompleted(studentId, classId, programId) {
    const existing = await mockClient.findOne(
      'progress',
      (p) => p.studentId === studentId && p.classId === classId
    );

    if (existing) {
      return mockClient.update('progress', existing.id, {
        completed: true,
        completedAt: new Date().toISOString()
      });
    }

    return mockClient.create('progress', {
      studentId,
      classId,
      programId,
      completed: true,
      completedAt: new Date().toISOString(),
      lastPositionSeconds: 0
    });
  },

  async toggleClassCompleted(studentId, classId, programId) {
    const existing = await mockClient.findOne(
      'progress',
      (p) => p.studentId === studentId && p.classId === classId
    );

    if (existing) {
      const newStatus = !existing.completed;
      return mockClient.update('progress', existing.id, {
        completed: newStatus,
        completedAt: newStatus ? new Date().toISOString() : null
      });
    }

    return mockClient.create('progress', {
      studentId,
      classId,
      programId,
      completed: true,
      completedAt: new Date().toISOString(),
      lastPositionSeconds: 0
    });
  },

  async getProgramProgressSummary(studentId, programId) {
    const classes = await mockClient.find('classes', (c) => c.programId === programId);
    const progressRecords = await mockClient.find(
      'progress',
      (p) => p.studentId === studentId && p.programId === programId && p.completed === true
    );

    const totalClasses = classes.length;
    const completedClasses = progressRecords.length;
    const percentage = totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0;

    return {
      totalClasses,
      completedClasses,
      percentage
    };
  }
};
