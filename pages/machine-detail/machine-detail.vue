<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-30 10:39:47
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-31 14:11:43
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/machine-detail/machine-detail.vue
-->
<template>
  <view>
    <view class="content">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
        <u-form-item label="型号">
          <u--input :value="formData.productModel" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="序列号">
          <u--input :value="formData.productSeries" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="设备名称" prop="deviceName">
          <u--input prefixIcon="edit-pen" v-model="formData.deviceName" border="none"></u--input>
        </u-form-item>
      </u--form>
    </view>

    <view style="width: 50%; padding: 40rpx; margin: 0 auto">
      <u-button type="primary" text="确认添加" shape="circle" :loading="isLoading" loadingText="加载中" @click="onSubmit"></u-button>
    </view>
  </view>
</template>
<script>
import { bindingdevice } from "@/api/machine"
export default {

  data() {
    return {
      formData: {
        productModel: "",
        productSeries: "",
        deviceName: ""
      },
      rules: {
        deviceName: { required: true, message: "不能为空" }
      },
      isLoading: false
    }
  },

  created() {
    this.formData = this.$copy(this.$store.state.temp.scanMachine)
  },

  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate()
        this.isLoading = true
        const { deviceName, deviceIMEI } = this.formData
        await bindingdevice({ deviceName, deviceIMEI })
        uni.navigateBack()
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
.content {
  padding: 0 40rpx;
}
</style>
