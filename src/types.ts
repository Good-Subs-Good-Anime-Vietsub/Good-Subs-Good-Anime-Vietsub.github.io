export interface Anime {
  slug: string;
  href: string;
  title: string;
  smallImageUrl: string;
  largeImageUrl: string;
  status: string;
  score: number | null;
  year: number | null;
  featured: boolean;
  synopsis: string;
  viet_title?: string;
  banner_image?: string; // Đổi tên thành banner_image
  studios?: string[];
  genres?: string[];
}