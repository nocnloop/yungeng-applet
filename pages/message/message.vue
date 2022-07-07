<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-18 17:07:45
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-12 11:32:01
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/message/message.vue
-->
<template>
  <view class="message">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
      <MessageList :list="messageList" @onViewDetail="onViewDetail" />
    </mescroll-body>
  </view>
</template>

<script>
import { getMessageList, readMessage } from "../../api/message.js"
import MessageList from "./components/MessageList.vue"
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
export default {

  mixins: [MescrollMixin], // 使用mixin

  components: { MessageList },

  data() {
    return {
      upOption: {
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 30 // 每页数据的数量
        }
      },
      messageList: []
    }
  },

  methods: {
    async getMessageList(page) {
      try {
        const result = await getMessageList({
          pageNum: page.num,
          pageSize: page.size
        })
        this.mescroll.endByPage(result.data.records.length, result.data.totoalPages)
        if (page.num == 1) this.messageList = []
        this.messageList = this.messageList.concat(result.data.records)
      } catch (error) {
        this.mescroll.endErr()
      }
    },

    /* 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      this.getMessageList(page)
    },

    onViewDetail(id) {
      uni.navigateTo({
        url: "../message-detail/message-detail"
      })
      readMessage({ id: id, readingStatus: 1 }).then(() => {
        const index = this.messageList.findIndex(item => item.id == id)
        this.messageList.splice(index, 1, { ...this.messageList[index], readingStatus: 1 })
      })
    }
  }
}
</script>
