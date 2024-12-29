Page({
  data: {
    countdownText: '',
    showWishes: false,
    wishes: [
      '前程似锦 龙腾虎跃',
      '事业腾飞 步步高升',
      '健康喜乐 幸福安康',
      '梦想成真 万事胜意',
      '生活甜蜜 笑口常开'
    ],
    hearts: [],
    fireworks: [],
    heartId: 0,
    fireworkId: 0
  },

  onLoad() {
    this.updateCountdown();
    this.countdownTimer = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  },

  updateCountdown() {
    const now = new Date();
    const newYear = new Date('2025-01-01T00:00:00');
    const diff = newYear - now;

    if (diff < 0) {
      this.setData({
        countdownText: '新年快乐！'
      });
      this.showNewYearWishes();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.setData({
      countdownText: `距离2025年还有：${days}天 ${hours}时 ${minutes}分 ${seconds}秒`
    });
  },

  showNewYearWishes() {
    this.setData({ showWishes: true });
    clearInterval(this.countdownTimer);
    
    // 开始创建特效
    this.heartTimer = setInterval(() => {
      this.createHeart();
    }, 300);

    this.fireworkTimer = setInterval(() => {
      this.createFirework();
    }, 500);
  },

  createHeart() {
    const systemInfo = wx.getSystemInfoSync();
    const heart = {
      id: this.data.heartId++,
      x: Math.random() * systemInfo.windowWidth,
      y: systemInfo.windowHeight,
      duration: Math.random() * 3 + 2
    };

    this.setData({
      hearts: [...this.data.hearts, heart]
    });

    setTimeout(() => {
      const hearts = this.data.hearts.filter(h => h.id !== heart.id);
      this.setData({ hearts });
    }, 4000);
  },

  createFirework() {
    const systemInfo = wx.getSystemInfoSync();
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const firework = {
      id: this.data.fireworkId++,
      x: Math.random() * systemInfo.windowWidth,
      y: Math.random() * systemInfo.windowHeight,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    this.setData({
      fireworks: [...this.data.fireworks, firework]
    });

    setTimeout(() => {
      const fireworks = this.data.fireworks.filter(f => f.id !== firework.id);
      this.setData({ fireworks });
    }, 1000);
  },

  onUnload() {
    clearInterval(this.countdownTimer);
    clearInterval(this.heartTimer);
    clearInterval(this.fireworkTimer);
  }
}); 