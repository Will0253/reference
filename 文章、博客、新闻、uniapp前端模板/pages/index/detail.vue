<template>
	<view class="pb120">
		<u-navbar title="详情" backIconColor="#fff" titleColor="#fff" :background="background"></u-navbar>
		<view class="home">
			<view class="title">标题</view>
			<view class="u-flex u-row-between">
				<view>2021-5-21</view>
				<view>
					<u-icon name="eye-fill" size="35" color="#2BC3C8" label="30 浏览" labelSize="24" class="u-m-r-30">
					</u-icon>
					<u-icon :name="showClick?'thumb-up-fill':'thumb-up'" size="32"
						:color="showClick?'#FF0000':'#2BC3C8' " label="30 点赞" labelSize="24" class="u-m-r-30"
						@click="click"></u-icon>
					<u-icon :name="showHeart ? 'heart-fill':'heart'" :color="showHeart?'#FF0000':'#2BC3C8'" label="收藏"
						labelSize="24" size="32" @click="heart"></u-icon>
				</view>
			</view>
			<view class="u-m-t-30">
				<u-parse :html="detail.content"></u-parse>
			</view>
		</view>
		<view class="comment">
			<view class="box u-row-between">
				<view>
					<input v-model="comment" placeholder="说点什么吧......" class="input"></input>
				</view>
				<view @click="mShow = !mShow">
					<u-icon name="red-packet" labelPos="bottom" label="打赏" size="38" labelSize="22"></u-icon>
				</view>
				<view @click="show = !show">
					<u-icon name="chat" labelPos="bottom" label="10" size="40" labelSize="22"></u-icon>
				</view>
			</view>
		</view>
		<!-- 评论弹窗 -->
		<u-popup v-model="show" mode="bottom" length="70%" border-radius="24">
			<view class="u-p-30" v-for="(item,index) in 10" :key="index">
				<view class="u-flex u-col-top">
					<view class="u-p-r-20">
						<u-avatar text="MK" bg-color="#2BC3C8"></u-avatar>
					</view>
					<view class="u-flex-1">
						<view class="u-tips-color u-font-sm">MK</view>
						<view>满堂花醉三千客，一剑霜寒十四州。满堂花醉三千客，一剑霜寒十四州</view>
						<view class="u-tips-color u-font-sm u-m-t-10">18小时前 广东 回复</view>
					</view>
					<view>
						<u-icon name="thumb-up" size="36"></u-icon>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 打赏弹窗 -->
		<u-popup v-model="mShow" mode="bottom" length="35%" border-radius="24">
			<view class="wrap u-p-t-50">
				<view class="item" v-for="(item,index) in 6" :key="index">
					{{index+1}}Rmb
				</view>
			</view>
			<view class="u-p-30">
				<u-button type="success">打赏</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				mShow: false,
				background: {
					'background-image': 'linear-gradient(45deg, #2BC3C8, #84E7B9)'
				},
				detail: {
					content: '今夕何夕兮，搴舟中流。今日何日兮，得与王子同舟。蒙羞被好兮，不訾诟耻。心几烦而不绝兮，得知王子。山有木兮木有枝，心悦君兮君不知。'
				},
				showHeart: false,
				showClick: false,
				comment: ''
			}
		},
		onLoad() {

		},
		methods: {
			//收藏
			heart() {
				this.showHeart = !this.showHeart
			},
			click() {
				this.showClick = !this.showClick
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 38rpx;
		font-weight: 700;
		padding: 20rpx 0;
	}

	.comment {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top: 1rpx solid #ededed;

		.input {
			background-color: #f7f7f7;
			padding: 20rpx 15rpx;
			font-size: 26rpx;
			border-radius: 12rpx;
			width: 480rpx;
		}

		.box {
			display: flex;
			padding: 15rpx 30rpx;
		}
	}

	.pb120 {
		padding-bottom: 120rpx;
	}
	
	.wrap{
		display: flex;
		flex-wrap: wrap;
		padding-left: 12rpx;
		
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex: 0 0 30%;
			text-align: center;
			border: 1rpx solid #ededed;
			height: 100rpx;
			width: 100rpx;
			margin: 10rpx;
		}
	}
</style>
