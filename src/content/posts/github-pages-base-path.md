---
title: GitHub Pages에서 하위 경로까지 확인하기
description: 저장소 이름 아래에 정적 사이트를 배포할 때 글 링크와 CSS 경로가 어긋나는 이유를 살펴봅니다.
pubDate: '2026-11-17'
tags: [astro, github-pages, 웹]
---

GitHub Pages의 프로젝트 사이트는 기본적으로 `사용자.github.io/저장소/`에 열립니다. 이때 `/posts/`로 시작하는 링크는 저장소 이름을 건너뛰고 도메인의 루트를 가리킵니다. 홈이 잘 열리더라도 글 링크나 스타일 파일에서 문제가 드러날 수 있습니다.

## 사이트 주소와 하위 경로 지정하기

Astro에서는 `site`에 도메인을, `base`에 저장소 경로를 넣습니다. 코드에서 내부 링크를 만들 때는 `import.meta.env.BASE_URL`을 기준으로 삼습니다.

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.github.io',
  base: '/tech-blog',
  trailingSlash: 'always',
});
```

## 빌드 결과에서 확인하기

```bash
npm run build
npm run preview
```

미리보기 주소에 저장소 이름을 붙여 접속한 뒤, 글과 태그 상세 주소를 직접 열어봅니다. 각 페이지의 CSS가 로드되는지, 글에서 홈으로 돌아갈 수 있는지, RSS 항목의 주소에도 저장소 이름이 들어 있는지 확인하면 배포 전에 경로 오류를 찾을 수 있습니다.
