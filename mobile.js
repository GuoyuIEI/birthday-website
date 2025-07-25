document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后隐藏加载器
    const pageLoader = document.getElementById('pageLoader');
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500);
    }, 800);

    // 情书模块交互
    const toggleLetterBtn = document.getElementById('toggle-letter');
    const letterContent = document.getElementById('letter-content');

    toggleLetterBtn.addEventListener('click', () => {
        letterContent.classList.toggle('show');
        if (letterContent.classList.contains('show')) {
            toggleLetterBtn.innerHTML = '💖 收起信';
        } else {
            toggleLetterBtn.innerHTML = '💖 点我，有话对你说';
        }
    });

    // 照片墙模块 - 简化版
    const TOTAL_IMAGES = 5;
    const IMAGE_EXTENSION = 'jpg';
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    const dotsContainer = document.querySelector('.dots-container');
    let currentSlideIndex = 0;

    // 创建图片和小圆点
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        // 创建图片
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (i === 1) slide.classList.add('active');
        
        const img = document.createElement('img');
        img.src = `images/${i}.${IMAGE_EXTENSION}`;
        img.alt = `照片 ${i}`;
        img.loading = 'lazy'; // 懒加载
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);

        // 创建小圆点
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 1) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(i - 1));
        dotsContainer.appendChild(dot);
    }

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 显示当前幻灯片
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlideIndex = index;
    }

    // 自动轮播（移动端减慢速度）
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % TOTAL_IMAGES;
        showSlide(currentSlideIndex);
    }, 4000);

    // 生日蛋糕交互
    const makeWishBtn = document.getElementById('make-wish');
    const blowCandlesBtn = document.getElementById('blow-candles');

    makeWishBtn.addEventListener('click', () => {
        alert('🌟 许个愿吧！愿你的每一个愿望都能实现！');
        makeWishBtn.innerHTML = '✨ 愿望已许';
        setTimeout(() => {
            makeWishBtn.innerHTML = '⭐ 许愿';
        }, 3000);
    });

    blowCandlesBtn.addEventListener('click', () => {
        alert('🎂 呼～蜡烛吹灭了！生日快乐！');
        blowCandlesBtn.innerHTML = '🎉 蜡烛熄灭';
        setTimeout(() => {
            blowCandlesBtn.innerHTML = '💨 吹蜡烛';
        }, 3000);
    });

    // 音乐控制 - 简化版
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    if (bgMusic && musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.innerHTML = '🎵';
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggle.innerHTML = '⏸️';
                    isPlaying = true;
                }).catch(error => {
                    console.log('音乐播放失败:', error);
                    musicToggle.innerHTML = '▶️';
                });
            }
        });

        // 音乐结束时重置按钮状态
        bgMusic.addEventListener('ended', function() {
            musicToggle.innerHTML = '🎵';
            isPlaying = false;
        });
    }

    // 触摸优化
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向上滑动 - 下一张图片
                currentSlideIndex = (currentSlideIndex + 1) % TOTAL_IMAGES;
                showSlide(currentSlideIndex);
            } else {
                // 向下滑动 - 上一张图片
                currentSlideIndex = (currentSlideIndex - 1 + TOTAL_IMAGES) % TOTAL_IMAGES;
                showSlide(currentSlideIndex);
            }
        }
    }
});
