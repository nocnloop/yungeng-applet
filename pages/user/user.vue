<template>
  <view class="user">
    <view class="avatar" @click="onViewUserDetail">
      <view class="avatar-center">
        <view class="wechat-avatar">
          <image v-if="weChatUser.avatar" :src="weChatUser.avatar" mode="widthFix"></image>
          <image v-else src="/static/images/icons/Avatar.png" mode="widthFix"></image>
        </view>
        <view class="wechat-nickname">
          <text v-if="weChatUser.nickName">{{ weChatUser.nickName }}</text>
          <text v-else>请登录</text>
        </view>
      </view>
    </view>

    <view class="func">
      <view class="func-item u-border-bottom" @click="onViewUserDetail">
        <text>个人信息</text>
        <u-icon name="arrow-right" color="$base-back-color" size="30rpx"></u-icon>
      </view>
      <view class="func-item u-border-bottom" @click="onViewCarDetail">
        <text>车辆信息</text>
        <u-icon name="arrow-right" color="$base-back-color" size="30rpx"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
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
    const result = this.$copy(this.$store.state.app.weChatUser)
    this.weChatUser.avatar = result.avatar.replace("https://thirdwx.qlogo.cn", "https://wx.qlogo.cn")
    this.weChatUser.nickName = result.nickName
  },

  methods: {
    onViewUserDetail() {
      uni.navigateTo({
        url: "../user-detail/user-detail"
      })
    },

    onViewCarDetail() {
      uni.navigateTo({
        url: "../car-mgt/car-mgt"
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.user {
  height: 100vh;
  background-color: $base-back-color;
}

.avatar {
  height: 340rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0093e9;
  background-image: linear-gradient(to bottom, #5677fc 0%, #71abff 100%);

  .avatar-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .wechat-avatar {
    image {
      width: 120rpx;
      height: 120rpx;
    }
  }

  .wechat-nickname {
    text {
      display: flex;
      padding-top: 20rpx;
      color: #fff;
      font-size: 30rpx;
    }
  }
}

.func {
  margin-top: 30rpx;
  background-color: #fff;
  padding: 0 20rpx;

  .func-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100rpx;
    padding: 0 20rpx;
    font-size: 30rpx;
    color: $base-color;
  }
}
</style>
