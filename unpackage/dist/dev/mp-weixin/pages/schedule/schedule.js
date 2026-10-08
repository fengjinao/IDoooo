"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scheduleList: [
        {
          time: "08:00",
          title: "化妆准备",
          description: "新娘化妆，新郎准备",
          location: "酒店房间"
        },
        {
          time: "10:00",
          title: "迎亲仪式",
          description: "新郎接亲，传统仪式",
          location: "新娘家"
        },
        {
          time: "12:00",
          title: "午宴时间",
          description: "与家人共进午餐",
          location: "酒店餐厅"
        },
        {
          time: "15:00",
          title: "外景拍摄",
          description: "婚纱照拍摄",
          location: "酒店花园"
        },
        {
          time: "18:00",
          title: "婚礼仪式",
          description: "交换戒指，宣誓",
          location: "酒店宴会厅"
        },
        {
          time: "19:00",
          title: "晚宴开始",
          description: "与亲友共享晚宴",
          location: "酒店宴会厅"
        },
        {
          time: "21:00",
          title: "送别亲友",
          description: "感谢各位来宾",
          location: "酒店大厅"
        }
      ]
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "婚礼流程"
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
    a: common_vendor.f($data.scheduleList, (item, index, i0) => {
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
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e6e5e79f"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/schedule/schedule.js.map
