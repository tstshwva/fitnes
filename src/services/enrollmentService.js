/**
 * Service: EnrollmentService
 * Manages student program enrollments and statuses.
 */

import { mockClient } from './api/mockClient';

export const enrollmentService = {
  async getByStudentId(studentId) {
    const enrollments = await mockClient.find('enrollments', (enr) => enr.studentId === studentId);
    const programs = await mockClient.getAll('programs');

    // Enrich with program details
    return enrollments.map((enr) => ({
      ...enr,
      program: programs.find((p) => p.id === enr.programId) || null
    }));
  },

  async getActiveProgramForStudent(studentId) {
    const enrollments = await this.getByStudentId(studentId);
    const active = enrollments.find((enr) => enr.status === 'active');
    return active ? active.program : null;
  },

  async getByProgramId(programId) {
    const enrollments = await mockClient.find('enrollments', (enr) => enr.programId === programId);
    const users = await mockClient.getAll('users');

    return enrollments.map((enr) => ({
      ...enr,
      student: users.find((u) => u.id === enr.studentId) || null
    }));
  },

  async getAllEnrollments() {
    const enrollments = await mockClient.getAll('enrollments');
    const users = await mockClient.getAll('users');
    const programs = await mockClient.getAll('programs');

    return enrollments.map((enr) => ({
      ...enr,
      student: users.find((u) => u.id === enr.studentId) || null,
      program: programs.find((p) => p.id === enr.programId) || null
    }));
  },

  async enroll(studentId, programId) {
    const existing = await mockClient.findOne(
      'enrollments',
      (enr) => enr.studentId === studentId && enr.programId === programId && enr.status === 'active'
    );
    if (existing) {
      return existing;
    }
    return mockClient.create('enrollments', {
      studentId,
      programId,
      status: 'active',
      startDate: new Date().toISOString()
    });
  },

  async updateStatus(enrollmentId, status) {
    return mockClient.update('enrollments', enrollmentId, { status });
  }
};
