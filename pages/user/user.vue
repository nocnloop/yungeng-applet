<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 10:59:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 13:38:22
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/user/user.vue
-->
<template>
  <view class="user">
    <view class="avatar">
      <view class="circle">
        <image :src="avatarImg" mode="widthFix"></image>
      </view>
      <text>哈工大机器人</text>
    </view>

    <view class="btns">
      <view class="layer">
        <view class="item" v-for="item in btns" :key="item.name" @click="toView(item.name)">
          <image :src="item.src" mode="widthFix"></image>
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo } from "@/api/user.js"

export default {
  data() {
    return {
      avatarImg: require("@/static/images/user/avatar.png"),
      btns: [
        { name: "测量助手", src: require("@/static/images/user/u-1.png") },
        { name: "服务专家", src: require("@/static/images/user/u-2.png") },
        { name: "绑定", src: require("@/static/images/user/u-3.png") },
        { name: "用户手册", src: require("@/static/images/user/u-4.png") },
        { name: "意见反馈", src: require("@/static/images/user/u-5.png") }
      ]
    }
  },

  onLoad() {
    this.getUserInfo()
  },

  methods: {

    async getUserInfo() {
      const userData = await getUserInfo()
      console.log(userData)
    },

    toView(name) {
      switch (name) {
      case "测量助手":
        uni.navigateTo({
          url: "../machine-list/machine-list"
        })
        break
      case "绑定":
        uni.navigateTo({
          url: "../machine-list/machine-list"
        })
        break
      }
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
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      width: 80%;
    }
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
    display: flex;
    justify-content: space-between;
    height: 150rpx;
    border-radius: 24rpx;
    box-shadow: 0px 2px 11px 1px rgba(143, 143, 143, 0.15);
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      image {
        width: 36rpx;
      }
      text {
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #333333;
      }
    }
  }
}
</style>
