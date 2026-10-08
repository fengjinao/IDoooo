<template>
	<scroll-view class="scroll-container" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true"
		:refresher-enabled="false">
		<!-- 封面区域 -->
		<view class="section cover-section" id="cover">
			<view class="cover-content">
				<view class="wedding-title">
					<text class="title-text">我们的婚礼</text>
					<view class="hearts">💕</view>
				</view>
				<view class="couple-names">
					<text class="name">{{ groomName }}</text>
					<text class="and">&</text>
					<text class="name">{{ brideName }}</text>
				</view>

				<!-- 倒计时 -->
				<view class="countdown-section">
					<view class="countdown-title">距离婚礼还有</view>
					<view class="countdown-box">
						<view class="countdown-item" v-for="(item, index) in countdown" :key="index">
							<text class="countdown-number">{{ item.value }}</text>
							<text class="countdown-label">{{ item.label }}</text>
						</view>
					</view>
				</view>

				<view class="wedding-date">{{ weddingDate }}</view>
				<view class="scroll-hint">向下滑动查看更多 💫</view>
			</view>
		</view>

		<!-- 新人介绍 -->
		<view class="section couple-section" id="couple">
			<view class="section-header">
				<text class="section-title">新人介绍</text>
				<text class="section-subtitle">Our Story</text>
			</view>

			<!-- 新郎 -->
			<view class="couple-card groom-card">
				<view class="avatar-wrapper">
					<view class="avatar">👨</view>
					<view class="heart-icon">💕</view>
				</view>
				<view class="info-section">
					<text class="name">{{ groomInfo.name }}</text>
					<text class="title">新郎</text>
					<view class="divider"></view>
					<text class="description">{{ groomInfo.description }}</text>
				</view>
			</view>

			<!-- 相遇 -->
			<view class="meet-section">
				<view class="meet-icon">💑</view>
				<text class="meet-text">{{ meetStory }}</text>
			</view>

			<!-- 新娘 -->
			<view class="couple-card bride-card">
				<view class="avatar-wrapper">
					<view class="avatar">👩</view>
					<view class="heart-icon">💕</view>
				</view>
				<view class="info-section">
					<text class="name">{{ brideInfo.name }}</text>
					<text class="title">新娘</text>
					<view class="divider"></view>
					<text class="description">{{ brideInfo.description }}</text>
				</view>
			</view>
		</view>

		<!-- 甜蜜相册（瀑布流） -->
		<view class="section gallery-section" id="gallery">
			<view class="section-header">
				<text class="section-title">甜蜜相册</text>
				<text class="section-subtitle">Our Memories</text>
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

		<!-- 婚礼流程 -->
		<view class="section schedule-section" id="schedule">
			<view class="section-header">
				<text class="section-title">婚礼流程</text>
				<text class="section-subtitle">Wedding Schedule</text>
			</view>

			<view class="schedule-list">
				<view class="schedule-item" v-for="(item, index) in scheduleList" :key="index">
					<view class="time-line">
						<view class="time-dot"></view>
						<view class="time-line-bar" v-if="index < scheduleList.length - 1"></view>
					</view>
					<view class="schedule-content">
						<view class="schedule-time">{{ item.time }}</view>
						<view class="schedule-title">{{ item.title }}</view>
						<view class="schedule-desc" v-if="item.description">{{ item.description }}</view>
						<view class="schedule-location" v-if="item.location">
							<text class="location-icon">📍</text>
							<text>{{ item.location }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 祝福留言板 -->
		<view class="section blessing-section" id="blessing">
			<view class="section-header">
				<text class="section-title">祝福留言</text>
				<text class="section-subtitle">Blessings</text>
			</view>

			<!-- 留言输入区 -->
			<view class="input-section">
				<textarea v-model="inputMessage" placeholder="写下您的祝福..." class="textarea" maxlength="200"></textarea>
				<view class="input-footer">
					<text class="char-count">{{ inputMessage.length }}/200</text>
					<button class="submit-btn" @click="submitBlessing">发送祝福</button>
				</view>
			</view>

			<!-- 祝福列表 -->
			<view class="blessings-list">
				<view class="blessing-item" v-for="(item, index) in blessingsList" :key="index">
					<view class="blessing-header">
						<text class="blessing-name">{{ item.name }}</text>
						<text class="blessing-time">{{ item.time }}</text>
					</view>
					<view class="blessing-content">{{ item.content }}</view>
				</view>

				<view class="empty-tip" v-if="blessingsList.length === 0">
					<text class="empty-text">暂无祝福，快来留下第一条祝福吧！💕</text>
				</view>
			</view>
		</view>

		<!-- 底部结束 -->
		<view class="footer-section">
			<view class="footer-heart">💕</view>
			<text class="footer-text">感谢您的祝福</text>
			<text class="footer-text">愿爱永恒</text>
		</view>
	</scroll-view>

	<!-- 自动播放控制 -->
	<view class="auto-scroll-control" v-if="autoScrollEnabled">
		<view class="control-btn" @click="toggleAutoScroll">
			<text class="control-icon">{{ isAutoScrolling ? '⏸️' : '▶️' }}</text>
			<text class="control-text">{{ isAutoScrolling ? '暂停' : '自动播放' }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			groomName: '冯金傲',
			brideName: '冯金傲',
			weddingDate: '2025年12月31日',
			targetDate: new Date('2025-12-31 18:00:00').getTime(),
			countdown: [
				{ value: '00', label: '天' },
				{ value: '00', label: '时' },
				{ value: '00', label: '分' },
				{ value: '00', label: '秒' }
			],
			scrollTop: 0,
			isAutoScrolling: false,
			autoScrollEnabled: true,
			autoScrollTimer: null,
			currentSection: 0,
			sectionHeights: [],

			// 新人介绍数据
			groomInfo: {
				name: '新郎姓名',
				description: '他是一位温暖善良的人，对生活充满热情，对未来充满期待。'
			},
			brideInfo: {
				name: '新娘姓名',
				description: '她是一位优雅美丽的女孩，温柔体贴，热爱生活中的每一份美好。'
			},
			meetStory: '我们在最美的年华相遇，彼此心动，从此携手共度余生。',

			// 相册数据
			galleryList: [
				{ emoji: '💕', desc: '初次相遇' },
				{ emoji: '💑', image: '/static/1.png', desc: '第一次约会' },
				{ emoji: '🌹', desc: '浪漫时光' },
				{ emoji: '💍', desc: '求婚时刻' },
				{ emoji: '📸', desc: '婚纱照' },
				{ emoji: '🎉', desc: '订婚宴' },
				{ emoji: '💐', desc: '准备婚礼' },
				{ emoji: '👰', desc: '试婚纱' },
				{ emoji: '🤵', desc: '试礼服' },
				{ emoji: '🎊', desc: '婚礼彩排' },
				{ emoji: '💒', desc: '婚礼场地' },
				{ emoji: '🎂', desc: '甜蜜回忆' },
				{ emoji: '🌺', desc: '花前月下' },
				{ emoji: '🍷', desc: '浪漫晚餐' },
				{ emoji: '🎁', desc: '互赠礼物' },
				{ emoji: '🌅', desc: '海边日出' },
				{ emoji: '🎈', desc: '生日惊喜' },
				{ emoji: '🌸', desc: '樱花季节' },
				{ emoji: '❄️', desc: '雪中漫步' },
				{ emoji: '🌙', desc: '月下誓言' }
			],
			waterfallColumns: [[], []],

			// 婚礼流程数据
			scheduleList: [
				{ time: '08:00', title: '化妆准备', description: '新娘化妆，新郎准备', location: '酒店房间' },
				{ time: '10:00', title: '迎亲仪式', description: '新郎接亲，传统仪式', location: '新娘家' },
				{ time: '12:00', title: '午宴时间', description: '与家人共进午餐', location: '酒店餐厅' },
				{ time: '15:00', title: '外景拍摄', description: '婚纱照拍摄', location: '酒店花园' },
				{ time: '18:00', title: '婚礼仪式', description: '交换戒指，宣誓', location: '酒店宴会厅' },
				{ time: '19:00', title: '晚宴开始', description: '与亲友共享晚宴', location: '酒店宴会厅' },
				{ time: '21:00', title: '送别亲友', description: '感谢各位来宾', location: '酒店大厅' }
			],

			// 祝福留言数据
			inputMessage: '',
			blessingsList: [
				{ name: '好友小王', time: '2024-01-01 10:00', content: '祝福你们百年好合，永结同心！💕' },
				{ name: '闺蜜小李', time: '2024-01-01 11:00', content: '愿你们携手共度每一个春夏秋冬，永远幸福！' }
			]
		}
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '我们的婚礼'
		})
		this.startCountdown()
		this.initWaterfall()
		this.loadBlessings()
		// 延迟启动自动滚动，让用户先看到封面
		setTimeout(() => {
			this.startAutoScroll()
		}, 3000)
	},
	onHide() {
		// 页面隐藏时清理定时器，节省资源
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
		if (this.autoScrollTimer) {
			clearInterval(this.autoScrollTimer)
			this.autoScrollTimer = null
			this.isAutoScrolling = false
		}
	},
	onShow() {
		// 页面显示时重新启动倒计时
		if (!this.timer) {
			this.startCountdown()
		}
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
	onUnload() {
		// 页面卸载时清理定时器
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
		if (this.autoScrollTimer) {
			clearInterval(this.autoScrollTimer)
			this.autoScrollTimer = null
		}
	},
	methods: {
		startCountdown() {
			// 如果已有定时器，先清理
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}

			// 立即执行一次，避免延迟
			this.updateCountdown()

			// 创建定时器
			this.timer = setInterval(() => {
				this.updateCountdown()
			}, 1000)
		},
		updateCountdown() {
			const now = new Date().getTime()
			const distance = this.targetDate - now

			if (distance > 0) {
				const days = Math.floor(distance / (1000 * 60 * 60 * 24))
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
				const seconds = Math.floor((distance % (1000 * 60)) / 1000)

				this.countdown = [
					{ value: this.formatNumber(days), label: '天' },
					{ value: this.formatNumber(hours), label: '时' },
					{ value: this.formatNumber(minutes), label: '分' },
					{ value: this.formatNumber(seconds), label: '秒' }
				]
			} else {
				this.countdown = [
					{ value: '00', label: '天' },
					{ value: '00', label: '时' },
					{ value: '00', label: '分' },
					{ value: '00', label: '秒' }
				]
				if (this.timer) {
					clearInterval(this.timer)
					this.timer = null
				}
			}
		},
		formatNumber(num) {
			return num < 10 ? '0' + num : num.toString()
		},

		initWaterfall() {
			const processedList = this.galleryList.map((item, index) => {
				const imageHeight = Math.floor(Math.random() * (450 - 280 + 1)) + 280
				const totalHeight = imageHeight + (item.desc ? 80 : 0)

				return {
					...item,
					id: index,
					imageHeight: imageHeight,
					height: totalHeight
				}
			})

			const columnHeights = [0, 0]
			this.waterfallColumns = [[], []]

			processedList.forEach(item => {
				const targetColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1
				this.waterfallColumns[targetColumn].push(item)
				columnHeights[targetColumn] += item.height
			})
		},
		previewImage(id) {
			uni.showToast({
				title: '点击了第' + (id + 1) + '张照片',
				icon: 'none'
			})
		},

		loadBlessings() {
			try {
				const savedStr = uni.getStorageSync('blessingsList')
				if (savedStr) {
					// 使用 JSON 解析确保数据可克隆
					const saved = typeof savedStr === 'string' ? JSON.parse(savedStr) : savedStr
					if (Array.isArray(saved)) {
						// 限制最多保留100条祝福，防止内存溢出
						this.blessingsList = saved.slice(0, 100)
					}
				}
			} catch (e) {
				console.error('加载祝福失败', e)
				// 如果数据损坏，重置为空数组
				this.blessingsList = []
			}
		},
		saveBlessings() {
			try {
				// 限制最多保留100条祝福，防止内存溢出
				const listToSave = this.blessingsList.slice(0, 100)
				// 使用 JSON 序列化确保数据可克隆
				const dataStr = JSON.stringify(listToSave)
				uni.setStorageSync('blessingsList', dataStr)
			} catch (e) {
				console.error('保存祝福失败', e)
				// 如果存储失败，尝试清除旧数据
				try {
					uni.removeStorageSync('blessingsList')
					if (this.blessingsList.length > 50) {
						this.blessingsList = this.blessingsList.slice(0, 50)
						const dataStr = JSON.stringify(this.blessingsList)
						uni.setStorageSync('blessingsList', dataStr)
					}
				} catch (e2) {
					console.error('清理存储失败', e2)
				}
			}
		},
		submitBlessing() {
			if (!this.inputMessage.trim()) {
				uni.showToast({
					title: '请输入祝福内容',
					icon: 'none'
				})
				return
			}

			const now = new Date()
			const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

			const newBlessing = {
				name: '匿名',
				time: timeStr,
				content: this.inputMessage.trim()
			}

			this.blessingsList.unshift(newBlessing)
			// 限制列表大小，只保留最新100条
			if (this.blessingsList.length > 100) {
				this.blessingsList = this.blessingsList.slice(0, 100)
			}
			this.saveBlessings()
			this.inputMessage = ''

			uni.showToast({
				title: '祝福已发送',
				icon: 'success'
			})
		},

		startAutoScroll() {
			if (this.isAutoScrolling) return

			this.isAutoScrolling = true
			let accumulatedScroll = 0
			const scrollSpeed = 3 // 滚动速度（rpx每50ms）- 已加速
			const interval = 50 // 更新间隔50ms

			// 获取系统信息计算rpx到px的转换比例（只获取一次）
			let rpxToPx = 1
			try {
				const systemInfo = uni.getSystemInfoSync()
				rpxToPx = systemInfo.windowWidth / 750
			} catch (e) {
				console.log('获取系统信息失败，使用默认比例')
			}

			this.autoScrollTimer = setInterval(() => {
				if (!this.isAutoScrolling) return

				// 持续缓慢滚动
				accumulatedScroll += scrollSpeed

				// uni-app的scroll-top使用px，需要将rpx转换为px
				this.scrollTop = Math.floor(accumulatedScroll * rpxToPx)
			}, interval)
		},
		stopAutoScroll() {
			this.isAutoScrolling = false
			if (this.autoScrollTimer) {
				clearInterval(this.autoScrollTimer)
				this.autoScrollTimer = null
			}
		},
		toggleAutoScroll() {
			if (this.isAutoScrolling) {
				this.stopAutoScroll()
			} else {
				this.startAutoScroll()
			}
		}
	}
}
</script>

<style scoped>
.scroll-container {
	width: 100%;
	height: 100vh;
	background: linear-gradient(180deg, #FFF5F5 0%, #FFE5E5 50%, #FFF5F5 100%);
}

.section {
	min-height: 100vh;
	padding: 40rpx;
	position: relative;
}

/* 封面区域 */
.cover-section {
	background: linear-gradient(135deg, #FFE5E5 0%, #FFD6D6 50%, #FFB6C1 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	height: 100vh;
	padding: 0;
}

.cover-section::before {
	content: '';
	position: absolute;
	width: 200%;
	height: 200%;
	background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
	background-size: 50px 50px;
	animation: float 20s infinite;
}

@keyframes float {

	0%,
	100% {
		transform: translate(0, 0);
	}

	50% {
		transform: translate(-20px, -20px);
	}
}

.cover-content {
	z-index: 1;
	text-align: center;
	width: 100%;
	padding: 40rpx;
}

.wedding-title {
	margin-bottom: 40rpx;
}

.title-text {
	font-size: 56rpx;
	font-weight: bold;
	color: #D2691E;
	letter-spacing: 8rpx;
	display: block;
	margin-bottom: 20rpx;
}

.hearts {
	font-size: 48rpx;
	animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {

	0%,
	100% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2);
	}
}

.couple-names {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 60rpx;
}

.name {
	font-size: 48rpx;
	color: #8B4513;
	font-weight: 600;
	letter-spacing: 4rpx;
}

.and {
	font-size: 36rpx;
	color: #FFB6C1;
	margin: 0 30rpx;
	font-style: italic;
}

.countdown-section {
	margin: 60rpx 0 40rpx;
}

.countdown-title {
	font-size: 28rpx;
	color: #8B4513;
	margin-bottom: 30rpx;
	opacity: 0.8;
}

.countdown-box {
	display: flex;
	justify-content: center;
	gap: 20rpx;
}

.countdown-item {
	background: rgba(255, 255, 255, 0.9);
	border-radius: 16rpx;
	padding: 20rpx 24rpx;
	min-width: 120rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.countdown-number {
	font-size: 48rpx;
	font-weight: bold;
	color: #FF69B4;
	display: block;
	text-align: center;
}

.countdown-label {
	font-size: 24rpx;
	color: #8B4513;
	display: block;
	text-align: center;
	margin-top: 8rpx;
}

.wedding-date {
	font-size: 32rpx;
	color: #8B4513;
	margin-top: 40rpx;
	letter-spacing: 2rpx;
}

.scroll-hint {
	font-size: 24rpx;
	color: #8B4513;
	margin-top: 40rpx;
	opacity: 0.7;
	animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {

	0%,
	100% {
		opacity: 0.7;
	}

	50% {
		opacity: 0.3;
	}
}

/* 通用区域头部 */
.section-header {
	text-align: center;
	margin-bottom: 60rpx;
	padding-top: 40rpx;
}

.section-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #8B4513;
	display: block;
	margin-bottom: 10rpx;
	letter-spacing: 4rpx;
}

.section-subtitle {
	font-size: 28rpx;
	color: #D2691E;
	opacity: 0.8;
	font-style: italic;
}

/* 新人介绍区域 */
.couple-section {
	background: linear-gradient(180deg, #FFF5F5 0%, #FFE5E5 100%);
}

.couple-card {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 32rpx;
	padding: 50rpx 40rpx;
	margin-bottom: 50rpx;
	box-shadow: 0 8rpx 24rpx rgba(255, 182, 193, 0.3);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.groom-card {
	border-left: 6rpx solid #4A90E2;
}

.bride-card {
	border-left: 6rpx solid #FF69B4;
}

.avatar-wrapper {
	position: relative;
	margin-bottom: 30rpx;
}

.avatar {
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	background: linear-gradient(135deg, #FFE5E5 0%, #FFD6D6 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 100rpx;
	border: 6rpx solid #FFB6C1;
}

.heart-icon {
	position: absolute;
	top: -10rpx;
	right: -10rpx;
	font-size: 40rpx;
	animation: heartbeat 1.5s ease-in-out infinite;
}

.info-section {
	text-align: center;
	width: 100%;
}

.name {
	font-size: 40rpx;
	font-weight: bold;
	color: #8B4513;
	display: block;
	margin-bottom: 10rpx;
}

.title {
	font-size: 28rpx;
	color: #D2691E;
	display: block;
	margin-bottom: 30rpx;
}

.divider {
	width: 100rpx;
	height: 2rpx;
	background: linear-gradient(90deg, transparent, #FFB6C1, transparent);
	margin: 0 auto 30rpx;
}

.description {
	font-size: 28rpx;
	color: #666;
	line-height: 1.8;
	display: block;
}

.meet-section {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 32rpx;
	padding: 50rpx 40rpx;
	margin: 50rpx 0;
	text-align: center;
	box-shadow: 0 8rpx 24rpx rgba(255, 182, 193, 0.3);
}

.meet-icon {
	font-size: 80rpx;
	margin-bottom: 30rpx;
}

.meet-text {
	font-size: 30rpx;
	color: #8B4513;
	line-height: 1.8;
	display: block;
	font-style: italic;
}

/* 相册区域 */
.gallery-section {
	background: linear-gradient(180deg, #FFE5E5 0%, #FFF5F5 100%);
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

/* 流程区域 */
.schedule-section {
	background: linear-gradient(180deg, #FFF5F5 0%, #FFE5E5 100%);
}

.schedule-list {
	position: relative;
}

.schedule-item {
	display: flex;
	margin-bottom: 40rpx;
	position: relative;
}

.time-line {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 30rpx;
	position: relative;
}

.time-dot {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	background: linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%);
	border: 4rpx solid #fff;
	box-shadow: 0 4rpx 8rpx rgba(255, 105, 180, 0.3);
	z-index: 2;
}

.time-line-bar {
	width: 2rpx;
	flex: 1;
	background: linear-gradient(180deg, #FFB6C1 0%, transparent 100%);
	margin-top: 10rpx;
	min-height: 100rpx;
}

.schedule-content {
	flex: 1;
	background: rgba(255, 255, 255, 0.95);
	border-radius: 24rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 12rpx rgba(255, 182, 193, 0.2);
	margin-bottom: 20rpx;
}

.schedule-time {
	font-size: 32rpx;
	font-weight: bold;
	color: #FF69B4;
	margin-bottom: 10rpx;
}

.schedule-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #8B4513;
	margin-bottom: 15rpx;
}

.schedule-desc {
	font-size: 26rpx;
	color: #666;
	line-height: 1.6;
	margin-bottom: 10rpx;
}

.schedule-location {
	font-size: 24rpx;
	color: #999;
	display: flex;
	align-items: center;
	margin-top: 10rpx;
}

.location-icon {
	margin-right: 8rpx;
}

/* 祝福区域 */
.blessing-section {
	background: linear-gradient(180deg, #FFE5E5 0%, #FFF5F5 100%);
}

.input-section {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 24rpx;
	padding: 30rpx;
	margin-bottom: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(255, 182, 193, 0.2);
}

.textarea {
	width: 100%;
	min-height: 200rpx;
	background: #F8F8F8;
	border-radius: 16rpx;
	padding: 20rpx;
	font-size: 28rpx;
	color: #333;
	margin-bottom: 20rpx;
	box-sizing: border-box;
}

.input-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.char-count {
	font-size: 24rpx;
	color: #999;
}

.submit-btn {
	background: linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%);
	color: #fff;
	border: none;
	border-radius: 40rpx;
	padding: 16rpx 40rpx;
	font-size: 28rpx;
	font-weight: 500;
}

.submit-btn::after {
	border: none;
}

.blessings-list {
	margin-top: 20rpx;
}

.blessing-item {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 24rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 4rpx 12rpx rgba(255, 182, 193, 0.2);
}

.blessing-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.blessing-name {
	font-size: 30rpx;
	font-weight: 600;
	color: #8B4513;
}

.blessing-time {
	font-size: 24rpx;
	color: #999;
}

.blessing-content {
	font-size: 28rpx;
	color: #666;
	line-height: 1.8;
}

.empty-tip {
	text-align: center;
	padding: 100rpx 40rpx;
}

.empty-text {
	font-size: 28rpx;
	color: #999;
	line-height: 1.8;
}

/* 底部 */
.footer-section {
	padding: 100rpx 40rpx;
	text-align: center;
	background: linear-gradient(180deg, #FFF5F5 0%, #FFE5E5 100%);
}

.footer-heart {
	font-size: 60rpx;
	margin-bottom: 30rpx;
	animation: heartbeat 1.5s ease-in-out infinite;
}

.footer-text {
	font-size: 32rpx;
	color: #8B4513;
	display: block;
	margin-bottom: 20rpx;
	letter-spacing: 2rpx;
}

/* 自动播放控制 */
.auto-scroll-control {
	position: fixed;
	bottom: 40rpx;
	right: 40rpx;
	z-index: 999;
}

.control-btn {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 50rpx;
	padding: 20rpx 30rpx;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.control-icon {
	font-size: 32rpx;
}

.control-text {
	font-size: 24rpx;
	color: #8B4513;
	font-weight: 500;
}
</style>
