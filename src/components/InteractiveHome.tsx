// src/components/InteractiveHome.tsx
import { h } from 'preact';
import { useState, useMemo } from 'preact/hooks';
import ProjectCard, { type Project } from './ProjectCard';

interface InteractiveHomeProps {
  projects: Project[];
}

// === BƯỚC 1: ĐỊNH NGHĨA TYPE RÕ RÀNG ===
// Định nghĩa một kiểu dữ liệu cho các trạng thái có thể có
type Status = 'Tất cả' | 'Đang làm' | 'Hoàn thành' | 'Dự kiến' | 'Tạm ngưng';

// Định nghĩa mảng các bộ lọc với kiểu dữ liệu mới
const statusFilters: Status[] = ['Tất cả', 'Đang làm', 'Hoàn thành', 'Dự kiến', 'Tạm ngưng'];

// Định nghĩa object màu sắc, với key là kiểu Status
const statusColors: { [key in Status]: string } = {
  'Đang làm': 'green',
  'Hoàn thành': 'cyan',
  'Dự kiến': 'yellow',
  'Tạm ngưng': 'red',
  'Tất cả': 'gray'
};
// === KẾT THÚC BƯỚC 1 ===


export default function InteractiveHome({ projects }: InteractiveHomeProps) {
  const [searchTerm, setSearchTerm] = useState('');
  // === BƯỚC 2: SỬ DỤNG TYPE MỚI CHO STATE ===
  const [activeFilter, setActiveFilter] = useState<Status>('Tất cả');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (!project.anilist) return false;
      
      const matchesSearch = project.anilist.title.romaji.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'Tất cả' || project.data.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, activeFilter]);

  return (
    <div>
      {/* Ô tìm kiếm */}
      <div class="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm anime..."
          value={searchTerm}
          onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
        />
      </div>

      {/* Các nút lọc */}
      <div class="flex flex-wrap gap-3 mb-10">
        {statusFilters.map(filter => {
          // Lỗi đã được khắc phục ở đây vì TypeScript giờ đã hiểu `filter` là một `Status`
          const colorName = statusColors[filter]; 
          const isActive = activeFilter === filter;
          
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              class={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive
                  ? `bg-${colorName}-500 text-white shadow-lg`
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* Lưới hiển thị kết quả */}
      {filteredProjects.length > 0 ? (
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4">
          {filteredProjects.map(project => (
            // Lỗi đã được khắc phục ở đây vì TypeScript đã hiểu `project.data.status` là một key hợp lệ
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