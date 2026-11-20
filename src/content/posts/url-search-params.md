---
title: URLSearchParams로 검색어를 URL에 저장하기
description: 쿼리 문자열을 직접 조합하지 않고, 새로고침하거나 공유해도 검색어가 유지되게 만드는 방법입니다.
pubDate: '2026-11-10'
tags: [javascript, 웹]
---

검색 결과를 공유할 때 검색어가 입력창에만 남아 있으면 받은 사람은 처음부터 다시 검색해야 합니다. 검색어를 URL의 `q`에 넣어 두면 같은 링크를 열었을 때 입력값을 복원할 수 있습니다.

## 검색어 읽기

`URLSearchParams`는 쿼리 문자열을 해석하고, 인코딩된 한글이나 공백을 원래 값으로 돌려줍니다. `q`가 없을 때 `get()`은 `null`을 반환합니다.

```js
const params = new URLSearchParams(location.search);
const query = params.get('q') ?? '';
```

## 페이지 이동 없이 주소 갱신하기

현재 주소로 `URL` 객체를 만들면 다른 파라미터와 해시를 유지하면서 `q`만 바꿀 수 있습니다. 빈 검색어는 파라미터를 지워 처리합니다.

```js
const url = new URL(location.href);
const query = input.value.trim();

if (query) {
  url.searchParams.set('q', query);
} else {
  url.searchParams.delete('q');
}

history.replaceState(history.state, '', url);
```

입력할 때마다 주소가 바뀌는 검색창에는 `replaceState`가 적합합니다. 현재 방문 기록을 갱신하므로 뒤로 가기를 눌렀을 때 이전 페이지로 돌아갈 수 있습니다.
