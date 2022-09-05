<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-18 17:07:45
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-31 14:30:48
 * @Description: file content
 * @FilePath: /yungeng-applet/App.vue
-->
<script>
export default {
  onLaunch: function() {
    console.log("App Launch")

    const updateManager = uni.getUpdateManager()

    // 请求完新版本信息的回调
    updateManager.onCheckForUpdate(function(res) {
      console.log(res.hasUpdate)
    })

    // 新版本下载完成回调
    updateManager.onUpdateReady(function(res) {
      uni.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    // 新版本下载失败
    updateManager.onUpdateFailed(function(res) {
      // 新的版本下载失败
    })
  },
  onShow: function() {
    console.log("App Show")
  },
  onHide: function() {
    console.log("App Hide")
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";

.u-button--primary {
  background-image: linear-gradient(to right, #0dccff, #4760ff);
}

.safe {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
