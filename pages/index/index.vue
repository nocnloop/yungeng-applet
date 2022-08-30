<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-05-13 16:46:09
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 16:51:51
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/index/index.vue
-->
<template>
  <view class="home">
    <!-- 导航 -->
    <u-navbar>
      <view class="u-nav-slot" slot="left">
        <view class="machine">
          <text>机器111</text>
          <text>工作中</text>
          <u-icon name="arrow-down-fill" color="#999" size="20rpx"></u-icon>
        </view>
      </view>
    </u-navbar>
    <view style="height: 80px"></view>
    <!-- 里程 -->
    <view class="distance">
      <text class="left">767</text>
      <view class="right">
        <text>km</text>
        <text>累计里程</text>
      </view>
    </view>
    <!-- 时间 -->
    <view class="day">
      <view>
        <text>5623</text>
        <text>㎡</text>
      </view>
      <view>
        <text>322</text>
        <text>天</text>
      </view>
    </view>
    <!-- 功能按钮 -->
    <view class="btns">
      <view class="left">
        <view class="item">
          <image :src="h1Img" mode="widthFix" />
          <text>喷幅</text>
        </view>
        <view class="item">
          <image :src="h2Img" mode="widthFix" />
          <text>流量</text>
        </view>
        <view class="item">
          <image :src="h3Img" mode="widthFix" />
          <text>设置</text>
        </view>
      </view>
      <view class="right">
        <image :src="yanghuImg" mode="widthFix" />
        <text>保养</text>
        <view class="corner">
          <image :src="cornerImg" mode="widthFix" />
          <text>3</text>
        </view>
      </view>
    </view>
    <!-- 月统计 -->
    <view class="month">
      <view class="layer">
        <view class="item">
          <view class="top">
            <text>356</text>
            <text>亩</text>
          </view>
          <text class="bottom">本月作业亩数</text>
        </view>
        <view class="item">
          <view class="top">
            <text>356</text>
            <text>h</text>
          </view>
          <text class="bottom">本月作业时间</text>
        </view>
        <view class="item">
          <view class="top">
            <text>356</text>
            <text>km</text>
          </view>
          <text class="bottom">本月作业里程</text>
        </view>
      </view>
      <view></view>
    </view>
  </view>
</template>

<script>
import location from "@/mixins/location"

export default {

  mixins: [location],

  data() {
    return {
      yanghuImg: require("@/static/images/home/yanghu.png"),
      cornerImg: require("@/static/images/home/corner.png"),
      h1Img: require("@/static/images/home/h1.png"),
      h2Img: require("@/static/images/home/h2.png"),
      h3Img: require("@/static/images/home/h3.png")
    }
  },

  onLoad() {

  },

  onPullDownRefresh() {
    this.getLocation()
  },

  methods: {

    afterGetLocation() {
      console.log(this.latitude)
      console.log(this.longitude)
    }
  }
}
</script>
<style lang="scss" scoped>
.machine {
  display: flex;
  align-items: center;
  text:nth-child(1) {
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;
  }
  text:nth-child(2) {
    padding: 0 10rpx;
    font-size: 24rpx;
    color: #999999;
  }
}
.distance {
  display: flex;
  align-items: center;
  justify-content: center;
  .left {
    font-size: 70rpx;
    font-weight: 800;
    color: #333333;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text {
      font-size: 24rpx;
      color: #999999;
    }
  }
}

.day {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  view {
    text:nth-child(1) {
      font-size: 36rpx;
      font-weight: 800;
      color: #333333;
    }
    text:nth-child(2) {
      padding-left: 5rpx;
      font-size: 24rpx;
      color: #999999;
    }
  }
  view:last-child {
    margin-left: 150rpx;
  }
}

.btns {
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 1;
    height: 150rpx;
    border-radius: 10rpx;
    background: #f8f8f8;
    display: flex;
    justify-content: space-between;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      image {
        width: 42rpx;
      }
      text {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #414141;
      }
    }
  }

  .right {
    margin-left: 30rpx;
    flex-shrink: 0;
    width: 150rpx;
    height: 150rpx;
    border-radius: 10rpx;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    image {
      width: 32rpx;
    }
    text {
      margin-top: 10rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #414141;
    }
    .corner {
      position: absolute;
      top: 0;
      left: 6rpx;
      width: 94rpx;
      image {
        width: 100%;
      }
      text {
        position: absolute;
        top: -8rpx;
        left: 18rpx;
        font-size: 24rpx;
        color: #fff;
      }
    }
  }
}

.month {
  padding: 30rpx;
  .layer {
    height: 150rpx;
    border-radius: 10rpx;
    background: #f8f8f8;
    display: flex;
    justify-content: space-between;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .top {
        text:nth-child(1) {
          font-size: 36rpx;
          color: #333;
          vertical-align: baseline;
        }
        text:nth-child(2) {
          padding-left: 6rpx;
          font-size: 24rpx;
          color: #999;
          vertical-align: baseline;
        }
      }
      .bottom {
        font-size: 28rpx;
        color: #414141;
      }
    }
  }
}
</style>
