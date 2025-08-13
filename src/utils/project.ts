// Định nghĩa kiểu Status để tái sử dụng
export type Status = 'Tất cả' | 'Đang làm' | 'Hoàn thành' | 'Dự kiến' | 'Tạm ngưng';

// Hàm slugify để chuyển đổi chuỗi tiếng Việt có dấu thành slug không dấu
export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// Định nghĩa object màu sắc, với key là kiểu Status
export const statusColors: { [key in Status]: string } = {
  'Tất cả': 'gray',
  'Đang làm': 'green',
  'Hoàn thành': 'cyan',
  'Dự kiến': 'yellow',
  'Tạm ngưng': 'red',
};

import type { CollectionEntry } from 'astro:content';
import type { AnilistCache, StaffEdge } from '../types/anilist-cache';

export function getRelatedProjects(
  currentEntry: CollectionEntry<'projects'>,
  allProjects: CollectionEntry<'projects'>[],
  anilistCache: AnilistCache
) {
  const currentAnilistData = anilistCache[String(currentEntry.data.anilistId)];
  if (!currentAnilistData) {
    return [];
  }

  const currentDirector = currentAnilistData.staff?.edges.find((e: StaffEdge) => e.role === 'Director')?.node.name.full;
  const currentStudio = currentAnilistData.studios?.nodes[0]?.name;
  const currentGenres = currentAnilistData.genres || [];

  const relatedProjects = allProjects
    .filter(p => (p.data.status === 'Đang làm' || p.data.status === 'Hoàn thành') && p.slug !== currentEntry.slug)
    .map(p => {
      const otherAnilistData = anilistCache[String(p.data.anilistId)];
      if (!otherAnilistData) return { project: p, score: 0 };

      let score = 0;
      const otherDirector = otherAnilistData.staff?.edges.find((e: StaffEdge) => e.role === 'Director')?.node.name.full;
      const otherStudio = otherAnilistData.studios?.nodes[0]?.name;
      const otherGenres = otherAnilistData.genres || [];

      // +1 điểm cho mỗi thể loại chung
      score += otherGenres.filter(genre => currentGenres.includes(genre)).length;

      // +5 điểm nếu cùng studio
      if (currentStudio && otherStudio && currentStudio === otherStudio) {
        score += 5;
      }

      // +10 điểm nếu cùng đạo diễn
      if (currentDirector && otherDirector && currentDirector === otherDirector) {
        score += 10;
      }

      return { project: p, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(item => item.project);

  return relatedProjects;
}
