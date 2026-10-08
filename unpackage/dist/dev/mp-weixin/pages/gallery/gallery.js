"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      galleryList: [
        {
          emoji: "💕",
          desc: "初次相遇"
        },
        {
          emoji: "💑",
          image: "/static/1.png",
          desc: "第一次约会"
        },
        {
          emoji: "🌹",
          desc: "浪漫时光"
        },
        {
          emoji: "💍",
          desc: "求婚时刻"
        },
        {
          emoji: "📸",
          desc: "婚纱照"
        },
        {
          emoji: "🎉",
          desc: "订婚宴"
        },
        {
          emoji: "💐",
          desc: "准备婚礼"
        },
        {
          emoji: "👰",
          desc: "试婚纱"
        },
        {
          emoji: "🤵",
          desc: "试礼服"
        },
        {
          emoji: "🎊",
          desc: "婚礼彩排"
        },
        {
          emoji: "💒",
          desc: "婚礼场地"
        },
        {
          emoji: "🎂",
          desc: "甜蜜回忆"
        },
        {
          emoji: "🌺",
          desc: "花前月下"
        },
        {
          emoji: "🍷",
          desc: "浪漫晚餐"
        },
        {
          emoji: "🎁",
          desc: "互赠礼物"
        },
        {
          emoji: "🌅",
          desc: "海边日出"
        },
        {
          emoji: "🎈",
          desc: "生日惊喜"
        },
        {
          emoji: "🌸",
          desc: "樱花季节"
        },
        {
          emoji: "❄️",
          desc: "雪中漫步"
        },
        {
          emoji: "🌙",
          desc: "月下誓言"
        }
      ],
      waterfallColumns: [
        [],
        []
      ]
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "甜蜜相册"
    });
    this.initWaterfall();
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
      this.waterfallColumns = [
        [],
        []
      ];
      processedList.forEach((item) => {
        const targetColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
        this.waterfallColumns[targetColumn].push(item);
        columnHeights[targetColumn] += item.height;
      });
    },
    previewImage(id) {
      const allItems = [...this.waterfallColumns[0], ...this.waterfallColumns[1]];
      const item = allItems.find((i) => i.id === id);
      if (item && item.image) {
        common_vendor.index.previewImage({
          current: item.image,
          urls: allItems.filter((i) => i.image).map((i) => i.image)
        });
        return;
      }
      common_vendor.index.showToast({
        title: "点击了第" + (id + 1) + "张照片",
        icon: "none"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.waterfallColumns, (column, colIndex, i0) => {
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
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ff88f784"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gallery/gallery.js.map
