export type AnilistCache = {
  [id: string]: {
    id: number;
    title: { romaji: string; native?: string; english?: string; };
    coverImage: { extraLarge: string };
    bannerImage?: string;
    seasonYear?: number;
    format?: string;
    episodes?: number;
    duration?: number;
    averageScore?: number;
    source?: string;
    genres?: string[];
    studios?: { nodes: { name: string }[] };
    staff?: { edges: { role: string; node: { name: { full: string } } }[] };
  };
};

declare module '../data/anilist-cache.json' {
  const value: AnilistCache;
  export default value;
}
