<template>
  <view class="user">
    <view class="avatar">
      <view class="circle"></view>
      <text>哈工大机器人</text>
    </view>

    <view class="btns">
      <view class="layer" @click="onViewMachine">
        <view></view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo } from "@/api/user.js"

export default {
  data() {
    return {
      weChatUser: {
        avatar: "",
        nickName: ""
      }
    }
  },

  onLoad() {
    this.getUserInfo()
  },

  methods: {
    onViewUserDetail() {
      uni.navigateTo({
        url: "../user-detail/user-detail"
      })
    },

    onViewMachine() {
      uni.navigateTo({
        url: "../machine-list/machine-list"
      })
    },

    async getUserInfo() {
      const userData = await getUserInfo()
      console.log(userData)
    }

  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 90rpx 0;
  .circle {
    width: 170rpx;
    height: 170rpx;
    box-shadow: 0px 2px 11px 1px rgba(143, 143, 143, 0.15);
    border-radius: 50%;
  }
  text {
    padding-top: 30rpx;
    font-size: 38rpx;
    font-weight: 800;
    color: #333333;
  }
}

.btns {
  padding: 0 20rpx;
  .layer {
    height: 150rpx;
    border-radius: 24rpx;
    box-shadow: 0px 2px 11px 1px rgba(143, 143, 143, 0.15);
  }
}
</style>
