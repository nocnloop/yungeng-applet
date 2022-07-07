<template>
  <view class="sign-in">
    <view class="sign-in-box" v-if="formData.carId">
      <view class="task">
        <u--form ref="form" labelPosition="left" :labelWidth="80" :model="formData">
          <u-form-item label="停靠仓库" prop="warehouse" borderBottom>
            <u--input :value="formData.warehouse" color="red" type="number" border="none" disabled disabledColor="#ffffff"></u--input>
          </u-form-item>
          <u-form-item label="停靠码头" prop="dock" borderBottom>
            <u--input :value="formData.dock" color="red" type="number" border="none" disabled disabledColor="#ffffff"></u--input>
          </u-form-item>
          <u-form-item label="车牌号" prop="carId" borderBottom>
            <u--input :value="formData.carId" border="none" disabled disabledColor="#ffffff"></u--input>
          </u-form-item>
          <u-form-item label="业务" prop="businessType" borderBottom>
            <u--input :value="formData.businessType" border="none" disabled disabledColor="#ffffff"> </u--input>
          </u-form-item>
          <u-form-item label="入园时间" prop="parkEntryTime" borderBottom>
            <u--input :value="formData.parkEntryTime" type="number" border="none" disabled disabledColor="#ffffff"></u--input>
          </u-form-item>
          <u-form-item label="入区时间" prop="entryTime" borderBottom>
            <u--input :value="formData.entryTime" type="number" border="none" disabled disabledColor="#ffffff"></u--input>
          </u-form-item>
        </u--form>
        <view style="margin-top: 20rpx">
          <u-button type="primary" :disabled="buttonDisabled" @click="onSubmit">{{ buttonText }}</u-button>
        </view>
      </view>
    </view>

    <u-empty v-else :show="true" mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="数据为空"></u-empty>

    <u-notify ref="uNotify"></u-notify>
  </view>
</template>

<script>
import { getCurrentStationInfo, carSignIn } from "../../api/queue.js"
export default {
  data() {
    return {
      formData: {
        carId: "",
        dock: "",
        warehouse: "",
        parkEntryTime: "",
        entryTime: "",
        businessType: "",
        arriveStationTime: "" // arriveStationTime != null 证明是已经签到成功了，不需要再签到
      }
    }
  },

  computed: {
    buttonDisabled() {
      return this.formData == null || this.formData.arriveStationTime != null
    },

    buttonText() {
      return this.formData == null || this.formData.arriveStationTime != null ? "您已经签到" : "签到"
    }
  },

  onLoad() {
    this.getCurrentStationInfo()
  },

  methods: {
    onSubmit() {
      uni.authorize({
        scope: "scope.camera",
        success: () => {
          uni.scanCode({
            scanType: ["qrCode"],
            success: res => {
              this.carSignIn(res.result)
            }
          })
        }
      })
    },

    async carSignIn(dockId) {
      const success = () => {
        uni.showModal({
          content: "签到成功",
          showCancel: false,
          success: () => {
            uni.navigateBack()
          }
        })
      }
      const fail = () => {
        this.$refs.uNotify.show({
          type: "error",
          message: "签到失败",
          duration: 1000 * 3,
          safeAreaInsetTop: false
        })
      }

      try {
        uni.showLoading()
        const result = await carSignIn({ dockId: dockId })
        result.data ? success() : fail()
      } catch (e) {
        console.log(e)
        fail()
      } finally {
        uni.hideLoading()
      }
    },

    async getCurrentStationInfo() {
      const noStationInfo = () => {
        uni.showModal({
          content: "您暂无签到信息",
          showCancel: false
        })
      }

      try {
        uni.showLoading()
        const result = await getCurrentStationInfo()
        this.formData = result.data;
        (this.formData == null || this.formData.carId == null) && noStationInfo()
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  height: 100vh;
  padding: 20rpx 0;
  background-color: $base-back-color;
}

.sign-in-box {
  padding: 0 20rpx;
}

.task {
  margin-top: 40rpx;
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #ffffff;
}
</style>
