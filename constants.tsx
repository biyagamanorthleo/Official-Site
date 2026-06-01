
import { ProjectStatus, Project, TeamMember, President, ClubStat, TeamCategory, Achievement, AchievementCategory, ResourceItem, SdgGoal, GlobalCause } from './types';

// Club Branding & Basic Info
export const CLUB_NAME = "Leo Club of Biyagama North";
export const CLUB_DISTRICT = "Leo District 306 D4 Sri Lanka & Maldives";
export const CLUB_TAGLINE = "Leadership • Experience • Opportunity";
export const CLUB_ESTABLISHED = "2015";

// Site Content - Hero Section
export const HERO_CONTENT = {
  subtitle: "SRI LANKA & MALDIVES • DISTRICT 306 D4",
  titlePrefix: "LEO CLUB OF",
  titleMain: "BIYAGAMA NORTH",
  description: "A premier community of young leaders dedicated to service, professional growth, and collective excellence.",
  backgroundImage: "https://images.unsplash.com/photo-1559027615-cd937c9be54a?auto=format&fit=crop&q=80&w=1920&grayscale",
  primaryBtnText: "Our Impact",
  secondaryBtnText: "The Legacy"
};

// Site Content - About Page
export const ABOUT_CONTENT = {
  header: "Evolution & Identity",
  titleSuffix: "LEGACY",
  intro: "Operationalizing the values of Leo District 306 D4 to build a sustainable future across Sri Lanka and the Maldives.",
  pillars: [
    { title: "The Mission", icon: "Target", desc: "Empowering youth through standardized service. We bridge the gap between passion and professional impact." },
    { title: "Core Ethics", icon: "Shield", desc: "Integrity in action. We maintain the highest governance standards in every community engagement." },
    { title: "Service Grade", icon: "Award", desc: "Striving for industrial-grade excellence. We don't just volunteer; we engineer solutions." }
  ],
  footerTitle: "Global Infrastructure",
  footerText: "Powered by Lions Clubs International. A worldwide brotherhood of 1.4 Million volunteers."
};

// Site Content - Footer
export const FOOTER_CONTENT = {
  tagline: "Forging leaders, gaining experience, and creating opportunity across Sri Lanka and the Maldives.",
  subscriptionHeading: "Engagement",
  subscriptionSubtext: "Subscribe to the North Star bulletin.",
  copyrightText: "ALL RIGHTS RESERVED.",
  craftedBy: "BY THE NORTH SECRETARIAT"
};

// Site Content - Projects Page
export const PROJECTS_PAGE_CONTENT = {
  header: "Impact Log & Archive",
  titlePrefix: "SERVICE",
  titleSuffix: "PORTFOLIO",
  description: "A chronological record of leadership in action and community transformation."
};

// Site Content - Team Page
export const TEAM_PAGE_CONTENT = {
  header: "Governance Structure",
  titlePrefix: "LEADERSHIP",
  titleSuffix: "COLLECTIVE",
  sections: [
    { title: "Advisory Panel", category: "ADVISORY" },
    { title: "Executive Committee", category: "EXECUTIVE" },
    { title: "Departmental Directors", category: "DIRECTOR" },
    { title: "Members", category: "MEMBER" }
  ]
};

// Site Content - Achievements Page
export const ACHIEVEMENTS_PAGE_CONTENT = {
  header: "Excellence & Documentation",
  titlePrefix: "TRIUMPH",
  titleSuffix: "CENTRAL",
  description: "A chronological record of our official honors and a visual journey through our service missions.",
  awardsHeader: "The Honor Roll",
  awardsTitle: "OFFICIAL AWARDS"
};

// Site Content - Gallery Page
export const GALLERY_PAGE_CONTENT = {
  header: "Legacy in Focus",
  titlePrefix: "VISUAL",
  titleSuffix: "ARCHIVE",
  description: "A chronological record of our impact through the lens of our dedicated members."
};

// Site Content - Starter Pack Page
export const STARTER_PACK_PAGE_CONTENT = {
  header: "Onboarding Resources",
  titlePrefix: "THE",
  titleSuffix: "TERMINAL",
  description: "Essential documentation for navigating your journey as a Leo in Biyagama North.",
  introSections: [
    {
      title: "Global Context",
      subtitle: "LIONS INTERNATIONAL",
      icon: "Shield",
      content: "Lions Clubs International is the world's largest service club organization. We have more than 1.4 million members in over 48,000 clubs in more than 200 countries.",
      link: "https://www.lionsclubs.org"
    },
    {
      title: "The LEO DNA",
      subtitle: "LEADERSHIP. EXPERIENCE. OPPORTUNITY",
      icon: "Zap",
      content: "The LEO Program provides the youth of the world with an opportunity for development and contribution as responsible members of the community.",
      link: "https://www.lionsclubs.org/en/discover-our-clubs/about-leos"
    }
  ],
  sidebarTitle: "Sync Resources",
  contactTitle: "Direct Line",
  contactBtnText: "Initialize Link"
};

// Contact Details
export const CONTACT_DETAILS = {
  email: "contact@leobiyagamanorth.org",
  phone: "+94 11 234 5678",
  address: "Biyagama, Western Province, Sri Lanka",
  officeHours: "Mon - Sat: 9.00 AM - 5.00 PM"
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/leobiyagamanorth",
  instagram: "https://instagram.com/leobiyagamanorth",
  twitter: "https://twitter.com/leobnorth",
  linkedin: "https://linkedin.com/company/leo-club-of-biyagama-north"
};

// Impact Metrics
export const CLUB_STATS: ClubStat[] = [
  { label: "Completed Projects", value: 52, suffix: "+", icon: "CheckCircle" },
  { label: "Lives Impacted", value: 15000, suffix: "+", icon: "Users" },
  { label: "Service Hours", value: 4500, suffix: " hrs", icon: "Clock" },
  { label: "Service Budget", value: 8000, suffix: " USD", icon: "DollarSign" },
];

// Project Portfolio
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vision For All 2024',
    description: 'Free eye screening and cataract surgery for 200+ seniors.',
    longDescription: 'Our flagship project focused on providing essential eye care to underserved elderly citizens. We partnered with local hospitals to perform 15 successful cataract surgeries and distributed over 150 prescription glasses.',
    status: ProjectStatus.COMPLETED,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    date: 'March 2024',
    impact: '215 seniors screened'
  },
  {
    id: '2',
    title: 'Green Earth Initiative',
    description: 'Reforestation drive and waste management workshops.',
    longDescription: 'A continuous effort to combat climate change. We have planted over 500 indigenous trees across urban parks and schools, while educating children on waste segregation.',
    status: ProjectStatus.ONGOING,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800',
    date: 'Launched Jan 2024',
    impact: '500+ trees planted'
  },
  {
    id: '3',
    title: 'Youth Leadership Summit',
    description: 'A 3-day workshop for aspiring young leaders.',
    longDescription: 'An upcoming mega-event featuring international speakers and workshops on public speaking, project management, and ethical leadership.',
    status: ProjectStatus.UPCOMING,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    date: 'August 2024',
  },
  {
    id: '4',
    title: 'Winter Warmth',
    description: 'Distributing blankets and warm clothing to the homeless.',
    longDescription: 'During the harsh winter months, our leos spent nights on the streets distributing 300+ heavy blankets and hot meals.',
    status: ProjectStatus.COMPLETED,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    date: 'Dec 2023',
    impact: '300 blankets distributed'
  },
  {
    id: '5',
    title: 'Blood Donation Drive',
    description: 'Community blood donation campaign in partnership with local hospitals.',
    longDescription: 'Organized a large-scale blood donation event at three community centers, collecting over 150 units of blood for the national blood bank.',
    status: ProjectStatus.COMPLETED,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 2023',
    impact: '150 units collected'
  },
  {
    id: '6',
    title: 'Clean Water Initiative',
    description: 'Providing water purification systems to underserved rural communities.',
    longDescription: 'Installed water filtration units in five rural schools, ensuring access to clean drinking water for over 800 students and staff.',
    status: ProjectStatus.COMPLETED,
    image: 'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?auto=format&fit=crop&q=80&w=800',
    date: 'Aug 2023',
    impact: '800+ students benefited'
  },
  {
    id: '7',
    title: 'Digital Literacy Program',
    description: 'Teaching essential computer skills to youth and senior citizens.',
    longDescription: 'A 6-week workshop series covering basic computing, internet safety, and digital tools, reaching over 120 participants across two community centers.',
    status: ProjectStatus.UPCOMING,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    date: 'Sep 2024',
    impact: '120 participants'
  }
];

// Official Awards
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Most Outstanding Leo Club',
    description: 'Awarded for overall excellence in service and administration.',
    year: '2023/24',
    category: AchievementCategory.DISTRICT,
    image: 'https://images.unsplash.com/photo-1578574515323-c3c8ef01456e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'a2',
    title: 'Top Environmental Impact Award',
    description: 'Recognition for outstanding contributions to ecological conservation.',
    year: '2022/23',
    category: AchievementCategory.REGIONAL,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'a3',
    title: 'Leadership Excellence Gold',
    description: 'Awarded to the leadership team for strategic club management.',
    year: '2023/24',
    category: AchievementCategory.DISTRICT,
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'a4',
    title: 'Service Growth Milestone',
    description: 'Celebrating significant increase in community impact and service hours.',
    year: '2023',
    category: AchievementCategory.MILESTONE,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'a5',
    title: 'Best Youth Project Finalist',
    description: 'Finalist for the most innovative youth-led community initiative.',
    year: '2024',
    category: AchievementCategory.REGIONAL,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
  }
];

// Dedicated Photo Gallery
export const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
];

// Resource Pack / Documents
export const RESOURCES: ResourceItem[] = [
  { id: 'r1', title: 'Leo Handbook', description: 'Complete guide to Leo rituals and protocols.', icon: 'BookOpen', downloadUrl: '#' },
  { id: 'r2', title: 'Branding Guidelines', description: 'Official logos and color codes.', icon: 'Shield', downloadUrl: '#' },
  { id: 'r3', title: 'Project Reporting Kit', description: 'Templates for administrative reporting.', icon: 'Briefcase', downloadUrl: '#' },
  { id: 'r4', title: 'Membership Form', description: 'Apply to join our movement.', icon: 'Users', downloadUrl: '#' }
];

// Leadership Team
export const TEAM: TeamMember[] = [
  {
    id: 'adv1',
    name: 'Lion Dr. Upul Ranasinghe',
    position: 'Guiding Lion',
    photo: 'https://i.pravatar.cc/400?u=upul',
    category: TeamCategory.ADVISORY,
    priority: 1,
    socials: { linkedin: '#' }
  },
  {
    id: 'adv2',
    name: 'Lion Sunil Perera',
    position: 'Club Advisor',
    photo: 'https://i.pravatar.cc/400?u=sunil',
    category: TeamCategory.ADVISORY,
    priority: 2,
    socials: { linkedin: '#' }
  },
  {
    id: '1',
    name: 'Kasun Perera',
    position: 'President',
    photo: 'https://i.pravatar.cc/400?u=kasun',
    category: TeamCategory.EXECUTIVE,
    priority: 1,
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    id: '4',
    name: 'Nethmi Wijesinghe',
    position: 'Vice President',
    photo: 'https://i.pravatar.cc/400?u=nethmi',
    category: TeamCategory.EXECUTIVE,
    priority: 2,
    socials: { instagram: '#' }
  },
  {
    id: '2',
    name: 'Dulmi Fernando',
    position: 'Secretary',
    photo: 'https://i.pravatar.cc/400?u=dulmi',
    category: TeamCategory.EXECUTIVE,
    priority: 3,
    socials: { twitter: '#', linkedin: '#' }
  },
  {
    id: '3',
    name: 'Sahan Jayasuriya',
    position: 'Treasurer',
    photo: 'https://i.pravatar.cc/400?u=sahan',
    category: TeamCategory.EXECUTIVE,
    priority: 4,
    socials: { facebook: '#', linkedin: '#' }
  },
  {
    id: '5',
    name: 'Amila Rathnayake',
    position: 'Director',
    photo: 'https://i.pravatar.cc/400?u=amila',
    category: TeamCategory.DIRECTOR,
    avenue: 'Information Technology',
    priority: 1,
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    id: '6',
    name: 'Imesha Silva',
    position: 'Director',
    photo: 'https://i.pravatar.cc/400?u=imesha',
    category: TeamCategory.DIRECTOR,
    avenue: 'Community Service',
    priority: 1,
    socials: { twitter: '#' }
  },
  {
    id: '7',
    name: 'Thisara Perera',
    position: 'Director',
    photo: 'https://i.pravatar.cc/400?u=thisara',
    category: TeamCategory.DIRECTOR,
    avenue: 'Professional Development',
    priority: 1,
    socials: { linkedin: '#' }
  },
  {
    id: '8',
    name: 'Nuwan Perera',
    position: 'Director',
    photo: 'https://i.pravatar.cc/400?u=nuwanp',
    category: TeamCategory.DIRECTOR,
    avenue: 'Environmental Service',
    priority: 1,
    socials: { instagram: '#' }
  }
];

// UN Sustainable Development Goals
export const UN_SDGS: SdgGoal[] = [
  { goal: 1,  name: "No Poverty",                                    color: "#E5233D" },
  { goal: 2,  name: "Zero Hunger",                                   color: "#DDA73A" },
  { goal: 3,  name: "Good Health and Well-Being",                    color: "#4CA146" },
  { goal: 4,  name: "Quality Education",                             color: "#C5192D" },
  { goal: 5,  name: "Gender Equality",                               color: "#EF402C" },
  { goal: 6,  name: "Clean Water and Sanitation",                    color: "#27BFE6" },
  { goal: 7,  name: "Affordable and Clean Energy",                   color: "#FBC412" },
  { goal: 8,  name: "Decent Work and Economic Growth",               color: "#A31C44" },
  { goal: 9,  name: "Industry, Innovation and Infrastructure",       color: "#F26A2D" },
  { goal: 10, name: "Reduced Inequalities",                          color: "#E01483" },
  { goal: 11, name: "Sustainable Cities and Communities",            color: "#F89D2A" },
  { goal: 12, name: "Responsible Consumption and Production",        color: "#BF8D2C" },
  { goal: 13, name: "Climate Action",                                color: "#407F46" },
  { goal: 14, name: "Life Below Water",                              color: "#1F97D4" },
  { goal: 15, name: "Life on Land",                                  color: "#59BA48" },
  { goal: 16, name: "Peace, Justice and Strong Institutions",        color: "#126A9F" },
  { goal: 17, name: "Partnerships for the Goals",                    color: "#13496B" },
];

// Lions Clubs International - 8 Global Causes with UN SDG alignment
export const GLOBAL_CAUSES: GlobalCause[] = [
  {
    id: 1,
    title: "Vision",
    description: "Preventing avoidable blindness and improving quality of life for the blind and visually impaired through free screenings, surgeries, and eyeglass distribution.",
    icon: "Eye",
    sdgs: [3, 10],
    accentSdg: 3,
  },
  {
    id: 2,
    title: "Diabetes",
    description: "Reducing the global prevalence of diabetes through education, early detection, and improving quality of life for those living with the condition.",
    icon: "Activity",
    sdgs: [2, 3],
    accentSdg: 3,
  },
  {
    id: 3,
    title: "Hunger",
    description: "Ensuring every community member has access to nutritious food through food drives, distribution programs, and sustainable nutrition initiatives.",
    icon: "Utensils",
    sdgs: [1, 2, 3],
    accentSdg: 2,
  },
  {
    id: 4,
    title: "Childhood Cancer",
    description: "Supporting children and families facing cancer through awareness campaigns, fundraising, care packages, and community advocacy.",
    icon: "Heart",
    sdgs: [1, 3],
    accentSdg: 3,
  },
  {
    id: 5,
    title: "Environment",
    description: "Protecting and restoring the planet through reforestation, coastal clean-ups, waste reduction, and environmental education programs.",
    icon: "Leaf",
    sdgs: [6, 13, 14, 15],
    accentSdg: 15,
  },
  {
    id: 6,
    title: "Disaster Relief",
    description: "Delivering rapid humanitarian response with emergency supplies, medical aid, and community rebuilding when disaster strikes.",
    icon: "AlertTriangle",
    sdgs: [1, 11, 13],
    accentSdg: 11,
  },
  {
    id: 7,
    title: "Humanitarian",
    description: "Addressing systemic inequities and delivering targeted support to underserved populations through global humanitarian initiatives.",
    icon: "Globe",
    sdgs: [1, 3, 10, 16],
    accentSdg: 10,
  },
  {
    id: 8,
    title: "Youth",
    description: "Empowering the next generation through leadership development, educational support, and meaningful service opportunities via the Leo program.",
    icon: "GraduationCap",
    sdgs: [4, 5, 8, 10, 17],
    accentSdg: 4,
  },
];

// Past Presidents Hall of Honor
export const PRESIDENTS: President[] = [
  { 
    year: '2023-2024', 
    name: 'Kasun Perera', 
    photo: 'https://i.pravatar.cc/300?u=kasun',
    description: "Instrumental in advancing the club's regional presence and scaling service output through strategic leadership and community mobilization."
  },
  { 
    year: '2022-2023', 
    name: 'Hasitha Perera', 
    photo: 'https://i.pravatar.cc/300?u=hasitha',
    description: "Focused on member engagement and district-wide collaborations, significantly expanding our project reach."
  },
  { 
    year: '2021-2022', 
    name: 'Binura Fonseka', 
    photo: 'https://i.pravatar.cc/300?u=binura',
    description: "Lead the club through digital transformation, establishing our online presence and virtual service initiatives."
  },
  { 
    year: '2020-2021', 
    name: 'Nuwan Gamage', 
    photo: 'https://i.pravatar.cc/300?u=nuwan',
    description: "Laid the groundwork for our flagship community projects and strengthened our local partnerships."
  },
];
