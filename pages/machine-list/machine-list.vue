<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 16:14:41
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-29 17:47:50
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/machine-list/machine-list.vue
-->
<template>
  <view>
    <view class="btn">
      <u-button type="primary" text="添加" size="large" shape="circle" @click="isShow = true"></u-button>
    </view>

    <Scan :isShow="isShow" @close="isShow = false" />
  </view>
</template>

<script>
import Scan from "./components/Scan"
import { querydevices } from "@/api/machine.js"
export default {
  components: { Scan },

  data() {
    return {
      isShow: false
    }
  },

  created() {
    this.querydevices()
  },

  methods: {
    async querydevices() {
      await querydevices()
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
