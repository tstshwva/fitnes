/**
 * Model: Progress
 * Tracks completion and interaction with classes per student.
 */
export class Progress {
  constructor({
    id = '',
    studentId = '',
    classId = '',
    programId = '',
    completed = false,
    completedAt = null,
    lastPositionSeconds = 0,
    updatedAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.studentId = studentId;
    this.classId = classId;
    this.programId = programId;
    this.completed = completed;
    this.completedAt = completedAt;
    this.lastPositionSeconds = lastPositionSeconds;
    this.updatedAt = updatedAt;
  }
}
