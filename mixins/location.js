/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-25 09:43:42
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 16:58:45
 * @Description: file content
 * @FilePath: /yungeng-applet/mixins/location.js
 */
export default {

  data() {
    return {
      longitude: "",
      latitude: ""
    }
  },

  onLoad() {
    this.getLocation()
  },

  methods: {
    getLocation() {
      if (this.longitude) return
      uni.authorize({
        scope: "scope.userLocation",
        success: () => {
          uni.getLocation({
            type: "gcj02",
            success: (res) => {
              this.longitude = res.longitude
              this.latitude = res.latitude
              this.afterGetLocation()
            },
            fail: () => {
              uni.showModal({
                content: "获取位置失败！",
                showCancel: false
              })
            }
          })
          uni.stopPullDownRefresh()
        },
        fail: () => {
          uni.showModal({
            content: "获取位置失败，请允许",
            showCancel: false,
            success: (res) => {
              res.confirm && uni.openSetting({
                success: (res) => {
                  const isAuth = res.authSetting[
                    "scope.userLocation"]
                  isAuth && this.getLocation()
                }
              })
            }
          })
          uni.stopPullDownRefresh()
        }
      })
    }
  }
}
