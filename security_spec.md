# Security Specification — Push Notification System

## 1. Data Invariants
1. **Admin Authority (`admins`, `admin_settings`, `notification_logs`)**:
   - Only verified admin users (`request.auth.token.email_verified == true` AND matching `hananirfan91@gmail.com` or existing `/admins/{uid}` document) may read or mutate `admin_settings` or `notification_logs`.
   - Client SDK writes cannot escalate roles or write into `/admins/{adminId}` directly.
2. **Subscription Token Isolation (`subscribers`)**:
   - `/subscribers/{subscriberId}` contains Web Push endpoints and FCM registration tokens and MUST NEVER be readable, listable, or writable by anonymous/unauthenticated or non-admin client queries.
   - Public visitors register, update preferences, and unsubscribe solely through validated `/api/notifications/*` serverless endpoints.
3. **Owner-Scoped Profiles (`subscriber_profiles/{userId}`)**:
   - A signed-in, email-verified user may only read, create, update, or delete their own `/subscriber_profiles/{userId}` document where `userId == request.auth.uid`, `userId` matches `^[a-zA-Z0-9_\-]+$`, `createdAt` is immutable on update, and timestamps match `request.time`.
4. **Strict Schema & Bounds**:
   - Every write enforces exact keys (`hasAll` + `hasOnly` on create, `affectedKeys().hasOnly(...)` on update), bounded array lengths (`<= 12`), valid string lengths, safe URL/regex patterns, and `isValidId()` on document IDs.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unauthenticated Subscriber Scrape**: `LIST /subscribers` with `auth == null` -> `PERMISSION_DENIED`.
2. **Non-Admin Subscriber Scrape**: `LIST /subscribers` with `auth.email == 'attacker@example.com'` (`email_verified: true`) -> `PERMISSION_DENIED`.
3. **Email Spoofing (Unverified Admin Email)**: `GET /admin_settings/scheduler` with `auth.email == 'hananirfan91@gmail.com'` and `email_verified: false` -> `PERMISSION_DENIED`.
4. **Self-Assigned Admin Escalation**: `CREATE /admins/{uid}` by non-admin user -> `PERMISSION_DENIED`.
5. **Shadow Ghost Field Injection**: `CREATE /subscriber_profiles/{uid}` adding `{ isAdmin: true }` -> `PERMISSION_DENIED`.
6. **Cross-Tenant Profile Read**: `GET /subscriber_profiles/otherUser` by signed-in user `uid1` -> `PERMISSION_DENIED`.
7. **Cross-Tenant Profile Forgery**: `CREATE /subscriber_profiles/uid1` with `userId: "otherUser"` -> `PERMISSION_DENIED`.
8. **Immutable Field Tampering**: `UPDATE /subscriber_profiles/uid1` modifying `createdAt` or `userId` -> `PERMISSION_DENIED`.
9. **Client Clock Forgery**: `CREATE /notification_logs/log1` with spoofed `createdAt` != `request.time` -> `PERMISSION_DENIED`.
10. **ID Poisoning**: `CREATE /notification_logs/invalid$id!1500chars...` -> `PERMISSION_DENIED`.
11. **Unbounded Array / Resource Exhaustion**: `UPDATE /admin_settings/scheduler` with `rotatingMessages` having > 12 entries -> `PERMISSION_DENIED`.
12. **Type Poisoning**: `CREATE /notification_logs/log2` with `title: 12345` or `totalAttempted: "100"` -> `PERMISSION_DENIED`.
