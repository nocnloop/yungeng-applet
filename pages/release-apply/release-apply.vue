<template>
  <view class="release-apply">
    <view class="form-box">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
        <u-form-item label="车牌号" prop="carNo" borderBottom>
          <u--input :value="formData.carNo" border="none" disabled disabledColor="#ffffff" placeholder="请选择车牌号"></u--input>
        </u-form-item>

        <u-form-item label="放行仓库" prop="taskId" borderBottom>
          <view class="store">
            <u-radio-group v-model="formData.taskId">
              <u-radio
                :customStyle="{ padding: '20rpx' }"
                v-for="item in dockListFormatter"
                :key="item.name"
                :label="item.label"
                :name="item.name"
              >
              </u-radio>
            </u-radio-group>
          </view>
        </u-form-item>

        <u-form-item label="退出类型" prop="type" borderBottom>
          <u-radio-group v-model="formData.type">
            <u-radio
              :ref="index"
              :customStyle="{ padding: '20rpx' }"
              v-for="(item, index) in quitTypeConfig"
              :key="index"
              :label="item.dictLabel"
              :name="item.dictValue"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>

        <u-form-item label="申请原因" prop="reason" borderBottom>
          <view class="reason">
            <u-radio-group v-model="formData.reason">
              <u-radio
                :customStyle="{ padding: '20rpx' }"
                v-for="(item, index) in releaseApplyTypeConfig"
                :key="index"
                :label="item.dictLabel"
                :name="item.dictValue"
              >
              </u-radio>
            </u-radio-group>
          </view>
        </u-form-item>
      </u--form>
      <view style="margin-top: 50rpx">
        <u-button type="primary" @click="onApplyOut" :disabled="alreadyApply == 1" :loading="isLoading">{{ submitText }}</u-button>
      </view>

      <u-text type="primary" @click="onViewHistory" lineHeight="120rpx" align="right" text="申请记录"></u-text>
    </view>
  </view>
</template>

<script>
import { getReleaseInfo, applyOut } from "../../api/release"
import QuitTypeConfig from "../../config/quit-type.js"
import ReleaseApplyTypeConfig from "../../config/release-apply-type.js"

export default {
  data() {
    return {
      formData: {
        carId: "",
        carNo: "",
        taskId: "",
        type: "",
        reason: ""
      },

      asnId: "",

      alreadyApply: 1, // 是否已经申请过了，0 否 1 是

      rules: {
        carId: { required: true, message: "不能为空" },
        carNo: { required: true, message: "不能为空" },
        taskId: { required: true, message: "不能为空" },
        type: { required: true, message: "不能为空" }
        // reason: { required: true, message: "不能为空" }
      },

      dockListFormatter: [],

      dockListSource: [],

      quitTypeConfig: QuitTypeConfig,

      releaseApplyTypeConfig: ReleaseApplyTypeConfig,

      isLoading: false

    }
  },

  computed: {
    submitText() {
      return this.alreadyApply == 1 ? "您已经申请" : "申请"
    }
  },

  onLoad() {
    this.getReleaseInfo()
  },

  methods: {
    onViewHistory() {
      uni.navigateTo({
        url: "../release-history/release-history"
      })
    },

    async getReleaseInfo() {
      try {
        uni.showLoading()
        const result = await getReleaseInfo({}, { errorTip: true })
        this.formData.carNo = result.data.carNo
        this.formData.carId = result.data.carId
        this.alreadyApply = result.data.alreadyApply
        this.dockListSource = result.data.dockList
        this.dockListFormatter = this.dockListSource.map(item => {
          const label = item.warehouse + " - " + item.asnId
          return { label, name: item.id }
        })
      } catch (error) {
        console.log(error)
      } finally {
        uni.hideLoading()
      }
    },

    async onApplyOut() {
      try {
        await this.$refs.form.validate()
        this.isLoading = true
        const target = this.dockListSource.find(item => item.id == this.formData.taskId)
        const params = { ...this.formData, taskId: target.id }
        await applyOut(params, { okTip: true, back: true, errorTip: true })
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.release-apply {
  height: 100vh;
  background-color: #ffffff;
}

.form-box {
  padding: 0 20rpx;
  margin-top: 20rpx;
}

/deep/.store .u-radio-group {
  flex-wrap: wrap;
}

/deep/.reason .u-radio-group {
  flex-wrap: wrap;
}
</style>
