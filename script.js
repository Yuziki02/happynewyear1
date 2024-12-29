function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function updateCountdown() {
    const now = new Date();
    const newYear = new Date('2025-01-01T00:00:00');
    const diff = newYear - now;

    if (diff < 0) {
        document.getElementById('timer').textContent = '新年快乐！';
        showNewYearWishes();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('timer').textContent = 
        `距离2025年还有：${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
}

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // 随机位置
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // 随机颜色
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.backgroundColor = color;
    
    document.getElementById('fireworks-container').appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

function showNewYearWishes() {
    document.getElementById('countdown').style.display = 'none';
    const wishes = document.getElementById('wishes');
    wishes.classList.remove('hidden');
    wishes.classList.add('show');
    
    const spans = wishes.querySelectorAll('.wish-text span');
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.style.animationDelay = `${index * 0.5}s`;
        }, index * 500);
    });

    setInterval(createHeart, 300);
    setInterval(createFirework, 500);
}

setInterval(updateCountdown, 1000);

// 取消注释下面这行代码
// setTimeout(showNewYearWishes, 2000); 

// 添加鼠标移动特效
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) { // 10%的概率生成心形
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        document.getElementById('hearts-container').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}); 