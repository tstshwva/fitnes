/**
 * Model: Enrollment
 * Connects a Student with a Program, decoupled from the User model.
 */
export class Enrollment {
  constructor({
    id = '',
    studentId = '',
    programId = '',
    status = 'active', // 'active' | 'completed' | 'paused' | 'cancelled'
    startDate = new Date().toISOString(),
    createdAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.studentId = studentId;
    this.programId = programId;
    this.status = status;
    this.startDate = startDate;
    this.createdAt = createdAt;
  }
}
