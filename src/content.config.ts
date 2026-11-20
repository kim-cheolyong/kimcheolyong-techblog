import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/posts',
    generateId: ({ entry }) => {
      const slug = entry.slice(0, -3);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`글 파일명에는 영문 소문자, 숫자, 하이픈을 사용하세요: ${entry}`);
      }
      return slug;
    },
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    pubDate: z.iso.date(),
    tags: z.array(z.string().regex(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u)).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
