<template>
    <view class="container">
        <view class="header">
            <text class="header-title">新人介绍</text>
            <text class="header-subtitle">Our Story</text>
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
</template>

<script>
export default {
    data() {
        return {
            groomInfo: {
                name: '新郎姓名',
                description: '他是一位温暖善良的人，对生活充满热情，对未来充满期待。'
            },
            brideInfo: {
                name: '新娘姓名',
                description: '她是一位优雅美丽的女孩，温柔体贴，热爱生活中的每一份美好。'
            },
            meetStory: '我们在最美的年华相遇，彼此心动，从此携手共度余生。'
        }
    },
    onLoad() {
        uni.setNavigationBarTitle({
            title: '新人介绍'
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

@keyframes heartbeat {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }
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
</style>
