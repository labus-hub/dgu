// Анимация прогресс-баров при скролле
document.addEventListener('DOMContentLoaded', function() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillProgresses.forEach(progress => {
            const rect = progress.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible && !progress.classList.contains('animated')) {
                const width = progress.getAttribute('data-width');
                progress.style.width = width + '%';
                progress.classList.add('animated');
            }
        });
    }
    
    // Запускаем анимацию при загрузке и скролле
    animateSkills();
    window.addEventListener('scroll', animateSkills);
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню после клика
                closeMobileMenu();
            }
        });
    });

    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    updateThemeIcon();
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon();
    });
    
    function updateThemeIcon() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
    
    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Блокируем прокрутку тела при открытом меню
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Закрытие меню при клике вне области
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками и другими элементами
    document.querySelectorAll('.value-card, .quality-item, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});