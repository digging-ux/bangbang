/**
 * 방방곡곡 입점 신청 랜딩 페이지
 * 주요 기능: 스크롤 애니메이션, 폼 검증, 모바일 메뉴, FAQ 토글
 */

// DOM 요소 선택
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const floatingCta = document.getElementById('floatingCta');
const applyForm = document.getElementById('applyForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

// ==================== 네비게이션 스크롤 효과 ====================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 네비게이션 배경 효과
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Floating CTA 버튼 표시/숨김
    if (scrollTop > 500) {
        floatingCta.classList.add('show');
    } else {
        floatingCta.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
});

// ==================== 모바일 메뉴 토글 ====================
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// 메뉴 링크 클릭 시 모바일 메뉴 닫기
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ==================== 스크롤 애니메이션 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 애니메이션 대상 요소 관찰
const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
animatedElements.forEach(el => observer.observe(el));

// ==================== FAQ 토글 ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // 현재 아이템이 활성화되어 있는지 확인
        const isActive = item.classList.contains('active');
        
        // 모든 FAQ 아이템 닫기
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // 클릭된 아이템이 비활성화 상태였다면 활성화
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ==================== 폼 검증 및 제출 ====================

// 전화번호 포맷팅
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    
    if (value.length > 3 && value.length <= 7) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 7) {
        value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }
    
    e.target.value = value;
});

// 텍스트 영역 글자 수 카운터
const ideaTextarea = document.getElementById('idea');
const charCount = document.querySelector('.char-count');

ideaTextarea.addEventListener('input', (e) => {
    const length = e.target.value.length;
    charCount.textContent = `${length} / 500자`;
    
    if (length > 500) {
        charCount.style.color = 'var(--primary-color)';
    } else {
        charCount.style.color = 'var(--gray)';
    }
});

// 날짜 입력 최소값 설정 (오늘 날짜)
const startDateInput = document.getElementById('startDate');
const today = new Date().toISOString().split('T')[0];
startDateInput.setAttribute('min', today);

// 폼 검증 함수
function validateForm(formData) {
    const errors = [];
    
    // 이름 검증
    if (formData.get('name').trim().length < 2) {
        errors.push('이름을 2글자 이상 입력해주세요.');
    }
    
    // 전화번호 검증
    const phone = formData.get('phone').replace(/[^0-9]/g, '');
    if (phone.length < 10 || phone.length > 11) {
        errors.push('올바른 전화번호를 입력해주세요.');
    }
    
    // 이메일 검증
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('올바른 이메일 주소를 입력해주세요.');
    }
    
    // 브랜드명 검증
    if (formData.get('brandName').trim().length < 2) {
        errors.push('브랜드명을 2글자 이상 입력해주세요.');
    }
    
    // 카테고리 검증
    if (!formData.get('category')) {
        errors.push('카테고리를 선택해주세요.');
    }
    
    // 패키지 검증
    if (!formData.get('package')) {
        errors.push('희망 패키지를 선택해주세요.');
    }
    
    // 입점 시기 검증
    if (!formData.get('startDate')) {
        errors.push('희망 입점 시기를 선택해주세요.');
    }
    
    // 사업 아이디어 검증
    const idea = formData.get('idea').trim();
    if (idea.length < 100) {
        errors.push('사업 아이디어를 100자 이상 작성해주세요.');
    }
    if (idea.length > 500) {
        errors.push('사업 아이디어는 500자를 초과할 수 없습니다.');
    }
    
    // 약관 동의 검증
    if (!formData.get('agree')) {
        errors.push('개인정보 처리방침 및 이용약관에 동의해주세요.');
    }
    
    return errors;
}

// 폼 제출 처리
applyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(applyForm);
    
    // 유효성 검증
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        alert('입력 내용을 확인해주세요:\n\n' + errors.join('\n'));
        return;
    }
    
    // 제출 버튼 비활성화
    const submitButton = applyForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 제출 중...';
    
    try {
        // 폼 데이터를 객체로 변환
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            brandName: formData.get('brandName'),
            category: formData.get('category'),
            sns: formData.get('sns'),
            package: formData.get('package'),
            startDate: formData.get('startDate'),
            idea: formData.get('idea'),
            submittedAt: new Date().toISOString()
        };
        
        // 실제 환경에서는 여기서 서버로 데이터 전송
        // await fetch('/api/applications', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        
        // 데모용: 로컬 스토리지에 저장
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        applications.push(data);
        localStorage.setItem('applications', JSON.stringify(applications));
        
        // 콘솔에 데이터 출력 (개발용)
        console.log('신청 데이터:', data);
        
        // 짧은 지연 후 성공 처리 (실제 서버 응답 시뮬레이션)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 폼 초기화
        applyForm.reset();
        charCount.textContent = '0 / 500자';
        
        // 성공 모달 표시
        successModal.classList.add('show');
        
        // 페이지 최상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('신청 중 오류 발생:', error);
        alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
        // 제출 버튼 다시 활성화
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }
});

// 성공 모달 닫기
closeModal.addEventListener('click', () => {
    successModal.classList.remove('show');
});

// 모달 배경 클릭 시 닫기
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('show');
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('show')) {
        successModal.classList.remove('show');
    }
});

// ==================== 부드러운 스크롤 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // 빈 해시나 모달 링크는 제외
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 페이지 로드 애니메이션 ====================
window.addEventListener('load', () => {
    // 히어로 섹션 페이드인
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // 스크롤 인디케이터 애니메이션
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
    }
});

// ==================== 이미지 레이지 로딩 ====================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // 구형 브라우저를 위한 폴백
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==================== 관리자용 기능 (개발 환경) ====================
// 콘솔에서 신청 데이터 확인
window.viewApplications = function() {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    console.table(applications);
    return applications;
};

window.clearApplications = function() {
    localStorage.removeItem('applications');
    console.log('모든 신청 데이터가 삭제되었습니다.');
};

// 개발 환경 안내
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c방방곡곡 입점 신청 페이지', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
    console.log('%c개발 환경 명령어:', 'font-size: 14px; font-weight: bold; color: #2C3E50;');
    console.log('viewApplications() - 저장된 신청 데이터 확인');
    console.log('clearApplications() - 신청 데이터 모두 삭제');
}

// ==================== 성능 최적화 ====================

// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 리사이즈 이벤트 최적화
window.addEventListener('resize', debounce(() => {
    // 리사이즈 시 필요한 작업
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}, 250));

// ==================== 접근성 개선 ====================

// 포커스 가능한 요소들
const focusableElements = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

// 모달이 열릴 때 포커스 트랩
successModal.addEventListener('click', (e) => {
    if (successModal.classList.contains('show')) {
        const focusable = successModal.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        // Tab 키 처리
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
});

// ==================== Google Analytics 연동 준비 ====================
// 실제 배포 시 Google Analytics 코드 추가
window.trackEvent = function(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
};

// 주요 이벤트 추적
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// ==================== 초기화 완료 ====================
console.log('방방곡곡 입점 신청 페이지가 로드되었습니다.');
