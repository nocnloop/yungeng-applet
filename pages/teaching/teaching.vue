<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-18 17:07:45
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-12 11:11:52
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/teaching/teaching.vue
-->
<template>
  <view class="teaching">
    <view class="video-item" v-for="(val, key) in list" :key="key">
      <text>{{ key }}</text>
      <video class="video" :custom-cache="false" @error="videoErrorCallback" :src="val" controls></video>
    </view>
  </view>
</template>

<script>
import { getVideo } from "../../api/banner"
export default {
  data() {
    return {
      list: {}
    }
  },

  onLoad() {
    this.getVideo()
  },

  methods: {
    async getVideo() {
      const result = await getVideo()
      this.list = result.data
    },

    videoErrorCallback(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.video-item {
  padding: 20rpx;
  text {
    font-size: 40rpx;
    color: $base-color-main;
    font-weight: 700;
  }
  .video {
    margin-top: 20rpx;
    width: 100%;
  }
}
</style>
