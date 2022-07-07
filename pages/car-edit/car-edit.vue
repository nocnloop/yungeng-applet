<template>
  <view class="car-edit">
    <view class="form-box">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
        <u-form-item label="车牌号" prop="carId" borderBottom @click="onSelectPlateNumber">
          <u--input :value="formData.carId" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="载重量" prop="loads" borderBottom @click="onSelectLoadNumber">
          <u--input :value="loadNumberFormater" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="自重(T)" prop="weight" borderBottom>
          <u--input v-model="formData.weight" type="number" border="none"></u--input>
        </u-form-item>
        <u-form-item label="车型" prop="carModel" borderBottom @click="onSelectCarModel">
          <u--input :value="carModelFormater" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="所属公司" prop="organization" borderBottom>
          <u--input v-model="formData.organization" placeholder="请输入公司名称"  border="none"></u--input>
        </u-form-item>
        <u-form-item label="默认车辆" prop="ifDefault" borderBottom>
          <u-radio-group v-model="formData.ifDefault">
            <u-radio :customStyle="{ padding: '20rpx' }" label="默认" :name="0"></u-radio>
            <u-radio :customStyle="{ padding: '20rpx' }" label="非默认" :name="1"></u-radio>
          </u-radio-group>
        </u-form-item>
      </u--form>
      <view style="margin-top: 50rpx">
        <u-button type="primary" :loading="isLoading" @click="onSubmit">提交</u-button>
      </view>
    </view>

    <u-keyboard
      ref="uKeyboard"
      mode="car"
      :show="isShowCarKeyBoard"
      :closeOnClickOverlay="true"
      @change="carKeyBoardChange"
      @backspace="carKeyBoardBackspace"
      @close="isShowCarKeyBoard = false"
      @cancel="isShowCarKeyBoard = false"
      @confirm="isShowCarKeyBoard = false"
    ></u-keyboard>

    <u-picker
      keyName="dictLabel"
      :show="isShowCarLoadNumberPicker"
      :immediateChange="true"
      :defaultIndex="carLoadNumberIndex"
      :columns="carLoadNumberColumns"
      :closeOnClickOverlay="true"
      @cancel="isShowCarLoadNumberPicker = false"
      @close="isShowCarLoadNumberPicker = false"
      @confirm="onLoadNumberConfirm"
    ></u-picker>

    <u-picker
      keyName="dictLabel"
      :show="isShowCarModelPicker"
      :immediateChange="true"
      :columns="CarModelColumns"
      :defaultIndex="carModelIndex"
      :closeOnClickOverlay="true"
      @cancel="isShowCarModelPicker = false"
      @close="isShowCarModelPicker = false"
      @confirm="onCarModelConfirm"
    ></u-picker>
  </view>
</template>

<script>
import { addOrUpdateCarInfo } from "@/api/car.js"
import CarLoadNumberConfig from "@/config/car-load-number.js"
import CarModelConfig from "@/config/car-model.js"

export default {
  data() {
    return {
      formData: {
        carId: "",
        loads: "",
        weight: "",
        carModel: "",
        organization: "",
        ifDefault: 1
      },

      rules: {
        carId: { required: true, message: "不能为空" },
        loads: { required: true, message: "不能为空" },
        weight: { required: true, message: "不能为空" },
        carModel: { required: true, message: "不能为空" }
      },

      isShowCarKeyBoard: false,

      carLoadNumberColumns: [CarLoadNumberConfig],

      CarModelColumns: [CarModelConfig],

      isShowCarLoadNumberPicker: false,

      isShowCarModelPicker: false,

      carLoadNumberIndex: [0],

      carModelIndex: [0],

      isLoading: false

    }
  },

  computed: {
    loadNumberFormater() {
      const target = CarLoadNumberConfig.find(item => item.dictValue == this.formData.loads)
      return target && target.dictLabel
    },

    carModelFormater() {
      const target = CarModelConfig.find(item => item.dictValue == this.formData.carModel)
      return target && target.dictLabel
    }
  },

  onLoad() {
    this.formData = this.$copy(this.$store.state.temp.currentEditCar)
    this.carLoadNumberIndex = [CarLoadNumberConfig.findIndex(item => item.dictValue == this.formData.loads)]
    this.carModelIndex = [CarModelConfig.findIndex(item => item.dictValue == this.formData.carModel)]
  },

  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate()
        this.isLoading = true
        await addOrUpdateCarInfo(this.formData, { okTip: true, back: true, errorTip: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    onSelectPlateNumber() {
      this.isShowCarKeyBoard = true
    },

    carKeyBoardChange(val) {
      // 将每次按键的值拼接到value变量中，注意+=写法
      this.formData.carId += val
    },
    // 退格键被点击
    carKeyBoardBackspace() {
      // 删除value的最后一个字符
      if (this.formData.carId.length) {
        this.formData.carId = this.formData.carId.substr(0, this
          .formData.carId.length - 1)
      }
    },

    onSelectLoadNumber() {
      this.isShowCarLoadNumberPicker = true
    },

    onLoadNumberConfirm(e) {
      this.formData.loads = e.value[0].dictValue
      this.isShowCarLoadNumberPicker = false
    },

    onSelectCarModel() {
      this.isShowCarModelPicker = true
    },

    onCarModelConfirm(e) {
      this.formData.carModel = e.value[0].dictValue
      this.isShowCarModelPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
.car-edit {
  height: 100vh;
  background-color: #ffffff;
}

.form-box {
  padding: 0 20rpx;
  margin-top: 20rpx;
}
</style>
