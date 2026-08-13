/**
 * Model: Module
 * Represents a thematic block or section inside a Program.
 */
export class Module {
  constructor({
    id = '',
    programId = '',
    title = '',
    description = '',
    order = 1
  } = {}) {
    this.id = id;
    this.programId = programId;
    this.title = title;
    this.description = description;
    this.order = order;
  }
}
