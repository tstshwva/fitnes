/**
 * Model: Exercise
 * Represents an exercise entry in the pedagogical exercise library.
 * Focuses on physical culture, purpose, biomechanics, and correct execution.
 */
export class Exercise {
  constructor({
    id = '',
    name = '',
    category = 'movilidad', // 'movilidad' | 'fuerza' | 'postura' | 'resistencia' | 'respiracion'
    purpose = '', // ¿Por qué se realiza este ejercicio y qué impacto tiene en el cuerpo?
    executionGuide = [], // Pasos claros de ejecución
    commonMistakes = [], // Errores comunes a evitar
    precautions = '', // Precauciones y recomendaciones
    muscleGroups = [], // Grupos musculares / articulaciones involucradas
    difficulty = 'principiante', // 'principiante' | 'intermedio' | 'avanzado'
    videoUrl = '',
    thumbnail = '',
    createdAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.purpose = purpose;
    this.executionGuide = executionGuide;
    this.commonMistakes = commonMistakes;
    this.precautions = precautions;
    this.muscleGroups = muscleGroups;
    this.difficulty = difficulty;
    this.videoUrl = videoUrl;
    this.thumbnail = thumbnail;
    this.createdAt = createdAt;
  }
}
