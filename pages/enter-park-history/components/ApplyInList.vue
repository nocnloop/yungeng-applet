<template>
  <view v-show="i === index">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" :down="downOption">
      <view class="goods-list">
        <view class="goods-item" v-for="item in list" :key="item.id" @click="onViewDetail(item)">
          <view class="item-top">
            <text class="left">车牌号：{{ item.carNo }}</text>
          </view>
          <view class="item-top">
            <text class="left">业务：{{ typeFormater(item.type) }}</text>
          </view>
          <view class="item-bottom">
            <text class="left">进出类型：{{ quitTypeFormater(item.inOut) }}</text>
          </view>
          <view class="item-bottom">
            <text class="left">申请时间：{{ item.createTime }}</text>
          </view>
          <view class="item-bottom">
            <text class="left">预计到达：{{ item.estimateArrivalTime }}</text>
            <view style="width: 80rpx" v-if="item.inOut == 1">
              <u-button :custom-style="buttonStyle" type="primary" text="修改" @click="onEditTime(item)"></u-button>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>

    <u-popup :show="popShow" mode="center" round="5" :closeOnClickOverlay="false" :closeable="true" @close="onClosePop">
      <view class="edit-form">
        <u--form ref="form" labelPosition="left" :labelWidth="80" :rules="rules" :model="formData">
          <u-form-item label="预计达到" prop="estimateArrivalTime" borderBottom @click="onSelectArriveTime">
            <u--input
              :value="formData.estimateArrivalTime"
              border="none"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择日期"
            ></u--input>
          </u-form-item>
        </u--form>
        <view style="margin-top: 50rpx">
          <u-button type="primary" text="确定" :loading="isEditing" loadingText="加载中" @click="onSubmit"></u-button>
        </view>
      </view>
    </u-popup>

    <u-datetime-picker
      :minDate="minDate"
      :show="isShowArriveTime"
      :value="formData.estimateArrivalTime"
      :closeOnClickOverlay="true"
      @close="isShowArriveTime = false"
      @cancel="isShowArriveTime = false"
      @confirm="onArriveTimeConfirm"
      mode="datetime"
      :formatter="formatter"
    >
    </u-datetime-picker>
  </view>
</template>

<script>
import dayjs from "dayjs"
import { enterApplyList, editEstimateArrivalTime } from "../../../api/enter"
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js"
import EnterQuitTypeConfig from "@/config/enter-quit-type.js"
import EnterParkApplyTypeConfig from "@/config/enter-park-apply-type.js"
export default {
  mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)

  data() {
    return {
      downOption: {
        auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
      },
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 30 // 每页数据的数量
        }
      },
      list: [],
      target: {},
      isEditing: false,
      popShow: false,
      isShowArriveTime: false,
      formData: { estimateArrivalTime: "" },
      buttonStyle: { width: "80rpx", height: "40rpx" },
      rules: { estimateArrivalTime: { required: true, message: "不能为空" } },
      minDate: Date.parse(dayjs().subtract(1, "year").format("YYYY/MM/DD HH:mm:ss"))

    }
  },

  computed: {
    typeFormater() {
      return (type) => {
        const target = EnterParkApplyTypeConfig.find(item => item.dictValue == type)
        return target.dictLabel
      }
    },

    quitTypeFormater() {
      return (inOut) => {
        const target = EnterQuitTypeConfig.find(item => item.dictValue == inOut)
        return target.dictLabel
      }
    }

  },

  methods: {
    async goodsInTransit(page) {
      try {
        const result = await enterApplyList({
          pageNum: page.num,
          pageSize: page.size,
          pass: 0
        })
        this.mescroll.endByPage(result.data.records.length, result.data.totoalPages)
        if (page.num == 1) this.list = []
        this.list = this.list.concat(result.data.records)
      } catch (error) {
        this.mescroll.endErr()
      }
    },

    /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      this.goodsInTransit(page)
    },

    onViewDetail(item) {
      this.$emit("onViewDetail", item.id)
    },

    formatter(type, value) {
      if (type === "year") {
        return `${value}年`
      }
      if (type === "month") {
        return `${value}月`
      }
      if (type === "day") {
        return `${value}日`
      }
      return value
    },

    onArriveTimeConfirm(params) {
      this.formData.estimateArrivalTime = dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
      this.isShowArriveTime = false
    },

    onSelectArriveTime() {
      this.isShowArriveTime = true
    },

    onEditTime(target) {
      this.target = target
      this.formData.estimateArrivalTime = ""
      this.popShow = true
    },

    async onSubmit() {
      try {
        await this.$refs.form.validate()
        this.isEditing = true
        await editEstimateArrivalTime({
          id: this.target.id,
          estimateArrivalTime: this.formData.estimateArrivalTime
        })
        const index = this.list.find(item => item.id == this.target.id)
        this.list.splice(index, 1, { ...this.target, estimateArrivalTime: this.formData.estimateArrivalTime })
        this.onClosePop()
      } catch (error) {
        console.log(error)
      } finally {
        this.isEditing = false
      }
    },

    onClosePop() {
      this.popShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  padding: 20rpx;
}

.goods-item {
  padding: 20rpx;
  border-radius: 5rpx;
  background-color: #ffffff;
  box-shadow: $base-box-shadow;
  margin-bottom: 30rpx;

  .item-top,
  .item-bottom {
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      // width: 400rpx;
      font-size: 30rpx;
      color: $base-color-main;
      // text-overflow: ellipsis;
      // overflow: hidden;
      // white-space: nowrap;
    }

    .right {
      font-size: 30rpx;
      color: $base-color-second;
    }
  }
}

.edit-form {
  width: 600rpx;
  padding: 0 50rpx;
  padding-top: 100rpx;
  padding-bottom: 30rpx;
}
</style>
