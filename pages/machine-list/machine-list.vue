<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 16:14:41
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 10:47:39
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/machine-list/machine-list.vue
-->
<template>
  <view>
    <view class="btn">
      <u-button type="primary" text="添加" size="large" shape="circle" @click="isScanShow = true"></u-button>
    </view>

    <Scan :isShow="isScanShow" @close="isScanShow = false" @openMachine="openMachine" />
  </view>
</template>

<script>
import Scan from "./components/Scan"
import { querydevices } from "@/api/machine.js"
export default {
  components: { Scan },

  data() {
    return {
      isScanShow: false,
      isMachineShow: false
    }
  },

  created() {
    this.querydevices()
  },

  methods: {
    async querydevices() {
      await querydevices()
    },

    openMachine() {
      uni.navigateTo({
        url: "../machine-detail/machine-detail"
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 60%;
  margin: 0 auto;
}
</style>
