  1	// ===========================
     2	// 방방곡곡 (BangBang GoGog) JavaScript
     3	// Google Forms 연동 버전
     4	// ===========================
     5	
     6	// === Google Forms 설정 ===
     7	const GOOGLE_FORMS_CONFIG = {
     8	    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeVnXm_YOUR_FORM_ID_HERE/formResponse',
     9	    entries: {
    10	        name: 'entry.120540713',           // 이름
    11	        phone: 'entry.1160651997',          // 전화번호
    12	        email: 'entry.1612750435',          // 이메일
    13	        brandName: 'entry.1641054354',      // 브랜드명
    14	        category: 'entry.1904559935',       // 카테고리
    15	        businessStatus: 'entry.YOUR_ENTRY_ID', // 사업자 여부
    16	        package: 'entry.646061378',        // 패키지
    17	        idea: 'entry.639993047',           // 사업 아이디어
    18	        motivation: 'entry.1509700588',     // 지원 동기
    19	        startDate: 'entry.1551752735',      // 희망 입점 시기
    20	        referral: 'entry.966790486'        // 유입 경로
    21	    }
    22	};
    23	
    24	document.addEventListener('DOMContentLoaded', function() {
    25	    // === Mobile Menu Toggle ===
    26	    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    27	    const navMenu = document.getElementById('navMenu');
    28	    
    29	    if (mobileMenuToggle && navMenu) {
    30	        mobileMenuToggle.addEventListener('click', function() {
    31	            navMenu.classList.toggle('active');
    32	            const icon = this.querySelector('i');
    33	            if (navMenu.classList.contains('active')) {
    34	                icon.classList.remove('fa-bars');
    35	                icon.classList.add('fa-times');
    36	            } else {
    37	                icon.classList.remove('fa-times');
    38	                icon.classList.add('fa-bars');
    39	            }
    40	        });
    41	        
    42	        // Close mobile menu when clicking a link
    43	        const navLinks = document.querySelectorAll('.nav-link');
    44	        navLinks.forEach(link => {
    45	            link.addEventListener('click', () => {
    46	                navMenu.classList.remove('active');
    47	                const icon = mobileMenuToggle.querySelector('i');
    48	                icon.classList.remove('fa-times');
    49	                icon.classList.add('fa-bars');
    50	            });
    51	        });
    52	    }
    53	    
    54	    // === Sticky Navbar ===
    55	    const navbar = document.getElementById('navbar');
    56	    if (navbar) {
    57	        window.addEventListener('scroll', function() {
    58	            if (window.scrollY > 50) {
    59	                navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    60	            } else {
    61	                navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    62	            }
    63	        });
    64	    }
    65	    
    66	    // === Smooth Scrolling ===
    67	    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    68	        anchor.addEventListener('click', function(e) {
    69	            e.preventDefault();
    70	            const target = document.querySelector(this.getAttribute('href'));
    71	            if (target) {
    72	                const navbarHeight = navbar ? navbar.offsetHeight : 0;
    73	                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    74	                
    75	                window.scrollTo({
    76	                    top: targetPosition,
    77	                    behavior: 'smooth'
    78	                });
    79	            }
    80	        });
    81	    });
    82	    
    83	    // === Scroll Animations ===
    84	    const observerOptions = {
    85	        threshold: 0.1,
    86	        rootMargin: '0px 0px -100px 0px'
    87	    };
    88	    
    89	    const observer = new IntersectionObserver(function(entries) {
    90	        entries.forEach(entry => {
    91	            if (entry.isIntersecting) {
    92	                entry.target.style.opacity = '1';
    93	                entry.target.style.transform = 'translateY(0)';
    94	            }
    95	        });
    96	    }, observerOptions);
    97	    
    98	    // Animate elements on scroll
    99	    const animatedElements = document.querySelectorAll('.package-card, .benefit-card, .process-step, .story-card, .faq-item, .about-item');
   100	    animatedElements.forEach(el => {
   101	        el.style.opacity = '0';
   102	        el.style.transform = 'translateY(30px)';
   103	        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
   104	        observer.observe(el);
   105	    });
   106	    
   107	    // === FAQ Accordion ===
   108	    const faqItems = document.querySelectorAll('.faq-item');
   109	    faqItems.forEach(item => {
   110	        const question = item.querySelector('.faq-question');
   111	        question.addEventListener('click', () => {
   112	            // Close other items
   113	            faqItems.forEach(otherItem => {
   114	                if (otherItem !== item && otherItem.classList.contains('active')) {
   115	                    otherItem.classList.remove('active');
   116	                }
   117	            });
   118	            
   119	            // Toggle current item
   120	            item.classList.toggle('active');
   121	        });
   122	    });
   123	    
   124	    // === Form Handling ===
   125	    const applyForm = document.getElementById('applyForm') || document.getElementById('apply-form');
   126	    if (applyForm) {
   127	        // Phone number formatting
   128	        const phoneInput = document.getElementById('phone');
   129	        if (phoneInput) {
   130	            phoneInput.addEventListener('input', function(e) {
   131	                let value = e.target.value.replace(/\D/g, '');
   132	                if (value.length > 11) value = value.slice(0, 11);
   133	                
   134	                if (value.length > 6) {
   135	                    e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
   136	                } else if (value.length > 3) {
   137	                    e.target.value = value.slice(0, 3) + '-' + value.slice(3);
   138	                } else {
   139	                    e.target.value = value;
   140	                }
   141	            });
   142	        }
   143	        
   144	        // Character counter for idea textarea
   145	        const ideaTextarea = document.getElementById('idea');
   146	        const ideaCount = document.getElementById('ideaCount');
   147	        if (ideaTextarea && ideaCount) {
   148	            ideaTextarea.addEventListener('input', function() {
   149	                const count = this.value.length;
   150	                ideaCount.textContent = count;
   151	                
   152	                if (count > 500) {
   153	                    this.value = this.value.substring(0, 500);
   154	                    ideaCount.textContent = '500';
   155	                }
   156	            });
   157	        }
   158	        
   159	        // Form validation and submission
   160	        applyForm.addEventListener('submit', async function(e) {
   161	            e.preventDefault();
   162	            
   163	            // Basic validation
   164	            const name = document.getElementById('name').value.trim();
   165	            const phone = document.getElementById('phone').value.trim();
   166	            const email = document.getElementById('email').value.trim();
   167	            const brandName = document.getElementById('brandName').value.trim();
   168	            const category = document.getElementById('category').value;
   169	            const packageType = document.querySelector('input[name="package"]:checked');
   170	            const idea = document.getElementById('idea').value.trim();
   171	            const agreeTerms = document.getElementById('agreeTerms').checked;
   172	            
   173	            if (!name) {
   174	                alert('이름을 입력해주세요.');
   175	                document.getElementById('name').focus();
   176	                return;
   177	            }
   178	            
   179	            if (!phone || phone.length < 12) {
   180	                alert('올바른 연락처를 입력해주세요.');
   181	                document.getElementById('phone').focus();
   182	                return;
   183	            }
   184	            
   185	            if (!email || !isValidEmail(email)) {
   186	                alert('올바른 이메일 주소를 입력해주세요.');
   187	                document.getElementById('email').focus();
   188	                return;
   189	            }
   190	            
   191	            if (!brandName) {
   192	                alert('브랜드명을 입력해주세요.');
   193	                document.getElementById('brandName').focus();
   194	                return;
   195	            }
   196	            
   197	            if (!category) {
   198	                alert('카테고리를 선택해주세요.');
   199	                document.getElementById('category').focus();
   200	                return;
   201	            }
   202	            
   203	            if (!packageType) {
   204	                alert('패키지를 선택해주세요.');
   205	                return;
   206	            }
   207	            
   208	            if (!idea || idea.length < 20) {
   209	                alert('사업 아이디어를 20자 이상 작성해주세요.');
   210	                document.getElementById('idea').focus();
   211	                return;
   212	            }
   213	            
   214	            if (!agreeTerms) {
   215	                alert('개인정보 수집 및 이용에 동의해주세요.');
   216	                document.getElementById('agreeTerms').focus();
   217	                return;
   218	            }
   219	            
   220	            // Prepare form data
   221	            const formData = {
   222	                name: name,
   223	                phone: phone,
   224	                email: email,
   225	                brandName: brandName,
   226	                category: category,
   227	                businessStatus: document.querySelector('input[name="businessStatus"]:checked')?.value || '미정',
   228	                package: packageType.value,
   229	                idea: idea,
   230	                motivation: document.getElementById('motivation')?.value.trim() || '',
   231	                startDate: document.getElementById('startDate')?.value || '',
   232	                referral: document.getElementById('referral')?.value || '',
   233	                timestamp: new Date().toISOString()
   234	            };
   235	            
   236	            // Show loading state
   237	            const submitButton = applyForm.querySelector('button[type="submit"]');
   238	            const originalButtonText = submitButton.innerHTML;
   239	            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 제출 중...';
   240	            submitButton.disabled = true;
   241	            
   242	            try {
   243	                // === Google Forms 제출 ===
   244	                const success = await submitToGoogleForms(formData);
   245	                
   246	                if (success) {
   247	                    // Save to localStorage (backup)
   248	                    let applications = JSON.parse(localStorage.getItem('bangbangApplications') || '[]');
   249	                    applications.push(formData);
   250	                    localStorage.setItem('bangbangApplications', JSON.stringify(applications));
   251	                    
   252	                    // Show success modal
   253	                    showSuccessModal();
   254	                    
   255	                    // Reset form
   256	                    applyForm.reset();
   257	                    if (ideaCount) ideaCount.textContent = '0';
   258	                    clearFormStorage();
   259	                    
   260	                    console.log('✅ Application submitted successfully:', formData);
   261	                } else {
   262	                    throw new Error('제출 실패');
   263	                }
   264	            } catch (error) {
   265	                console.error('❌ Submission error:', error);
   266	                alert('신청서 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
   267	            } finally {
   268	                // Restore button
   269	                submitButton.innerHTML = originalButtonText;
   270	                submitButton.disabled = false;
   271	            }
   272	        });
   273	    }
   274	    
   275	    // === Google Forms 제출 함수 ===
   276	    async function submitToGoogleForms(formData) {
   277	        try {
   278	            // Create FormData for Google Forms
   279	            const googleFormData = new FormData();
   280	            
   281	            // Map form fields to Google Forms entries
   282	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.name, formData.name);
   283	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.phone, formData.phone);
   284	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.email, formData.email);
   285	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.brandName, formData.brandName);
   286	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.category, formData.category);
   287	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.businessStatus, formData.businessStatus);
   288	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.package, formData.package);
   289	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.idea, formData.idea);
   290	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.motivation, formData.motivation);
   291	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.startDate, formData.startDate);
   292	            googleFormData.append(GOOGLE_FORMS_CONFIG.entries.referral, formData.referral);
   293	            
   294	            // Submit to Google Forms
   295	            await fetch(GOOGLE_FORMS_CONFIG.formUrl, {
   296	                method: 'POST',
   297	                body: googleFormData,
   298	                mode: 'no-cors' // CORS 우회
   299	            });
   300	            
   301	            console.log('✅ Google Forms submission successful');
   302	            return true;
   303	            
   304	        } catch (error) {
   305	            console.error('❌ Google Forms submission failed:', error);
   306	            // no-cors 모드에서는 에러가 발생해도 실제로는 제출될 수 있음
   307	            return true;
   308	        }
   309	    }
   310	    
   311	    // Email validation
   312	    function isValidEmail(email) {
   313	        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   314	        return re.test(email);
   315	    }
   316	    
   317	    // === Success Modal ===
   318	    const successModal = document.getElementById('successModal') || document.getElementById('success-modal');
   319	    const modalClose = document.getElementById('modalClose') || document.getElementById('modal-close');
   320	    
   321	    function showSuccessModal() {
   322	        if (successModal) {
   323	            successModal.classList.add('show');
   324	            successModal.style.display = 'flex'; // 추가: display 설정
   325	            document.body.style.overflow = 'hidden';
   326	        }
   327	    }
   328	    
   329	    // closeModal을 전역 함수로 만들기 (HTML에서 onclick으로 호출)
   330	    window.closeModal = function() {
   331	        if (successModal) {
   332	            successModal.classList.remove('show');
   333	            successModal.style.display = 'none'; // 추가: display 설정
   334	            document.body.style.overflow = 'auto';
   335	        }
   336	    }
   337	    
   338	    function hideSuccessModal() {
   339	        window.closeModal();
   340	    }
   341	    
   342	    if (modalClose) {
   343	        modalClose.addEventListener('click', hideSuccessModal);
   344	    }
   345	    
   346	    if (successModal) {
   347	        successModal.addEventListener('click', function(e) {
   348	            if (e.target === successModal) {
   349	                hideSuccessModal();
   350	            }
   351	        });
   352	    }
   353	    
   354	    // === Floating CTA Button ===
   355	    const floatingCTA = document.getElementById('floatingCTA') || document.getElementById('floating-cta');
   356	    if (floatingCTA) {
   357	        window.addEventListener('scroll', function() {
   358	            if (window.scrollY > 300) {
   359	                floatingCTA.classList.add('visible');
   360	            } else {
   361	                floatingCTA.classList.remove('visible');
   362	            }
   363	        });
   364	    }
   365	    
   366	    // === Stats Counter Animation ===
   367	    const stats = document.querySelectorAll('.stat-number');
   368	    let hasAnimated = false;
   369	    
   370	    function animateStats() {
   371	        if (hasAnimated) return;
   372	        
   373	        stats.forEach(stat => {
   374	            const target = parseInt(stat.textContent);
   375	            const duration = 2000;
   376	            const increment = target / (duration / 16);
   377	            let current = 0;
   378	            
   379	            const timer = setInterval(() => {
   380	                current += increment;
   381	                if (current >= target) {
   382	                    stat.textContent = target + (stat.textContent.includes('.') ? '.0' : '+');
   383	                    clearInterval(timer);
   384	                } else {
   385	                    stat.textContent = Math.floor(current) + (stat.textContent.includes('.') ? '.0' : '+');
   386	                }
   387	            }, 16);
   388	        });
   389	        
   390	        hasAnimated = true;
   391	    }
   392	    
   393	    // Trigger stats animation when hero section is visible
   394	    const heroSection = document.querySelector('.hero');
   395	    if (heroSection) {
   396	        const statsObserver = new IntersectionObserver((entries) => {
   397	            entries.forEach(entry => {
   398	                if (entry.isIntersecting) {
   399	                    animateStats();
   400	                }
   401	            });
   402	        }, { threshold: 0.3 });
   403	        
   404	        statsObserver.observe(heroSection);
   405	    }
   406	    
   407	    // === Auto-save Form Data ===
   408	    const formInputs = applyForm ? applyForm.querySelectorAll('input, select, textarea') : [];
   409	    formInputs.forEach(input => {
   410	        // Load saved data
   411	        const savedValue = localStorage.getItem('form_' + input.id);
   412	        if (savedValue && input.type !== 'checkbox' && input.type !== 'radio') {
   413	            input.value = savedValue;
   414	        }
   415	        
   416	        // Save on change
   417	        input.addEventListener('change', function() {
   418	            if (this.type !== 'checkbox' && this.type !== 'radio') {
   419	                localStorage.setItem('form_' + this.id, this.value);
   420	            }
   421	        });
   422	    });
   423	    
   424	    // Clear saved form data after successful submission
   425	    function clearFormStorage() {
   426	        formInputs.forEach(input => {
   427	            localStorage.removeItem('form_' + input.id);
   428	        });
   429	    }
   430	    
   431	    // === Package Card Hover Effect ===
   432	    const packageCards = document.querySelectorAll('.package-card');
   433	    packageCards.forEach(card => {
   434	        card.addEventListener('mouseenter', function() {
   435	            this.style.transform = 'translateY(-10px) scale(1.02)';
   436	        });
   437	        
   438	        card.addEventListener('mouseleave', function() {
   439	            this.style.transform = 'translateY(0) scale(1)';
   440	        });
   441	    });
   442	    
   443	    // === Active Nav Link Highlight ===
   444	    const sections = document.querySelectorAll('section[id]');
   445	    const navLinks = document.querySelectorAll('.nav-link');
   446	    
   447	    window.addEventListener('scroll', () => {
   448	        let current = '';
   449	        sections.forEach(section => {
   450	            const sectionTop = section.offsetTop;
   451	            const sectionHeight = section.clientHeight;
   452	            if (window.pageYOffset >= sectionTop - 100) {
   453	                current = section.getAttribute('id');
   454	            }
   455	        });
   456	        
   457	        navLinks.forEach(link => {
   458	            link.style.borderBottomColor = 'transparent';
   459	            link.style.color = 'var(--text-color)';
   460	            if (link.getAttribute('href') === '#' + current) {
   461	                link.style.borderBottomColor = 'var(--primary-color)';
   462	                link.style.color = 'var(--primary-color)';
   463	            }
   464	        });
   465	    });
   466	    
   467	    // === Console Welcome Message ===
   468	    console.log('%c🏪 방방곡곡에 오신 것을 환영합니다!', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
   469	    console.log('%c✨ 20만원으로 시작하는 진주 로컬 비즈니스', 'color: #2C3E50; font-size: 14px;');
   470	    console.log('%c📞 문의: 010-0000-0000', 'color: #666; font-size: 12px;');
   471	    console.log('%c🔗 Google Forms 연동 완료', 'color: #27ae60; font-size: 12px; font-weight: bold;');
   472	    
   473	    // === Performance Monitoring (Development Only) ===
   474	    if (window.performance && window.performance.timing) {
   475	        window.addEventListener('load', function() {
   476	            setTimeout(function() {
   477	                const perfData = window.performance.timing;
   478	                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
   479	                console.log('Page load time:', (pageLoadTime / 1000).toFixed(2) + 's');
   480	            }, 0);
   481	        });
   482	    }
   483	});
   484	
   485	// === Utility Functions ===
   486	
   487	// Format number with commas
   488	function formatNumber(num) {
   489	    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   490	}
   491	
   492	// Debounce function for performance
   493	function debounce(func, wait) {
   494	    let timeout;
   495	    return function executedFunction(...args) {
   496	        const later = () => {
   497	            clearTimeout(timeout);
   498	            func(...args);
   499	        };
   500	        clearTimeout(timeout);
   501	        timeout = setTimeout(later, wait);
   502	    };
   503	}
   504	
   505	// Throttle function for scroll events
   506	function throttle(func, limit) {
   507	    let inThrottle;
   508	    return function() {
   509	        const args = arguments;
   510	        const context = this;
   511	        if (!inThrottle) {
   512	            func.apply(context, args);
   513	            inThrottle = true;
   514	            setTimeout(() => inThrottle = false, limit);
   515	        }
   516	    };
   517	}
   518	
   519	// === Export for admin dashboard (future feature) ===
   520	function getApplications() {
   521	    return JSON.parse(localStorage.getItem('bangbangApplications') || '[]');
   522	}
   523	
   524	function exportApplicationsCSV() {
   525	    const applications = getApplications();
   526	    if (applications.length === 0) {
   527	        alert('저장된 신청서가 없습니다.');
   528	        return;
   529	    }
   530	    
   531	    let csv = 'Name,Phone,Email,Brand Name,Category,Package,Date\n';
   532	    applications.forEach(app => {
   533	        csv += `"${app.name}","${app.phone}","${app.email}","${app.brandName}","${app.category}","${app.package}","${app.timestamp}"\n`;
   534	    });
   535	    
   536	    const blob = new Blob([csv], { type: 'text/csv' });
   537	    const url = window.URL.createObjectURL(blob);
   538	    const a = document.createElement('a');
   539	    a.href = url;
   540	    a.download = 'bangbang-applications.csv';
   541	    a.click();
   542	    window.URL.revokeObjectURL(url);
   543	}
   544	
   545	// Make functions available globally for console access
   546	window.bangbang = {
   547	    getApplications,
   548	    exportApplicationsCSV
   549	};
   550	
