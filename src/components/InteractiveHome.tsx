// src/components/InteractiveHome.tsx
import { h, type FunctionComponent } from 'preact';
import { useState, useMemo, useEffect } from 'preact/hooks';
import ProjectCard, { type Project } from './ProjectCard';
import StatusIcon from './StatusIcon';
import { type Status, statusColors } from '../utils/project';
import CustomSelect from './CustomSelect';

// --- HÀM TIỆN ÍCH ---
function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- HÀM SẮP XẾP TẬP TRUNG ---
type SortOption = 'Ngày đăng (mới nhất)' | 'Ngày đăng (cũ nhất)' | 'Tên (A-Z)' | 'Tên (Z-A)' | 'Năm (mới nhất)' | 'Năm (cũ nhất)';

function sortProjects(projects: Project[], sortOption: SortOption): Project[] {
  const sorted = [...projects].sort((a, b) => {
    switch (sortOption) {
      case 'Tên (A-Z)':
        return a.anilist.title.romaji.localeCompare(b.anilist.title.romaji);
      case 'Tên (Z-A)':
        return b.anilist.title.romaji.localeCompare(a.anilist.title.romaji);
      case 'Năm (mới nhất)':
        const yearA = a.anilist.startDate?.year ?? a.anilist.seasonYear ?? 0;
        const yearB = b.anilist.startDate?.year ?? b.anilist.seasonYear ?? 0;
        return yearB - yearA;
      case 'Năm (cũ nhất)':
        const yearA2 = a.anilist.startDate?.year ?? a.anilist.seasonYear ?? 0;
        const yearB2 = b.anilist.startDate?.year ?? b.anilist.seasonYear ?? 0;
        return yearA2 - yearB2;
      case 'Ngày đăng (cũ nhất)':
        const dateComparisonAsc = a.data.publishDate.getTime() - b.data.publishDate.getTime();
        if (dateComparisonAsc !== 0) return dateComparisonAsc;
        return a.anilist.title.romaji.localeCompare(b.anilist.title.romaji);
      case 'Ngày đăng (mới nhất)':
      default:
        const dateComparisonDesc = b.data.publishDate.getTime() - a.data.publishDate.getTime();
        if (dateComparisonDesc !== 0) return dateComparisonDesc;
        return a.anilist.title.romaji.localeCompare(b.anilist.title.romaji);
    }
  });
  return sorted;
}

// --- COMPONENT CHÍNH ---
interface InteractiveHomeProps {
  projects: Project[];
}

const statusFilters: Status[] = ['Tất cả', 'Đang làm', 'Hoàn thành', 'Dự kiến', 'Tạm ngưng'];
const formatFilters = ['Tất cả', 'TV', 'Movie', 'OVA', 'ONA'];
const sortOptions: SortOption[] = [
  'Ngày đăng (mới nhất)',
  'Ngày đăng (cũ nhất)',
  'Tên (A-Z)',
  'Tên (Z-A)',
  'Năm (mới nhất)',
  'Năm (cũ nhất)',
];

// --- URL STATE MANAGEMENT ---
const sortOptionMap: Record<SortOption, string> = {
  'Ngày đăng (mới nhất)': 'date_desc',
  'Ngày đăng (cũ nhất)': 'date_asc',
  'Tên (A-Z)': 'name_asc',
  'Tên (Z-A)': 'name_desc',
  'Năm (mới nhất)': 'year_desc',
  'Năm (cũ nhất)': 'year_asc',
};
const sortSlugMap = Object.fromEntries(Object.entries(sortOptionMap).map(([k, v]) => [v, k]));

export default function InteractiveHome({ projects }: InteractiveHomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [activeStatusFilter, setActiveStatusFilter] = useState<Status>('Tất cả');
  const [activeFormatFilter, setActiveFormatFilter] = useState('Tất cả');
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('Ngày đăng (mới nhất)');

  // --- STATE SYNC LOGIC ---
  // Encapsulated logic to sync state from URL parameters
  const syncStateFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const status = (params.get('status') as Status) || 'Tất cả';
    const format = params.get('format') || 'Tất cả';
    const sortSlug = params.get('sort');
    const sort = sortSlug && sortSlugMap[sortSlug] ? (sortSlugMap[sortSlug] as SortOption) : 'Ngày đăng (mới nhất)';

    setSearchTerm(q);
    if (statusFilters.includes(status)) setActiveStatusFilter(status);
    if (formatFilters.includes(format)) setActiveFormatFilter(format);
    setActiveSortOption(sort);
  };

  // Effect to sync state from URL on initial load and on back/forward navigation
  useEffect(() => {
    // Run on initial load
    syncStateFromURL();

    // Add listener for pageshow event (handles bfcache restores)
    const handlePageShow = (event: PageTransitionEvent) => {
      // The page is being restored from the back-forward cache.
      if (event.persisted) {
        syncStateFromURL();
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    // Cleanup listener
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // Effect để cập nhật URL khi state thay đổi
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set('q', debouncedSearchTerm);
    if (activeStatusFilter !== 'Tất cả') params.set('status', activeStatusFilter);
    if (activeFormatFilter !== 'Tất cả') params.set('format', activeFormatFilter);
    
    const sortSlug = sortOptionMap[activeSortOption];
    if (sortSlug !== 'date_desc') { // Don't add default sort to URL
      params.set('sort', sortSlug);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }, [debouncedSearchTerm, activeStatusFilter, activeFormatFilter, activeSortOption]);

  const processedProjects = useMemo(() => {
    // 1. Sắp xếp mặc định ban đầu
    const initiallySorted = sortProjects(projects, 'Ngày đăng (mới nhất)');

    // 2. Lọc
    const filtered = initiallySorted.filter(project => {
      if (!project.anilist) return false;
      const lowerSearchTerm = removeDiacritics(debouncedSearchTerm).toLowerCase();
      const matchesSearch =
        lowerSearchTerm === '' ||
        project.anilist.title.romaji.toLowerCase().includes(lowerSearchTerm) ||
        (project.anilist.title.native && project.anilist.title.native.toLowerCase().includes(lowerSearchTerm)) ||
        (project.anilist.title.english && project.anilist.title.english.toLowerCase().includes(lowerSearchTerm)) ||
        (project.data.title_vietnamese && removeDiacritics(project.data.title_vietnamese).toLowerCase().includes(lowerSearchTerm)) ||
        (project.anilist.studios && project.anilist.studios.nodes[0]?.name.toLowerCase().includes(lowerSearchTerm)) ||
        (project.anilist.staff && project.anilist.staff.edges.some(edge => edge.role === 'Director' && edge.node.name.full.toLowerCase().includes(lowerSearchTerm)));
      const matchesStatus = activeStatusFilter === 'Tất cả' || project.data.status === activeStatusFilter;
      const projectFormat = project.anilist.format?.replace('_', ' ') || 'Unknown';
      const matchesFormat = activeFormatFilter === 'Tất cả' || projectFormat.toLowerCase() === activeFormatFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesFormat;
    });

    // 3. Sắp xếp lại theo lựa chọn của người dùng
    return sortProjects(filtered, activeSortOption);

  }, [projects, debouncedSearchTerm, activeStatusFilter, activeFormatFilter, activeSortOption]);

  return (
    <div>
      {/* Hàng 1: Tìm kiếm và Sắp xếp */}
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex-grow relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, studio, đạo diễn, tựa việt..."
            value={searchTerm}
            onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
            class="w-full h-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>
        <div class="w-full md:w-64">
          <CustomSelect
            options={sortOptions}
            selectedValue={activeSortOption}
            onSelect={(val) => setActiveSortOption(val as SortOption)}
            label="Sắp xếp theo"
          />
        </div>
      </div>

      {/* Hàng 2: Các bộ lọc */}
      <div class="flex flex-col md:flex-row gap-4 mb-10">
        <div class="flex flex-wrap gap-3">
          {statusFilters.map(filter => {
            const colorName = statusColors[filter];
            const isActive = activeStatusFilter === filter;
            const isAllFilter = filter === 'Tất cả';
            return (
              <button
                key={filter}
                onClick={() => setActiveStatusFilter(filter)}
                class={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center ${
                  isActive
                    ? `bg-${colorName}-500 text-white shadow-lg`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isAllFilter ? (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <StatusIcon status={filter} class="w-4 h-4 mr-1" />
                )}
                {filter}
              </button>
            );
          })}
        </div>
        <div class="flex-grow md:flex-grow-0 md:ml-auto w-full md:w-48">
          <CustomSelect
            options={formatFilters}
            selectedValue={activeFormatFilter}
            onSelect={setActiveFormatFilter}
            label="Mọi định dạng"
          />
        </div>
      </div>

      {/* Lưới hiển thị kết quả */}
      {processedProjects.length > 0 ? (
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
          {processedProjects.map(project => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              colorName={statusColors[project.data.status as Status]} 
            />
          ))}
        </div>
      ) : (
        <p class="text-center text-gray-500 mt-8">Không tìm thấy dự án nào.</p>
      )}
    </div>
  );
}
