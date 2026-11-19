// Free Unsplash photos used as stand-ins until the school supplies its own photography.
// Every photo was picked by hand: bright, positive school scenes only.
// To replace one, change its ID here (or paste a full URL to the school's own image).
const u = (id: string) => (id.startsWith("http") ? id : `https://images.unsplash.com/${id}`);

export const img = {
  heroMain: u("photo-1729691031598-a97244ce0503"), // smiling student, white shirt & tie
  heroGrad: u("photo-1686213011642-b25f94b95b96"), // graduate
  aboutMain: u("photo-1536337005238-94b997371b40"), // boy working in a bright classroom
  aboutSmall: u("photo-1548102245-c79dbcfa9f92"), // two smiling pupils in uniform
  nursery: u("photo-1761604478724-13fe879468cf"), // teacher with young children
  primary: u("photo-1610500795224-fb86b02926d7"), // pupils with books
  secAnglo: u("photo-1665586510498-4d2e5d29e2f4"), // secondary class in uniform
  secFranco: u("photo-1642140027867-e5983a32119c"), // student in shirt & tie
  bilingual: u("photo-1567057419865-38d8cff1c2b9"), // happy girls in uniform
  life: [
    u("photo-1531482615713-2afd69097998"), // coding club
    u("photo-1642506539255-88856ac71ecb"), // football
    u("photo-1781117244798-d3c52daa57dc"), // debate / friends
    u("photo-1679134015810-9695e7519f57"), // microscope
    u("photo-1758525861622-f4e7ac86a2d7"), // study
    u("photo-1645262960690-5cb9db42d35a"), // graduation
    u("photo-1761208663763-c4d30657c910"), // early years
    u("photo-1569003376670-596a186b90f8"), // cultural day
  ],
  facilities: {
    science: u("photo-1760074032923-2b84e9aab03e"),
    computer: u("photo-1653566031536-4d1b6a9da15e"),
    library: u("photo-1752940475110-782c84476691"),
    sports: u("photo-1649008726820-d90aeb70c32e"),
    earlyYears: u("photo-1786667395451-3f0cbf620a90"),
    campus: u("photo-1770721666608-2d19bd3e3a66"),
  },
  admissions: u("photo-1660841813513-3b68b92b817a"),
  avatars: [u("photo-1576108700272-8d9f86c51273"), u("photo-1631131426242-0abfa7f209c2"), u("photo-1548102249-acdce64fffbd")],
  graduation: u("photo-1594750852517-f37738fa2384"),
  news: [u("photo-1632215863479-201029d93143"), u("photo-1770721666608-2d19bd3e3a66"), u("photo-1781117244713-3e4dabaf73f2")],
  programs: {
    nursery: [u("photo-1761604478724-13fe879468cf"), u("photo-1786667395451-3f0cbf620a90"), u("photo-1786667395513-1d0804488602")],
    primary: [u("photo-1558979107-a58878ab837b"), u("photo-1610500795224-fb86b02926d7"), u("photo-1576108700272-8d9f86c51273")],
    "secondary-anglophone": [u("photo-1665586510498-4d2e5d29e2f4"), u("photo-1760074032923-2b84e9aab03e"), u("photo-1631131431211-4f768d89087d")],
    "secondary-francophone": [u("photo-1642140027867-e5983a32119c"), u("photo-1766297248071-dfa7a5bc9b87"), u("photo-1781117244713-3e4dabaf73f2")],
  },
  apply: u("photo-1617056239820-8ce90ba48193"),
};
