document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后隐藏加载器
    const pageLoader = document.getElementById('pageLoader');
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500);
    }, 1000);

    // 确保情书内容在加载时是隐藏的
    const letterContent = document.getElementById('letter-content');
    letterContent.classList.remove('show');



    // 情书模块交互
    const toggleLetterBtn = document.getElementById('toggle-letter');
    // const letterContent = document.getElementById('letter-content'); // 已经在前面定义过

    toggleLetterBtn.addEventListener('click', () => {
        letterContent.classList.toggle('show');
        if (letterContent.classList.contains('show')) {
            toggleLetterBtn.innerHTML = '<i class="fas fa-heart"></i> 收起信';
        } else {
            toggleLetterBtn.innerHTML = '<i class="fas fa-heart"></i> 点我，有话对你说';
        }
    });

    // 照片墙模块
    const TOTAL_IMAGES = 5; // <--- 修改这里的数字，以匹配您放入的照片总数
    const IMAGE_EXTENSION = 'jpg'; // <--- 如果您的图片是png等其他格式，请修改这里
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    const dotsContainer = document.querySelector('.dots-container');

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        // 创建图片
        const slide = document.createElement('div');
        slide.classList.add('slide', 'fade');
        const img = document.createElement('img');
        img.src = `images/${i}.${IMAGE_EXTENSION}`;
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);

        // 创建小圆点
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => currentSlide(i));
        dotsContainer.appendChild(dot);
    }

    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 3000); // 切换时间：3秒
    }

    function currentSlide(n) {
        slideIndex = n - 1;
    }

    // 生日蛋糕模块
    const candlesContainer = document.querySelector('.candles');
    const makeWishBtn = document.getElementById('make-wish');
    const blowCandlesBtn = document.getElementById('blow-candles');
    // 移除未使用的变量

    console.log('蜡烛容器:', candlesContainer);
    console.log('许愿按钮:', makeWishBtn);
    console.log('吹蜡烛按钮:', blowCandlesBtn);

    // 定义"29"数字形状的蜡烛位置 (相对于蜡烛容器的百分比位置)
    // 在标题和蛋糕之间布置清晰的"29"字样，总共29个蜡烛
    const candlePositions = [
        // 数字 "2" 的蜡烛位置 (左侧) - 14个蜡烛
        { x: 10, y: 10 }, { x: 18, y: 10 }, { x: 26, y: 10 }, { x: 34, y: 10 }, // 顶部横线 (4个)
        { x: 34, y: 20 }, { x: 34, y: 30 }, { x: 34, y: 40 }, // 右上竖线 (3个)
        { x: 26, y: 50 }, { x: 18, y: 50 }, { x: 10, y: 50 }, // 中间横线 (3个)
        { x: 10, y: 60 }, { x: 10, y: 70 }, // 左下竖线 (2个)
        { x: 10, y: 80 }, { x: 18, y: 80 }, { x: 26, y: 80 }, { x: 34, y: 80 }, // 底部横线 (4个)

        // 数字 "9" 的蜡烛位置 (右侧) - 15个蜡烛
        { x: 55, y: 10 }, { x: 63, y: 10 }, { x: 71, y: 10 }, { x: 79, y: 10 }, // 顶部横线 (4个)
        { x: 55, y: 20 }, { x: 55, y: 30 }, { x: 55, y: 40 }, // 左上竖线 (3个)
        { x: 79, y: 20 }, { x: 79, y: 30 }, { x: 79, y: 40 }, // 右上竖线 (3个)
        { x: 63, y: 50 }, { x: 71, y: 50 }, // 中间横线 (2个)
        { x: 79, y: 60 }, { x: 79, y: 70 }, { x: 79, y: 80 }, // 右下竖线 (3个)
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
            alert('🌟 请闭上眼睛，诚心许下你的生日愿望... 🌟');
        });
    } else {
        console.error('许愿按钮未找到');
    }

    // 吹蜡烛按钮
    if (blowCandlesBtn) {
        blowCandlesBtn.addEventListener('click', () => {
            const flames = document.querySelectorAll('.flame');
            console.log('找到火焰数量:', flames.length);
            flames.forEach(flame => {
                flame.classList.add('out');
            });

            // 添加一些庆祝效果
            setTimeout(() => {
                alert('🎉 祝你愿望成真，生日快乐！ 🎂');
            }, 500);
        });
    } else {
        console.error('吹蜡烛按钮未找到');
    }

    // 音乐控制功能
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    if (bgMusic && musicToggle) {
        // 设置音量
        bgMusic.volume = 0.3;

        // 音乐控制按钮点击事件
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.classList.add('paused');
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                isPlaying = false;
            } else {
                // 尝试播放音乐
                bgMusic.play().then(() => {
                    musicToggle.classList.remove('paused');
                    musicToggle.classList.add('playing');
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    isPlaying = true;
                }).catch(error => {
                    console.log('音乐播放失败:', error);
                    // 如果自动播放失败，显示提示
                    musicToggle.innerHTML = '<i class="fas fa-play"></i>';
                });
            }
        });

        // 音乐结束时重置按钮状态
        bgMusic.addEventListener('ended', function() {
            musicToggle.classList.remove('playing');
            musicToggle.classList.add('paused');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            isPlaying = false;
        });

        // 尝试自动播放（可能会被浏览器阻止）
        setTimeout(() => {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }).catch(error => {
                console.log('自动播放被阻止，用户需要手动点击播放');
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            });
        }, 1000);
    }

    // 动态粒子效果
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts';
        heartsContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(heartsContainer);

        function createHeart() {
            const heart = document.createElement('div');
            heart.innerHTML = Math.random() > 0.5 ? '💖' : '💕';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: 0.7;
                animation: floatUp ${Math.random() * 3 + 4}s linear forwards;
                pointer-events: none;
            `;
            heartsContainer.appendChild(heart);

            // 移除心形元素
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 7000);
        }

        // 定期创建心形
        setInterval(createHeart, 2000);
    }

    // 添加浮动心形的CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 启动浮动心形效果
    createFloatingHearts();

    // 鼠标跟随光标效果
    function createCursorTrail() {
        let mouseX = 0, mouseY = 0;
        const trail = [];
        const trailLength = 10;

        // 创建光标轨迹元素
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, rgba(255, 107, 157, 0.8), rgba(240, 147, 251, 0.4));
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
                opacity: ${1 - i * 0.1};
                transform: scale(${1 - i * 0.1});
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        // 更新鼠标位置
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // 动画循环
        function animateTrail() {
            let x = mouseX, y = mouseY;

            trail.forEach((dot, index) => {
                const nextDot = trail[index + 1] || trail[0];
                dot.style.left = x - 4 + 'px';
                dot.style.top = y - 4 + 'px';

                if (nextDot) {
                    x += (parseFloat(nextDot.style.left) - x) * 0.3;
                    y += (parseFloat(nextDot.style.top) - y) * 0.3;
                }
            });

            requestAnimationFrame(animateTrail);
        }

        animateTrail();
    }

    // 启动光标轨迹效果（仅在桌面端）
    if (window.innerWidth > 768) {
        createCursorTrail();
    }
});