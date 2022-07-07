<template>
  <view class="reserve-queue">
    <view class="form-box" v-if="formData.carId">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :model="formData">
        <u-form-item label="车牌号" prop="carId" borderBottom>
          <u--input :value="formData.carId" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="业务" prop="businessType" borderBottom>
          <u--input :value="formData.businessType" disabled disabledColor="#ffffff" border="none"></u--input>
        </u-form-item>
        <u-form-item label="停靠仓库" prop="warehouseAndDock" borderBottom>
          <u--input :value="formData.warehouseAndDock" disabled disabledColor="#ffffff" type="number" border="none"></u--input>
        </u-form-item>
        <u-form-item label="入园时间" prop="deadWeight" borderBottom>
          <u--input :value="formData.parkEntryTime" disabled disabledColor="#ffffff" type="number" border="none"></u--input>
        </u-form-item>
      </u--form>
      <view style="margin-top: 50rpx">
        <u-button type="primary" :loading="isLoading" :disabled="diableReserveButton" @click="onSubmit">
          {{ reserveText }}
        </u-button>
      </view>
    </view>

    <u-empty :show="isEmpty" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="数据为空"></u-empty>
  </view>
</template>

<script>
import locationMixin from "@/mixins/location.js"
import { carReserveQueue, getCurrentTask } from "@/api/queue.js"
export default {
  mixins: [locationMixin],

  data() {
    return {
      formData: {
        carId: "",
        loadNumber: 0,
        deadWeight: "",
        carModel: 0
      },

      isEmpty: false,

      inCircle: false, // 是否在电子围栏内

      isLoading: false
    }
  },

  computed: {
    diableReserveButton() {
      return !this.inCircle
    },

    reserveText() {
      return this.inCircle ? "预约" : "无法预约请靠近厂区"
    }
  },

  onPullDownRefresh() {
    this.getLocation()
  },

  methods: {

    async onSubmit() {
      try {
        uni.showLoading()
        await carReserveQueue({
          longitude: this.longitude,
          latitude: this.latitude
          // longitude: 117.19827,
          // latitude: 31.7395
        }, { okTip: true, back: true, errorTip: true })
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    },

    afterGetLocation() {
      this.getCurrentTask()
    },

    async getCurrentTask() {
      try {
        this.isLoading = true
        const result = await getCurrentTask({
          longitude: this.longitude,
          latitude: this.latitude
          // longitude: 117.19827,
          // latitude: 31.7395
        })
        this.formData = result.data.taskInfoVO
        this.inCircle = result.data.inCircle

        const noTaskAction = () => {
          uni.showModal({
            content: "您暂无任务",
            showCancel: false
          })
          this.isEmpty = true
        }
        !this.formData && noTaskAction()
      } catch (e) {
        console.log(e)
        this.isEmpty = false
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reserve-queue {
  height: 100vh;
  background-color: #ffffff;
}

.form-box {
  padding: 0 20rpx;
  margin-top: 20rpx;
}
</style>
