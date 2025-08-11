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
