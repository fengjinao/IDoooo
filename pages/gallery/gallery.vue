<template>
	<view class="container">
		<view class="header">
			<text class="header-title">甜蜜相册</text>
			<text class="header-subtitle">Our Memories</text>
		</view>

		<view class="waterfall-container">
			<view class="waterfall-column" v-for="(column, colIndex) in waterfallColumns" :key="colIndex">
				<view class="gallery-item" v-for="(item, index) in column" :key="item.id"
					:style="{ height: item.height + 'rpx' }" @click="previewImage(item.id)">
					<view class="image-placeholder" :style="{ height: item.imageHeight + 'rpx' }">
						<image v-if="item.image" :src="item.image" mode="aspectFill" class="photo"></image>
						<text v-else class="placeholder-text">{{ item.emoji || '📸' }}</text>
					</view>
					<view class="image-desc" v-if="item.desc">{{ item.desc }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				galleryList: [{
						emoji: '💕',
						desc: '初次相遇'
					},
					{
						emoji: '💑',
						image: '/static/1.png',
						desc: '第一次约会'
					},
					{
						emoji: '🌹',
						desc: '浪漫时光'
					},
					{
						emoji: '💍',
						desc: '求婚时刻'
					},
					{
						emoji: '📸',
						desc: '婚纱照'
					},
					{
						emoji: '🎉',
						desc: '订婚宴'
					},
					{
						emoji: '💐',
						desc: '准备婚礼'
					},
					{
						emoji: '👰',
						desc: '试婚纱'
					},
					{
						emoji: '🤵',
						desc: '试礼服'
					},
					{
						emoji: '🎊',
						desc: '婚礼彩排'
					},
					{
						emoji: '💒',
						desc: '婚礼场地'
					},
					{
						emoji: '🎂',
						desc: '甜蜜回忆'
					},
					{
						emoji: '🌺',
						desc: '花前月下'
					},
					{
						emoji: '🍷',
						desc: '浪漫晚餐'
					},
					{
						emoji: '🎁',
						desc: '互赠礼物'
					},
					{
						emoji: '🌅',
						desc: '海边日出'
					},
					{
						emoji: '🎈',
						desc: '生日惊喜'
					},
					{
						emoji: '🌸',
						desc: '樱花季节'
					},
					{
						emoji: '❄️',
						desc: '雪中漫步'
					},
					{
						emoji: '🌙',
						desc: '月下誓言'
					}
				],
				waterfallColumns: [
					[],
					[]
				]
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '甜蜜相册'
			})
			this.initWaterfall()
		},
		onShareAppMessage() {
			return {
				title: '我们的婚礼，诚邀您见证幸福时刻',
				path: '/pages/index/index',
				imageUrl: '/static/1.png'
			}
		},
		onShareTimeline() {
			return {
				title: '我们的婚礼，诚邀您见证幸福时刻',
				imageUrl: '/static/1.png'
			}
		},
		methods: {
			initWaterfall() {
				// 为每张图片生成随机高度，模拟真实照片尺寸差异
				const processedList = this.galleryList.map((item, index) => {
					// 随机高度范围：280-450rpx
					const imageHeight = Math.floor(Math.random() * (450 - 280 + 1)) + 280
					// 总高度 = 图片高度 + 描述区域高度(约80rpx) + 内边距
					const totalHeight = imageHeight + (item.desc ? 80 : 0)

					return {
						...item,
						id: index,
						imageHeight: imageHeight,
						height: totalHeight
					}
				})

				// 将图片分配到两列，每次选择高度更小的列
				const columnHeights = [0, 0]
				this.waterfallColumns = [
					[],
					[]
				]

				processedList.forEach(item => {
					// 选择高度较小的列
					const targetColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1
					this.waterfallColumns[targetColumn].push(item)
					columnHeights[targetColumn] += item.height
				})
			},
			previewImage(id) {
				const allItems = [...this.waterfallColumns[0], ...this.waterfallColumns[1]]
				const item = allItems.find(i => i.id === id)
				if (item && item.image) {
					uni.previewImage({
						current: item.image,
						urls: allItems.filter(i => i.image).map(i => i.image)
					})
					return
				}
				uni.showToast({
					title: '点击了第' + (id + 1) + '张照片',
					icon: 'none'
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background: linear-gradient(180deg, #FFF5F5 0%, #FFE5E5 100%);
		padding: 40rpx;
	}

	.header {
		text-align: center;
		margin-bottom: 60rpx;
		padding-top: 40rpx;
	}

	.header-title {
		font-size: 48rpx;
		font-weight: bold;
		color: #8B4513;
		display: block;
		margin-bottom: 10rpx;
		letter-spacing: 4rpx;
	}

	.header-subtitle {
		font-size: 28rpx;
		color: #D2691E;
		opacity: 0.8;
		font-style: italic;
	}

	.waterfall-container {
		display: flex;
		gap: 30rpx;
		align-items: flex-start;
	}

	.waterfall-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 30rpx;
	}

	.gallery-item {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 12rpx rgba(255, 182, 193, 0.2);
		transition: all 0.3s;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.gallery-item:active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 8rpx rgba(255, 182, 193, 0.3);
	}

	.image-placeholder {
		width: 100%;
		background: linear-gradient(135deg, #FFE5E5 0%, #FFD6D6 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.placeholder-text {
		font-size: 80rpx;
	}

	.photo {
		width: 100%;
		height: 100%;
		display: block;
	}

	.image-desc {
		padding: 24rpx 20rpx;
		text-align: center;
		font-size: 26rpx;
		color: #8B4513;
		font-weight: 500;
		flex-shrink: 0;
		background: #fff;
	}
</style>
