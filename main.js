// ===========================
// 방방곡곡 (BangBang GoGog) JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // === Mobile Menu Toggle ===
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // === Sticky Navbar ===
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }
        });
    }
    
    // === Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === Scroll Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.package-card, .benefit-card, .process-step, .story-card, .faq-item, .about-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // === Form Handling ===
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                
                if (value.length > 6) {
                    e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
                } else if (value.length > 3) {
                    e.target.value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    e.target.value = value;
                }
            });
        }
        
        // Character counter for idea textarea
        const ideaTextarea = document.getElementById('idea');
        const ideaCount = document.getElementById('ideaCount');
        if (ideaTextarea && ideaCount) {
            ideaTextarea.addEventListener('input', function() {
                const count = this.value.length;
                ideaCount.textContent = count;
                
                if (count > 500) {
                    this.value = this.value.substring(0, 500);
                    ideaCount.textContent = '500';
                }
            });
        }
        
        // Form validation and submission
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const brandName = document.getElementById('brandName').value.trim();
            const category = document.getElementById('category').value;
            const packageType = document.querySelector('input[name="package"]:checked');
            const idea = document.getElementById('idea').value.trim();
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            if (!name) {
                alert('이름을 입력해주세요.');
                document.getElementById('name').focus();
                return;
            }
            
            if (!phone || phone.length < 12) {
                alert('올바른 연락처를 입력해주세요.');
                document.getElementById('phone').focus();
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                document.getElementById('email').focus();
                return;
            }
            
            if (!brandName) {
                alert('브랜드명을 입력해주세요.');
                document.getElementById('brandName').focus();
                return;
            }
            
            if (!category) {
                alert('카테고리를 선택해주세요.');
                document.getElementById('category').focus();
                return;
            }
            
            if (!packageType) {
                alert('패키지를 선택해주세요.');
                return;
            }
            
            if (!idea || idea.length < 20) {
                alert('사업 아이디어를 20자 이상 작성해주세요.');
                document.getElementById('idea').focus();
                return;
            }
            
            if (!agreeTerms) {
                alert('개인정보 수집 및 이용에 동의해주세요.');
                document.getElementById('agreeTerms').focus();
                return;
            }
            
            // Save to localStorage (임시 저장)
            const formData = {
                name: name,
                phone: phone,
                email: email,
                brandName: brandName,
                category: category,
                businessStatus: document.querySelector('input[name="businessStatus"]:checked').value,
                package: packageType.value,
                idea: idea,
                motivation: document.getElementById('motivation').value.trim(),
                startDate: document.getElementById('startDate').value,
                referral: document.getElementById('referral').value,
                timestamp: new Date().toISOString()
            };
            
            // Get existing applications
            let applications = JSON.parse(localStorage.getItem('bangbangApplications') || '[]');
            applications.push(formData);
            localStorage.setItem('bangbangApplications', JSON.stringify(applications));
            
            // Show success modal
            showSuccessModal();
            
            // Reset form
            applyForm.reset();
            if (ideaCount) ideaCount.textContent = '0';
            
            // In a real application, you would send this data to a server
            console.log('Application submitted:', formData);
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // === Success Modal ===
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    
    function showSuccessModal() {
        if (successModal) {
            successModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function hideSuccessModal() {
        if (successModal) {
            successModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', hideSuccessModal);
    }
    
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                hideSuccessModal();
            }
        });
    }
    
    // === Floating CTA Button ===
    const floatingCTA = document.getElementById('floatingCTA');
    if (floatingCTA) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
    
    // === Stats Counter Animation ===
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('.') ? '.0' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('.') ? '.0' : '+');
                }
            }, 16);
        });
        
        hasAnimated = true;
    }
    
    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(heroSection);
    }
    
    // === Auto-save Form Data ===
    const formInputs = applyForm ? applyForm.querySelectorAll('input, select, textarea') : [];
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem('form_' + input.id);
        if (savedValue && input.type !== 'checkbox' && input.type !== 'radio') {
            input.value = savedValue;
        }
        
        // Save on change
        input.addEventListener('change', function() {
            if (this.type !== 'checkbox' && this.type !== 'radio') {
                localStorage.setItem('form_' + this.id, this.value);
            }
        });
    });
    
    // Clear saved form data after successful submission
    function clearFormStorage() {
        formInputs.forEach(input => {
            localStorage.removeItem('form_' + input.id);
        });
    }
    
    // === Package Card Hover Effect ===
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // === Active Nav Link Highlight ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.borderBottomColor = 'transparent';
            link.style.color = 'var(--text-color)';
            if (link.getAttribute('href') === '#' + current) {
                link.style.borderBottomColor = 'var(--primary-color)';
                link.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // === Console Welcome Message ===
    console.log('%c🏪 방방곡곡에 오신 것을 환영합니다!', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
    console.log('%c✨ 20만원으로 시작하는 진주 로컬 비즈니스', 'color: #2C3E50; font-size: 14px;');
    console.log('%c📞 문의: 010-0000-0000', 'color: #666; font-size: 12px;');
    
    // === Performance Monitoring (Development Only) ===
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', (pageLoadTime / 1000).toFixed(2) + 's');
            }, 0);
        });
    }
});

// === Utility Functions ===

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// === Export for admin dashboard (future feature) ===
function getApplications() {
    return JSON.parse(localStorage.getItem('bangbangApplications') || '[]');
}

function exportApplicationsCSV() {
    const applications = getApplications();
    if (applications.length === 0) {
        alert('저장된 신청서가 없습니다.');
        return;
    }
    
    let csv = 'Name,Phone,Email,Brand Name,Category,Package,Date\n';
    applications.forEach(app => {
        csv += `"${app.name}","${app.phone}","${app.email}","${app.brandName}","${app.category}","${app.package}","${app.timestamp}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bangbang-applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Make functions available globally for console access
window.bangbang = {
    getApplications,
    exportApplicationsCSV
};

console.log('%cAdmin 기능: console에서 bangbang.getApplications() 또는 bangbang.exportApplicationsCSV() 실행', 'color: #999; font-size: 11px; font-style: italic;');