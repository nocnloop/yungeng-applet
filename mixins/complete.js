/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-05-13 17:26:04
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-23 10:31:54
 * @Description: file content
 * @FilePath: /smart-logistics-applet/mixins/complete.js
 */
export default {
  methods: {
    completeUserInfo() {
      const carIsComplete = this.$store.state.app.car.length > 0
      const userIsComplete = this.$store.state.app.user && Object.keys(this.$store.state.app.user).length > 0
      if (!carIsComplete || !userIsComplete) {
        uni.showModal({
          content: "请完善个人和车辆信息",
          showCancel: true,
          success: ({ confirm, cancel }) => {
            confirm && uni.switchTab({ url: "/pages/user/user" })
          }
        })
        throw Error("请完善个人和车辆信息")
      }
    }
  }
}
