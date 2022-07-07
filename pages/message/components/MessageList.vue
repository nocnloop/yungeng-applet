<!--
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-26 15:48:50
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-25 14:23:48
 * @Description: file content
 * @FilePath: /smart-logistics-applet/pages/message/components/MessageList.vue
-->
<template>
  <view class="message-list">
    <view class="message-item" v-for="item in list" :key="item.id" @click="readMessageAction(item)">
      <view class="title">
        <text>{{ item.title }}</text>
      </view>
      <view class="send-time">{{ item.sendTime }} </view>
      <view class="content">{{ item.content }}</view>
      <view class="dot" v-if="item.readingStatus == 0"></view>
    </view>
  </view>
</template>

<script>
export default {

  props: {
    list: Array
  },

  methods: {
    readMessageAction(item) {
    //   if (item.readingStatus == 1) return // 1是已读状态
      this.$store.dispatch("temp/readMessageAction", item)
      this.$emit("onViewDetail", item.id)
    }
  }

}
</script>

<style lang="scss" scoped>
.message-list {
  padding: 20rpx;

  .message-item {
    position: relative;
    padding: 20rpx;
    border-radius: 5rpx;
    background-color: #ffffff;
    box-shadow: $base-box-shadow;
    margin-bottom: 30rpx;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 32rpx;
      color: $base-color-main;

      text {
        width: 750rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .content {
      font-size: 32rpx;
      color: $base-color-second;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .send-time {
      height: 50rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 22rpx;
      color: $base-color-place;
    }

    .dot {
      width: 10rpx;
      height: 10rpx;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      top: 12rpx;
      right: 12rpx;
    }
  }
}
</style>
