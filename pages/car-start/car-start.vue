<template>
  <view class="card-start">
    <view class="form-box">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
        <u-form-item label="车牌号" prop="carId" borderBottom @click="onSelectCarId">
          <u--input :value="formData.carId" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>

        <u-form-item label="单号" v-for="(item, index) in formData.asnIds" :key="item.id" borderBottom>
          <u-input v-model="item.code" border="none">
            <template slot="suffix">
              <view class="sn-suffix">
                <u-icon name="scan" color="#2979ff" size="56rpx" @click="onScanCode(item)"></u-icon>
                <view v-if="index > 0" style="margin-left: 10rpx" @click="onSnDelete(item.id)">
                  <u-icon name="close-circle" color="red" size="50rpx"></u-icon>
                </view>
              </view>
            </template>
          </u-input>
        </u-form-item>

        <view class="add-sn">
          <view style="width: 20%" @click="onAddSn">
            <u-button type="primary" size="mini" text="新增单号"></u-button>
          </view>
        </view>
      </u--form>

      <view style="margin-top: 50rpx">
        <u-button type="primary" :loading="isLoading" @click="onSubmit">绑定发车</u-button>
      </view>
    </view>

    <u-picker
      keyName="carId"
      :show="isShowCarIdPicker"
      :immediateChange="true"
      :columns="carIdColums"
      :defaultIndex="carIdDefaultIndex"
      :closeOnClickOverlay="true"
      @cancel="isShowCarIdPicker = false"
      @close="isShowCarIdPicker = false"
      @confirm="onCarIdConfirm"
    ></u-picker>
  </view>
</template>

<script>
import carMixin from "../../mixins/car.js"
import { carStart } from "../../api/queue.js"
export default {

  mixins: [carMixin],

  data() {
    return {
      formData: {
        carId: "",
        asnIds: [{ id: 0, code: "" }]
      },

      rules: {
        carId: { required: true, message: "不能为空" }
      },

      isLoading: false

    }
  },

  methods: {

    onScanCode(item) {
      uni.authorize({
        scope: "scope.camera",
        success: () => {
          uni.scanCode({
            scanType: ["barCode"],
            success: res => {
              item.code = res.result
            }
          })
        }
      })
    },

    onAddSn() {
      const last = this.formData.asnIds.slice(-1)[0]
      const cur = { id: Number(last.id) + 1, code: "" }
      this.formData.asnIds.push(cur)
    },

    onSnDelete(id) {
      const index = this.formData.asnIds.findIndex(item => item.id == id)
      this.formData.asnIds.splice(index, 1)
    },

    async onSubmit() {
      try {
        await this.$refs.form.validate()
        const isEmpty = this.formData.asnIds.some(item => String(item.code).trim().length == 0)
        if (isEmpty) {
          uni.showModal({
            content: "请填写完成",
            showCancel: false
          })
          return
        }
        this.isLoading = true
        const targetCar = this.$store.state.app.car.find(item => item.carId == this.formData.carId)
        const asnIds = this.formData.asnIds.filter(item => String(item.code).trim().length > 0).map(item => item.code).join()
        await carStart({ carinfoId: targetCar.id, asnIds }, { okTip: true, back: true, errorTip: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-start {
  height: 100vh;
  background-color: #ffffff;
}

.form-box {
  padding: 0 20rpx;
  margin-top: 20rpx;
}

.sn-suffix {
  display: flex;
  align-items: center;
}

.add-sn {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
