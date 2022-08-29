<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 17:24:53
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-29 18:04:58
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/machine-list/components/scan.vue
-->
<template>
  <u-popup :show="isShow" mode="center" round="5" :closeOnClickOverlay="false" :closeable="true" @close="$emit('close')">
    <view style="width: 600rpx; padding: 30rpx 40rpx; background: #fff">
      <view class="title">
        <text>输入序列号</text>
      </view>
      <view class="code">
        <u-input v-model="code">
          <template slot="suffix">
            <u-icon name="scan" color="#2979ff" size="56rpx" @click="onScanCode"></u-icon>
          </template>
        </u-input>
      </view>
      <view style="margin-top: 30rpx">
        <u-button type="primary" text="确定" :loading="isLoading" loadingText="加载中" @click="onSubmit"></u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: "Scan",

  props: {
    isShow: Boolean
  },

  data() {
    return {
      code: "",
      isLoading: false
    }
  },

  methods: {
    onSubmit() {},

    onScanCode() {}
  }
}
</script>
<style lang="scss" scoped>
.title {
  text {
    font-size: 40rpx;
  }
}

.code {
  margin-top: 60rpx;
  padding: 20px 0;
  display: flex;
  align-items: center;
}
</style>
