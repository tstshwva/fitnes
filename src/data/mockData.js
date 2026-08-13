/**
 * Mock Data Initial Seed
 * Platform: "Programa de Educación y Formación Continua" - Yessi Lizama
 */

export const initialUsers = [
  {
    id: 'user_instructor_1',
    name: 'Yessi Lizama',
    email: 'instructor@yessilizama.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&auto=format&fit=crop&q=80',
    bio: 'Educadora de cultura física, entrenadora y promotora del bienestar integral a través del conocimiento y el movimiento consciente.',
    phone: '+52 55 1234 5678',
    createdAt: '2025-01-01T08:00:00.000Z'
  },
  {
    id: 'user_student_1',
    name: 'Carlos Mendoza',
    email: 'carlos@ejemplo.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    bio: 'Buscando entender los fundamentos del ejercicio y mejorar mi movilidad y descanso.',
    phone: '+52 55 9876 5432',
    createdAt: '2025-01-10T10:30:00.000Z'
  },
  {
    id: 'user_student_2',
    name: 'Andrea Morales',
    email: 'andrea@ejemplo.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    bio: 'Quiero dejar de repetir rutinas al azar y aprender la técnica correcta para entrenar sin lesionarme.',
    phone: '+52 55 4567 8901',
    createdAt: '2025-01-15T14:20:00.000Z'
  },
  {
    id: 'user_student_3',
    name: 'Mateo Silva',
    email: 'mateo@ejemplo.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    bio: 'Interesado en la optimización del movimiento, fuerza consciente y hábitos de recuperación activa.',
    phone: '+52 55 7890 1234',
    createdAt: '2025-01-20T09:15:00.000Z'
  }
];

export const initialEvaluations = [
  {
    id: 'eval_1',
    studentId: 'user_student_1',
    exerciseExperience: 'principiante',
    activityFrequency: '1-2',
    primaryGoals: ['bienestar_general', 'aprender_tecnica', 'habito_constante'],
    restHabits: 'regular',
    weeklyAvailability: '3 horas por semana',
    currentLevel: 'fundamentos',
    notes: 'Deseo aprender la base para no depender de rutinas genéricas de internet.',
    completedAt: '2025-01-11T11:00:00.000Z'
  },
  {
    id: 'eval_2',
    studentId: 'user_student_2',
    exerciseExperience: 'intermedio',
    activityFrequency: '3-4',
    primaryGoals: ['aprender_tecnica', 'fuerza', 'movilidad'],
    restHabits: 'bueno',
    weeklyAvailability: '4 horas por semana',
    currentLevel: 'intermedio',
    notes: 'Quiero entender el porqué de cada ejercicio y cómo cuidar mis articulaciones.',
    completedAt: '2025-01-16T15:00:00.000Z'
  }
];

export const initialPrograms = [
  {
    id: 'prog_1',
    title: 'Fundamentos del Ejercicio, Alimentación y Cultura Física',
    description: 'Aprende qué sucede en tu cuerpo cuando entrenas, cómo la nutrición y el descanso potencian tu salud, y cómo dominar los patrones de movimiento esenciales.',
    level: 'Inicial a Intermedio',
    durationWeeks: 8,
    instructorId: 'user_instructor_1',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    badge: 'Programa Insignia',
    status: 'published',
    createdAt: '2025-01-02T10:00:00.000Z'
  },
  {
    id: 'prog_2',
    title: 'Optimización del Movimiento, Fuerza y Descanso Activo',
    description: 'Profundiza en la biomecánica, control neuromuscular, progresión inteligente de cargas y estrategias de recuperación y descanso.',
    level: 'Intermedio a Avanzado',
    durationWeeks: 6,
    instructorId: 'user_instructor_1',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    badge: 'Especialización',
    status: 'published',
    createdAt: '2025-01-05T12:00:00.000Z'
  }
];

export const initialModules = [
  // Módulos del Programa 1
  {
    id: 'mod_1',
    programId: 'prog_1',
    title: 'Módulo 1: Conciencia Corporal y Biomecánica Básica',
    description: 'Comprende cómo responde tu organismo al movimiento y cómo alinear articulaciones para un ejercicio seguro y efectivo.',
    order: 1
  },
  {
    id: 'mod_2',
    programId: 'prog_1',
    title: 'Módulo 2: Los Patrones Motores Fundamentales',
    description: 'Aprende a ejecutar la sentadilla, bisagra de cadera, empujes y tracciones con propósito claro.',
    order: 2
  },
  {
    id: 'mod_3',
    programId: 'prog_1',
    title: 'Módulo 3: Alimentación para la Salud y el Rendimiento',
    description: 'Entiende cómo la nutrición apoya tus procesos celulares, energía diaria y regeneración muscular.',
    order: 3
  },
  {
    id: 'mod_4',
    programId: 'prog_1',
    title: 'Módulo 4: Descanso, Sueño y Recuperación',
    description: 'El conocimiento sobre el descanso: cómo el cuerpo repara tejidos y consolida adaptaciones durante el sueño.',
    order: 4
  },
  // Módulos del Programa 2
  {
    id: 'mod_201',
    programId: 'prog_2',
    title: 'Módulo 1: Control Motor y Movilidad Torácica/Cadera',
    description: 'Desarrolla rango de movimiento activo y estabilidad escapular.',
    order: 1
  },
  {
    id: 'mod_202',
    programId: 'prog_2',
    title: 'Módulo 2: Progresión de Cargas y Fuerza Funcional',
    description: 'Aprende a estructurar estímulos sin sobrecargar el sistema nervioso.',
    order: 2
  }
];

export const initialClasses = [
  // Clases Módulo 1 (Prog 1)
  {
    id: 'cls_1',
    moduleId: 'mod_1',
    programId: 'prog_1',
    title: 'Clase Magistral: ¿Qué sucede en tu cuerpo cuando te ejercitas?',
    description: 'Explicación clara sobre respuesta cardiovascular, activación neuromuscular y adaptaciones metabólicas tempranas.',
    type: 'recorded',
    date: null,
    durationMinutes: 42,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    liveLink: '',
    order: 1,
    status: 'active',
    keyTakeaways: [
      'Respuesta hormonal positiva al ejercicio regular',
      'Diferencia entre fatiga muscular normal y dolor articular dañino',
      'Importancia del calentamiento específico y la respiración'
    ]
  },
  {
    id: 'cls_2',
    moduleId: 'mod_1',
    programId: 'prog_1',
    title: 'Taller en Vivo: Análisis Postural y Activación de Centro',
    description: 'Sesión interactiva en directo con Yessi para corrección de postura y control pélvico.',
    type: 'live',
    date: '2026-08-20T18:00:00.000Z',
    durationMinutes: 60,
    videoUrl: '',
    liveLink: 'https://meet.google.com/xyz-demo-live',
    order: 2,
    status: 'scheduled',
    keyTakeaways: [
      'Reconocimiento de la pelvis neutra',
      'Activación del core profundo y diafragma'
    ]
  },
  // Clases Módulo 2 (Prog 1)
  {
    id: 'cls_3',
    moduleId: 'mod_2',
    programId: 'prog_1',
    title: 'Dominando la Sentadilla y la Bisagra de Cadera',
    description: 'Desglose biomecánico paso a paso de dos de los movimientos más importantes de la vida diaria y el deporte.',
    type: 'recorded',
    date: null,
    durationMinutes: 38,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    liveLink: '',
    order: 1,
    status: 'active',
    keyTakeaways: [
      'Distribución de peso en el trípode del pie',
      'Profundidad adecuada según movilidad individual',
      'Seguridad de la columna lumbar'
    ]
  },
  {
    id: 'cls_4',
    moduleId: 'mod_2',
    programId: 'prog_1',
    title: 'Empuje y Tracción: Cuidando Hombros y Espalda',
    description: 'Cómo activar dorsales y estabilizar escápulas al empujar o traccionar pesos.',
    type: 'recorded',
    date: null,
    durationMinutes: 35,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    liveLink: '',
    order: 2,
    status: 'active',
    keyTakeaways: [
      'Ritmo escapulohumeral',
      'Errores típicos en flexiones y remos'
    ]
  },
  // Clases Módulo 3 (Prog 1)
  {
    id: 'cls_5',
    moduleId: 'mod_3',
    programId: 'prog_1',
    title: 'Nutrición con Propósito: Energía, Hidratación y Hábitos',
    description: 'Comprende el impacto de los nutrientes en tu energía diaria sin caer en dietas extremas ni restricciones dañinas.',
    type: 'recorded',
    date: null,
    durationMinutes: 40,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    liveLink: '',
    order: 1,
    status: 'active',
    keyTakeaways: [
      'Cómo se almacena y utiliza la energía en el cuerpo',
      'Hidratación celular adecuada antes y después de la actividad'
    ]
  },
  // Clases Módulo 4 (Prog 1)
  {
    id: 'cls_6',
    moduleId: 'mod_4',
    programId: 'prog_1',
    title: 'El Poder del Descanso: Fisiología de la Recuperación',
    description: 'Aprende cómo el sueño profundo regenera el sistema muscular y fortalece el sistema inmunológico.',
    type: 'recorded',
    date: null,
    durationMinutes: 30,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    liveLink: '',
    order: 1,
    status: 'active',
    keyTakeaways: [
      'Fases del sueño y liberación hormonal',
      'Prácticas de higiene del sueño para mejorar la calidad del descanso'
    ]
  }
];

export const initialResources = [
  {
    id: 'res_1',
    programId: 'prog_1',
    moduleId: 'mod_1',
    title: 'Guía Pedagógica: Biomecánica y Postura Consciente',
    type: 'pdf',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Manual de referencia con ilustraciones sobre alineación de columna y articulaciones.',
    fileSize: '2.4 MB',
    createdAt: '2025-01-03T10:00:00.000Z'
  },
  {
    id: 'res_2',
    programId: 'prog_1',
    moduleId: 'mod_2',
    title: 'Checklist de Ejecución: Patrones Motores Esenciales',
    type: 'guide',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Guía rápida de auto-evaluación para antes de comenzar tus sesiones de ejercicio.',
    fileSize: '1.1 MB',
    createdAt: '2025-01-04T11:00:00.000Z'
  },
  {
    id: 'res_3',
    programId: 'prog_1',
    moduleId: 'mod_3',
    title: 'Artículo Formativo: Relación entre Hidratación y Función Muscular',
    type: 'article',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Lectura complementaria sobre equilibrio electrolítico y prevención de calambres.',
    fileSize: '850 KB',
    createdAt: '2025-01-05T09:00:00.000Z'
  },
  {
    id: 'res_4',
    programId: 'prog_1',
    moduleId: 'mod_4',
    title: 'Plantilla de Registro de Descanso y Hábitos Nocturnos',
    type: 'guide',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Herramienta práctica para monitorear horas de sueño y sensación de energía matutina.',
    fileSize: '650 KB',
    createdAt: '2025-01-06T14:00:00.000Z'
  }
];

export const initialExercises = [
  {
    id: 'ex_1',
    name: 'Sentadilla Goblet (Conciencia de Profundidad)',
    category: 'fuerza',
    purpose: 'Desarrollar fuerza en el tren inferior enseñando a mantener el torso erguido y las rodillas alineadas con los pies.',
    executionGuide: [
      'Sostén una carga liviana o mancuerna frente al pecho con ambas manos.',
      'Separa los pies al ancho de los hombros con una ligera rotación externa.',
      'Inicia el descenso empujando la cadera hacia atrás y flexionando rodillas.',
      'Mantén el pecho alto y la columna neutra durante todo el trayecto.',
      'Empuja el suelo firmemente con todo el pie para volver a la posición inicial.'
    ],
    commonMistakes: [
      'Permitir que las rodillas colapsen hacia adentro (valgo de rodilla).',
      'Despegar los talones del suelo durante el descenso.',
      'Arquear excesivamente la espalda baja.'
    ],
    precautions: 'Si sientes molestia en rodillas, reduce la profundidad hasta que ganes movilidad en tobillos y caderas.',
    muscleGroups: ['Cuádriceps', 'Glúteos', 'Core', 'Erectores espinales'],
    difficulty: 'principiante',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    createdAt: '2025-01-02T08:00:00.000Z'
  },
  {
    id: 'ex_2',
    name: 'Bisagra de Cadera (Hip Hinge) con Pica',
    category: 'postura',
    purpose: 'Enseñar a disociar el movimiento de la cadera del de la columna lumbar, protegiendo la espalda baja en cualquier levantamiento.',
    executionGuide: [
      'Coloca una pica o bastón de madera en tu espalda en contacto con: cabeza, zona dorsal y sacro.',
      'Con rodillas semirrígidas (desbloqueadas), empuja tu cadera hacia la pared trasera.',
      'Baja el torso manteniendo los tres puntos de contacto del bastón.',
      'Siente la tensión activa en los isquiosurales y glúteos, no en la zona lumbar.',
      'Contrae glúteos para volver a posición vertical completa.'
    ],
    commonMistakes: [
      'Doblar excesivamente las rodillas como si fuera una sentadilla.',
      'Perder el contacto del bastón con el sacro o la cabeza por flexionar la espalda.'
    ],
    precautions: 'Mantén el movimiento controlado; el rango de bajada depende de la flexibilidad de tus isquiosurales.',
    muscleGroups: ['Isquiosurales', 'Glúteo mayor', 'Zona media', 'Músculos paravertebrales'],
    difficulty: 'principiante',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    createdAt: '2025-01-02T08:30:00.000Z'
  },
  {
    id: 'ex_3',
    name: 'Movilidad Torácica en Cuadrupedia',
    category: 'movilidad',
    purpose: 'Aumentar la rotación y extensión de la columna dorsal para liberar tensión en cuello y zona lumbar.',
    executionGuide: [
      'Colócate en 4 apoyos (manos debajo de hombros, rodillas debajo de caderas).',
      'Lleva una mano detrás de la nuca sin jalar el cuello.',
      'Gira el codo hacia el brazo de apoyo y luego rota el torso hacia el techo.',
      'Sigue el movimiento con la mirada y exhala al abrir.',
      'Realiza de 6 a 8 repeticiones lentas por cada lado.'
    ],
    commonMistakes: [
      'Mover la cadera de lado en lugar de rotar desde la parte media de la espalda.',
      'Forzar la rotación del cuello tirando de la cabeza.'
    ],
    precautions: 'Movimiento fluido y sin dolor. Excelente como calentamiento diario.',
    muscleGroups: ['Columna torácica', 'Romboides', 'Trapecios', 'Pectoral'],
    difficulty: 'principiante',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    createdAt: '2025-01-02T09:00:00.000Z'
  },
  {
    id: 'ex_4',
    name: 'Plancha Frontal con Respiración Diafragmática',
    category: 'resistencia',
    purpose: 'Estabilizar el núcleo corporal integrando la activación del transverso abdominal y el diafragma.',
    executionGuide: [
      'Apoya antebrazos en el suelo y extiende las piernas apoyando las puntas de los pies.',
      'Alinea talones, caderas y hombros en una sola línea recta sin que caiga la pelvis.',
      'Inhala expandiendo la caja torácica en 360 grados y exhala activando abdomen.',
      'Mantén la posición 20 a 30 segundos con calidad técnica antes de descansar.'
    ],
    commonMistakes: [
      'Dejar caer la cadera hacia el suelo o levantarla en forma de pirámide.',
      'Contener la respiración (bloqueo de aire).'
    ],
    precautions: 'Si sientes molestia lumbar, apoya las rodillas en el piso para reducir la palanca.',
    muscleGroups: ['Transverso abdominal', 'Recto abdominal', 'Oblicuos', 'Hombros'],
    difficulty: 'principiante',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    createdAt: '2025-01-02T09:30:00.000Z'
  },
  {
    id: 'ex_5',
    name: 'Respiración Consciente de Recuperación (Box Breathing)',
    category: 'respiracion',
    purpose: 'Modular el sistema nervioso parasimpático al terminar la actividad para acelerar la recuperación y reducir el estrés fisiológico.',
    executionGuide: [
      'Siéntate cómodamente o acuéstate boca arriba con las manos en el abdomen.',
      'Inhala por la nariz profundamente en 4 segundos sintiendo la expansión abdominal.',
      'Retén el aire con calma durante 4 segundos.',
      'Exhala suavemente por la boca en 4 segundos vaciando el aire por completo.',
      'Mantén los pulmones vacíos durante 4 segundos antes del siguiente ciclo.',
      'Repite de 4 a 6 ciclos.'
    ],
    commonMistakes: [
      'Respirar únicamente con el pecho superior elevando los hombros de forma tensa.'
    ],
    precautions: 'Si sientes mareo, regresa a tu ritmo natural de respiración.',
    muscleGroups: ['Diafragma', 'Músculos intercostales', 'Sistema nervioso autónomo'],
    difficulty: 'principiante',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    createdAt: '2025-01-02T10:00:00.000Z'
  }
];

export const initialEnrollments = [
  {
    id: 'enr_1',
    studentId: 'user_student_1',
    programId: 'prog_1',
    status: 'active',
    startDate: '2025-01-12T00:00:00.000Z',
    createdAt: '2025-01-12T00:00:00.000Z'
  },
  {
    id: 'enr_2',
    studentId: 'user_student_2',
    programId: 'prog_1',
    status: 'active',
    startDate: '2025-01-17T00:00:00.000Z',
    createdAt: '2025-01-17T00:00:00.000Z'
  },
  {
    id: 'enr_3',
    studentId: 'user_student_3',
    programId: 'prog_2',
    status: 'active',
    startDate: '2025-01-21T00:00:00.000Z',
    createdAt: '2025-01-21T00:00:00.000Z'
  }
];

export const initialProgress = [
  // Progreso de Carlos (user_student_1)
  {
    id: 'prog_rec_1',
    studentId: 'user_student_1',
    classId: 'cls_1',
    programId: 'prog_1',
    completed: true,
    completedAt: '2025-01-13T19:30:00.000Z',
    lastPositionSeconds: 2520,
    updatedAt: '2025-01-13T19:30:00.000Z'
  },
  {
    id: 'prog_rec_2',
    studentId: 'user_student_1',
    classId: 'cls_3',
    programId: 'prog_1',
    completed: true,
    completedAt: '2025-01-18T20:15:00.000Z',
    lastPositionSeconds: 2280,
    updatedAt: '2025-01-18T20:15:00.000Z'
  },
  // Progreso de Andrea (user_student_2)
  {
    id: 'prog_rec_3',
    studentId: 'user_student_2',
    classId: 'cls_1',
    programId: 'prog_1',
    completed: true,
    completedAt: '2025-01-18T18:00:00.000Z',
    lastPositionSeconds: 2520,
    updatedAt: '2025-01-18T18:00:00.000Z'
  }
];
