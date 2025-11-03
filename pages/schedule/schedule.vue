<template>
    <view class="container">
        <view class="header">
            <text class="header-title">婚礼流程</text>
            <text class="header-subtitle">Wedding Schedule</text>
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
</template>

<script>
export default {
    data() {
        return {
            scheduleList: [
                {
                    time: '08:00',
                    title: '化妆准备',
                    description: '新娘化妆，新郎准备',
                    location: '酒店房间'
                },
                {
                    time: '10:00',
                    title: '迎亲仪式',
                    description: '新郎接亲，传统仪式',
                    location: '新娘家'
                },
                {
                    time: '12:00',
                    title: '午宴时间',
                    description: '与家人共进午餐',
                    location: '酒店餐厅'
                },
                {
                    time: '15:00',
                    title: '外景拍摄',
                    description: '婚纱照拍摄',
                    location: '酒店花园'
                },
                {
                    time: '18:00',
                    title: '婚礼仪式',
                    description: '交换戒指，宣誓',
                    location: '酒店宴会厅'
                },
                {
                    time: '19:00',
                    title: '晚宴开始',
                    description: '与亲友共享晚宴',
                    location: '酒店宴会厅'
                },
                {
                    time: '21:00',
                    title: '送别亲友',
                    description: '感谢各位来宾',
                    location: '酒店大厅'
                }
            ]
        }
    },
    onLoad() {
        uni.setNavigationBarTitle({
            title: '婚礼流程'
        })
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
</style>
