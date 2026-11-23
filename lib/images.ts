import manifest from "./gopal-manifest.json";

/*
  Image sources.
  1. If the school's own photo exists in public/gopal/<slot>.jpg (see public/gopal/README.md) it is used.
  2. Otherwise a hand-picked free Unsplash photo stands in.
*/
const own = manifest as Record<string, string>;
const u = (id: string) => `https://images.unsplash.com/${id}`;
const slot = (name: string, stock: string) => own[name] ?? u(stock);

export const hasOwn = (name: string) => name in own;
export const logoSrc: string | null = own["logo"] ?? null;

export const img = {
  heroMain: slot("hero", "photo-1729691031598-a97244ce0503"),
  heroGrad: slot("hero-2", "photo-1686213011642-b25f94b95b96"),
  aboutMain: slot("about", "photo-1536337005238-94b997371b40"),
  aboutSmall: slot("about-2", "photo-1548102245-c79dbcfa9f92"),
  nursery: slot("nursery", "photo-1761604478724-13fe879468cf"),
  primary: slot("primary", "photo-1610500795224-fb86b02926d7"),
  secAnglo: slot("secondary-anglophone", "photo-1665586510498-4d2e5d29e2f4"),
  secFranco: slot("secondary-francophone", "photo-1642140027867-e5983a32119c"),
  bilingual: slot("bilingual", "photo-1567057419865-38d8cff1c2b9"),
  facilities: {
    science: slot("science-lab", "photo-1760074032923-2b84e9aab03e"),
    computer: slot("computer-lab", "photo-1653566031536-4d1b6a9da15e"),
    library: slot("library", "photo-1752940475110-782c84476691"),
    sports: slot("sports", "photo-1649008726820-d90aeb70c32e"),
    earlyYears: slot("early-years", "photo-1786667395451-3f0cbf620a90"),
    campus: slot("campus", "photo-1770721666608-2d19bd3e3a66"),
  },
  admissions: slot("admissions", "photo-1660841813513-3b68b92b817a"),
  avatars: [u("photo-1576108700272-8d9f86c51273"), u("photo-1631131426242-0abfa7f209c2"), u("photo-1548102249-acdce64fffbd")],
  graduation: slot("graduation", "photo-1594750852517-f37738fa2384"),
  news: [slot("news-1", "photo-1632215863479-201029d93143"), slot("news-2", "photo-1770721666608-2d19bd3e3a66"), slot("news-3", "photo-1781117244713-3e4dabaf73f2"), slot("news-4", "photo-1569003376670-596a186b90f8"), slot("news-5", "photo-1752940475110-782c84476691"), slot("news-6", "photo-1649008726820-d90aeb70c32e")],
  page: {
    about: slot("page-about", "photo-1536337005238-94b997371b40"),
    programs: slot("page-programs", "photo-1665586510498-4d2e5d29e2f4"),
    campus: slot("page-campus", "photo-1770721666608-2d19bd3e3a66"),
    admissions: slot("page-admissions", "photo-1660841813513-3b68b92b817a"),
    news: slot("page-news", "photo-1632215863479-201029d93143"),
    contact: slot("page-contact", "photo-1761604478724-13fe879468cf"),
  },
  programs: {
    nursery: [slot("nursery", "photo-1761604478724-13fe879468cf"), u("photo-1786667395451-3f0cbf620a90"), u("photo-1786667395513-1d0804488602")],
    primary: [slot("primary", "photo-1558979107-a58878ab837b"), u("photo-1610500795224-fb86b02926d7"), u("photo-1576108700272-8d9f86c51273")],
    "secondary-anglophone": [slot("secondary-anglophone", "photo-1665586510498-4d2e5d29e2f4"), u("photo-1760074032923-2b84e9aab03e"), u("photo-1631131431211-4f768d89087d")],
    "secondary-francophone": [slot("secondary-francophone", "photo-1642140027867-e5983a32119c"), u("photo-1766297248071-dfa7a5bc9b87"), u("photo-1781117244713-3e4dabaf73f2")],
  },
  apply: u("photo-1617056239820-8ce90ba48193"),
};
