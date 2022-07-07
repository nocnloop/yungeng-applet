<template>
	<view class="message-detail">
		<view class="title">
			{{message.title}}
		</view>
		<view class="time">{{message.sendTime}}</view>
		<view class="content">{{message.content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: {}
			}
		},

		onLoad() {
			this.message = this.$copy(this.$store.state.temp.message)
		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.message-detail {
		.title {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 40rpx;
			font-weight: bold;
			color: $base-color-main;
		}

		.time {
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 32rpx;
			color: $base-color-place;
			padding: 0 20rpx;
		}

		.content {
			margin-top: 30rpx;
			font-size: 32rpx;
			padding: 0 20rpx;
		}
	}
</style>
