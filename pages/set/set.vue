<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-10-17 15:57:37
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-10-18 11:40:46
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/set/set.vue
-->
<template>
  <view class="set">
    <view class="block">
      <view class="title"><text>喷幅</text><text>(M)</text></view>
      <view class="slider"><u-slider v-model="value1" showValue min="0" max="50" inactiveColor="#c0c4cc" @change="handleChange"></u-slider></view>
    </view>
    <view class="block">
      <view class="title"><text>流量</text><text>(升/亩)</text></view>
      <view class="slider"><u-slider v-model="value2" showValue min="0" max="50" inactiveColor="#c0c4cc" @change="handleChange"></u-slider></view>
    </view>
    <view class="block">
      <view class="title"><text>泵速</text><text>(升/分钟)</text></view>
      <view class="slider"
        ><u-slider v-model="value3" showValue min="0" max="50" inactiveColor="#c0c4cc" @change="handleChange"></u-slider
      ></view>
    </view>
  </view>
</template>

<script>
import { querydevicesworkconfiguration, modifydevicesworkconfiguration } from "@/api/machine"
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      value3: 0
    }
  },

  onLoad(options) {
    this.deviceIMEI = options.deviceIMEI
    this.querydevicesworkconfiguration(this.deviceIMEI)
  },

  methods: {
    handleChange() {
      this.modifydevicesworkconfiguration()
    },

    async querydevicesworkconfiguration(deviceIMEI) {
      const result = await querydevicesworkconfiguration({ deviceIMEI })
      this.value1 = result.data.extend
      this.value2 = result.data.standard_Dosage
      this.value3 = result.data.pumpFlowMax
    },

    async modifydevicesworkconfiguration() {
      await modifydevicesworkconfiguration({
        deviceIMEI: this.deviceIMEI,
        extend: this.value1,
        standard_Dosage: this.value2,
        pumpFlowMax: this.value3
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.set {
  height: 100vh;
  padding: 0 30rpx;
  padding-top: 30rpx;
  background-color: #f6f6f6;
}
.block {
  padding: 30rpx;
  border-radius: 10rpx;
  background-color: #fff;
  margin-bottom: 30rpx;
  .title {
    text:nth-child(1) {
      font-size: 34rpx;
      font-weight: bold;
      color: #333;
    }
    text:nth-child(2) {
      padding-left: 10rpx;
      font-size: 30rpx;
      color: #aaa;
    }
  }
  .slider {
    margin-top: 20rpx;
  }
}
</style>
