/**
 * Model: Class
 * Represents a class/lesson within a Module (Live or Recorded).
 */
export class Class {
  constructor({
    id = '',
    moduleId = '',
    programId = '',
    title = '',
    description = '',
    type = 'recorded', // 'live' | 'recorded'
    date = '', // relevant for live classes (ISO format)
    durationMinutes = 45,
    videoUrl = '',
    liveLink = '',
    order = 1,
    status = 'active', // 'active' | 'scheduled' | 'finished'
    keyTakeaways = []
  } = {}) {
    this.id = id;
    this.moduleId = moduleId;
    this.programId = programId;
    this.title = title;
    this.description = description;
    this.type = type;
    this.date = date;
    this.durationMinutes = durationMinutes;
    this.videoUrl = videoUrl;
    this.liveLink = liveLink;
    this.order = order;
    this.status = status;
    this.keyTakeaways = keyTakeaways;
  }
}
