import type { Lang } from "./content";

/*
  Program details for every level.
  Research note: the public school registry (ecolesaucameroun.com) lists Gopal Bilingual
  International College as an Anglophone general secondary school (Form 1 to Upper Sixth,
  GCE A Level). Nursery, primary and the Francophone track follow the national Cameroonian
  system and should be confirmed with the school. Set `enabled: false` to hide a level.
*/

export type Slug = "nursery" | "primary" | "secondary-anglophone" | "secondary-francophone";

type Block = {
  title: string;
  age: string;
  tagline: string;
  intro: string;
  classesTitle: string;
  classes: { name: string; detail: string }[];
  subjectsTitle: string;
  subjects: { group: string; items: string[] }[];
  examsTitle: string;
  exams: { name: string; detail: string }[];
  highlights: { title: string; desc: string }[];
  day: { time: string; activity: string }[];
};

export type Program = { slug: Slug; enabled: boolean; confirmed: boolean; content: Record<Lang, Block> };

export const programs: Program[] = [
  {
    slug: "nursery",
    enabled: true,
    confirmed: false,
    content: {
      en: {
        title: "Nursery & Kindergarten",
        age: "Ages 3–5 · Nursery 1 & 2",
        tagline: "Where curiosity becomes confidence.",
        intro:
          "Our youngest learners discover the world through play, music, stories and hands-on activities, in English and French every day. Small groups, caring teachers and a bright, safe classroom help each child grow at their own pace.",
        classesTitle: "Classes",
        classes: [
          { name: "Pre-Nursery", detail: "Age 3 · First steps, routines and play" },
          { name: "Nursery 1", detail: "Age 4 · Early language, numbers and social skills" },
          { name: "Nursery 2", detail: "Age 5 · Reading readiness and preparation for Class 1" },
        ],
        subjectsTitle: "Learning areas",
        subjects: [
          { group: "Language", items: ["English phonics", "French songs & rhymes", "Storytelling", "Early writing"] },
          { group: "Discovery", items: ["Numbers & shapes", "Nature & science", "Colours & patterns"] },
          { group: "Growth", items: ["Art & crafts", "Music & dance", "Physical play", "Good manners & sharing"] },
        ],
        examsTitle: "How we follow progress",
        exams: [
          { name: "Termly progress report", detail: "Written for parents in English and French" },
          { name: "Readiness check", detail: "Gentle assessment before moving to Class 1 / SIL" },
        ],
        highlights: [
          { title: "Two languages from day one", desc: "Children hear and use English and French naturally, every day." },
          { title: "Small, caring groups", desc: "More attention for every child and a calm daily rhythm." },
          { title: "Play with purpose", desc: "Every activity builds language, motor and social skills." },
        ],
        day: [
          { time: "7:30", activity: "Warm welcome & free play" },
          { time: "8:00", activity: "Circle time: songs, greetings, calendar" },
          { time: "9:00", activity: "Phonics, numbers and discovery" },
          { time: "10:00", activity: "Snack & outdoor play" },
          { time: "10:45", activity: "Art, music or story corner" },
          { time: "12:00", activity: "Lunch & rest" },
          { time: "13:30", activity: "Home time (after-care available)" },
        ],
      },
      fr: {
        title: "Maternelle",
        age: "3–5 ans · Petite & Grande section",
        tagline: "Là où la curiosité devient confiance.",
        intro:
          "Nos plus jeunes découvrent le monde par le jeu, la musique, les histoires et les activités pratiques, en français et en anglais chaque jour. Petits groupes, enseignants attentionnés et classe lumineuse et sûre aident chaque enfant à grandir à son rythme.",
        classesTitle: "Classes",
        classes: [
          { name: "Petite section", detail: "3 ans · Premiers pas, routines et jeu" },
          { name: "Moyenne section", detail: "4 ans · Langage, nombres et vie en groupe" },
          { name: "Grande section", detail: "5 ans · Préparation à la lecture et au SIL" },
        ],
        subjectsTitle: "Domaines d'apprentissage",
        subjects: [
          { group: "Langage", items: ["Phonétique anglaise", "Chants et comptines en français", "Contes", "Pré-écriture"] },
          { group: "Découverte", items: ["Nombres et formes", "Nature et sciences", "Couleurs et motifs"] },
          { group: "Épanouissement", items: ["Arts plastiques", "Musique et danse", "Motricité", "Politesse et partage"] },
        ],
        examsTitle: "Suivi des progrès",
        exams: [
          { name: "Bulletin trimestriel", detail: "Rédigé pour les parents en français et en anglais" },
          { name: "Bilan de passage", detail: "Évaluation douce avant le SIL / Class 1" },
        ],
        highlights: [
          { title: "Deux langues dès le premier jour", desc: "Les enfants entendent et utilisent le français et l'anglais chaque jour." },
          { title: "Petits groupes bienveillants", desc: "Plus d'attention pour chaque enfant et un rythme apaisé." },
          { title: "Jouer pour apprendre", desc: "Chaque activité développe le langage, la motricité et la sociabilité." },
        ],
        day: [
          { time: "7h30", activity: "Accueil chaleureux et jeux libres" },
          { time: "8h00", activity: "Regroupement : chants, salutations, calendrier" },
          { time: "9h00", activity: "Sons, nombres et découverte" },
          { time: "10h00", activity: "Collation et récréation" },
          { time: "10h45", activity: "Arts, musique ou coin lecture" },
          { time: "12h00", activity: "Déjeuner et repos" },
          { time: "13h30", activity: "Sortie (garderie possible)" },
        ],
      },
    },
  },
  {
    slug: "primary",
    enabled: true,
    confirmed: false,
    content: {
      en: {
        title: "Primary School",
        age: "Ages 6–11 · Class 1–6 / SIL–CM2",
        tagline: "Strong foundations in two languages.",
        intro:
          "Primary pupils build solid skills in reading, writing, mathematics and science, taught in both English and French. Weekly projects, clubs and close follow-up prepare every child for a confident start in secondary school.",
        classesTitle: "Classes",
        classes: [
          { name: "Class 1 & 2 · SIL & CP", detail: "Reading, writing and number foundations" },
          { name: "Class 3 & 4 · CE1 & CE2", detail: "Fluency, problem solving and science discovery" },
          { name: "Class 5 & 6 · CM1 & CM2", detail: "Exam preparation and transition to secondary" },
        ],
        subjectsTitle: "Subjects",
        subjects: [
          { group: "Languages", items: ["English language", "French", "Reading & comprehension", "Handwriting"] },
          { group: "Maths & science", items: ["Mathematics", "Science & technology", "Computer studies"] },
          { group: "Humanities & arts", items: ["Social studies & citizenship", "History & geography", "Arts & crafts", "Music", "Physical education", "Moral education"] },
        ],
        examsTitle: "Official exams",
        exams: [
          { name: "First School Leaving Certificate (FSLC)", detail: "Anglophone primary certificate, Class 6" },
          { name: "CEP", detail: "Certificat d'Études Primaires, CM2" },
          { name: "Common Entrance / Concours d'entrée en 6ème", detail: "Entry exam into Form 1 / 6ème" },
        ],
        highlights: [
          { title: "Bilingual every day", desc: "Lessons alternate between English and French so both languages grow together." },
          { title: "Exam-ready", desc: "Mock exams and revision clinics for FSLC, CEP and entrance exams." },
          { title: "Projects & clubs", desc: "Reading club, science fair, art and sport build curiosity and teamwork." },
        ],
        day: [
          { time: "7:30", activity: "Assembly & morning greeting" },
          { time: "7:45", activity: "Mathematics & languages" },
          { time: "10:00", activity: "Break" },
          { time: "10:30", activity: "Science, social studies or computer" },
          { time: "12:30", activity: "Lunch" },
          { time: "13:15", activity: "Arts, sport or projects" },
          { time: "15:00", activity: "Homework club & dismissal" },
        ],
      },
      fr: {
        title: "École primaire",
        age: "6–11 ans · SIL–CM2 / Class 1–6",
        tagline: "Des bases solides dans deux langues.",
        intro:
          "Au primaire, les élèves acquièrent de solides compétences en lecture, écriture, mathématiques et sciences, enseignées en français et en anglais. Projets hebdomadaires, clubs et suivi rapproché préparent chaque enfant à une entrée sereine au secondaire.",
        classesTitle: "Classes",
        classes: [
          { name: "SIL & CP · Class 1 & 2", detail: "Bases de la lecture, de l'écriture et du calcul" },
          { name: "CE1 & CE2 · Class 3 & 4", detail: "Aisance, résolution de problèmes et sciences" },
          { name: "CM1 & CM2 · Class 5 & 6", detail: "Préparation aux examens et passage au secondaire" },
        ],
        subjectsTitle: "Matières",
        subjects: [
          { group: "Langues", items: ["Français", "Anglais", "Lecture et compréhension", "Écriture"] },
          { group: "Maths & sciences", items: ["Mathématiques", "Sciences et technologie", "Informatique"] },
          { group: "Sciences humaines & arts", items: ["Éducation civique", "Histoire et géographie", "Arts plastiques", "Musique", "EPS", "Éducation morale"] },
        ],
        examsTitle: "Examens officiels",
        exams: [
          { name: "CEP", detail: "Certificat d'Études Primaires, CM2" },
          { name: "First School Leaving Certificate (FSLC)", detail: "Certificat anglophone, Class 6" },
          { name: "Concours d'entrée en 6ème / Common Entrance", detail: "Examen d'entrée en 6ème / Form 1" },
        ],
        highlights: [
          { title: "Bilingue au quotidien", desc: "Les cours alternent entre français et anglais pour faire progresser les deux langues." },
          { title: "Prêts pour les examens", desc: "Examens blancs et ateliers de révision pour le CEP, le FSLC et les concours." },
          { title: "Projets et clubs", desc: "Club lecture, foire des sciences, arts et sport développent curiosité et esprit d'équipe." },
        ],
        day: [
          { time: "7h30", activity: "Rassemblement et accueil" },
          { time: "7h45", activity: "Mathématiques et langues" },
          { time: "10h00", activity: "Récréation" },
          { time: "10h30", activity: "Sciences, éducation civique ou informatique" },
          { time: "12h30", activity: "Déjeuner" },
          { time: "13h15", activity: "Arts, sport ou projets" },
          { time: "15h00", activity: "Étude surveillée et sortie" },
        ],
      },
    },
  },
  {
    slug: "secondary-anglophone",
    enabled: true,
    confirmed: true,
    content: {
      en: {
        title: "Secondary · Anglophone",
        age: "Form 1 – Upper Sixth · GCE O & A Level",
        tagline: "Rigour, results and readiness for university.",
        intro:
          "Our Anglophone general secondary section follows the Cameroon GCE Board programme from Form 1 to Upper Sixth. Students build depth in sciences, arts and languages, with focused coaching for the GCE Ordinary and Advanced Levels and strong French to stay fully bilingual.",
        classesTitle: "Classes",
        classes: [
          { name: "Form 1 – Form 3", detail: "Broad general education across all subjects" },
          { name: "Form 4 – Form 5", detail: "GCE Ordinary Level preparation" },
          { name: "Lower Sixth", detail: "Choice of Science or Arts subject combination" },
          { name: "Upper Sixth", detail: "GCE Advanced Level and university preparation" },
        ],
        subjectsTitle: "Subjects",
        subjects: [
          { group: "Sciences", items: ["Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Human Biology"] },
          { group: "Arts & humanities", items: ["English Language", "Literature in English", "History", "Geography", "Economics", "Religious Studies", "Citizenship", "Philosophy (Sixth Form)"] },
          { group: "Bilingual & life skills", items: ["French", "Information & Communication Technology", "Physical Education", "Sports & clubs"] },
        ],
        examsTitle: "Official exams",
        exams: [
          { name: "GCE Ordinary Level", detail: "Cameroon GCE Board, end of Form 5" },
          { name: "GCE Advanced Level", detail: "Cameroon GCE Board, end of Upper Sixth" },
        ],
        highlights: [
          { title: "GCE exam coaching", desc: "Mock exams, past papers and revision clinics every term." },
          { title: "Science labs & ICT", desc: "Practical work in physics, chemistry, biology and computing." },
          { title: "University guidance", desc: "Advice for universities in Cameroon, Africa and abroad." },
        ],
        day: [
          { time: "7:15", activity: "Assembly & announcements" },
          { time: "7:30", activity: "Lessons, periods 1–4" },
          { time: "10:10", activity: "Break" },
          { time: "10:30", activity: "Lessons, periods 5–7" },
          { time: "12:40", activity: "Lunch" },
          { time: "13:20", activity: "Lessons, periods 8–9 or practicals" },
          { time: "15:00", activity: "Clubs, sport or supervised study" },
        ],
      },
      fr: {
        title: "Secondaire · Anglophone",
        age: "Form 1 – Upper Sixth · GCE O & A Level",
        tagline: "Rigueur, résultats et préparation à l'université.",
        intro:
          "Notre section anglophone d'enseignement général suit le programme du GCE Board du Cameroun, de la Form 1 à l'Upper Sixth. Les élèves approfondissent sciences, lettres et langues, avec un coaching ciblé pour le GCE Ordinary et Advanced Level et un français solide pour rester pleinement bilingues.",
        classesTitle: "Classes",
        classes: [
          { name: "Form 1 – Form 3", detail: "Formation générale dans toutes les matières" },
          { name: "Form 4 – Form 5", detail: "Préparation au GCE Ordinary Level" },
          { name: "Lower Sixth", detail: "Choix d'une combinaison scientifique ou littéraire" },
          { name: "Upper Sixth", detail: "GCE Advanced Level et préparation à l'université" },
        ],
        subjectsTitle: "Matières",
        subjects: [
          { group: "Sciences", items: ["Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Human Biology"] },
          { group: "Lettres & sciences humaines", items: ["English Language", "Literature in English", "History", "Geography", "Economics", "Religious Studies", "Citizenship", "Philosophy (Sixth Form)"] },
          { group: "Bilinguisme & vie pratique", items: ["Français", "TIC", "Éducation physique", "Sports et clubs"] },
        ],
        examsTitle: "Examens officiels",
        exams: [
          { name: "GCE Ordinary Level", detail: "GCE Board du Cameroun, fin de Form 5" },
          { name: "GCE Advanced Level", detail: "GCE Board du Cameroun, fin d'Upper Sixth" },
        ],
        highlights: [
          { title: "Coaching aux examens GCE", desc: "Examens blancs, anciens sujets et ateliers de révision chaque trimestre." },
          { title: "Laboratoires & TIC", desc: "Travaux pratiques en physique, chimie, biologie et informatique." },
          { title: "Orientation universitaire", desc: "Conseils pour les universités du Cameroun, d'Afrique et de l'étranger." },
        ],
        day: [
          { time: "7h15", activity: "Rassemblement et annonces" },
          { time: "7h30", activity: "Cours, heures 1–4" },
          { time: "10h10", activity: "Pause" },
          { time: "10h30", activity: "Cours, heures 5–7" },
          { time: "12h40", activity: "Déjeuner" },
          { time: "13h20", activity: "Cours, heures 8–9 ou travaux pratiques" },
          { time: "15h00", activity: "Clubs, sport ou étude surveillée" },
        ],
      },
    },
  },
  {
    slug: "secondary-francophone",
    enabled: true,
    confirmed: false,
    content: {
      en: {
        title: "Secondary · Francophone",
        age: "6ème – Terminale · BEPC, Probatoire, Bac",
        tagline: "Excellence in French, fluency in English.",
        intro:
          "The Francophone section follows the national programme of the Ministry of Secondary Education, from 6ème to Terminale. Students prepare for the BEPC, Probatoire and Baccalauréat in the series that fits their strengths, while English classes keep them fully bilingual.",
        classesTitle: "Classes",
        classes: [
          { name: "6ème – 5ème", detail: "Premier cycle: broad foundations" },
          { name: "4ème – 3ème", detail: "BEPC preparation" },
          { name: "2nde", detail: "Choice of series: A, C or D" },
          { name: "1ère", detail: "Probatoire preparation" },
          { name: "Terminale", detail: "Baccalauréat and university preparation" },
        ],
        subjectsTitle: "Subjects",
        subjects: [
          { group: "Sciences", items: ["Mathematics", "Physics, chemistry & technology (PCT)", "Life & earth sciences (SVT)", "Computer science"] },
          { group: "Letters & humanities", items: ["French", "Philosophy (Terminale)", "History & geography", "Citizenship & morals (ECM)", "National languages & cultures"] },
          { group: "Bilingual & life skills", items: ["English", "Second foreign language (Spanish or German)", "Physical education & sport"] },
        ],
        examsTitle: "Official exams",
        exams: [
          { name: "BEPC", detail: "End of 3ème" },
          { name: "Probatoire", detail: "End of 1ère, series A, C or D" },
          { name: "Baccalauréat", detail: "End of Terminale, series A, C or D" },
        ],
        highlights: [
          { title: "Series A, C and D", desc: "Literature, mathematics or life sciences, guided by each student's strengths." },
          { title: "Exam training", desc: "Mock exams and past papers for BEPC, Probatoire and Bac." },
          { title: "Strong English", desc: "Daily English so graduates can study anywhere in the world." },
        ],
        day: [
          { time: "7:15", activity: "Assembly & announcements" },
          { time: "7:30", activity: "Lessons, periods 1–4" },
          { time: "10:10", activity: "Break" },
          { time: "10:30", activity: "Lessons, periods 5–7" },
          { time: "12:40", activity: "Lunch" },
          { time: "13:20", activity: "Lessons, periods 8–9 or practicals" },
          { time: "15:00", activity: "Clubs, sport or supervised study" },
        ],
      },
      fr: {
        title: "Secondaire · Francophone",
        age: "6ème – Terminale · BEPC, Probatoire, Bac",
        tagline: "L'excellence en français, l'aisance en anglais.",
        intro:
          "La section francophone suit le programme national du Ministère des Enseignements Secondaires, de la 6ème à la Terminale. Les élèves préparent le BEPC, le Probatoire et le Baccalauréat dans la série adaptée à leurs points forts, tandis que les cours d'anglais les gardent pleinement bilingues.",
        classesTitle: "Classes",
        classes: [
          { name: "6ème – 5ème", detail: "Premier cycle : bases solides" },
          { name: "4ème – 3ème", detail: "Préparation au BEPC" },
          { name: "2nde", detail: "Choix de la série : A, C ou D" },
          { name: "1ère", detail: "Préparation au Probatoire" },
          { name: "Terminale", detail: "Baccalauréat et préparation à l'université" },
        ],
        subjectsTitle: "Matières",
        subjects: [
          { group: "Sciences", items: ["Mathématiques", "Physique, chimie et technologie (PCT)", "Sciences de la vie et de la terre (SVT)", "Informatique"] },
          { group: "Lettres & sciences humaines", items: ["Français", "Philosophie (Terminale)", "Histoire et géographie", "Éducation à la citoyenneté et à la morale (ECM)", "Langues et cultures nationales"] },
          { group: "Bilinguisme & vie pratique", items: ["Anglais", "Deuxième langue (espagnol ou allemand)", "Éducation physique et sportive"] },
        ],
        examsTitle: "Examens officiels",
        exams: [
          { name: "BEPC", detail: "Fin de 3ème" },
          { name: "Probatoire", detail: "Fin de 1ère, séries A, C ou D" },
          { name: "Baccalauréat", detail: "Fin de Terminale, séries A, C ou D" },
        ],
        highlights: [
          { title: "Séries A, C et D", desc: "Lettres, mathématiques ou sciences de la vie, selon les points forts de chaque élève." },
          { title: "Entraînement aux examens", desc: "Examens blancs et anciens sujets pour le BEPC, le Probatoire et le Bac." },
          { title: "Un anglais solide", desc: "De l'anglais chaque jour pour pouvoir étudier partout dans le monde." },
        ],
        day: [
          { time: "7h15", activity: "Rassemblement et annonces" },
          { time: "7h30", activity: "Cours, heures 1–4" },
          { time: "10h10", activity: "Pause" },
          { time: "10h30", activity: "Cours, heures 5–7" },
          { time: "12h40", activity: "Déjeuner" },
          { time: "13h20", activity: "Cours, heures 8–9 ou travaux pratiques" },
          { time: "15h00", activity: "Clubs, sport ou étude surveillée" },
        ],
      },
    },
  },
];

export const enabledPrograms = programs.filter((p) => p.enabled);
export const getProgram = (slug: string) => programs.find((p) => p.slug === slug && p.enabled);

/** Every class a family can apply for, grouped by section, for the application form. */
export const applyLevels: Record<Lang, { group: string; options: string[] }[]> = {
  en: [
    { group: "Nursery", options: ["Pre-Nursery", "Nursery 1", "Nursery 2"] },
    { group: "Primary", options: ["Class 1 / SIL", "Class 2 / CP", "Class 3 / CE1", "Class 4 / CE2", "Class 5 / CM1", "Class 6 / CM2"] },
    { group: "Secondary · Anglophone", options: ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Lower Sixth", "Upper Sixth"] },
    { group: "Secondary · Francophone", options: ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"] },
  ],
  fr: [
    { group: "Maternelle", options: ["Petite section", "Moyenne section", "Grande section"] },
    { group: "Primaire", options: ["SIL / Class 1", "CP / Class 2", "CE1 / Class 3", "CE2 / Class 4", "CM1 / Class 5", "CM2 / Class 6"] },
    { group: "Secondaire · Anglophone", options: ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Lower Sixth", "Upper Sixth"] },
    { group: "Secondaire · Francophone", options: ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"] },
  ],
};
