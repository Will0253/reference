<script>
	export default {
		onLaunch: function() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
			});

			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});

			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
		},
		onShow: function() {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
		},
		onHide: function() {
			// console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	page {
		font-size: 32rpx;
		line-height: 1.7;
	}

	.container {
		padding: 20rpx;
		overflow: hidden;
	}

	// 发布按钮
	.plus-box {
		background-color: $themes-color;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 60rpx;
		right: 30rpx;
		z-index: 999;
	}

	.f-wrap {
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: 5rpx 5rpx 20rpx #e6e6e6;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.f-wrap>.title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.f-fixed {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx 20rpx 50rpx 20rpx;
		z-index: 999;
		background-color: #fff;
	}

	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
