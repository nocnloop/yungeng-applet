<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-05-05 10:59:39
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-12 11:18:51
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/release-history/components/ApplyEndList.vue
-->
<template>
  <view v-show="i === index">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" :down="downOption">
      <view class="goods-list">
        <view class="goods-item" v-for="item in list" :key="item.id" @click="onViewDetail(item)">
          <view class="item-top">
            <text class="left">申请仓库：{{ item.warehouse }}</text>
          </view>
          <view class="item-top">
            <text class="left">车牌号：{{ item.carNo }}</text>
          </view>

          <view class="item-bottom">
            <text class="left" :style="{ color: approvedResultStyle(item) }">审核结果：{{ approvedResultText(item) }}</text>
          </view>
          <view class="item-bottom">
            <text class="left">审核时间：{{ item.approvedTime }}</text>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import { getApplyOutList } from "../../../api/release"
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js"
export default {
  mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)

  data() {
    return {
      downOption: {
        auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
      },
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 30 // 每页数据的数量
        }
      },
      list: []
    }
  },

  methods: {

    approvedResultStyle(item) {
      return item.approvedResult == 2 ? "red" : "green"
    },

    approvedResultText(item) {
      const result = {
        0: "待审核",
        1: "审核通过",
        2: "不通过"
      }
      return result[item.approvedResult]
    },

    async goodsEnd(page) {
      try {
        const result = await getApplyOutList({
          pageNum: page.num,
          pageSize: page.size,
          pass: 1
        })
        this.mescroll.endByPage(result.data.records.length, result.data.totoalPages)
        if (page.num == 1) this.list = []
        this.list = this.list.concat(result.data.records)
      } catch (error) {
        this.mescroll.endErr()
      }
    },

    /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      this.goodsEnd(page)
    },

    onViewDetail(item) {
      this.$emit("onViewDetail", item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  padding: 20rpx;
}

.goods-item {
  padding: 20rpx;
  border-radius: 5rpx;
  background-color: #ffffff;
  box-shadow: $base-box-shadow;
  margin-bottom: 30rpx;

  .item-top,
  .item-bottom {
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      font-size: 30rpx;
      color: $base-color-main;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .right {
      font-size: 30rpx;
      color: $base-color-second;
    }
  }
}
</style>
