import "server-only";
import { randomUUID } from "node:crypto";
import type { Application, Stage } from "../admissions";

// Fictional demo families so the dashboard looks alive on first launch.
const kids: [string, string, "m" | "f"][] = [
  ["Ethan", "Nkemelu", "m"], ["Grace", "Tchoumi", "f"], ["Brandon", "Fon", "m"], ["Maëlle", "Ngono", "f"], ["Joel", "Tabi", "m"],
  ["Precious", "Ndi", "f"], ["Yannick", "Mbarga", "m"], ["Divine", "Achu", "f"], ["Kevin", "Essomba", "m"], ["Laura", "Fouda", "f"],
  ["Samuel", "Nji", "m"], ["Christelle", "Owona", "f"], ["Ryan", "Mbah", "m"], ["Aïcha", "Bello", "f"], ["Daniel", "Ekane", "m"],
  ["Blessing", "Ayuk", "f"], ["Loïc", "Atangana", "m"], ["Faith", "Ngwa", "f"], ["Hervé", "Manga", "m"], ["Esther", "Tanyi", "f"],
  ["Junior", "Kamga", "m"], ["Sandrine", "Abena", "f"], ["Elvis", "Che", "m"], ["Mireille", "Nana", "f"], ["Prince", "Ewane", "m"],
  ["Ornella", "Ze", "f"], ["Bryan", "Agbor", "m"], ["Naomi", "Eyenga", "f"], ["Stéphane", "Biya", "m"], ["Melissa", "Ndongo", "f"],
];
const parents = ["Mrs. Clarisse", "Mr. Emmanuel", "Mrs. Béatrice", "Mr. Paul", "Mrs. Florence", "Mr. Jean-Pierre", "Mrs. Agnès", "Dr. Martin", "Mrs. Judith", "Mr. Roland"];
const schools = ["Lycée Général Leclerc", "Government Bilingual High School Etoug-Ebe", "École Publique de Bastos", "Sacred Heart College", "Collège Vogt", "Saint Joseph Primary School", ""];
const areas = ["Bastos", "Nlongkak", "Etoa-Meki", "Omnisport", "Essos", "Mvog-Mbi", "Biyem-Assi", "Santa Barbara", "Golf", "Mimboman"];
const heard = ["Friend or family", "Facebook / Instagram", "WhatsApp", "Google", "Passing by the school"];
// weighted towards the confirmed Anglophone secondary section
const levels: [number, number][] = [[2, 0], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 5], [2, 6], [3, 0], [3, 2], [3, 4], [3, 6], [1, 0], [1, 2], [1, 4], [1, 5], [0, 1], [0, 2]];
const stages: Stage[] = ["new", "new", "new", "new", "new", "new", "contacted", "contacted", "contacted", "contacted", "visit", "visit", "visit", "visit", "tested", "tested", "tested", "accepted", "accepted", "accepted", "accepted", "enrolled", "enrolled", "enrolled", "enrolled", "enrolled", "enrolled", "declined", "declined", "contacted"];
const order: Stage[] = ["new", "contacted", "visit", "tested", "accepted", "enrolled"];

const pick = <T,>(arr: T[], i: number) => arr[i % arr.length];

export function seedApplications(): Application[] {
  const now = Date.now();
  return kids.map(([first, last, g], i) => {
    const stage = stages[i];
    const daysAgo = stage === "new" ? i % 6 : 4 + ((i * 7) % 44);
    const created = new Date(now - daysAgo * 86400000 - ((i * 3571) % 36000) * 1000);
    const [group, index] = pick(levels, i * 3);
    const lang = group === 3 || i % 4 === 1 ? "fr" : "en";
    const parent = `${pick(parents, i)} ${last}`;
    const phone = `+237 6${(70 + (i * 7) % 29)} ${String(100 + (i * 37) % 900)} ${String(100 + (i * 53) % 900)}`;
    const activity: Application["activity"] = [{ at: created.toISOString(), type: "created", text: "Application submitted online", by: "Parent" }];
    const reached = stage === "declined" ? 3 : order.indexOf(stage);
    for (let s = 1; s <= reached; s++) {
      activity.push({ at: new Date(created.getTime() + s * 86400000 * 1.5).toISOString(), type: "stage", text: `${order[s - 1]} → ${order[s]}`, by: s % 2 ? "Mrs. Eyong (Admissions)" : "Mr. Kouam (Principal)" });
    }
    if (stage === "declined") activity.push({ at: new Date(created.getTime() + 6 * 86400000).toISOString(), type: "stage", text: "tested → declined", by: "Mr. Kouam (Principal)" });
    if (i % 3 === 0) activity.push({ at: new Date(created.getTime() + 2 * 3600000).toISOString(), type: "note", text: lang === "fr" ? "Parent très intéressé par la section bilingue. Rappeler en soirée." : "Parent very interested in the bilingual programme. Prefers calls after 5pm.", by: "Mrs. Eyong (Admissions)" });
    const tested = ["tested", "accepted", "enrolled", "declined"].includes(stage);
    const visitDay = new Date(stage === "visit" ? now + ((i % 5) + 1) * 86400000 : created.getTime() + 3 * 86400000);
    visitDay.setHours(9 + (i % 6), i % 2 ? 30 : 0, 0, 0);
    const updated = activity.reduce((m, a) => (a.at > m ? a.at : m), created.toISOString());
    return {
      id: randomUUID(),
      ref: `GBIC-26-${String(10000 + ((i * 7919) % 89999)).padStart(5, "0")}`,
      createdAt: created.toISOString(),
      updatedAt: updated > new Date(now).toISOString() ? new Date(now).toISOString() : updated,
      stage,
      lang,
      student: { firstName: first, lastName: last, dob: `${2008 + ((group * 4 + index) % 16) - (group === 0 ? -9 : 0)}-0${(i % 9) + 1}-1${i % 9}`, gender: g, nationality: i % 7 === 3 ? "Nigerian" : "Cameroonian", currentSchool: pick(schools, i) },
      level: { group, index },
      start: i % 5 === 4 ? 1 : 0,
      guardian: { name: parent, relation: parent.startsWith("Mrs") ? "Mother" : "Father", phone, whatsapp: "", email: i % 3 === 2 ? "" : `${last.toLowerCase()}.family@example.com`, address: pick(areas, i), profession: pick(["Engineer", "Teacher", "Civil servant", "Doctor", "Trader", "Banker", "Lawyer", "Nurse"], i) },
      prefs: { transport: i % 3 === 0, canteen: i % 2 === 0, visitDate: "", heard: pick(heard, i), medical: i % 8 === 5 ? "Mild asthma — inhaler in bag" : "", notes: "" },
      docs: ["Birth certificate", "Last school report", "Passport photo"].slice(0, (i % 4)),
      visitAt: ["visit", "tested", "accepted", "enrolled", "declined"].includes(stage) ? visitDay.toISOString().slice(0, 16) : "",
      scores: tested ? { english: 48 + ((i * 13) % 50), french: 45 + ((i * 17) % 52), maths: 40 + ((i * 11) % 58) } : { english: null, french: null, maths: null },
      activity: activity.sort((a, b) => a.at.localeCompare(b.at)),
    };
  });
}
