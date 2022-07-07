<template>
  <view class="user-detail">
    <view class="form-box">
      <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
        <u-form-item label="姓名" prop="driverName" borderBottom>
          <u--input v-model="formData.driverName" placeholder="请输入姓名" border="none"></u--input>
        </u-form-item>
        <u-form-item label="身份证" prop="idCard" borderBottom>
          <u--input v-model="formData.idCard" placeholder="请输入身份证" type="idcard" border="none"></u--input>
        </u-form-item>
        <u-form-item label="性别" prop="sex" borderBottom @click="onSelectGender">
          <u--input :value="genderFormater" placeholder="请选择性别" border="none" disabled disabledColor="#ffffff"></u--input>
        </u-form-item>
        <u-form-item label="手机号" prop="phone" borderBottom>
          <u--input v-model="formData.phone" placeholder="请输入手机号" type="number" border="none"></u--input>
        </u-form-item>
        <u-form-item label="所属公司" prop="organization" borderBottom>
          <u--input v-model="formData.organization" placeholder="请输入公司名称"  border="none"></u--input>
        </u-form-item>
      </u--form>
      <view style="margin-top: 50rpx">
        <u-button type="primary" :loading="isLoading" @click="onSubmit">提交</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { getUserInfo, updateUserInfo } from "@/api/user.js"
export default {
  data() {
    return {
      formData: {
        driverName: "",
        idCard: "",
        sex: "",
        phone: "",
        organization: ""
      },

      rules: {
        driverName: { required: true, message: "不能为空" },
        idCard: { required: true, message: "不能为空" },
        sex: { required: true, message: "不能为空" },
        phone: { required: true, message: "不能为空" }
      },

      isLoading: false

    }
  },

  computed: {
    genderFormater() {
      if (!this.formData || this.formData.sex == null || String(this.formData.sex.length) == 0) {
        return ""
      }
      return this.formData.sex == 0 ? "男" : "女"
    }
  },

  onLoad() {
    if (!this.$store.state.app.user) return
    this.formData = this.$copy(this.$store.state.app.user)
  },

  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate()
        this.isLoading = true
        const { driverName, idCard, sex, phone, organization } = this.formData
        await updateUserInfo({ driverName, idCard, sex, phone, organization }, { errorTip: true })
        uni.showModal({
          content: "提交成功",
          showCancel: false,
          success: () => {
            this.getUserInfo()
            uni.navigateBack()
          }
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    onSelectGender() {
      uni.showActionSheet({
        title: "选择性别",
        itemList: ["男", "女"],
        success: (res) => {
          this.formData.sex = res.tapIndex
        }
      })
    },

    async getUserInfo() {
      const result = await getUserInfo()
      this.$store.dispatch("app/userAction", result.data)
    }

  }
}
</script>

<style lang="scss" scoped>
.user-detail {
  height: 100vh;
  background-color: $base-back-color;
}

.form-box {
  padding: 0 20rpx;
  margin-top: 20rpx;
  background-color: #ffffff;
}
</style>
