<template>
	<view>
		<u-steps :current="current" :dot="false" direction="column">
			<u-steps-item icon-size="50px" :title="item.title" :desc="item.time" v-for="item in records"
				:key="item.title">
			</u-steps-item>
		</u-steps>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import { getGoodsDetailTimeRecord } from '../../api/queue.js'

	export default {
		data() {
			return {
				records: [],
				current: 0
			}
		},

		onLoad(option) {
			this.getGoodsDetailTimeRecord(option.id)
		},

		methods: {
			async getGoodsDetailTimeRecord(id) {
				try {
					uni.showLoading()
					const result = await getGoodsDetailTimeRecord({ id })
					this.records = result.data.map(item => {
						if (!item.time) return { ...item, time: '' }
						return { ...item, time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }
					})
					this.current = this.records.findIndex(item => !item.time)
				} catch (e) {
					//TODO handle the exception
					console.log(e)
				} finally {
					uni.hideLoading()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-steps {
		margin-top: 30rpx;
		padding-left: 300rpx;
	}

	// /deep/ .u-steps-item__wrapper__circle {
	// 	width: 100rpx !important;
	// 	height: 100rpx !important;
	// }
</style>
