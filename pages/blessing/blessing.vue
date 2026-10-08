<template>
    <view class="container">
        <view class="header">
            <text class="header-title">祝福留言</text>
            <text class="header-subtitle">Blessings</text>
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
</template>

<script>
export default {
    data() {
        return {
            inputMessage: '',
            blessingsList: [
                {
                    name: '好友小王',
                    time: '2024-01-01 10:00',
                    content: '祝福你们百年好合，永结同心！💕'
                },
                {
                    name: '闺蜜小李',
                    time: '2024-01-01 11:00',
                    content: '愿你们携手共度每一个春夏秋冬，永远幸福！'
                }
            ]
        }
    },
    onLoad() {
        uni.setNavigationBarTitle({
            title: '祝福留言'
        })
        // 从本地存储加载祝福列表
        this.loadBlessings()
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
    margin-bottom: 40rpx;
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
</style>
