import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { postPath, publishedPosts } from '../lib/posts';
import { siteDescription, siteName, sitePath } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const posts = await publishedPosts();

  return rss({
    title: siteName,
    description: siteDescription,
    site: new URL(sitePath(), site),
    customData: '<language>ko</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate),
      link: postPath(post),
      categories: [...new Set(post.data.tags)],
    })),
  });
};
