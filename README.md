# 철용의 기술 블로그

Markdown으로 글을 작성하는 Astro 정적 블로그입니다.

## 로컬 실행

Node.js 24와 npm이 필요합니다.

```sh
npm ci
npm run dev
```

브라우저에서 `http://localhost:4321/kimcheolyong-techblog/`를 엽니다. 배포 결과를 미리 보려면 아래 명령을 실행하고 같은 하위 경로로 접속합니다.

```sh
npm run check
npm run build
npm run preview
```

## 글 작성

`src/content/posts/`에 Markdown 파일을 추가합니다. 영문 소문자, 숫자, 하이픈으로 쓴 파일명이 글 주소가 됩니다. 예를 들어 `my-post.md`는 `/kimcheolyong-techblog/posts/my-post/`에 표시됩니다.

```md
---
title: 첫 기술 글
description: 글 목록과 검색에 표시할 한 줄 요약입니다.
pubDate: '2026-11-18'
tags: [javascript, 웹]
draft: true
---

본문을 작성합니다.
```

발행일은 `YYYY-MM-DD` 형식의 문자열로 적습니다. 태그는 한 개 이상 지정하고 단어를 연결할 때 하이픈을 사용합니다. 발행하려면 `draft`를 삭제하거나 `false`로 바꿉니다. 발행한 글의 주소를 유지하려면 본문이나 제목을 수정할 때도 파일명은 유지합니다.

### 이미지와 첨부파일

- 본문 이미지는 `src/content/posts/assets/<slug>/`에 두고 Markdown 파일 기준 상대 경로로 연결합니다. 예를 들어 `my-post.md`에서 `![화면 설명](./assets/my-post/screenshot.png)`로 연결합니다.
- 다운로드용 첨부파일은 `public/posts/<slug>/files/`에 두고 글 주소 기준 상대 경로로 연결합니다. 예를 들어 `public/posts/my-post/files/guide.pdf`는 `my-post.md`에서 `[안내서](./files/guide.pdf)`로 연결하면 `/kimcheolyong-techblog/posts/my-post/files/guide.pdf`로 열립니다. `public/`에 둔 파일은 초안 여부와 관계없이 배포되므로 공개할 파일만 넣습니다.
- 다른 글로 링크할 때는 글 주소 기준 상대 경로를 사용합니다. 예를 들어 `[다른 글](../other-post/)`로 연결하면 사이트의 배포 하위 경로가 바뀌어도 같은 구조에서 동작합니다.

### 콘텐츠 이전

`src/content/posts/` 전체와 첨부파일이 있는 경우 `public/posts/`를 함께 복사합니다. 새 블로그에서 YAML Frontmatter를 읽고 파일명에서 slug를 가져옵니다. `draft`, `pubDate`, `tags` 등은 새 블로그의 메타데이터에 매핑합니다. 이미지 경로는 Markdown 파일을 기준으로 처리하고, 첨부파일은 각 글 주소 아래 `files/`에서 제공하도록 설정합니다. 게시글 주소의 구조나 배포 경로를 바꾼다면 기존 주소에서 새 주소로 리디렉션을 설정하고 본문 내부 링크도 확인합니다.

## GitHub Pages 배포

1. GitHub 저장소의 **Settings → Pages → Build and deployment**에서 **Source**를 **GitHub Actions**로 설정합니다.
2. 현재 워크플로의 자동 배포 대상은 `main`입니다. 수동 실행은 워크플로가 기본 브랜치에 등록된 뒤 **Actions → Deploy to GitHub Pages → Run workflow**에서 할 수 있습니다. `ai`를 운영 브랜치로 사용할 때는 자동 배포 대상과 Pages 환경의 허용 브랜치를 운영 방식에 맞춰 설정해야 합니다.
3. 배포 작업이 성공하면 [블로그](https://kim-cheolyong.github.io/kimcheolyong-techblog/)와 [RSS](https://kim-cheolyong.github.io/kimcheolyong-techblog/rss.xml)를 엽니다.
