// File: src/content/config.ts (đã cập nhật)
import { defineCollection, z } from 'astro:content';

const staffCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    github_url: z.string().url(),
    role: z.string(), 
  }),
});

const animeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    mal_id: z.number(),
    viet_title: z.string().optional(),
    synopsis_vi: z.string().optional(),
    status: z.enum(["Hoàn thành", "Đang tiến hành", "Tạm ngưng", "Dự kiến"]),
    download_links: z.array(z.object({ label: z.string(), url: z.string() })),
    project_staff: z.array(z.object({
      role: z.string(),
      members: z.array(z.string())
    })).optional(),
    featured: z.boolean().optional(),
    banner_image: z.string().optional(), // Thêm trường banner_image
  }),
});;

export const collections = {
  'anime': animeCollection,
  'staff': staffCollection,
};