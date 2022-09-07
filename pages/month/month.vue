<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-09-05 17:50:14
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-09-07 10:03:57
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/month/month.vue
-->
<template>
  <view>
    <view class="machine" @click="selectMachine">
      <text>3月</text>
      <u-icon name="arrow-down-fill" color="#999" size="20rpx"></u-icon>
    </view>

    <!-- 月统计 -->
    <view class="month" @click="toDetail">
      <view class="layer">
        <view class="item">
          <view class="top">
            <text>{{ monthData.workingArea.toFixed(0) }}</text>
            <text>亩</text>
          </view>
          <text class="bottom">本月作业亩数</text>
        </view>
        <view class="item">
          <view class="top">
            <text>{{ monthData.workingTime.toFixed(0) }}</text>
            <text>h</text>
          </view>
          <text class="bottom">本月作业时间</text>
        </view>
        <view class="item">
          <view class="top">
            <text>{{ monthData.workingMile.toFixed(0) }}</text>
            <text>km</text>
          </view>
          <text class="bottom">本月作业里程</text>
        </view>
      </view>
      <view></view>
    </view>

    <view class="day">
      <view class="tilte">
        <text>2020.03.03</text>
        <text>共计326.111亩</text>
      </view>
      <view class="data">
        <view class="number">
          <text>NO.</text>
          <text>03</text>
        </view>
        <view class="area">
          <text>157.1</text>
          <text>亩</text>
        </view>
        <view class="time">
          <view>
            <image :src="timeImg" mode="widthFix" />
            <text>4.2km</text>
          </view>
          <view>
            <image :src="kmImg" mode="widthFix" />
            <text>15:06-18:03</text>
          </view>
        </view>
      </view>
           <view class="data">
        <view class="number">
          <text>NO.</text>
          <text>03</text>
        </view>
        <view class="area">
          <text>157.1</text>
          <text>亩</text>
        </view>
        <view class="time">
          <view>
            <image :src="timeImg" mode="widthFix" />
            <text>4.2km</text>
          </view>
          <view>
            <image :src="kmImg" mode="widthFix" />
            <text>15:06-18:03</text>
          </view>
        </view>
      </view>
           <view class="data">
        <view class="number">
          <text>NO.</text>
          <text>03</text>
        </view>
        <view class="area">
          <text>157.1</text>
          <text>亩</text>
        </view>
        <view class="time">
          <view>
            <image :src="timeImg" mode="widthFix" />
            <text>4.2km</text>
          </view>
          <view>
            <image :src="kmImg" mode="widthFix" />
            <text>15:06-18:03</text>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
export default {
  data() {
    return {
      monthData: {
        workingMile: 0,
        workingArea: 0,
        workingTime: 0
      },

      timeImg: require("@/static/images/home/time.png"),
      kmImg: require("@/static/images/home/km.png")
    }
  }
}
</script>
<style lang="scss" scoped>
.machine {
  display: flex;
  align-items: center;
  padding: 30rpx 30rpx;
  text {
    font-size: 50rpx;
    font-weight: 500;
    background: linear-gradient(0deg, #0dccff 0%, #4760ff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
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

.day {
  .tilte {
    display: flex;
    justify-content: space-between;
    border-left: 8rpx solid #333;
    padding: 0 30rpx;
    margin: 24rpx 0;
    text:first-child {
      font-size: 28rpx;
      color: #333333;
    }
    text:last-child {
      font-size: 30rpx;
      font-weight: 500;
      color: #333333;
    }
  }
  .data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 110rpx;
    background: #ffffff;
    box-shadow: 2rpx 4rpx 5rpx 0px rgba(0, 0, 0, 0.07);
    padding: 0 30rpx;
    margin-bottom: 8rpx;
    .number {
      display: flex;
      text {
        font-size: 30rpx;
        font-weight: 400;
        color: #666;
      }
      text:first-child {
        color: #a5daff;
      }
    }
    .area {
      display: flex;
      align-items: baseline;
      text:first-child {
        font-size: 46rpx;
        font-weight: 800;
        font-style: italic;
        color: #111111;
      }
      text:last-child {
        padding-left: 8rpx;
        font-size: 30rpx;
        font-weight: 800;
        color: #111111;
      }
    }
    .time {
      display: flex;
      flex-direction: column;
      view {
        display: flex;
        align-items: center;
        image {
          width: 30rpx;
        }
        text {
          padding-left: 10rpx;
          width: 67px;
          font-size: 24rpx;
          color: #999999;
          white-space: nowrap;
        }
      }
      view:last-child {
        margin-top: 20rpx;
      }
    }
  }
}
</style>
