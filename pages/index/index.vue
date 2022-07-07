<template>
  <view class="home">
    <swiper class="swiper" :style="{ height: bannerHeight }" :indicator-dots="true" :autoplay="false">
      <swiper-item v-for="item in banner" :key="item">
        <image class="swiper-image" :src="item" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="func">
      <view class="func-box">
        <view class="func-item u-border-right u-border-bottom" @click="onEnterApply">
          <u-icon name="/static/images/index/dock.png" color="#2979ff" size="80rpx"></u-icon>
          <text>入园申请</text>
        </view>
        <view class="func-item u-border-right u-border-bottom" @click="onCarStart">
          <u-icon name="/static/images/index/car.png" color="#2979ff" size="80rpx"></u-icon>
          <text>提货发车</text>
        </view>
        <view class="func-item u-border-bottom" @click="onReserveQueue">
          <u-icon name="/static/images/index/queue.png" color="#2979ff" size="80rpx"></u-icon>
          <text>预约排队</text>
        </view>
        <view class="func-item u-border-right u-border-bottom" @click="onSignIn">
          <u-icon name="/static/images/index/qrcode.png" color="#2979ff" size="70rpx"></u-icon>
          <text>码头签到</text>
        </view>
        <view class="func-item u-border-right u-border-bottom" @click="onReleaseApply">
          <u-icon name="/static/images/index/apply.png" color="#2979ff" size="70rpx"></u-icon>
          <text>放行申请</text>
        </view>
        <view class="func-item u-border-bottom" @click="onGoodsSearch">
          <u-icon name="/static/images/index/search.png" color="#2979ff" size="80rpx"></u-icon>
          <text>货物查询</text>
        </view>
        <view class="func-item u-border-right" @click="onMap">
          <u-icon name="/static/images/index/map.png" color="#2979ff" size="80rpx"></u-icon>
          <text>园区导航</text>
        </view>
        <view class="func-item u-border-right" @click="onTeaching">
          <u-icon name="/static/images/index/video.png" color="#2979ff" size="80rpx"></u-icon>
          <text>教学视频</text>
        </view>
        <view class="func-item" @click="onPhoneConsult">
          <u-icon name="/static/images/index/phone.png" color="#2979ff" size="80rpx"></u-icon>
          <text>咨询电话</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Complete from "@/mixins/complete"
import { getBanner } from "../../api/banner"

export default {

  mixins: [Complete],

  data() {
    return {
      banner: [],
      bannerHeight: uni.upx2px(750) * 0.6 + "px"
    }
  },

  onLoad() {
    this.getBanner()
    // uni.setClipboardData({
    //   data: this.$store.state.app.token,
    //   success: function() {
    //     uni.showModal({
    //       title: "提示",
    //       content: "Token 粘贴成功",
    //       showCancel: true
    //     })
    //   }
    // })
  },

  methods: {
    async getBanner() {
      const result = await getBanner()
      this.banner = result.data
    },

    onEnterApply() {
      this.completeUserInfo()
      uni.navigateTo({
        url: "../enter-park-apply/enter-park-apply"
      })
    },
    onCarStart() {
      this.completeUserInfo()
      uni.navigateTo({
        url: "../car-start/car-start"
      })
    },
    onReserveQueue() {
      this.completeUserInfo()
      uni.navigateTo({
        url: "../reserve-queue/reserve-queue"
      })
    },
    onSignIn() {
      this.completeUserInfo()
      uni.navigateTo({
        url: "../sign-in/sign-in"
      })
    },
    onReleaseApply() {
      this.completeUserInfo()
      uni.navigateTo({
        url: "../release-apply/release-apply"
      })
    },
    onGoodsSearch() {
      this.completeUserInfo()
      uni.navigateTo({
        url: "../goods-search/goods-search"
      })
    },
    onMap() {
      uni.navigateTo({
        url: "../map/map"
      })
    },
    onTeaching() {
      uni.navigateTo({
        url: "../teaching/teaching"
      })
    },
    onPhoneConsult() {
      uni.navigateTo({
        url: "../phone-consult/phone-consult"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background-color: $base-back-color;
}

.swiper {
  .swiper-image {
    width: 100%;
    height: 100%;
  }
}

.func {
  padding: 20rpx;

  .func-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-radius: 10rpx;
    background-color: #ffffff;
  }
}

.func-item {
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  text {
    padding-top: 10rpx;
    color: $base-color-main;
  }
}
</style>
