export interface User {
  email: string;
  name: string;
  identifier: string;
  uid: string;
  country: string;
  companyId: string;
  role: string;
  affiliate: boolean;
  createdAt: string;
  lastTimeUploadedHook: string;
  accessToken?: string;
  hooks?: number;
  points?: number;
  nextBatchAfterHooksCount?: number;
  preview?: {
    fileURL?: string;
  };
  videos?: number;
  language?: string;
  tiktok?: TikTokData;
  platform?: string;
  countryISO?: string;
  facebook?: {
    accessToken: string;
  };
  pages?: [
    {
      id: string;
      name: string;
      access_token: string;
    }
  ];
  status?: "pending" | "active" | "inactive";
  _firestore_id?: string;
  deepLink?: string;
}

export interface TikTokAccount {
  accessToken: string;
  refreshToken: string;
  tokenExpiresIn: number;
  refreshExpiresIn: number;
}

export interface TikTokData {
  accounts: Record<string, TikTokAccount>; // Key = accountId, Value = TikTokAccount object
}

export interface TiktokAccount {
  _firestore_id: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiresIn: number;
  refreshExpiresIn: number;
  username: string;
  followingCount: number;
  followerCount: number;
  likesCount: number;
  videoCount: number;
  creator_avatar_url: string;
  creator_username: string;
  creator_nickname: string;
}
