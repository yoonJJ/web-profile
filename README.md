# Web Profile

정재의 개인 포트폴리오 웹사이트입니다.  
반응형 UI, 웹 표준, 인터랙션 구현 역량을 한 화면에 담아 소개하는 정적 웹 프로젝트입니다.

## Overview

웹 개발자로서의 소개, 기술 스택, 프로젝트 경험, 블로그 성격의 콘텐츠, 연락처를 하나의 랜딩 페이지 형식으로 구성한 포트폴리오 사이트입니다.

## Features

- 반응형 레이아웃 기반의 포트폴리오 랜딩 페이지
- 섹션 단위 스크롤 흐름과 인터랙션 중심 UI
- 자기소개 모달과 연락 유도 CTA 제공
- 기술 스택 및 작업 경험 시각화
- 프레임워크 아이콘 marquee 영역과 애니메이션 효과
- 프로젝트별 `Live Demo` 모달(포트폴리오 슬라이드 HTML 임베드)
- 메일 링크 연동을 통한 빠른 연락 기능

## Tech Stack

- `HTML5`
- `CSS3`
- `JavaScript (ES6+)`
- `Google Fonts`

## Sections

1. `Hero` - 메인 카피와 핵심 소개
2. `About` - 프로필, 자기소개, 주요 역량
3. `Framework Marquee` - 기술 아이콘 시각 영역
4. `Work Experience` - 프로젝트 및 실무 경험 소개
5. `Blog` - 학습/기록 성격의 콘텐츠 카드
6. `Contact` - 이메일과 협업 문의 영역

## Project Structure

```text
web-profile/
├── index.html
├── pages/
│   └── portfolio/
│       ├── todoList_portfolio.html
│       └── ai_project_portfolio.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── portfolio/
│   │   └── ai/
│   │       ├── icons/
│   │       └── screenshots/
│   └── images/
│       ├── about/
│       ├── blog/
│       ├── profile/
│       └── projects/
└── README.md
```

## Getting Started

별도 빌드 도구 없이 바로 실행할 수 있는 정적 웹 프로젝트입니다.

1. 저장소를 클론하거나 다운로드합니다.
2. `index.html`을 브라우저에서 열거나, 로컬 서버로 실행합니다.
3. 권장 실행 방식은 VS Code Live Server 입니다.

## Portfolio Slides

- `Backend` 탭의 `TodoList`, `IT 자격증 AI 학습 플랫폼` 카드는 `Live Demo` 버튼 클릭 시 모달로 슬라이드 페이지를 엽니다.
- 포트폴리오 슬라이드 문서는 `pages/portfolio/` 하위에서 관리합니다.
- AI 프로젝트 스크린샷/아이콘 리소스는 `assets/portfolio/ai/` 하위에서 관리합니다.

## Highlights

- 시맨틱 마크업을 바탕으로 구조를 설계했습니다.
- CSS 애니메이션과 레이아웃 구성을 통해 시각적 흐름을 강화했습니다.
- JavaScript로 모달, 스크롤 반응, 사용자 인터랙션을 제어합니다.

## Contact

- Email: `yoon.jj5539@gmail.com`

## License

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다.
