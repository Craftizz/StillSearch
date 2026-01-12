
export interface User {
  id: string;
  name?: string;
  avatarUrl?: string | null;
  roles: string[];
  createdAt?: string;
}

export interface PublicUser {
  id: string;
  name?: string;
  avatarUrl?: string | null;
}