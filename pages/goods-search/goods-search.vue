<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-19 09:45:04
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 10:54:50
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/goods-search/goods-search.vue
-->
<template>
  <view class="goods-search">
    <u-tabs :list="tabList" @click="click" :scrollable="false"></u-tabs>
    <GoodsInList ref="mescrollItem0" :i="0" :index="tabIndex" @onViewDetail="onViewDetail" />
    <GoodsEndList ref="mescrollItem1" :i="1" :index="tabIndex" @onViewDetail="onViewDetail" />
  </view>
</template>

<script>
import GoodsInList from "./componnets/GoodsInList.vue"
import GoodsEndList from "./componnets/GoodsEndList.vue"
export default {
  components: { GoodsInList, GoodsEndList },

  data() {
    return {
      tabList: [
        {
          id: 0,
          name: "进行中"
        }, {
          id: 1,
          name: "已完成"
        }
      ],

      tabIndex: 0
    }
  },
  methods: {
    click(item) {
      this.tabIndex = item.index
      console.log("item", item)
    },

    onViewDetail(id) {
      uni.navigateTo({
        url: "../goods-detail/goods-detail?id=" + id
      })
    }
  }
}
</script>

<style>
</style>
