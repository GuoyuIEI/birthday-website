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
    const candlesContainer = document.querySelector('.candles');
    const makeWishBtn = document.getElementById('make-wish');
    const blowCandlesBtn = document.getElementById('blow-candles');

    console.log('蜡烛容器:', candlesContainer);
    console.log('许愿按钮:', makeWishBtn);
    console.log('吹蜡烛按钮:', blowCandlesBtn);

    // 定义"29"数字形状的蜡烛位置 (相对于蜡烛容器的百分比位置)
    // 移动端优化版本，适配较小的屏幕
    const candlePositions = [
        // 数字 "2" 的蜡烛位置 (左侧) - 14个蜡烛
        { x: 10, y: 15 }, { x: 18, y: 15 }, { x: 26, y: 15 }, { x: 34, y: 15 }, // 顶部横线 (4个)
        { x: 34, y: 25 }, { x: 34, y: 35 }, { x: 34, y: 45 }, // 右上竖线 (3个)
        { x: 26, y: 55 }, { x: 18, y: 55 }, { x: 10, y: 55 }, // 中间横线 (3个)
        { x: 10, y: 65 }, { x: 10, y: 75 }, // 左下竖线 (2个)
        { x: 10, y: 85 }, { x: 18, y: 85 }, { x: 26, y: 85 }, { x: 34, y: 85 }, // 底部横线 (4个)

        // 数字 "9" 的蜡烛位置 (右侧) - 15个蜡烛
        { x: 55, y: 15 }, { x: 63, y: 15 }, { x: 71, y: 15 }, { x: 79, y: 15 }, // 顶部横线 (4个)
        { x: 55, y: 25 }, { x: 55, y: 35 }, { x: 55, y: 45 }, // 左上竖线 (3个)
        { x: 79, y: 25 }, { x: 79, y: 35 }, { x: 79, y: 45 }, // 右上竖线 (3个)
        { x: 63, y: 55 }, { x: 71, y: 55 }, // 中间横线 (2个)
        { x: 79, y: 65 }, { x: 79, y: 75 }, { x: 79, y: 85 }, // 右下竖线 (3个)
    ];

    // 动态生成蜡烛
    if (candlesContainer) {
        candlePositions.forEach((pos) => {
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.style.left = `${pos.x}%`;
            candle.style.top = `${pos.y}%`;

            const flame = document.createElement('div');
            flame.className = 'flame';
            candle.appendChild(flame);

            candlesContainer.appendChild(candle);
        });
        console.log('已生成', candlePositions.length, '根蜡烛，排列成"29"形状');
    } else {
        console.error('蜡烛容器未找到');
    }

    // 许愿按钮
    if (makeWishBtn) {
        makeWishBtn.addEventListener('click', () => {
            console.log('许愿按钮被点击');
            alert('🌟 愿你的每一个愿望都能实现！生日快乐，我的宝贝！💕');
            makeWishBtn.innerHTML = '✨ 愿望已许';
            setTimeout(() => {
                makeWishBtn.innerHTML = '⭐ 许愿';
            }, 3000);
        });
    }

    // 吹蜡烛按钮
    if (blowCandlesBtn) {
        blowCandlesBtn.addEventListener('click', () => {
            const flames = document.querySelectorAll('.flame');
            console.log('找到火焰数量:', flames.length);
            flames.forEach(flame => {
                flame.classList.add('out');
            });

            blowCandlesBtn.innerHTML = '🎉 蜡烛熄灭';

            // 添加一些庆祝效果
            setTimeout(() => {
                alert('🎉 生日快乐！愿你永远年轻美丽，幸福快乐！💖');
                blowCandlesBtn.innerHTML = '💨 吹蜡烛';
            }, 1000);
        });
    }

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
