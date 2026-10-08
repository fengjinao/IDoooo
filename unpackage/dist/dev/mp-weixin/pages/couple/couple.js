"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      groomInfo: {
        name: "新郎姓名",
        description: "他是一位温暖善良的人，对生活充满热情，对未来充满期待。"
      },
      brideInfo: {
        name: "新娘姓名",
        description: "她是一位优雅美丽的女孩，温柔体贴，热爱生活中的每一份美好。"
      },
      meetStory: "我们在最美的年华相遇，彼此心动，从此携手共度余生。"
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "新人介绍"
    });
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
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.groomInfo.name),
    b: common_vendor.t($data.groomInfo.description),
    c: common_vendor.t($data.meetStory),
    d: common_vendor.t($data.brideInfo.name),
    e: common_vendor.t($data.brideInfo.description)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-125f9e6c"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/couple/couple.js.map
