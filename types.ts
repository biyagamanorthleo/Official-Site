
export enum ProjectStatus {
  COMPLETED = 'Completed',
  ONGOING = 'Ongoing',
  UPCOMING = 'Coming Soon'
}

export enum TeamCategory {
  ADVISORY = 'Advisory Panel',
  EXECUTIVE = 'Executive Committee',
  DIRECTOR = 'Director',
  MEMBER = 'Members'
}

export enum AchievementCategory {
  DISTRICT = 'District Award',
  REGIONAL = 'Regional Recognition',
  MILESTONE = 'Club Milestone'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: ProjectStatus;
  image: string;
  date: string;
  impact?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: AchievementCategory;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  category: TeamCategory;
  avenue?: string;
  priority?: number;
}

export interface President {
  year: string;
  name: string;
  photo: string;
  description: string;
}

export interface ClubStat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  downloadUrl: string;
}

export interface SdgGoal {
  goal: number;
  name: string;
  color: string;
}

export interface GlobalCause {
  id: number;
  title: string;
  description: string;
  icon: string;
  sdgs: number[];
  accentSdg: number;
}
