<template>
  <view class="login">
    <u-navbar :autoBack="true" @leftClick="onExit"></u-navbar>
    <view class="login-content">
      <view class="left-top-sign">LOGIN</view>
      <view class="welcome">欢迎回来！</view>
      <view class="btn-content">
        <u-button
          v-if="isShowGetUserInfoButton"
          :loading="isLoading"
          type="primary"
          @click="onGetUserInfo"
          shape="circle"
          text="点击获取用户信息"
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
import { getCarInfo } from "../../api/car.js"
import { login, saveWxUser } from "../../api/login.js"
import { getUserInfo, getWeChatUserInfo } from "../../api/user.js"
export default {
  data() {
    return {
      code: "",
      iv: "",
      encryptedData: "",
      userInfo: {},
      isLoading: false,
      isShowGetUserInfoButton: false,
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
    async onGetUserInfo(res) {
      try {
        this.isLoading = true
        await this.getUserProfile()
        await this.sendCode() // 在向后台发送加密信息之前保险起见向后台发送code
        await this.saveUserInfo()
        await this.noNeedSyncUserInfoAction("getUserInfo")
        uni.reLaunch({ url: "../index/index" })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    getUserProfile() {
      return new Promise((resolve, reject) => {
        uni.getUserProfile({
          desc: "用于完善会员资料",
          success: (res) => {
            this.iv = res.iv
            this.encryptedData = res.encryptedData
            this.userInfo = res.userInfo
            resolve()
          },
          fail: (e) => {
            reject(e)
          }
        })
      })
    },

    // 保存用户信息
    async saveUserInfo() {
      await saveWxUser({
        iv: this.iv,
        encryptedData: this.encryptedData
      })
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

    async sendCode() {
      try {
        uni.showLoading()
        await this.getCode()
        const result = await login({ code: this.code })
        this.$store.dispatch("app/tokenAction", result.data.accessToken)
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
    },

    async login() {
      try {
        uni.showLoading()
        await this.getCode()
        const result = await login({ code: this.code })
        console.log(result)
        // needSyncUserInfo 1 表示后台还未存储了用户的微信个人信息，需要进行用户授权
        // const needSyncUserInfo = result.data.needSyncUserInfo
        // this.$store.dispatch("app/tokenAction", result.data.accessToken)
        // needSyncUserInfo ? (this.isShowGetUserInfoButton = true) : await this.noNeedSyncUserInfoAction()
      } catch (e) {
        console.log(e)
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

    async noNeedSyncUserInfoAction(type) {
      await this.getUserInfo()
      await this.getWeChatUserInfo()
      await this.getCarInfo()
      type != "getUserInfo" && uni.reLaunch({ url: "../index/index" })
    },

    async getUserInfo() {
      const result = await getUserInfo()
      this.$store.dispatch("app/userAction", result.data)
    },

    async getWeChatUserInfo() {
      const result = await getWeChatUserInfo()
      this.$store.dispatch("app/weChatUserAction", result.data)
    },

    async getCarInfo() {
      const result = await getCarInfo()
      this.$store.dispatch("app/carAction", result.data)
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
