<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-18 17:07:45
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-18 17:40:33
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/phone-consult/phone-consult.vue
-->
<template>
  <view class="phone-consult">
    <view class="tip">
      <view class="tip-title">
        <u-icon name="error-circle" color="#2979ff" size="50rpx"></u-icon>
        <text style="margin-left: 10rpx">温馨提示</text>
      </view>

      <view class="tip-content">根据车辆入库仓库拨打相应仓库电话，如果没有排队，可以拨打下方客服电话。</view>
    </view>

    <view class="phone" @click="onCallPhone">
      <u-button type="primary" icon="phone" text="客服电话"></u-button>
    </view>
  </view>
</template>

<script>

export default {

  data() {
    return {

    }
  },
  methods: {
    onCallPhone() {
      uni.makePhoneCall({
        phoneNumber: "114" // 仅为示例
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.tip {
  padding: 40rpx;

  .tip-title {
    display: flex;
    align-items: center;
    font-size: 34rpx;
    color: $base-color-main;
  }

  .tip-content {
    margin-top: 20rpx;
    color: $base-color-second;
    font-size: 32rpx;
  }
}

.phone {
  padding: 0 40rpx;
}
</style>
