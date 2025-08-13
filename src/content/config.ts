// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // ID từ AniList, đây là trường quan trọng nhất
    anilistId: z.number(),

    // Tùy chọn: Đánh dấu dự án nổi bật
    featured: z.boolean().optional().default(false),

    // Tùy chọn: Tựa tiếng Việt
    title_vietnamese: z.string().optional(),

    // Bắt buộc: Trạng thái của dự án
    status: z.enum(['Đang làm', 'Hoàn thành', 'Dự kiến', 'Tạm ngưng']),

    // Bắt buộc: Danh sách đội ngũ, là một mảng các object
    staffs: z.array(z.object({
      role: z.string(),
      name: z.string(),
    })),

    // Bắt buộc: Danh sách link tải
    downloads: z.array(z.object({
      type: z.string(),
      url: z.string(), // Cho phép chuỗi bất kỳ, không kiểm tra định dạng URL
    })),
    // Thêm publishDate vào schema để TypeScript nhận diện
    publishDate: z.instanceof(Date).optional(),
    lastUpdated: z.instanceof(Date).optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'pages': pagesCollection,
  'guides': guidesCollection,
};
