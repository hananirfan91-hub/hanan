export type NotificationType =
  | 'daily-reminder'
  | 'new-project'
  | 'project-update'
  | 'new-achievement'
  | 'new-skill'
  | 'new-certificate'
  | 'experience-update'
  | 'general-announcement';

export const ALLOWED_NOTIFICATION_TYPES: NotificationType[] = [
  'daily-reminder',
  'new-project',
  'project-update',
  'new-achievement',
  'new-skill',
  'new-certificate',
  'experience-update',
  'general-announcement',
];

export interface StoredPushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface StoredPushSubscriptionPayload {
  endpoint: string;
  expirationTime?: number | null;
  keys: StoredPushSubscriptionKeys;
}

export interface StoredSubscriber {
  subscriptionId: string;
  pushSubscription: StoredPushSubscriptionPayload | null;
  fcmToken: string | null;
  categories: NotificationType[];
  dailyReminder: boolean;
  timezone: string;
  platform: string;
  active: boolean;
  lastDailySentDateKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServerSchedulerSettings {
  enabled: boolean;
  sendHour: number;
  sendMinute: number;
  timezone: string;
  rotatingMessages: string[];
  lastRunDateKey: string;
  dailyRotationIndex: number;
  updatedAt: string;
}

export interface ServerNotificationLog {
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

export interface LocalPushStoreSchema {
  vapidKeys?: {
    publicKey: string;
    privateKey: string;
  };
  subscribers: Record<string, StoredSubscriber>;
  scheduler: ServerSchedulerSettings;
  logs: ServerNotificationLog[];
  idempotencyKeys: Record<string, number>;
}
