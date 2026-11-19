// Shared types and labels for the admissions pipeline (used by server and client).
import type { Lang } from "./content";

export const STAGES = ["new", "contacted", "visit", "tested", "accepted", "enrolled", "declined"] as const;
export type Stage = (typeof STAGES)[number];

export type Activity = { at: string; type: "created" | "stage" | "note" | "message" | "update"; text: string; by: string };

export type Application = {
  id: string;
  ref: string;
  createdAt: string;
  updatedAt: string;
  stage: Stage;
  lang: Lang;
  student: { firstName: string; lastName: string; dob: string; gender: "m" | "f" | ""; nationality: string; currentSchool: string };
  level: { group: number; index: number };
  start: number;
  guardian: { name: string; relation: string; phone: string; whatsapp: string; email: string; address: string; profession: string };
  prefs: { transport: boolean; canteen: boolean; visitDate: string; heard: string; medical: string; notes: string };
  docs: string[];
  visitAt: string;
  scores: { english: number | null; french: number | null; maths: number | null };
  activity: Activity[];
};

// Sequential green ramp: lighter = earlier in the pipeline. Declined uses the reserved red.
// Colour is never used alone: every stage is always shown with its name.
export const stageMeta: Record<Stage, { en: string; fr: string; color: string }> = {
  new: { en: "New", fr: "Nouveau", color: "#a7dcc4" },
  contacted: { en: "Contacted", fr: "Contacté", color: "#74c4a2" },
  visit: { en: "Visit booked", fr: "Visite prévue", color: "#43a77f" },
  tested: { en: "Tested", fr: "Testé", color: "#268a65" },
  accepted: { en: "Accepted", fr: "Admis", color: "#156f4f" },
  enrolled: { en: "Enrolled", fr: "Inscrit", color: "#0a4733" },
  declined: { en: "Declined", fr: "Refusé", color: "#c8372d" },
};

export const fullName = (a: Application) => `${a.student.firstName} ${a.student.lastName}`.trim();

/** WhatsApp message templates per stage, in the family's language. */
export function template(a: Application, stage: Stage, levelLabel: string, schoolName: string): string {
  const child = a.student.firstName;
  const parent = a.guardian.name.split(" ")[0] || "";
  const visit = a.visitAt ? new Date(a.visitAt) : null;
  const when = visit
    ? visit.toLocaleString(a.lang === "fr" ? "fr-FR" : "en-GB", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
    : a.lang === "fr" ? "[date]" : "[date]";
  const en: Record<Stage, string> = {
    new: `Hello ${parent}, thank you for applying to ${schoolName} for ${child} (${levelLabel}). Your reference is ${a.ref}. We will call you shortly to arrange a campus visit.`,
    contacted: `Hello ${parent}, this is the admissions office of ${schoolName}. When would suit you for a campus visit with ${child}?`,
    visit: `Hello ${parent}, your campus visit for ${child} is confirmed for ${when}. Please bring ${child}'s last school report and birth certificate. See you soon!`,
    tested: `Hello ${parent}, thank you for coming in. ${child} has completed the placement test. We will share the admission decision within 48 hours.`,
    accepted: `Congratulations ${parent}! ${child} has been offered a place in ${levelLabel} at ${schoolName}. Reply to this message to confirm enrolment and receive the fee schedule.`,
    enrolled: `Welcome to the ${schoolName} family! ${child}'s enrolment in ${levelLabel} is complete. We will send the welcome-day details and uniform list shortly.`,
    declined: `Hello ${parent}, thank you for your interest in ${schoolName}. Unfortunately we cannot offer ${child} a place in ${levelLabel} this term. We would be happy to discuss other options.`,
  };
  const fr: Record<Stage, string> = {
    new: `Bonjour ${parent}, merci pour la candidature de ${child} (${levelLabel}) au ${schoolName}. Votre référence est ${a.ref}. Nous vous appellerons très bientôt pour organiser une visite du campus.`,
    contacted: `Bonjour ${parent}, ici le service des admissions du ${schoolName}. Quand seriez-vous disponible pour une visite du campus avec ${child} ?`,
    visit: `Bonjour ${parent}, la visite du campus pour ${child} est confirmée le ${when}. Merci d'apporter le dernier bulletin et l'acte de naissance de ${child}. À bientôt !`,
    tested: `Bonjour ${parent}, merci de votre visite. ${child} a passé le test de placement. Nous vous communiquerons la décision sous 48 heures.`,
    accepted: `Félicitations ${parent} ! ${child} est admis(e) en ${levelLabel} au ${schoolName}. Répondez à ce message pour confirmer l'inscription et recevoir le barème des frais.`,
    enrolled: `Bienvenue dans la famille ${schoolName} ! L'inscription de ${child} en ${levelLabel} est finalisée. Nous vous enverrons bientôt le programme de la journée d'accueil et la liste des uniformes.`,
    declined: `Bonjour ${parent}, merci de l'intérêt porté au ${schoolName}. Nous ne pouvons malheureusement pas proposer de place à ${child} en ${levelLabel} ce trimestre. Nous serions ravis d'étudier d'autres options avec vous.`,
  };
  return (a.lang === "fr" ? fr : en)[stage];
}
