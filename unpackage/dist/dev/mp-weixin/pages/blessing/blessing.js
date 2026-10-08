"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      inputMessage: "",
      blessingsList: [
        {
          name: "好友小王",
          time: "2024-01-01 10:00",
          content: "祝福你们百年好合，永结同心！💕"
        },
        {
          name: "闺蜜小李",
          time: "2024-01-01 11:00",
          content: "愿你们携手共度每一个春夏秋冬，永远幸福！"
        }
      ]
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "祝福留言"
    });
    this.loadBlessings();
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
  methods: {
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
        common_vendor.index.__f__("error", "at pages/blessing/blessing.vue:86", "加载祝福失败", e);
        this.blessingsList = [];
      }
    },
    saveBlessings() {
      try {
        const listToSave = this.blessingsList.slice(0, 100);
        const dataStr = JSON.stringify(listToSave);
        common_vendor.index.setStorageSync("blessingsList", dataStr);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/blessing/blessing.vue:99", "保存祝福失败", e);
        try {
          common_vendor.index.removeStorageSync("blessingsList");
          if (this.blessingsList.length > 50) {
            this.blessingsList = this.blessingsList.slice(0, 50);
            const dataStr = JSON.stringify(this.blessingsList);
            common_vendor.index.setStorageSync("blessingsList", dataStr);
          }
        } catch (e2) {
          common_vendor.index.__f__("error", "at pages/blessing/blessing.vue:109", "清理存储失败", e2);
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.inputMessage,
    b: common_vendor.o(($event) => $data.inputMessage = $event.detail.value, "26"),
    c: common_vendor.t($data.inputMessage.length),
    d: common_vendor.o((...args) => $options.submitBlessing && $options.submitBlessing(...args), "38"),
    e: common_vendor.f($data.blessingsList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.t(item.content),
        d: index
      };
    }),
    f: $data.blessingsList.length === 0
  }, $data.blessingsList.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-75a99a67"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/blessing/blessing.js.map
