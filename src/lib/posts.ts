import { getCollection, type CollectionEntry } from 'astro:content';
import { sitePath } from './site';

export type Post = CollectionEntry<'posts'>;

export async function publishedPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.localeCompare(a.data.pubDate) || a.id.localeCompare(b.id));
}

export function postPath(post: Post) {
  return sitePath(`posts/${post.id}/`);
}

export function tagPath(tag: string) {
  return sitePath(`tags/${encodeURIComponent(tag)}/`);
}

export function groupByTag(posts: Post[]) {
  const groups = new Map<string, Post[]>();

  for (const post of posts) {
    for (const tag of new Set(post.data.tags)) {
      const group = groups.get(tag) ?? [];
      group.push(post);
      groups.set(tag, group);
    }
  }

  return [...groups].sort(([a], [b]) => a.localeCompare(b, 'ko'));
}
