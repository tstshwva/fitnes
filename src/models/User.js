/**
 * Model: User
 * Represents a platform user (Student or Instructor)
 */
export class User {
  constructor({
    id = '',
    name = '',
    email = '',
    role = 'student', // 'student' | 'instructor'
    avatar = '',
    bio = '',
    phone = '',
    createdAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.bio = bio;
    this.phone = phone;
    this.createdAt = createdAt;
  }
}
