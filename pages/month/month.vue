<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-09-05 17:50:14
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-10-29 18:35:26
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/month/month.vue
-->
<template>
  <view>
    <view class="machine" @click="handleSelectMonth">
      <text>{{ currentMonth }}月</text>
      <u-icon name="arrow-down-fill" color="#999" size="20rpx"></u-icon>
    </view>

    <!-- 月统计 -->
    <view class="month">
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

    <!-- 日统计 -->
    <view class="day" v-for="(day, index) in monthData.workRecords" :key="day.timePeriod" @click="handleSelectDay(index)">
      <view class="tilte">
        <text>{{ day.timePeriod }}</text>
        <view class="right">
          <text>共计 {{ day.workingArea.toFixed(0) }} 亩</text>
          <u-icon name="arrow-right" color="#333333" size="18" />
        </view>
      </view>
      <view v-if="day.workRecords && day.isFold">
        <view class="data" v-for="(time, index) in day.workRecords" :key="time.timePeriod">
          <view class="number">
            <text>NO.</text>
            <text>{{ index + 1 }}</text>
          </view>
          <view class="area">
            <text>{{ time.workingArea.toFixed(1) }}</text>
            <text>亩</text>
          </view>
          <view class="time">
            <view>
              <image :src="timeImg" mode="widthFix" />
              <text>{{ time.workingMile.toFixed(1) }}km</text>
            </view>
            <view>
              <image :src="kmImg" mode="widthFix" />
              <text>{{ time.timePeriod }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <u-datetime-picker
      ref="datetimePicker"
      :show="showTimeSelectComponent"
      v-model="currentTime"
      mode="year-month"
      :closeOnClickOverlay="true"
      @cancel="showTimeSelectComponent = false"
      @confirm="confirm"
    />
  </view>
</template>
<script>
import dayjs from "dayjs"
import { getdeviceworkingstatistics, getDeviceSprayOperationRecord } from "@/api/machine"

export default {
  data() {
    return {
      monthData: {
        workingMile: 0,
        workingArea: 0,
        workingTime: 0
      },
      currentMonth: 0,
      currentTime: 0,
      currentDayIndex: -1,
      showTimeSelectComponent: false,
      timeImg: require("@/static/images/home/time.png"),
      kmImg: require("@/static/images/home/km.png")
    }
  },

  onLoad(options) {
    this.deviceIMEI = options.deviceIMEI
    this.currentTime = dayjs().format("YYYY-MM-DD")
    this.currentMonth = dayjs(this.currentTime).format("M")
    this.currentYear = dayjs(this.currentTime).format("YYYY")
    this.getdeviceworkingstatistics()
  },

  onReady() {
    // 微信小程序需要用此写法
    this.$refs.datetimePicker.setFormatter(this.formatter)
  },

  methods: {
    async getdeviceworkingstatistics() {
      const curMonth = this.currentMonth
      const curYear = this.currentYear
      const curTime = `${curYear}-${curMonth}`
      const beginTime = dayjs(curTime).startOf("month").format("YYYY-MM-DD HH:mm:ss")
      const endTime = dayjs(curTime).endOf("month").format("YYYY-MM-DD HH:mm:ss")
      const result = await getdeviceworkingstatistics({ deviceIMEI: this.deviceIMEI, beginTime, endTime })
      this.monthData = result.data
    },

    async getDeviceSprayOperationRecord() {
      const selectDay = this.monthData.workRecords[this.currentDayIndex].timePeriod
      const beginTime = dayjs(selectDay).startOf("day").format("YYYY-MM-DD HH:mm:ss")
      const endTime = dayjs(selectDay).endOf("day").format("YYYY-MM-DD HH:mm:ss")
      const result = await getDeviceSprayOperationRecord({ deviceIMEI: this.deviceIMEI, beginTime, endTime })
      this.monthData.workRecords[this.currentDayIndex].workRecords = result.data
      this.monthData = [...this.monthData]
    },

    handleSelectDay(index) {
      this.currentDayIndex = index
      this.monthData.workRecords[index].isFold = !this.monthData.workRecords[index].isFold
      this.getDeviceSprayOperationRecord()
    },

    handleSelectMonth() {
      this.showTimeSelectComponent = true
    },

    confirm({ value }) {
      this.currentMonth = dayjs(value).format("M")
      this.currentYear = dayjs(value).format("YYYY")
      this.getdeviceworkingstatistics()
      this.showTimeSelectComponent = false
    },

    formatter(type, value) {
      if (type === "year") {
        return `${value}年`
      }
      if (type === "month") {
        return `${value}月`
      }
      if (type === "day") {
        return `${value}日`
      }
      return value
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
    // border-left: 8rpx solid #333;
    padding: 0 30rpx;
    margin: 24rpx 0;
    text {
      font-size: 28rpx;
      color: #333333;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text {
        font-size: 30rpx;
        font-weight: 500;
        color: #333333;
        padding-right: 4rpx;
      }
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
