<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-05-13 16:46:09
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-09-05 17:52:28
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/index/index.vue
-->
<template>
  <view class="home">
    <!-- 导航 -->
    <u-navbar>
      <view class="u-nav-slot" slot="left">
        <view class="machine" @click="selectMachine">
          <text>{{ cur.deviceName }}</text>
          <text>{{ usageStatus(cur.usageStatus) }}</text>
          <u-icon name="arrow-down-fill" color="#999" size="20rpx"></u-icon>
        </view>
      </view>
    </u-navbar>
    <view style="height: 80px"></view>
    <!-- 里程 -->
    <view class="distance">
      <text class="left">{{ condition.workingMile.toFixed(0) }}</text>
      <view class="right">
        <text>km</text>
        <text>累计里程</text>
      </view>
    </view>
    <!-- 时间 -->
    <view class="day">
      <view>
        <text>{{ condition.workingArea.toFixed(0) }}</text>
        <text>㎡</text>
      </view>
      <view>
        <text>{{ condition.workingTime.toFixed(0) }}</text>
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
    <!-- 地图 -->
    <view class="map">
      <map
        id="map"
        v-if="location.latitude"
        :style="{ width: '100%', height: mapHeight }"
        :latitude="location.latitude"
        :longitude="location.longitude"
        :markers="markers"
      />
    </view>
  </view>
</template>

<script>
// import location from "@/mixins/location"
import { queryDeviceWorkingCondition, getdeviceworkingstatistics, getdevicelocation, querydevices } from "@/api/machine"

export default {

  // mixins: [location],

  data() {
    return {
      yanghuImg: require("@/static/images/home/yanghu.png"),
      cornerImg: require("@/static/images/home/corner.png"),
      h1Img: require("@/static/images/home/h1.png"),
      h2Img: require("@/static/images/home/h2.png"),
      h3Img: require("@/static/images/home/h3.png"),
      condition: {
        workingMile: 0,
        workingArea: 0,
        workingTime: 0
      },
      monthData: {
        workingMile: 0,
        workingArea: 0,
        workingTime: 0
      },
      location: {
        latitude: 0,
        longitude: 0
      },
      mapHeight: "0",
      positionImg: require("@/static/images/home/position.png")
    }
  },

  onLoad() {
    this.querydevices()
    this.$nextTick(() => this.getMapHeight())
  },

  computed: {
    cur() {
      return this.$store.state.temp.machineList[this.$store.state.temp.selectMachineIndex] ?? {}
    },

    markers() {
      return [
        {
          id: this.cur.id,
          latitude: this.location.latitude ?? 0,
          longitude: this.location.longitude ?? 0,
          iconPath: this.positionImg,
          with: 20
        }
      ]
    }
  },

  // onPullDownRefresh() {
  //   this.getLocation()
  // },

  methods: {

    // afterGetLocation() {
    //   console.log(this.latitude)
    //   console.log(this.longitude)
    // },
    getMapHeight() {
      const query = uni.createSelectorQuery().in(this)
      const cb = (data) => (this.mapHeight = (data.height - 10) + "px")
      query.select(".map").boundingClientRect(cb).exec()
    },

    usageStatus(key) {
      const config = {
        0: "离线",
        1: "在线",
        2: "作业中"
      }
      return config[key]
    },

    selectMachine() {
      uni.navigateTo({ url: "/pages/select/select" })
    },

    async querydevices() {
      const result = await querydevices()
      this.$store.dispatch("temp/machineListAction", result.data)
      this.$store.dispatch("temp/selectMachineIndexAction", 0)
    },

    async getdeviceworkingstatistics() {
      const result = await getdeviceworkingstatistics({ deviceIMEI: this.cur.deviceIMEI })
      this.monthData = result.data
    },

    async  queryDeviceWorkingCondition() {
      const result = await queryDeviceWorkingCondition({ deviceIMEI: this.cur.deviceIMEI })
      this.condition = result.data
    },

    async getdevicelocation() {
      const result = await getdevicelocation({ deviceIMEI: this.cur.deviceIMEI })
      this.location = result.data
    },

    toDetail() {
      uni.navigateTo({ url: "/pages/month/month" })
    }
  },

  watch: {
    cur: {
      handler: function() {
        this.getdeviceworkingstatistics()
        this.queryDeviceWorkingCondition()
        this.getdevicelocation()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

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
  margin-top: 60rpx;
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

.map {
  flex: 1;
  display: flex;
  padding: 0 30rpx;
}
</style>
