  <a href="https://mediawave-7cd4c.web.app/">
      
 <img width="300" alt="Image" src="https://github.com/user-attachments/assets/26baad3d-3576-45f6-a965-28ed8962fbb8" />
  <a/>
  
---

TMDB API를 기반으로 한 미디어 콘텐츠 탐색 플랫폼입니다. <br/>
사용자는 작품을 검색하고, 필터링하며, 비슷한 콘텐츠를 추천받고, 리뷰와 북마크를 통해 자신만의 미디어 취향을 기록할 수 있습니다.

<br/>

## 💡 개발 의도

React 애플리케이션의 구조와 데이터 흐름을 직접 설계하며,  
각 기술의 역할을 명확히 이해하고 체계적으로 적용하는 데 집중했습니다.

이 프로젝트를 통해 다음을 경험하고 학습했습니다:
- **React 구조 설계와 상태 관리 심화** — 컴포넌트 단위 설계와 데이터 흐름을 체계적으로 구성  
- **Data Router 실습** — React Router v6.4+의 데이터 중심 라우팅 패턴 적용 및 비동기 로딩 구조 구현  
- **Redux Toolkit 활용** — 전역 상태 관리와 비동기 로직을 단일 패턴으로 통합  
- **Firebase 기반 서버리스 백엔드 구축** — 인증(Auth), 데이터 저장(Firestore), 배포(Hosting)를 포함한 BaaS 환경 구성  
- **비즈니스 로직과 UI의 분리** — API 호출 및 데이터 가공 로직을 컴포넌트로부터 분리하여 재사용성과 유지보수성 강화  
- **유지보수성과 확장성을 고려한 설계** — 폴더 구조, 데이터 흐름, 컴포넌트 아키텍처를 체계적으로 정립

  <br/>

## 🧩 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 사용자 인증 | Firebase Auth 기반 로그인 / 회원가입 및 소셜로그인 |
| 🔍 콘텐츠 검색 | TMDB API를 활용한 영화·TV 시리즈 정보 제공  |
| 📖 검색·정렬·필터 | 다양한 조건으로 원하는 작품을 손쉽게 탐색  |
| 📖 상세 페이지 | 콘텐츠 정보와 사용자 리뷰 표시, 장르·키워드 기반의 유사 콘텐츠 제안 |
| ✍️ 리뷰 CRUD | 리뷰 작성, 수정, 삭제, 조회 기능 |
| ❤️ 북마크 | 관심 있는 작품을 저장하고 모아보기  |
| ☁️ 데이터 관리 | Firestore 기반 리뷰 및 사용자 데이터 저장 |
| 🚀 배포 | Firebase Hosting으로 서비스 배포 |

<br/>

## 🛠️ 기술 스택

  <div align="">
      
  <img src='https://skillicons.dev/icons?i=react,ts,tailwind,firebase,redux,githubactions,vite&perline=7' alt="stack" />
  </div>

<br/>

## 🏗️ 폴더 구조

> 기능 단위 구조(feature-based structure)로 설계되었으며, 데이터 흐름과 비즈니스 로직을 명확히 분리하여 유지보수성과 확장성을 높였습니다.

```bash
src/
┣ apis/ # 외부 API 호출 및 통신 로직 (TMDB, Firebase 등)
┣ assets/ # 이미지, 아이콘 등 정적 자원
┣ components/ # 공통 UI 컴포넌트
┣ constants/ # 상수, 공용 설정값
┣ hook/ # 커스텀 훅
┣ lib/ # 외부 라이브러리 래핑, 공용 유틸 함수
┣ pages/ # 도메인 단위 페이지 (auth, browse, detail, home, my 등)
┣ routes/ # 라우팅 및 데이터 로딩 관리
┃ ┣ layouts/ # 공용 레이아웃 컴포넌트
┃ ┣ loader/ # React Router Data Router의 loader/action 정의
┃ ┗ Router.tsx # 전체 라우팅 구조 설정
┣ services/ # 비즈니스 로직 및 데이터 가공, 에러 처리 담당
┣ store/ # Redux Toolkit 전역 상태 관리
┣ styles/ # 전역 스타일 및 테마
┣ types/ # 타입 정의 (TypeScript 인터페이스)
┗ utils/ # 포맷터, 공용 헬퍼 함수
```

---

### 📡 데이터 구조 및 흐름

데이터는 **API 호출 → Service 가공 → Store 관리 → UI 렌더링**의 단계를 거칩니다.

```plaintext
[TMDB / Firebase API]
        ↓
     apis/ (요청)
        ↓
   services/ (가공, 에러 처리)
        ↓
     store/ (Redux Toolkit 전역 상태)
        ↓
   pages & components/ (UI 렌더링)
```

### 🔸 주요 처리 흐름

- **apis/** — TMDB 및 Firebase API 호출 전담. 외부 통신과 응답 처리만 수행
- **services/** — 비즈니스 로직과 데이터 가공 담당. API 응답을 UI 적합 형태로 변환하고 에러·로딩 상태를 관리 
- **routes/loader/** — React Router Data Router를 활용해 페이지 진입 시 필요한 데이터를 사전 로드
- **store/** — Redux Toolkit으로 전역 상태 관리. 도메인별 slice로 모듈화해 데이터 흐름의 일관성 유지
- **Firebase (UI 내부)** — 서버리스 특성상 Firestore CRUD 및 Auth 로직을 UI 컴포넌트 내부에서 `useEffect`로 직접 호출  
- **pages/** — 도메인 단위(`auth`, `browse`, `detail` 등)로 구성. 필요한 데이터만 구독하고 비즈니스 로직은 `services/`에 위임

