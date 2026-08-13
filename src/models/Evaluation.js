/**
 * Model: Evaluation
 * Represents the initial diagnosis/assessment for student goal alignment.
 * Note: Non-medical, focused on sports experience, habits, and objectives.
 */
export class Evaluation {
  constructor({
    id = '',
    studentId = '',
    exerciseExperience = 'principiante', // 'ninguna' | 'principiante' | 'intermedio' | 'avanzado'
    activityFrequency = '1-2', // '0' | '1-2' | '3-4' | '5+' (días por semana)
    primaryGoals = [], // ['bienestar_general', 'aprender_tecnica', 'fuerza', 'movilidad', 'habito_constante']
    restHabits = 'regular', // 'malo' | 'regular' | 'bueno' | 'optimo'
    weeklyAvailability = '3 horas', // ej. '2-3 horas', '4-5 horas'
    currentLevel = 'fundamentos', // 'fundamentos' | 'intermedio' | 'avanzado'
    notes = '',
    completedAt = new Date().toISOString()
  } = {}) {
    this.id = id;
    this.studentId = studentId;
    this.exerciseExperience = exerciseExperience;
    this.activityFrequency = activityFrequency;
    this.primaryGoals = primaryGoals;
    this.restHabits = restHabits;
    this.weeklyAvailability = weeklyAvailability;
    this.currentLevel = currentLevel;
    this.notes = notes;
    this.completedAt = completedAt;
  }
}
