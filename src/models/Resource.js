/**
 * Model: Resource
 * Represents educational support materials (PDF guides, articles, infographics).
 */
export class Resource {
  constructor({
    id = '',
    programId = '',
    moduleId = '',
    title = '',
    type = 'pdf', // 'pdf' | 'guide' | 'article' | 'infographic'
    url = '',
    description = '',
    fileSize = '1.2 MB',
    createdAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.programId = programId;
    this.moduleId = moduleId;
    this.title = title;
    this.type = type;
    this.url = url;
    this.description = description;
    this.fileSize = fileSize;
    this.createdAt = createdAt;
  }
}
