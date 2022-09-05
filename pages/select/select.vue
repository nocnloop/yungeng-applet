<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-09-01 09:50:56
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-09-01 15:19:29
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/select/select.vue
-->
<template>
  <view>
    <view class="list">
      <view class="item" v-for="(item, index) in list" :key="item.id" :class="item.selectClass" @click="selectItem(index)">
        <view>
          <text>型号</text>
          <text>{{ item.productModel }}</text>
        </view>
        <view>
          <text>序列号</text>
          <text>{{ item.productSeries }}</text>
        </view>
        <view>
          <text>名称</text>
          <text>{{ item.deviceName }}</text>
        </view>
      </view>
    </view>
    <view class="safe"></view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      selectIndex: 0
    }
  },

  created() {
    this.selectIndex = this.$store.state.temp.selectMachineIndex
    this.list = this.$store.state.temp.machineList.map((item, index) => {
      return { ...item, selectClass: index == this.selectIndex ? "select" : "" }
    })
  },

  methods: {
    selectItem(index) {
      this.$store.dispatch("temp/selectMachineIndexAction", index)
      uni.navigateBack()
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  padding: 40rpx 30rpx;
  .item {
    margin-bottom: 40rpx;
    padding: 20rpx;
    border-radius: 4rpx;
    box-shadow: 0px 2px 11px 1px rgba(143, 143, 143, 0.15);
    position: relative;
    view {
      padding: 10rpx 0;
      display: flex;
    }
    text {
      font-size: 30rpx;
      color: #333;
    }
    text:first-child {
      width: 120rpx;
    }
    text:last-child {
      font-size: #999;
    }
  }

  .select {
    background-color: #8ecdff;
    text {
      color: #fff;
    }
  }
}
</style>
