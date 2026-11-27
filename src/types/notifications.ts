export type NotificationType =
  | 'daily-reminder'
  | 'new-project'
  | 'project-update'
  | 'new-achievement'
  | 'new-skill'
  | 'new-certificate'
  | 'experience-update'
  | 'general-announcement';

export interface NotificationCategoryMeta {
  id: NotificationType;
  label: string;
  description: string;
  defaultUrl: string;
}

export const NOTIFICATION_CATEGORIES: NotificationCategoryMeta[] = [
  {
    id: 'daily-reminder',
    label: 'Daily Portfolio Reminder',
    description: 'Once-daily curated prompt to explore projects, skills, and updates.',
    defaultUrl: '/',
  },
  {
    id: 'new-project',
    label: 'New Project',
    description: 'Alerts when a new web app, AI build, or SaaS tool launches.',
    defaultUrl: '/projects',
  },
  {
    id: 'project-update',
    label: 'Project Update',
    description: 'Major releases and feature upgrades across live deployments.',
    defaultUrl: '/projects',
  },
  {
    id: 'new-achievement',
    label: 'New Achievement',
    description: 'Academic honors, leadership milestones, and community recognition.',
    defaultUrl: '/about#achievements',
  },
  {
    id: 'new-skill',
    label: 'New Skill',
    description: 'New frameworks, AI workflows, and technical capabilities added.',
    defaultUrl: '/skills',
  },
  {
    id: 'new-certificate',
    label: 'New Certificate',
    description: 'Verified Coursera, Google AI, and university credentials.',
    defaultUrl: '/about#achievements',
  },
  {
    id: 'experience-update',
    label: 'Experience Update',
    description: 'New engineering roles, campus leadership, or consulting engagements.',
    defaultUrl: '/experience',
  },
  {
    id: 'general-announcement',
    label: 'General Announcement',
    description: 'Articles, availability updates, and important portfolio news.',
    defaultUrl: '/',
  },
];

export const DEFAULT_SUBSCRIBER_CATEGORIES: NotificationType[] = [
  'new-project',
  'project-update',
  'new-achievement',
  'new-skill',
  'new-certificate',
  'experience-update',
  'general-announcement',
];

export const DEFAULT_ROTATING_DAILY_MESSAGES: string[] = [
  "Explore Hanan Irfan's portfolio today — new full-stack & AI projects await.",
  'Discover my latest projects, technical SEO work, and AI engineering builds.',
  "See what's new in Hanan Irfan's portfolio — live demos and verified credentials.",
  'Stay connected with my latest projects, skills, and achievements at KFUEIT.',
];

export interface NotificationPreferences {
  categories: NotificationType[];
  dailyReminder: boolean;
  timezone: string;
}

export interface SchedulerSettings {
  enabled: boolean;
  sendHour: number;
  sendMinute: number;
  timezone: string;
  rotatingMessages: string[];
  lastRunDateKey: string;
  updatedAt?: string;
}

export interface NotificationLogEntry {
  id: string;
  title: string;
  body: string;
  notificationType: NotificationType;
  targetUrl: string;
  targetCategories: NotificationType[];
  isTest: boolean;
  idempotencyKey: string;
  totalAttempted: number;
  successCount: number;
  failureCount: number;
  cleanedCount: number;
  errorSummary: string;
  createdAt: string;
}

export interface AdminNotificationOverview {
  totalSubscribers: number;
  activeSubscribers: number;
  dailyOptInCount: number;
  categoryCounts: Record<NotificationType, number>;
  platformCounts: Record<string, number>;
  scheduler: SchedulerSettings;
  logs: NotificationLogEntry[];
  storageMode: 'firestore-admin' | 'local-file';
  hasFcmServerCredentials: boolean;
  hasVapidKeys: boolean;
}
