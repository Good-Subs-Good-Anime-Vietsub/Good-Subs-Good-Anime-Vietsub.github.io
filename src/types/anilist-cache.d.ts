export type StaffEdge = {
  role: string;
  node: {
    name: {
      full: string;
    };
    siteUrl: string;
  };
};

export type AnilistCache = {
  [id:string]: {
    id: number;
    title: { romaji: string; native?: string; english?: string; };
    coverImage: { extraLarge: string; color?: string };
    bannerImage?: string;
    startDate?: { year: number };
    seasonYear?: number;
    season?: string;
    format?: string;
    episodes?: number;
    duration?: number;
    averageScore?: number;
    meanScore?: number;
    source?: string;
    genres?: string[];
    studios?: { nodes: { name: string; siteUrl: string }[] };
    staff?: { edges: StaffEdge[] };
  };
};

declare module '../data/anilist-cache.json' {
  const value: AnilistCache;
  export default value;
}
