// src/types/member.d.ts
export interface Member {
  name: string;
  memberUrl?: string; // For external members
  role?: string;
  type: 'core' | 'external';
  avatar?: string; // For core members
  socials?: { // For core members
    github?: string;
    youtube?: string;
    facebook?: string;
  };
}
