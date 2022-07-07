<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-18 17:07:45
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-06 10:29:14
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/map/map.vue
-->
<template>
  <view class="map">
    <map
      id="map"
      style="width: 100%; height: 100%"
      :scale="17"
      :latitude="latitude"
      :longitude="longitude"
      :markers="covers"
      @markertap="onMarkertap"
    />
  </view>
</template>

<script>
import { getWareList } from "../../api/ware.js"
export default {
  data() {
    return {
      latitude: 31.733399,
      longitude: 117.189947,
      covers: [],
      wareList: []
    }
  },

  async onLoad() {
    await this.getWareList()
    this.maper = uni.createMapContext("map", this)
  },

  methods: {
    onMarkertap(e) {
      const index = e.detail.markerId
      this.covers = this.covers.map(item => {
        return {
          ...item,
          iconPath: index == item.id ? "/static/images/map/position-select.png"
            : "/static/images/map/position.png"
        }
      })
      this.maper.openMapApp({
        latitude: this.covers[index].latitude,
        longitude: this.covers[index].longitude,
        destination: this.covers[index].label.content
      })
    },

    async getWareList() {
      try {
        uni.showLoading()
        const result = await getWareList()
        this.wareList = result.data
        this.covers = this.wareList.filter(item => item.latitude).map((item, index) => {
          return {
            id: index,
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            width: 30,
            height: 40,
            label: {
              content: item.warehouseName,
              textAlign: "center",
              padding: 4
            },
            iconPath: "/static/images/map/position.png"

          }
        })
      } catch (e) {
        console.log(e)
      } finally {
        uni.hideLoading()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 100vh;
}
</style>
