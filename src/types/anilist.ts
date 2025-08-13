// src/types/anilist.ts

export interface AniListResponse {
  data: {
    Page: {
      media: Media[];
    };
  };
}

export interface Media {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
  genres: string[];
    studios: {
    nodes: {
      name: string;
      isAnimationStudio: boolean;
      siteUrl: string;
    }[];
  };
}
