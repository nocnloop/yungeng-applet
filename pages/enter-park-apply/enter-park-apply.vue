<template>
  <view class="enter-park-apply">
    <view class="form-box">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
        <u-form-item label="车牌号" prop="carId" borderBottom @click="onSelectCarId">
          <u--input :value="formData.carId" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="申请类型" prop="type" borderBottom>
          <view class="apply">
            <u-radio-group v-model="formData.type">
              <u-radio
                :ref="index"
                :customStyle="{ padding: '20rpx' }"
                v-for="(item, index) in enterParkApplyTypeConfig"
                :key="index"
                :label="item.dictLabel"
                :name="item.dictValue"
              >
              </u-radio>
            </u-radio-group>
          </view>
        </u-form-item>
        <u-form-item v-if="isEndProduct" label="成品仓库" prop="inOut" borderBottom>
          <view class="quit">
            <u-checkbox-group v-model="formData.warehouses">
              <u-checkbox
                :customStyle="{ padding: '20rpx' }"
                v-for="(item, index) in warehouseList"
                :key="index"
                :label="item.warehouseName"
                :name="item.id"
              >
              </u-checkbox>
            </u-checkbox-group>
          </view>
        </u-form-item>
        <u-form-item label="提货日期" prop="takeTime" borderBottom @click="onSelectTakeTime">
          <u--input :value="formData.takeTime" border="none" disabled disabledColor="#ffffff" placeholder="请选择日期"></u--input>
        </u-form-item>
        <u-form-item label="提货代码" prop="takeNo" borderBottom>
          <u-input v-model="formData.takeNo" border="none" placeholder="请输入提货代码"></u-input>
        </u-form-item>
        <u-form-item label="预计达到" prop="estimateArrivalTime" borderBottom @click="onSelectArriveTime">
          <u--input
            :value="formData.estimateArrivalTime"
            border="none"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择日期"
          ></u--input>
        </u-form-item>
      </u--form>
      <view style="margin-top: 50rpx">
        <u-button type="primary" :loading="isLoading" @click="onSubmit">提交</u-button>
      </view>

      <u-text type="primary" @click="onViewHistory" lineHeight="120rpx" align="right" text="申请记录"></u-text>
    </view>

    <u-datetime-picker
      :minDate="minDate"
      :show="isShowTakeTime"
      :value="formData.takeTime"
      :closeOnClickOverlay="true"
      @close="isShowTakeTime = false"
      @cancel="isShowTakeTime = false"
      @confirm="onTakeTimeConfirm"
      mode="datetime"
      :formatter="formatter"
    >
    </u-datetime-picker>

    <u-datetime-picker
      :minDate="minDate"
      :show="isShowArriveTime"
      :value="formData.estimateArrivalTime"
      :closeOnClickOverlay="true"
      @close="isShowArriveTime = false"
      @cancel="isShowArriveTime = false"
      @confirm="onArriveTimeConfirm"
      mode="datetime"
      :formatter="formatter"
    >
    </u-datetime-picker>

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
import dayjs from "dayjs"
import carMixin from "@/mixins/car.js"
import { enterApply } from "@/api/enter.js"
import { getWarehouse } from "@/api/warehouse.js"
import EnterParkApplyTypeConfig from "@/config/enter-park-apply-type.js"

export default {

  mixins: [carMixin],

  data() {
    return {
      formData: {
        carId: "",
        type: "",
        warehouses: "",
        takeTime: "",
        estimateArrivalTime: "",
        takeNo: ""
      },
      rules: {
        carId: { required: true, message: "不能为空" },
        type: { required: true, message: "不能为空" },
        takeTime: { required: true, message: "不能为空" },
        estimateArrivalTime: { required: true, message: "不能为空" },
        takeNo: { required: true, message: "不能为空" }
      },

      warehouseList: [],

      enterParkApplyTypeConfig: EnterParkApplyTypeConfig.slice(1),

      isShowTakeTime: false,

      isShowArriveTime: false,

      isLoading: false,

      minDate: Date.parse(dayjs().subtract(1, "year").format("YYYY/MM/DD HH:mm:ss"))

    }
  },

  computed: {
    isEndProduct() {
      return this.formData.type == 2
    }
  },

  onLoad() {
    this.getWarehouse()
  },

  methods: {

    async getWarehouse() {
      try {
        uni.showLoading()
        const result = await getWarehouse({ warehouseType: 2 })
        this.warehouseList = result.data
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
    },

    onSelectTakeTime() {
      this.isShowTakeTime = true
    },

    onSelectArriveTime() {
      this.isShowArriveTime = true
    },

    checkEndProduct() {
      if (this.formData.type != 2) return 0
      if (!this.formData.warehouses || this.formData.warehouses.length == 0) {
        uni.showModal({
          content: "请选择成品仓库",
          showCancel: false
        })
        throw Error("请选择成品仓库")
      }
    },

    async onSubmit() {
      try {
        await this.$refs.form.validate()
        this.checkEndProduct()
        this.isLoading = true
        const targetCar = this.$store.state.app.car.find(item => item.carId == this.formData.carId)
        const warehouses = this.formData.warehouses.join()
        const params = { ...this.formData, carId: targetCar.id, warehouses: warehouses }
        await enterApply(params, { okTip: true, back: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    onViewHistory() {
      uni.navigateTo({
        url: "../enter-park-history/enter-park-history"
      })
    },

    onTakeTimeConfirm(params) {
      this.formData.takeTime = dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
      this.isShowTakeTime = false
    },

    onArriveTimeConfirm(params) {
      this.formData.estimateArrivalTime = dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
      this.isShowArriveTime = false
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
.enter-park-apply {
  height: 100vh;
  background-color: #ffffff;
}

.form-box {
  padding: 0 20rpx;
  margin-top: 20rpx;
}

/deep/.apply .u-radio-group {
  flex-wrap: wrap;
}

/deep/.quit .u-radio-group {
  flex-wrap: wrap;
}
</style>
