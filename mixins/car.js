/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-24 17:28:02
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-13 17:28:55
 * @Description: file content
 * @FilePath: /smart-logistics-applet/mixins/car.js
 */
export default {

  data() {
    return {
      carIdColums: [],

      carIdDefaultIndex: 0,

      isShowCarIdPicker: false
    }
  },

  onLoad() {
    this.carInit()
  },

  methods: {

    carInit() {
      if (this.$store.state.app.car.length == 0) return
      this.formData.carId = this.$store.state.app.defaultCar.carId
      this.carIdColums = [this.$store.state.app.car]
      this.carIdDefaultIndex = [this.$store.state.app.car.findIndex(item => item.carId == this.formData.carId)]
    },

    onSelectCarId() {
      this.isShowCarIdPicker = true
    },

    onCarIdConfirm(e) {
      this.formData.carId = e.value[0].carId
      this.isShowCarIdPicker = false
    }

  }
}
