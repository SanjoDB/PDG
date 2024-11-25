// @ts-ignore
import Organization from '@/interfaces/Organization';

export interface User {
  id: string;
  name: string;
  email: string;
  levelStatus: { [key: number]: { points: number } };
  points: number;
  organization: Organization | null;
}

export interface RankUser {
  id: string;
  name: string;
  position: number;
  organization: string;
  points: number;
}
