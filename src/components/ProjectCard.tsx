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
    <div class="w-full mx-auto">
      <div class="aspect-[3/4] w-full">
        <a href={`/projects/${project.slug}`} class="group relative block w-full h-full overflow-hidden rounded-lg shadow-lg bg-gray-800 transform transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-105">
          <img src={coverImage.extraLarge} alt={`Cover for ${title.romaji}`} loading="lazy" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 to-transparent">
            <h3 class="font-semibold text-xs sm:text-base text-white leading-tight drop-shadow-lg line-clamp-2">{title.romaji}</h3>
            <div class="flex justify-between items-center mt-1">
              {year && <p class="text-[10px] sm:text-xs text-gray-300">{year}</p>}
              <span class={`text-[8px] sm:text-[11px] font-bold text-white px-1 sm:px-1.5 py-px sm:py-0.5 rounded-md shadow-lg flex items-center ${tagBgClass} bg-opacity-70 backdrop-blur-sm`}>
                <StatusIcon status={currentStatus} class="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 mr-0.5 sm:mr-1" />
                {currentStatus}
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
