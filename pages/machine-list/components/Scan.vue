<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 17:24:53
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 10:52:35
 * @Description: file content
 * @FilePath: /yungeng-applet/pages/machine-list/components/scan.vue
-->
<template>
  <u-popup :show="isShow" mode="top" round="5" :closeOnClickOverlay="true" :closeable="false" @close="$emit('close')">
    <view style="padding: 30rpx 40rpx; background: #fff">
      <view class="title">
        <text>输入序列号</text>
      </view>
      <view class="code">
        <u--form ref="form" labelPosition="left" :labelWidth="0" :rules="rules" :model="formData">
          <u-form-item prop="code">
            <u-input v-model="formData.code">
              <template slot="suffix">
                <u-icon name="scan" color="#2979ff" size="56rpx" @click="onScanCode"></u-icon>
              </template>
            </u-input>
          </u-form-item>
        </u--form>
      </view>
      <view>
        <u-button type="primary" text="确定" :loading="isLoading" loadingText="加载中" @click="onSubmit"></u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { queryDeviceInfo } from "@/api/machine.js"

export default {
  name: "Scan",

  props: {
    isShow: Boolean
  },

  data() {
    return {
      formData: {
        code: ""
      },
      rules: {
        code: { required: true, message: "不能为空" }
      },
      isLoading: false
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate()
        this.isLoading = true
        const { data } = await queryDeviceInfo({ deviceIMEI: this.formData.code })
        this.$store.dispatch("temp/scanMachineAction", data)
        this.$emit("openMachine")
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },

    onScanCode() {
      const that = this
      uni.authorize({
        scope: "scope.camera",
        success: () => {
          uni.scanCode({
            scanType: ["barCode"],
            success: res => {
              if (res.scanType != "CODE_128") {
                uni.showModal({
                  content: "请摆正手机进行扫码",
                  showCancel: false
                })
                return 0
              }
              that.formData.code = res.result
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  text {
    font-size: 40rpx;
  }
}

.code {
  margin-top: 60rpx;
  padding: 40rpx 0 80rpx 0;
}
</style>
