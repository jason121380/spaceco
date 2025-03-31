document.addEventListener('DOMContentLoaded', function() {
    // ===== 页面设置 =====
    // 设置当前年份
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // ===== 头部导航控制 =====
    const header = document.getElementById('header');
    const scrollThreshold = 50; // 更低的滚动阈值，更快地改变头部样式
    const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // 创建菜单遮罩层
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);

    // 滚动时改变头部样式 - WeWork风格的过渡
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // 初始化头部状态
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // 移动端菜单切换 - WeWork风格动画
    if (mobileMenuToggle && mainNav) {
        // 打开/关闭菜单函数
        function toggleMenu() {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        mobileMenuToggle.addEventListener('click', toggleMenu);
        
        // 点击遮罩层关闭菜单
        menuOverlay.addEventListener('click', toggleMenu);

        // 点击导航链接后关闭菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        mobileMenuToggle.classList.remove('active');
                        mainNav.classList.remove('active');
                        menuOverlay.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }, 100);
                }
            });
        });
    }

    // ===== 滚动相关功能 =====
    // WeWork风格的平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 使用更加平滑的滚动效果
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
                const headerOffset = 70;
                const finalPosition = offsetTop - headerOffset;

                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 回到顶部按钮 - WeWork风格显示
    const scrollTopButton = document.querySelector('.scroll-top');

    function toggleScrollTopButton() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 300) {  // 更低的阈值，更早显示按钮
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }

    // 初始化回到顶部按钮状态
    toggleScrollTopButton();
    window.addEventListener('scroll', toggleScrollTopButton);
    
    // 新增: 回到頂部按鈕點擊事件
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== 元素动画 =====
    // WeWork风格的淡入效果
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        animateElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            // 元素进入视窗
            if (elementTop < triggerBottom) {
                // 依次显示元素，创建瀑布效果
                setTimeout(() => {
                    element.classList.add('show');
                }, index * 50);  // 每个元素延迟50ms显示
            }
        });
    }

    // 检查初始元素位置
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);

    // ===== 特性项动画 =====
    // 特性项交互 - WeWork风格悬浮效果
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            this.style.transform = '';
        });
    });

    // ===== 图片画廊 =====
    // 简单图片查看器 - WeWork风格的过渡效果
    const spaceImages = document.querySelectorAll('.space-image img');
    let currentImageIndex = 0;
    let galleryOpen = false;

    // 创建WeWork风格的图片查看器
    const createImageViewer = () => {
        const viewer = document.createElement('div');
        viewer.classList.add('image-viewer');
        viewer.innerHTML = `
            <div class="viewer-overlay"></div>
            <div class="viewer-container">
                <button class="viewer-close">×</button>
                <div class="viewer-content">
                    <img src="" alt="預覽圖片">
                </div>
                <div class="viewer-controls">
                    <button class="viewer-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <button class="viewer-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(viewer);

        return {
            element: viewer,
            overlay: viewer.querySelector('.viewer-overlay'),
            closeBtn: viewer.querySelector('.viewer-close'),
            image: viewer.querySelector('.viewer-content img'),
            prevBtn: viewer.querySelector('.viewer-prev'),
            nextBtn: viewer.querySelector('.viewer-next')
        };
    };

    // 如果有空间图片，初始化图片查看器
    if (spaceImages.length > 0) {
        const viewer = createImageViewer();

        // 設置所有圖片可點擊，但排除有 venue-photos-badge 的圖片
        spaceImages.forEach((img, index) => {
            // 檢查父元素是否包含 venue-photos-badge
            const hasPhotoBadge = img.parentElement.querySelector('.venue-photos-badge');
            if (!hasPhotoBadge) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    currentImageIndex = index;
                    openImageViewer(viewer, this.src);
                });
            }
        });

        // 關閉查看器事件
        viewer.closeBtn.addEventListener('click', () => closeImageViewer(viewer));
        viewer.overlay.addEventListener('click', () => closeImageViewer(viewer));

        // 上一张/下一张导航 - WeWork风格过渡
        viewer.prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + spaceImages.length) % spaceImages.length;
            viewer.image.style.opacity = 0;
            
            setTimeout(() => {
                viewer.image.src = spaceImages[currentImageIndex].src;
                viewer.image.style.opacity = 1;
            }, 200);
        });

        viewer.nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % spaceImages.length;
            viewer.image.style.opacity = 0;
            
            setTimeout(() => {
                viewer.image.src = spaceImages[currentImageIndex].src;
                viewer.image.style.opacity = 1;
            }, 200);
        });

        // 键盘导航
        document.addEventListener('keydown', function(e) {
            if (!galleryOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeImageViewer(viewer);
                    break;
                case 'ArrowLeft':
                    viewer.prevBtn.click();
                    break;
                case 'ArrowRight':
                    viewer.nextBtn.click();
                    break;
            }
        });
    }

    // 打开图片查看器
    function openImageViewer(viewer, imgSrc) {
        viewer.image.src = imgSrc;
        viewer.element.classList.add('active');
        document.body.style.overflow = 'hidden';
        galleryOpen = true;
    }

    // 关闭图片查看器
    function closeImageViewer(viewer) {
        viewer.element.classList.remove('active');
        document.body.style.overflow = '';
        galleryOpen = false;
    }

    // ===== 場地照片集功能 =====
    // 場地照片集配置
    const venueGalleryConfig = {
        multi: {
            title: '多功能展演廳',
            photos: [
                'images/compressed/multi/Main.jpg',
                'images/compressed/multi/1.jpg',
                'images/compressed/multi/2.jpg',
                'images/compressed/multi/3.jpg',
                'images/compressed/multi/4.jpg',
                'images/compressed/multi/5.jpg',
                'images/compressed/multi/6.jpg'
            ]
        },
        large: {
            title: '大會議室',
            photos: [
                'images/compressed/big/main.jpg',
                'images/compressed/big/1.jpg',
                'images/compressed/big/2.jpg',
                'images/compressed/big/3.jpg',
                'images/compressed/big/4.jpg'
            ]
        },
        small: {
            title: '小會議室',
            photos: [
                'images/compressed/small/main.jpg',
                'images/compressed/small/1.jpg'
            ]
        },
        studio: {
            title: '拍攝空間',
            photos: [
                'images/compressed/film/main.jpg',
                'images/compressed/film/1.jpg',
                'images/compressed/film/2.jpg',
                'images/compressed/film/3.jpg',
                'images/compressed/film/4.jpg',
                'images/compressed/film/5.jpg'
            ]
        }
    };

    // 初始化照片集
    let currentGalleryType = null;
    let currentPhotoIndex = 0;

    // 點擊照片徽章時打開照片集
    document.querySelectorAll('.venue-photos-badge').forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const spaceType = this.getAttribute('data-space');
            openGallery(spaceType);
        });
    });

    // 點擊場地照片時也打開照片集
    document.querySelectorAll('.space-image').forEach(container => {
        const img = container.querySelector('img');
        const badge = container.querySelector('.venue-photos-badge');
        
        if (img && badge) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const spaceType = badge.getAttribute('data-space');
                openGallery(spaceType);
            });
        }
    });

    // 打開照片集
    function openGallery(spaceType) {
        currentGalleryType = spaceType;
        currentPhotoIndex = 0;
        const config = venueGalleryConfig[spaceType];
        
        document.getElementById('galleryTitle').textContent = config.title;
        document.getElementById('currentIndex').textContent = '1';
        document.getElementById('totalImages').textContent = config.photos.length;
        
        const gallery = document.getElementById('venueGallery');
        gallery.innerHTML = `<img src="${config.photos[0]}" alt="${config.title}照片">`;
        
        // 生成縮圖
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        thumbnailsContainer.innerHTML = config.photos.map((photo, index) => `
            <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${photo}" alt="${config.title}照片 ${index + 1}">
            </div>
        `).join('');

        // 添加縮圖點擊事件
        thumbnailsContainer.querySelectorAll('.gallery-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                currentPhotoIndex = index;
                updateGallery();
            });
        });
        
        document.getElementById('venueGalleryModal').classList.add('active');

        // 添加左右箭頭點擊事件
        document.querySelector('.gallery-prev').onclick = () => {
            if (!currentGalleryType) return;
            const config = venueGalleryConfig[currentGalleryType];
            currentPhotoIndex = (currentPhotoIndex - 1 + config.photos.length) % config.photos.length;
            updateGallery();
        };

        document.querySelector('.gallery-next').onclick = () => {
            if (!currentGalleryType) return;
            const config = venueGalleryConfig[currentGalleryType];
            currentPhotoIndex = (currentPhotoIndex + 1) % config.photos.length;
            updateGallery();
        };

        // 添加鍵盤事件
        document.addEventListener('keydown', function(e) {
            if (!document.getElementById('venueGalleryModal').classList.contains('active')) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    document.querySelector('.gallery-prev').click();
                    break;
                case 'ArrowRight':
                    document.querySelector('.gallery-next').click();
                    break;
                case 'Escape':
                    document.getElementById('venueGalleryModal').classList.remove('active');
                    break;
            }
        });
    }

    // 更新照片集顯示
    function updateGallery() {
        const config = venueGalleryConfig[currentGalleryType];
        const gallery = document.getElementById('venueGallery');
        gallery.innerHTML = `<img src="${config.photos[currentPhotoIndex]}" alt="${config.title}照片">`;
        
        document.getElementById('currentIndex').textContent = (currentPhotoIndex + 1).toString();
        document.getElementById('totalImages').textContent = config.photos.length;

        // 更新縮圖狀態
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, index) => {
            if (index === currentPhotoIndex) {
                thumb.classList.add('active');
                // 確保當前縮圖可見
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // 關閉照片集
    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('venueGalleryModal').classList.remove('active');
    });

    document.querySelector('.modal-overlay').addEventListener('click', () => {
        document.getElementById('venueGalleryModal').classList.remove('active');
    });

    // 为卡片添加WeWork风格悬停效果
    const cards = document.querySelectorAll('.space-item, .location-card, .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== 响应式检测 =====
    // 窗口大小变化时检查
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // 添加图片懒加载
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px'
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imgObserver.unobserve(img);
                }
            });
        }, imgOptions);
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }

    // ===== FAQ 展開/折疊功能 =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // 關閉其他已打開的FAQ項目
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切換當前項目的狀態
            item.classList.toggle('active');
        });
    });

    // 直接显示所有动画元素
    document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
        element.classList.add('show');
    });
});

// 在CSS中添加配套样式:
// .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: all 1s ease; }
// .animate-on-scroll.show { opacity: 1; transform: translateY(0); }
// .image-viewer { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
// .image-viewer.active { opacity: 1; visibility: visible; }
// .viewer-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.9); }
// .viewer-container { position: relative; max-width: 90%; max-height: 90%; }
// .viewer-close { position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 32px; cursor: pointer; }
// .viewer-content img { max-width: 100%; max-height: 80vh; display: block; }
// .viewer-controls { position: absolute; bottom: -50px; left: 0; width: 100%; display: flex; justify-content: center; gap: 20px; }
// .viewer-prev, .viewer-next { background: none; border: none; color: white; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center; }
