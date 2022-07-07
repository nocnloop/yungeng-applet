<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-19 09:45:04
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 17:45:02
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/release-history/release-history.vue
-->
<template>
  <view class="release-history">
    <u-tabs :list="tabList" @click="click" :scrollable="false"></u-tabs>
    <ApplyInList ref="mescrollItem0" :i="0" :index="tabIndex" @onViewDetail="onViewDetail" />
    <ApplyEndList ref="mescrollItem1" :i="1" :index="tabIndex" @onViewDetail="onViewDetail" />
  </view>
</template>

<script>
import ApplyInList from "./components/ApplyInList.vue"
import ApplyEndList from "./components/ApplyEndList.vue"
export default {
  components: { ApplyInList, ApplyEndList },

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
    },

    onViewDetail(id) {
      // uni.navigateTo({
      //   url: "../goods-detail/goods-detail?id=" + id
      // })
    }
  }
}
</script>

<style>
</style>
