// src/components/ProjectCard.tsx
import { h, type FunctionComponent } from 'preact';
import type { Status } from '../utils/project'; // Import Status
import StatusIcon from './StatusIcon';

// Định nghĩa kiểu dữ liệu cho một dự án, có thể tái sử dụng
export interface Project {
  slug: string;
  data: {
    status: Status; // Thay đổi từ string thành Status
    title_vietnamese?: string;
    publishDate: Date;
    featured?: boolean;
  };
  anilist: {
    id: number;
    title: { romaji: string; native?: string; english?: string; };
    coverImage: { extraLarge: string };
    bannerImage?: string;
    startDate?: { year: number };
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
}

interface ProjectCardProps {
  project: Project;
  colorName: string;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project, colorName }) => {
  const { title, coverImage, startDate, seasonYear } = project.anilist;
  const year = startDate?.year ?? seasonYear;
  const tagBgClass = `bg-${colorName}-500`;
  const currentStatus = project.data.status;

  return (
    <div class="w-full max-w-[200px] mx-auto">
      <div class="aspect-[3/4] w-full">
        <a href={`/projects/${project.slug}`} class="group relative block w-full h-full overflow-hidden rounded-lg shadow-lg bg-gray-800 transform transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105">
          <img src={coverImage.extraLarge} alt={`Cover for ${title.romaji}`} loading="lazy" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          <div class="absolute top-2 right-2">
            <span class={`text-xs font-bold text-white px-2 py-1 rounded-md shadow-lg flex items-center ${tagBgClass} bg-opacity-90 backdrop-blur-sm`}>
              <StatusIcon status={currentStatus} class="w-3 h-3 mr-1" />
              {currentStatus}
            </span>
          </div>
          <div class="absolute bottom-0 left-0 p-3 w-full">
            <h3 class="font-semibold text-base text-white leading-tight drop-shadow-lg">{title.romaji}</h3>
            {year && <p class="text-xs text-gray-300 mt-1">{year}</p>}
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
