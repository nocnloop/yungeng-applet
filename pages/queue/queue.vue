<template>
  <view class="queue">
    <view class="state-1" v-if="stateType == 1">
      <view class="position">
        您当前处于第
        <text> {{ formData.position }} 位</text>
      </view>
      <view class="station">
        当前排队仓库：
        <text style="color：red">{{ formData.warehouse }}</text>
      </view>
      <view class="phone" @click="onCallPhone">
        仓库电话：<u-icon name="phone-fill" color="green" size="50rpx"></u-icon>{{ formData.warehousePhone }}
      </view>
      <view style="margin-top: 20rpx">
        <u-button type="primary" style="margin-top: 20rpx" shape="circle" text="导航" @click="onToPosition"> </u-button>
      </view>
    </view>

    <view class="state-1" v-if="stateType == 2">
      <view class="station">
        请在
        <text style="color: red">{{ formData.delayTime }}分钟</text>
        内完成过岗并在
        <text style="color: red">{{ formData.warehouse }}</text>
        等待
      </view>
      <view class="phone" @click="onCallPhone">
        仓库电话：
        <u-icon name="phone-fill" color="green" size="50rpx"></u-icon>{{ formData.warehousePhone }}
      </view>
      <view style="margin-top: 20rpx">
        <u-button type="primary" style="margin-top: 20rpx" shape="circle" text="导航" @click="onToPosition"> </u-button>
      </view>
    </view>

    <view class="state-1" v-if="stateType == 3">
      <view class="station">
        请前往
        <text style="color: red">{{ formData.warehouse }}</text>
        进行等待
      </view>
      <view class="phone" @click="onCallPhone">
        仓库电话：
        <u-icon name="phone-fill" color="green" size="50rpx"></u-icon>{{ formData.warehousePhone }}
      </view>
      <view style="margin-top: 20rpx">
        <u-button type="primary" style="margin-top: 20rpx" shape="circle" text="导航" @click="onToPosition"> </u-button>
      </view>
    </view>

    <view class="state-2" v-if="stateType == 4">
      <view class="ok">
        <u-icon name="checkmark-circle" color="green" size="50rpx"></u-icon>
        <text>您已经允许通行</text>
      </view>
      <view class="position">
        请行驶至
        <text>{{ formData.warehouse }}{{ formData.dock }}</text>
        进行卸货
      </view>
      <view class="phone" @click="onCallPhone">
        仓库电话：<u-icon name="phone-fill" color="green" size="50rpx"></u-icon>{{ formData.warehousePhone }}
      </view>

      <view style="margin-top: 20rpx">
        <u-button type="primary" style="margin-top: 20rpx" shape="circle" text="导航" @click="onToPosition"> </u-button>
      </view>
    </view>

    <u-empty :show="stateType == null" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="数据为空"></u-empty>
  </view>
</template>

<script>
// import locationMixin from "@/mixins/location.js"
import { getQueueResult } from "@/api/queue"
export default {
  // mixins: [locationMixin],

  data() {
    return {
      stateType: 0,
      formData: {}
    }
  },

  onLoad(options) {
    this.getQueueResult()
  },

  onPullDownRefresh() {
    this.getQueueResult()
  },

  onTabItemTap(e) {
    console.log(e)
    console.log(e)
  },

  methods: {
    onCallPhone() {
      uni.makePhoneCall({
        phoneNumber: this.formData.warehousePhone
      })
    },

    onToPosition() {
      uni.openLocation({
        latitude: Number(this.formData.warehouseLatitude),
        longitude: Number(this.formData.warehouseLongitude)
      })
    },

    async getQueueResult() {
      try {
        uni.showLoading()
        const result = await getQueueResult()
        this.formData = result.data
        this.stateType = this.formData.stateType
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
        uni.stopPullDownRefresh()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.queue {
  height: 100vh;
  background-color: $base-back-color;
  padding: 40rpx;
}

.state-1 {
  padding: 20rpx;
  border-radius: 5rpx;
  background-color: #ffffff;
  box-shadow: $base-box-shadow;

  .position,
  .station,
  .phone {
    height: 60rpx;
    display: flex;
    align-items: center;
    font-size: 32rpx;
    color: $base-color-main;
  }
  .time,
  .position {
    text {
      font-size: 32rpx;
      color: red;
    }
  }
}

.state-2 {
  padding: 20rpx;
  border-radius: 5rpx;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3rpx 8rpx;

  .ok,
  .time,
  .position,
  .phone {
    height: 60rpx;
    display: flex;
    align-items: center;
    font-size: 32rpx;
    color: $base-color-main;
  }

  .ok {
    font-size: 40rpx;
    color: green;

    text {
      padding-left: 10rpx;
    }
  }

  .time,
  .position {
    text {
      color: red;
    }
  }
}
</style>
