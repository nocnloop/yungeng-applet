<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 16:14:41
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-31 14:48:43
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/machine-list/machine-list.vue
-->
<template>
  <view>
    <view class="list">
      <view class="item" v-for="item in list" :key="item.id">
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
        <view class="delete" @click="deleteMachine(item)">
          <u-icon name="minus-circle" color="red" size="50rpx"></u-icon>
        </view>
      </view>
    </view>
    <view style="width: 60%; margin: 50rpx auto">
      <u-button type="primary" text="添加" size="large" shape="circle" @click="isScanShow = true"></u-button>
    </view>

    <view class="safe"></view>

    <Scan :isShow="isScanShow" @close="isScanShow = false" @openMachine="openMachine" />
  </view>
</template>

<script>
import Scan from "./components/Scan"
import { querydevices, unbindingdevice } from "@/api/machine.js"
export default {
  components: { Scan },

  data() {
    return {
      list: [],
      isScanShow: false,
      isMachineShow: false
    }
  },

  onShow() {
    this.querydevices()
  },

  methods: {
    async querydevices() {
      const result = await querydevices()
      this.list = result.data
    },

    openMachine() {
      uni.navigateTo({
        url: "../machine-detail/machine-detail"
      })
    },

    async deleteMachine(item) {
      try {
        await new Promise((resolve, reject) => {
          uni.showModal({
            content: "是否确认解绑？",
            success: ({ confirm, cancel }) => {
              confirm ? resolve() : reject(Error("cancel"))
            }
          })
        })
        await unbindingdevice({ deviceIMEI: item.deviceIMEI })
        uni.showLoading()
        this.querydevices()
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
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
    .delete {
      position: absolute;
      top: 10rpx;
      right: 20rpx;
    }
  }
}
</style>
