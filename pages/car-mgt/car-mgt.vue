<template>
  <view class="car-mgt">
    <view class="car-box">
      <view class="car-item" v-for="car in carInfo" :key="car.id">
        <view class="car-title u-border-bottom">
          <text>车牌号：{{ car.carId }}</text>
          <text>车型：{{ carModelFormater(car.carModel) }}</text>
        </view>
        <view class="car-btn">
          <view class="left" @click="onSetDefaultCar(car)">
            <u-icon name="checkmark-circle" :color="colorFormater(car.ifDefault)" size="28"></u-icon>
            <text>{{ car.ifDefault == 0 ? "默认车辆" : "设置默认车辆" }}</text>
          </view>
          <view>
            <view class="edit" @click="onEditCar(car)">
              <u-icon name="edit-pen" size="40rpx"></u-icon>
              <text style="margin-left: 6rpx" @click="onEditCar">编辑</text>
            </view>
            <view class="delete" style="margin-left: 30rpx" @click="onDeleteCar(car)">
              <u-icon name="minus-circle" size="40rpx"></u-icon>
              <text style="margin-left: 6rpx">删除</text>
            </view>
          </view>
        </view>
      </view>

      <view style="margin-top: 50rpx">
        <u-button type="primary" @click="onAddCar">新增车辆</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { getCarInfo, addOrUpdateCarInfo, deleteCarInfo } from "../../api/car.js"

import CardModelConfig from "../../config/car-model.js"
export default {
  data() {
    return {
      carInfo: [],
      isLoading: false
    }
  },

  onLoad() {
    this.getCarInfo()
  },

  onShow() {
    this.isInit && this.getCarInfo()
    this.isInit = true
  },

  methods: {

    async getCarInfo() {
      try {
        uni.showLoading()
        const result = await getCarInfo()
        this.carInfo = result.data
        this.$store.dispatch("app/carAction", result.data)
      } catch (e) {
        // TODO handle the exception
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    onAddCar() {
      const canDefaultCar = this.carInfo.length > 0 ? "no" : "ok"
      uni.navigateTo({
        url: "../car-add/car-add?canDefaultCar=" + canDefaultCar
      })
    },

    onEditCar(car) {
      this.$store.dispatch("temp/currentEditCarAction", car)
      uni.navigateTo({
        url: "../car-edit/car-edit"
      })
    },

    async onDeleteCar(car) {
      try {
        await new Promise((resolve, reject) => {
          uni.showModal({
            content: "是否确认删除？",
            success: ({ confirm, cancel }) => {
              confirm ? resolve() : reject(Error("cancel"))
            }
          })
        })
        uni.showLoading()
        await deleteCarInfo({ id: car.id }, { errorTip: true })
        await this.getCarInfo()
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    async onSetDefaultCar(car) {
      try {
        if (car.ifDefault == 0) return
        uni.showLoading()
        await addOrUpdateCarInfo({ ifDefault: 0, id: car.id }, { errorTip: true })
        await this.getCarInfo()
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    carModelFormater(carModel) {
      const target = CardModelConfig.find(item => item.dictValue == carModel)
      return target.dictLabel
    },

    colorFormater(ifDefault) {
      return ifDefault == 0 ? "red" : "#333"
    }

  }
}
</script>

<style lang="scss" scoped>
.car-mgt {
  height: 100vh;
  background-color: $base-back-color;
}

.car-box {
  padding: 20rpx;
}

.car-item {
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #ffffff;

  .car-title {
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $base-color-main;
    font-size: 32rpx;
  }

  .car-btn {
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > view {
      display: flex;
      align-items: center;
    }

    .left {
      text {
        padding-left: 10rpx;
        font-size: 32rpx;
        color: $base-color-main;
      }
    }

    .edit,
    .delete {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      color: $base-color-second;
    }
  }
}
</style>
