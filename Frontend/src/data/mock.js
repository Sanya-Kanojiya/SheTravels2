export const currentUser = {
  id: "u-1",
  name: "Aanya Mehra",
  email: "aanya@shetravels.ai",
  city: "Mumbai",
  role: "traveller",
  photo: null,
  bio: "Slow traveller who likes quiet streets, day trains, and cafes with a window seat.",
  preferences: {
    style: "Independent & unhurried",
    interests: ["Heritage walks", "Cafes", "Coastal towns", "Women-run stays"],
    budgetBand: "Mid-range",
  },
  emergencySummary: {
    name: "Priya Mehra",
    relationship: "Sister",
    phone: "+91 98200 11420",
  },
};

export const trips = [
  {
    id: "t-1",
    destination: "Udaipur, Rajasthan",
    country: "India",
    startDate: "2026-10-12",
    endDate: "2026-10-18",
    budget: 42000,
    currency: "INR",
    status: "Upcoming",
    style: "Heritage & lakeside",
    coverTone: "sage",
    safetyScore: 86,
    note: "Lakes, old city lanes, and a women-run guesthouse near Gangaur Ghat.",
    places: ["City Palace", "Lake Pichola", "Saheliyon ki Bari", "Bagore ki Haveli"],
    itinerary: [
      {
        day: 1,
        title: "Arrive & settle by the lake",
        items: ["Airport pickup to Old City", "Sunset at Gangaur Ghat", "Light dinner at a rooftop cafe"],
      },
      {
        day: 2,
        title: "Palaces & courtyards",
        items: ["City Palace morning slot", "Vintage car museum", "Cafe hop on Gangaur Ghat road"],
      },
      {
        day: 3,
        title: "Boat & bazaar",
        items: ["Lake Pichola boat", "Textile shopping with a local guide", "Early night check-in"],
      },
      {
        day: 4,
        title: "Gardens & rest",
        items: ["Saheliyon ki Bari", "Spa afternoon", "Journal and packing buffer"],
      },
    ],
    safetyTips: [
      "Use pre-booked cabs after 8pm.",
      "Keep a copy of hotel address in Hindi and English.",
      "Share live location with Priya during transfers.",
    ],
  },
  {
    id: "t-2",
    destination: "Kochi, Kerala",
    country: "India",
    startDate: "2026-08-02",
    endDate: "2026-08-07",
    budget: 28000,
    currency: "INR",
    status: "Completed",
    style: "Coastal slow travel",
    coverTone: "peach",
    safetyScore: 90,
    note: "Fort Kochi mornings, spice streets, and a quiet homestay.",
    places: ["Fort Kochi", "Jew Town", "Chinese fishing nets", "Mattancherry"],
    itinerary: [
      { day: 1, title: "Fort Kochi walk", items: ["Check in", "Sunset at the nets", "Seafood dinner"] },
      { day: 2, title: "Heritage lanes", items: ["Jew Town", "Dutch Palace", "Cafe writing hour"] },
    ],
    safetyTips: ["Stay in well-lit Fort Kochi after dark.", "Use ferry only during posted hours."],
  },
  {
    id: "t-3",
    destination: "Lisbon",
    country: "Portugal",
    startDate: "2026-12-04",
    endDate: "2026-12-11",
    budget: 98000,
    currency: "INR",
    status: "Planning",
    style: "City + viewpoints",
    coverTone: "lilac",
    safetyScore: 88,
    note: "Trams, miradouros, and a solo-friendly central stay.",
    places: ["Alfama", "LX Factory", "Belém", "Time Out Market"],
    itinerary: [
      { day: 1, title: "Alfama orientation", items: ["Airport metro", "Miradouro sunset", "Neighbourhood dinner"] },
    ],
    safetyTips: ["Watch bags on tram 28.", "Download offline maps for hills and alleys."],
  },
  {
    id: "t-4",
    destination: "McLeod Ganj",
    country: "India",
    startDate: "2026-03-14",
    endDate: "2026-03-19",
    budget: 18500,
    currency: "INR",
    status: "Completed",
    style: "Hills & cafes",
    coverTone: "sage",
    safetyScore: 84,
    note: "Misty mornings, monastery walks, and early nights.",
    places: ["Bhagsu", "Dalai Lama Temple", "Dharamkot"],
    itinerary: [],
    safetyTips: ["Avoid isolated trails after dusk."],
  },
];

export const memories = [
  {
    id: "m-1",
    destination: "Kochi",
    date: "August 2026",
    note: "Yellow walls, sea air, and a notebook I actually finished.",
    places: ["Fort Kochi", "Jew Town"],
    photos: 6,
  },
  {
    id: "m-2",
    destination: "McLeod Ganj",
    date: "March 2026",
    note: "Thukpa, prayer flags, and the bravest solo hike of the year.",
    places: ["Bhagsu waterfall", "Dharamkot"],
    photos: 11,
  },
  {
    id: "m-3",
    destination: "Jaipur",
    date: "November 2025",
    note: "Pink city mornings and a cooking class with three other women.",
    places: ["City Palace", "Bapu Bazaar"],
    photos: 8,
  },
];

export const contacts = [
  { id: "c-1", name: "Priya Mehra", relationship: "Sister", phone: "+91 98200 11420", primary: true },
  { id: "c-2", name: "Neha Kapoor", relationship: "Best friend", phone: "+91 98711 33480", primary: false },
  { id: "c-3", name: "Hotel Lakeview Desk", relationship: "Stay (Udaipur)", phone: "+91 294 241 0091", primary: false },
];

export const packingLists = {
  destination: "Udaipur, Rajasthan",
  duration: "6 days",
  categories: [
    {
      id: "documents",
      name: "Documents",
      items: [
        { id: "p1", label: "Passport / ID", packed: true },
        { id: "p2", label: "Trip insurance PDF", packed: true },
        { id: "p3", label: "Hotel confirmations", packed: false },
        { id: "p4", label: "Emergency contact card", packed: false },
      ],
    },
    {
      id: "clothes",
      name: "Clothes",
      items: [
        { id: "p5", label: "3 modest day outfits", packed: true },
        { id: "p6", label: "Light jacket for evenings", packed: false },
        { id: "p7", label: "Comfortable walking shoes", packed: true },
        { id: "p8", label: "Dupatta / scarf", packed: false },
      ],
    },
    {
      id: "electronics",
      name: "Electronics",
      items: [
        { id: "p9", label: "Phone + power bank", packed: true },
        { id: "p10", label: "Universal charger", packed: false },
        { id: "p11", label: "Offline maps downloaded", packed: true },
      ],
    },
    {
      id: "medicines",
      name: "Medicines",
      items: [
        { id: "p12", label: "Personal prescriptions", packed: true },
        { id: "p13", label: "ORS + pain relief", packed: false },
        { id: "p14", label: "Sunscreen & sanitizer", packed: true },
      ],
    },
    {
      id: "personal",
      name: "Personal items",
      items: [
        { id: "p15", label: "Doorstop / portable lock", packed: false },
        { id: "p16", label: "Whistle on keychain", packed: true },
        { id: "p17", label: "Journal", packed: false },
      ],
    },
  ],
};

export const communityPosts = [
  {
    id: "post-1",
    author: "Riya Sen",
    avatar: "RS",
    destination: "Varanasi",
    time: "2h ago",
    content:
      "Took the early morning boat alone and it felt calmer than I expected. Shared my live location with my sister and stuck to ghats with other travellers nearby.",
    likes: 24,
    comments: 6,
    liked: false,
  },
  {
    id: "post-2",
    author: "Meera Iyer",
    avatar: "MI",
    destination: "Pondicherry",
    time: "Yesterday",
    content:
      "Yellow-town stay was women-hosted and had a coded lock. If you are first-time solo, this kind of stay is worth the extra 800 rupees.",
    likes: 41,
    comments: 11,
    liked: true,
  },
  {
    id: "post-3",
    author: "Sara Khan",
    avatar: "SK",
    destination: "Manali",
    time: "3d ago",
    content:
      "Avoided late shared cabs from the mall road. Pre-booked a verified taxi and checked in with my roommate at 9. Tiny habits, big peace of mind.",
    likes: 18,
    comments: 4,
    liked: false,
  },
];

export const reports = [
  {
    id: "r-1",
    post: "Cheap hostel recs with unlocked dorms",
    user: "guest_hop",
    reason: "Unsafe advice / spam",
    status: "Open",
  },
  {
    id: "r-2",
    post: "Meet me at the station at midnight",
    user: "travelbro99",
    reason: "Harassment",
    status: "Under review",
  },
];

export const adminUsers = [
  { id: "au-1", name: "Aanya Mehra", email: "aanya@shetravels.ai", trips: 4, status: "Active" },
  { id: "au-2", name: "Riya Sen", email: "riya.sen@mail.com", trips: 2, status: "Active" },
  { id: "au-3", name: "Meera Iyer", email: "meera@mail.com", trips: 7, status: "Active" },
  { id: "au-4", name: "guest_hop", email: "guest@mail.com", trips: 0, status: "Flagged" },
];

export const activity = [
  { id: "a1", text: "Riya liked your Kochi memory.", time: "1h" },
  { id: "a2", text: "Check-in reminder for Udaipur in 18 days.", time: "3h" },
  { id: "a3", text: "Meera posted a Pondicherry stay tip.", time: "1d" },
];

export const safetyTips = [
  "Share your day’s route with one trusted contact before you leave the stay.",
  "Keep a local SIM / eSIM and offline maps, even when Wi-Fi looks fine.",
  "Choose stays with 24-hour desks or women hosts for first nights in a new city.",
  "Use official taxi stands or in-app rides after dark. Skip unmarked cars.",
  "Have a code word with family that means “call me now, I need an exit.”",
];

export const mockGeneratedItinerary = (destination, days = 4) => ({
  destination,
  summary: `A calmer ${days}-day plan for ${destination}, paced for a solo traveller who wants daylight exploring and early evenings.`,
  days: Array.from({ length: Number(days) || 4 }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? "Arrive, orient, rest" : i === Number(days) - 1 ? "Buffer morning & depart" : `Neighbourhood day ${i + 1}`,
    items: [
      "Morning walk in a well-trafficked area",
      "One main sight with a timed ticket",
      "Cafe lunch and a short rest at the stay",
      "Sunset viewpoint, then dinner near lodging",
    ],
  })),
  safety: [
    "First night: pre-booked airport transfer.",
    "Keep evenings within a 10-minute walk of the stay.",
    "Daily 8pm check-in with your emergency contact.",
  ],
});
