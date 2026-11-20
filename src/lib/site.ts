export const siteName = '철용의 기술 블로그';
export const siteDescription = '개발하며 배운 것과 다시 찾아보고 싶은 내용을 기록합니다.';
export const repository = 'https://github.com/kim-cheolyong/kimcheolyong-techblog';

export function sitePath(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
}
