import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..'); // Đi lên 3 cấp để đến thư mục gốc của dự án

export function getRelativeImagePath(imagePath: string): string {
  // imagePath có dạng ../content/anime/[slug]/image.png
  // Chúng ta muốn chuyển nó thành /anime/[slug]/image.png để Astro phục vụ
  const relativeToContent = imagePath.replace('../../content', '');
  return relativeToContent;
}
