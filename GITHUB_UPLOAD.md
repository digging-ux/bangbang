# 🚀 GitHub 업로드 완벽 가이드

방방곡곡 웹사이트를 GitHub Pages에 배포하는 방법을 단계별로 안내합니다.

---

## 📋 준비사항

- ✅ GitHub 계정 ([github.com](https://github.com))
- ✅ 저장소: `https://github.com/digging-ux/bangbang`
- ✅ 다운로드한 모든 파일

---

## 🎯 방법 1: GitHub 웹에서 직접 업로드 (추천!)

### 1단계: 메인 파일 업로드

1. **https://github.com/digging-ux/bangbang** 접속
2. **"Add file"** 버튼 클릭
3. **"Upload files"** 선택
4. 다음 파일들을 드래그 앤 드롭:
   - `index.html`
   - `sitemap.xml`
   - `robots.txt`
5. 커밋 메시지: `이미지 문제 해결: Font Awesome 아이콘 적용`
6. **"Commit changes"** 클릭 (초록색 버튼)

### 2단계: CSS 파일 업데이트

1. **css** 폴더 클릭 (없으면 생성)
2. `style.css` 파일 클릭
3. **연필 아이콘 ✏️** (Edit) 클릭
4. 전체 선택 (Ctrl+A 또는 Cmd+A)
5. 삭제
6. 새 `css/style.css` 내용 붙여넣기
7. **"Commit changes"** 클릭

### 3단계: JavaScript 파일 업데이트

1. **js** 폴더 클릭 (없으면 생성)
2. `main.js` 파일 클릭
3. **연필 아이콘 ✏️** 클릭
4. 전체 선택 → 삭제
5. 새 `js/main.js` 내용 붙여넣기
6. **"Commit changes"** 클릭

### 4단계: README 업데이트

1. 루트 폴더로 돌아가기
2. `README.md` 파일 클릭
3. **연필 아이콘 ✏️** 클릭
4. 전체 선택 → 삭제
5. 새 `README.md` 내용 붙여넣기
6. **"Commit changes"** 클릭

### 5단계: GitHub Pages 확인

1. 상단 **"Actions"** 탭 클릭
2. "pages build and deployment" 워크플로우 확인
3. **초록색 체크마크 ✅** 나올 때까지 대기 (2-5분)
4. 완료!

### 6단계: 웹사이트 접속

```
https://digging-ux.github.io/bangbang/
```

브라우저 새로고침: **Ctrl + Shift + R** (또는 Cmd + Shift + R)

---

## 🎯 방법 2: Git 명령어 사용 (고급)

### 1단계: 저장소 클론

```bash
git clone https://github.com/digging-ux/bangbang.git
cd bangbang
```

### 2단계: 파일 복사

다운로드한 모든 파일을 저장소 폴더에 복사:
- index.html
- css/style.css
- js/main.js
- sitemap.xml
- robots.txt
- README.md

### 3단계: Git 커밋

```bash
git add .
git commit -m "이미지 문제 해결: Font Awesome 아이콘 적용"
git push origin main
```

### 4단계: 배포 확인

1-3분 후 자동 배포 완료!

---

## 🎯 방법 3: GitHub Desktop 사용

### 1단계: GitHub Desktop 설치

- [https://desktop.github.com/](https://desktop.github.com/) 다운로드

### 2단계: 저장소 클론

1. File → Clone Repository
2. `digging-ux/bangbang` 선택
3. Clone 클릭

### 3단계: 파일 복사

저장소 폴더에 파일 복사

### 4단계: 커밋 및 푸시

1. Summary: `이미지 문제 해결`
2. **Commit to main** 클릭
3. **Push origin** 클릭

---

## ✅ 배포 확인 체크리스트

웹사이트에서 다음을 확인:

### 시각적 확인
- [ ] 히어로 섹션에 주황색 가게 아이콘 보임
- [ ] 성공 사례에 3개 아이콘 보임 (📚 👕 ☕)
- [ ] 모든 섹션이 정상 표시
- [ ] 그라디언트 배경이 아름답게 렌더링
- [ ] 주황색(#FF6B35) 브랜드 컬러 적용

### 기능 확인
- [ ] 네비게이션 메뉴 작동
- [ ] 부드러운 스크롤
- [ ] FAQ 아코디언 토글
- [ ] 입점 신청 폼 검증
- [ ] 전화번호 자동 포맷팅 (010-XXXX-XXXX)
- [ ] 성공 모달 표시
- [ ] Floating CTA 버튼
- [ ] 모바일 반응형

### SEO 확인
- [ ] sitemap.xml 접근: `https://digging-ux.github.io/bangbang/sitemap.xml`
- [ ] robots.txt 접근: `https://digging-ux.github.io/bangbang/robots.txt`

---

## 🔧 문제 해결

### 문제 1: 파일이 업로드되지 않음

**해결책:**
1. 파일 크기 확인 (100MB 이하)
2. 파일 이름 확인 (특수문자 없음)
3. 브라우저 새로고침 후 재시도

### 문제 2: 변경사항이 안 보임

**해결책:**
1. **브라우저 캐시 삭제**
   ```
   Chrome/Firefox: Ctrl + Shift + R
   Safari: Cmd + Shift + R
   ```

2. **시크릿 모드로 확인**

3. **GitHub Actions 확인**
   - Actions 탭 → 최신 워크플로우 클릭
   - 빨간 X가 있으면 에러 메시지 확인

### 문제 3: 404 에러

**원인:** 파일 구조 문제

**해결책:**
```
정확한 파일 구조:
/
├── index.html       ← 반드시 root에 있어야 함!
├── sitemap.xml
├── robots.txt
├── README.md
├── css/
│   └── style.css
└── js/
    └── main.js
```

### 문제 4: CSS/JS가 적용 안 됨

**원인:** 경로 문제

**해결책:**
`index.html`에서 경로 확인:

```html
<!-- 올바른 경로 (상대 경로) -->
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

<!-- 잘못된 경로 (절대 경로) - X -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/main.js"></script>
```

### 문제 5: 아이콘이 안 보임

**원인:** Font Awesome CDN 문제

**해결책:**
`index.html` head에 다음 코드 있는지 확인:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

---

## 📱 배포 후 즉시 할 일

### 1. 연락처 정보 업데이트 (필수!)

`index.html`에서 검색 후 변경:

```
Ctrl+F (또는 Cmd+F) → "010-0000-0000"
→ 실제 전화번호로 변경 (2곳)

Ctrl+F → "hello@bangbanggogog.com"
→ 실제 이메일로 변경 (2곳)
```

### 2. SNS 공유

Instagram, Threads, Facebook에 공유:

```
🎉 방방곡곡 입점 신청 오픈!
https://digging-ux.github.io/bangbang/

20만원으로 시작하는 진주 로컬 비즈니스 💼
지금 신청하세요! ✨

#방방곡곡 #진주창업 #로컬비즈니스
```

### 3. QR 코드 생성

1. [https://www.qrcode-monkey.com](https://www.qrcode-monkey.com) 접속
2. URL 입력: `https://digging-ux.github.io/bangbang/`
3. 디자인 커스터마이징 (선택)
4. 다운로드 (PNG, SVG)
5. 포스터/전단지에 추가

---

## 🎯 향후 개선 사항

### 1주일 내
- [ ] **Google Analytics 추가**
  ```html
  <!-- Google Analytics 코드 추가 -->
  ```

- [ ] **Google Search Console 등록**
  - [https://search.google.com/search-console](https://search.google.com/search-console)

- [ ] **Naver 웹마스터도구 등록**
  - [https://searchadvisor.naver.com/](https://searchadvisor.naver.com/)

### 2주일 내
- [ ] 백엔드 API 연동
- [ ] 이메일 알림 시스템
- [ ] 데이터베이스 연동

---

## 💡 팁

### 빠른 수정 방법

1. **GitHub 웹에서 직접 수정**
   - 파일 클릭 → 연필 아이콘 → 수정 → Commit
   - 1-3분 후 자동 배포

2. **로컬에서 수정 후 푸시**
   ```bash
   git pull
   # 파일 수정
   git add .
   git commit -m "수정 내용"
   git push
   ```

### 실시간 미리보기

로컬 환경에서 테스트:

```bash
# Python 3
python -m http.server 8000

# 브라우저에서:
http://localhost:8000
```

---

## 📞 도움이 필요하신가요?

- **GitHub 이슈**: [https://github.com/digging-ux/bangbang/issues](https://github.com/digging-ux/bangbang/issues)
- **이메일**: hello@bangbanggogog.com
- **전화**: 010-0000-0000

---

## 🎉 완료!

축하합니다! 이제 방방곡곡 웹사이트가 전 세계에 공개되었습니다! 🌍

**배포 주소**: [https://digging-ux.github.io/bangbang/](https://digging-ux.github.io/bangbang/)

**다음 단계**: [README.md](README.md) 파일을 확인하여 추가 기능을 알아보세요!

**방방곡곡 프로젝트의 성공을 기원합니다! 🚀✨**