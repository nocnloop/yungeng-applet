<template>
  <view class="login">
    <u-navbar :autoBack="true" @leftClick="onExit"></u-navbar>
    <view class="login-content">
      <view class="left-top-sign">LOGIN</view>
      <view class="welcome">欢迎回来！</view>
      <view class="btn-content">
        <u-button
          :loading="isLoading"
          type="primary"
          shape="circle"
          text="点击进行用户注册"
          openType="getPhoneNumber"
          @getphonenumber="registerUser"
        >
        </u-button>
      </view>
    </view>
    <view class="left-bottom-sign"></view>
    <view class="right-top-sign"></view>
    <u-notify ref="uNotify"></u-notify>
  </view>
</template>

<script>
import { login, wxuserregister } from "../../api/login.js"
export default {
  data() {
    return {
      code: "",
      iv: "",
      encryptedData: "",
      userInfo: {},
      isLoading: false,
      isNotify: false
    }
  },

  onLoad() {
    this.login()
  },

  onPullDownRefresh() {
    this.login()
  },

  methods: {
    onExit() {
      // eslint-disable-next-line
      wx.exitMiniProgram()
    },

    getCode() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: (res) => {
            this.code = res.code
            resolve()
          },
          fail: (e) => {
            reject(e)
          }
        })
      })
    },

    async login() {
      try {
        uni.showLoading()
        await this.getCode()
        const result = await login({ code: this.code })
        const { openID } = result.data
        if (openID) {
          uni.reLaunch({ url: "../index/index" })
        }
      } catch (e) {
        this.$refs.uNotify.show({
          type: "error",
          message: "错误，请下拉刷新重试",
          duration: 1000 * 3,
          safeAreaInsetTop: true
        })
      } finally {
        uni.hideLoading()
        uni.stopPullDownRefresh()
      }
    },

    /**
     * @description: 获取手机号的回调
     * @param {*} e
     * @return {*}
     */
    async registerUser(e) {
      try {
        this.isLoading = true
        await this.getCode()
        await wxuserregister({ code: this.code, encryptedData: "", iv: "" })
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }

  }
}
</script>
<style lang="scss">
.login {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.login-content {
  padding-top: 240rpx;
}

.welcome {
  position: relative;
  left: 50rpx;
  top: -90rpx;
  font-size: 46rpx;
  color: #555;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}

.left-top-sign {
  font-size: 120upx;
  color: #f8f8f8;
  position: relative;
  left: -16rpx;
}

.btn-content {
  padding: 0 60rpx;
}

.left-bottom-sign {
  position: absolute;
  left: -270rpx;
  bottom: -320rpx;
  border: 100rpx solid #d0d1fd;
  border-radius: 50%;
  padding: 180rpx;
}

.right-top-sign {
  position: absolute;
  top: 80rpx;
  right: -30rpx;
  z-index: 95;

  &:before,
  &:after {
    display: block;
    content: "";
    width: 400rpx;
    height: 80rpx;
    background: #b4f3e2;
  }

  &:before {
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }

  &:after {
    position: absolute;
    right: -198rpx;
    top: 0;
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
  }
}
</style>
