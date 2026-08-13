/**
 * Model: Program
 * Represents a formation program created by the instructor.
 */
export class Program {
  constructor({
    id = '',
    title = '',
    description = '',
    level = 'Todos los niveles',
    durationWeeks = 8,
    instructorId = '',
    coverImage = '',
    badge = 'Formación Continua',
    status = 'published', // 'draft' | 'published' | 'archived'
    createdAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.level = level;
    this.durationWeeks = durationWeeks;
    this.instructorId = instructorId;
    this.coverImage = coverImage;
    this.badge = badge;
    this.status = status;
    this.createdAt = createdAt;
  }
}
