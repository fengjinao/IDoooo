"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      groomName: "冯金傲",
      brideName: "冯金傲",
      weddingDate: "2025年12月31日",
      targetDate: (/* @__PURE__ */ new Date("2025-12-31 18:00:00")).getTime(),
      countdown: [
        { value: "00", label: "天" },
        { value: "00", label: "时" },
        { value: "00", label: "分" },
        { value: "00", label: "秒" }
      ],
      scrollTop: 0,
      isAutoScrolling: false,
      autoScrollEnabled: true,
      autoScrollTimer: null,
      currentSection: 0,
      sectionHeights: [],
      // 新人介绍数据
      groomInfo: {
        name: "新郎姓名",
        description: "他是一位温暖善良的人，对生活充满热情，对未来充满期待。"
      },
      brideInfo: {
        name: "新娘姓名",
        description: "她是一位优雅美丽的女孩，温柔体贴，热爱生活中的每一份美好。"
      },
      meetStory: "我们在最美的年华相遇，彼此心动，从此携手共度余生。",
      // 相册数据
      galleryList: [
        { emoji: "💕", desc: "初次相遇" },
        { emoji: "💑", image: "/static/1.png", desc: "第一次约会" },
        { emoji: "🌹", desc: "浪漫时光" },
        { emoji: "💍", desc: "求婚时刻" },
        { emoji: "📸", desc: "婚纱照" },
        { emoji: "🎉", desc: "订婚宴" },
        { emoji: "💐", desc: "准备婚礼" },
        { emoji: "👰", desc: "试婚纱" },
        { emoji: "🤵", desc: "试礼服" },
        { emoji: "🎊", desc: "婚礼彩排" },
        { emoji: "💒", desc: "婚礼场地" },
        { emoji: "🎂", desc: "甜蜜回忆" },
        { emoji: "🌺", desc: "花前月下" },
        { emoji: "🍷", desc: "浪漫晚餐" },
        { emoji: "🎁", desc: "互赠礼物" },
        { emoji: "🌅", desc: "海边日出" },
        { emoji: "🎈", desc: "生日惊喜" },
        { emoji: "🌸", desc: "樱花季节" },
        { emoji: "❄️", desc: "雪中漫步" },
        { emoji: "🌙", desc: "月下誓言" }
      ],
      waterfallColumns: [[], []],
      // 婚礼流程数据
      scheduleList: [
        { time: "08:00", title: "化妆准备", description: "新娘化妆，新郎准备", location: "酒店房间" },
        { time: "10:00", title: "迎亲仪式", description: "新郎接亲，传统仪式", location: "新娘家" },
        { time: "12:00", title: "午宴时间", description: "与家人共进午餐", location: "酒店餐厅" },
        { time: "15:00", title: "外景拍摄", description: "婚纱照拍摄", location: "酒店花园" },
        { time: "18:00", title: "婚礼仪式", description: "交换戒指，宣誓", location: "酒店宴会厅" },
        { time: "19:00", title: "晚宴开始", description: "与亲友共享晚宴", location: "酒店宴会厅" },
        { time: "21:00", title: "送别亲友", description: "感谢各位来宾", location: "酒店大厅" }
      ],
      // 祝福留言数据
      inputMessage: "",
      blessingsList: [
        { name: "好友小王", time: "2024-01-01 10:00", content: "祝福你们百年好合，永结同心！💕" },
        { name: "闺蜜小李", time: "2024-01-01 11:00", content: "愿你们携手共度每一个春夏秋冬，永远幸福！" }
      ]
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "我们的婚礼"
    });
    this.startCountdown();
    this.initWaterfall();
    this.loadBlessings();
    setTimeout(() => {
      this.startAutoScroll();
    }, 3e3);
  },
  onHide() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
      this.isAutoScrolling = false;
    }
  },
  onShow() {
    if (!this.timer) {
      this.startCountdown();
    }
  },
  onShareAppMessage() {
    return {
      title: "我们的婚礼，诚邀您见证幸福时刻",
      path: "/pages/index/index",
      imageUrl: "/static/1.png"
    };
  },
  onShareTimeline() {
    return {
      title: "我们的婚礼，诚邀您见证幸福时刻",
      imageUrl: "/static/1.png"
    };
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.autoScrollTimer) {
      clearInterval(this.autoScrollTimer);
      this.autoScrollTimer = null;
    }
  },
  methods: {
    startCountdown() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.updateCountdown();
      this.timer = setInterval(() => {
        this.updateCountdown();
      }, 1e3);
    },
    updateCountdown() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const distance = this.targetDate - now;
      if (distance > 0) {
        const days = Math.floor(distance / (1e3 * 60 * 60 * 24));
        const hours = Math.floor(distance % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        const minutes = Math.floor(distance % (1e3 * 60 * 60) / (1e3 * 60));
        const seconds = Math.floor(distance % (1e3 * 60) / 1e3);
        this.countdown = [
          { value: this.formatNumber(days), label: "天" },
          { value: this.formatNumber(hours), label: "时" },
          { value: this.formatNumber(minutes), label: "分" },
          { value: this.formatNumber(seconds), label: "秒" }
        ];
      } else {
        this.countdown = [
          { value: "00", label: "天" },
          { value: "00", label: "时" },
          { value: "00", label: "分" },
          { value: "00", label: "秒" }
        ];
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    },
    formatNumber(num) {
      return num < 10 ? "0" + num : num.toString();
    },
    initWaterfall() {
      const processedList = this.galleryList.map((item, index) => {
        const imageHeight = Math.floor(Math.random() * (450 - 280 + 1)) + 280;
        const totalHeight = imageHeight + (item.desc ? 80 : 0);
        return {
          ...item,
          id: index,
          imageHeight,
          height: totalHeight
        };
      });
      const columnHeights = [0, 0];
      this.waterfallColumns = [[], []];
      processedList.forEach((item) => {
        const targetColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
        this.waterfallColumns[targetColumn].push(item);
        columnHeights[targetColumn] += item.height;
      });
    },
    previewImage(id) {
      common_vendor.index.showToast({
        title: "点击了第" + (id + 1) + "张照片",
        icon: "none"
      });
    },
    loadBlessings() {
      try {
        const savedStr = common_vendor.index.getStorageSync("blessingsList");
        if (savedStr) {
          const saved = typeof savedStr === "string" ? JSON.parse(savedStr) : savedStr;
          if (Array.isArray(saved)) {
            this.blessingsList = saved.slice(0, 100);
          }
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:391", "加载祝福失败", e);
        this.blessingsList = [];
      }
    },
    saveBlessings() {
      try {
        const listToSave = this.blessingsList.slice(0, 100);
        const dataStr = JSON.stringify(listToSave);
        common_vendor.index.setStorageSync("blessingsList", dataStr);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:404", "保存祝福失败", e);
        try {
          common_vendor.index.removeStorageSync("blessingsList");
          if (this.blessingsList.length > 50) {
            this.blessingsList = this.blessingsList.slice(0, 50);
            const dataStr = JSON.stringify(this.blessingsList);
            common_vendor.index.setStorageSync("blessingsList", dataStr);
          }
        } catch (e2) {
          common_vendor.index.__f__("error", "at pages/index/index.vue:414", "清理存储失败", e2);
        }
      }
    },
    submitBlessing() {
      if (!this.inputMessage.trim()) {
        common_vendor.index.showToast({
          title: "请输入祝福内容",
          icon: "none"
        });
        return;
      }
      const now = /* @__PURE__ */ new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const newBlessing = {
        name: "匿名",
        time: timeStr,
        content: this.inputMessage.trim()
      };
      this.blessingsList.unshift(newBlessing);
      if (this.blessingsList.length > 100) {
        this.blessingsList = this.blessingsList.slice(0, 100);
      }
      this.saveBlessings();
      this.inputMessage = "";
      common_vendor.index.showToast({
        title: "祝福已发送",
        icon: "success"
      });
    },
    startAutoScroll() {
      if (this.isAutoScrolling)
        return;
      this.isAutoScrolling = true;
      let accumulatedScroll = 0;
      const scrollSpeed = 3;
      const interval = 50;
      let rpxToPx = 1;
      try {
        const systemInfo = common_vendor.index.getSystemInfoSync();
        rpxToPx = systemInfo.windowWidth / 750;
      } catch (e) {
        common_vendor.index.__f__("log", "at pages/index/index.vue:464", "获取系统信息失败，使用默认比例");
      }
      this.autoScrollTimer = setInterval(() => {
        if (!this.isAutoScrolling)
          return;
        accumulatedScroll += scrollSpeed;
        this.scrollTop = Math.floor(accumulatedScroll * rpxToPx);
      }, interval);
    },
    stopAutoScroll() {
      this.isAutoScrolling = false;
      if (this.autoScrollTimer) {
        clearInterval(this.autoScrollTimer);
        this.autoScrollTimer = null;
      }
    },
    toggleAutoScroll() {
      if (this.isAutoScrolling) {
        this.stopAutoScroll();
      } else {
        this.startAutoScroll();
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.groomName),
    b: common_vendor.t($data.brideName),
    c: common_vendor.f($data.countdown, (item, index, i0) => {
      return {
        a: common_vendor.t(item.value),
        b: common_vendor.t(item.label),
        c: index
      };
    }),
    d: common_vendor.t($data.weddingDate),
    e: common_vendor.t($data.groomInfo.name),
    f: common_vendor.t($data.groomInfo.description),
    g: common_vendor.t($data.meetStory),
    h: common_vendor.t($data.brideInfo.name),
    i: common_vendor.t($data.brideInfo.description),
    j: common_vendor.f($data.waterfallColumns, (column, colIndex, i0) => {
      return {
        a: common_vendor.f(column, (item, index, i1) => {
          return common_vendor.e({
            a: item.image
          }, item.image ? {
            b: item.image
          } : {
            c: common_vendor.t(item.emoji || "📸")
          }, {
            d: item.imageHeight + "rpx",
            e: item.desc
          }, item.desc ? {
            f: common_vendor.t(item.desc)
          } : {}, {
            g: item.id,
            h: item.height + "rpx",
            i: common_vendor.o(($event) => $options.previewImage(item.id), item.id)
          });
        }),
        b: colIndex
      };
    }),
    k: common_vendor.f($data.scheduleList, (item, index, i0) => {
      return common_vendor.e({
        a: index < $data.scheduleList.length - 1
      }, index < $data.scheduleList.length - 1 ? {} : {}, {
        b: common_vendor.t(item.time),
        c: common_vendor.t(item.title),
        d: item.description
      }, item.description ? {
        e: common_vendor.t(item.description)
      } : {}, {
        f: item.location
      }, item.location ? {
        g: common_vendor.t(item.location)
      } : {}, {
        h: index
      });
    }),
    l: $data.inputMessage,
    m: common_vendor.o(($event) => $data.inputMessage = $event.detail.value, "17"),
    n: common_vendor.t($data.inputMessage.length),
    o: common_vendor.o((...args) => $options.submitBlessing && $options.submitBlessing(...args), "1a"),
    p: common_vendor.f($data.blessingsList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.t(item.content),
        d: index
      };
    }),
    q: $data.blessingsList.length === 0
  }, $data.blessingsList.length === 0 ? {} : {}, {
    r: $data.scrollTop,
    s: $data.autoScrollEnabled
  }, $data.autoScrollEnabled ? {
    t: common_vendor.t($data.isAutoScrolling ? "⏸️" : "▶️"),
    v: common_vendor.t($data.isAutoScrolling ? "暂停" : "自动播放"),
    w: common_vendor.o((...args) => $options.toggleAutoScroll && $options.toggleAutoScroll(...args), "5d")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
