<template>
	<view class="index u-skeleton">
		<view class="headerbar background-set" :style="{backgroundImage:'url(' + tbj + ')'}">
			<headerbar title="恒昌大学"></headerbar>
			<view class="ss flex up-center">
				<view class="ssIcon">
					<image src="@/static/ss.png" />
				</view>
				<view class="ssTxt">搜索</view>
			</view>
			<view class="topYj"></view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
			:down="{auto: false}" :up="{use: false, auto: false}" top="280rpx" bottom="100rpx">
			<view class="banner u-skeleton-fillet">
				<swiper class="swiper" @change="changeSwiper" :autoplay="true" :circular="true" :interval="3000"
					:duration="500">
					<swiper-item class="swiper-item" v-for="(item, index) in advList" :key="index">
						<u-lazy-load img-mode="widthFix" :image="item.advImg" loading-img="/static/bannerpicloading.jpg"
							error-img="/static/bannerpicloading.jpg">
						</u-lazy-load>
					</swiper-item>
				</swiper>
				<view class="qiehuan">
					<view class="dian flex all-center">
						<view class="dian1 flex all-center">
							<view class="dian1-item" :class="[swiperCurrent === index ? 'active' : '']"
								v-for="(item, index) in advList" :key="index">
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="dht">
				<view class="dht1 flex">
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon1.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">课程专区</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon2.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">慢病专区</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon3.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">精英店长</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon4.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">行业解读</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon5.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">中药专区</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon6.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">免费专区</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon7.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">行业资讯</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon8.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">医药智库</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon9.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">恒昌简介</view>
					</view>
					<view class="dht-item">
						<view class="dht-item-pic u-skeleton-circle">
							<image src="@/static/icon10.png" />
						</view>
						<view class="dht-item-txt u-skeleton-fillet">学员故事</view>
					</view>
				</view>
			</view>
			<!-- <view class="box box1">
				<view class="box-padding">
					<view class="box-t flex space-between">
						<view class="box-t-left flex up-center u-skeleton-fillet">
							<view class="box-t-left-1">
								课程专题
							</view>
							<view class="box-t-left-2"></view>
							<view class="box-t-left-3">
								50讲
							</view>
						</view>
						<view class="box-t-right flex up-center u-skeleton-fillet" @click="goAll">
							<view class="box-t-right1">查看全部</view>
							<view class="box-t-right2 iconfont">&#xe613;</view>
						</view>
					</view>
					<view class="box-c">
						<view class="rowOneBig-item u-skeleton-fillet" v-for="(item, index) in 3" :key="index">
							<rowOneBig></rowOneBig>
						</view>
					</view>
				</view>
			</view>
			<view class="line"></view> -->
			<view class="zone" v-for="(item, index) in indexData" :key="index">
				<view class="box box2">
					<view class="box-padding">
						<view class="box-t flex space-between">
							<view class="box-t-left flex up-center u-skeleton-fillet">
								<view class="box-t-left-1">
									{{item.zoneName}}
								</view>
							</view>
							<view class="box-t-right flex up-center u-skeleton-fillet"
								v-if="item.zoneCategory === 1 || item.zoneCategory === 2 ||　item.zoneCategory === 3"
								@click="viewAll()">
								<view class="box-t-right1">查看全部</view>
								<view class="box-t-right2 iconfont">&#xe613;</view>
							</view>

							<navigator class="box-t-right flex up-center u-skeleton-fillet" hover-class="none"
								v-if="item.zoneCategory === 8" url="/pagesA/news/list">
								<view class="box-t-right1">查看全部</view>
								<view class="box-t-right2 iconfont">&#xe613;</view>
							</navigator>
						</view>
						<view class="box-c">
							<!-- <view class="box-c-banner u-skeleton-fillet">
								<u-lazy-load image="http://imge.hcjk.com/ctr_cloud/hcyy-unv-app/static/jctjbanner.png"
									loading-img="/static/jctjbannerloading.jpg" error-img="/static/jctjbannerloading.jpg">
								</u-lazy-load>
							</view> -->
							<view class="rowTwo-list flex-flow space-between flex" v-if="item.zoneCategory < 4">
								<view class="rowTwo-item u-skeleton-fillet" v-for="(item, index1) in item.courseList"
									:key="index1">
									<rowTwo :item="item"></rowTwo>
								</view>
							</view>
							<view class="rowOneSmall-list flex-flow space-between flex" v-if="item.zoneCategory === 8">
								<view class="rowOneSmall-item u-skeleton-fillet" v-for="(item, index1) in item.blogList"
									:key="index1">
									<rowOneSmall :item="item"></rowOneSmall>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="line"></view>
			</view>
		</mescroll-body>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	// zoneCategory	专区分类(1:点播;2:直播,4文库,5试卷,7博客;8:资讯,9:自定义)
	import headerbar from "@/components/headerbar/headerbar";
	import mescrollBody from "@/components/mescroll-diy/beibei/mescroll-body";
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import rowOneBig from "@/components/card/rowOneBig";
	import rowTwo from "@/components/card/rowTwo";
	import joinNow from "@/components/card/joinNow";
	import rowOneSmall from "@/components/card/rowOneSmall";

	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			headerbar,
			mescrollBody, // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
			rowOneBig,
			rowTwo,
			rowOneSmall,
		},
		data() {
			return {
				loading: true, // 是否显示骨架屏组件
				advList: [{}],
				swiperCurrent: 0,
				tbj: require('@/static/tbj.jpg'),

				indexData: [{
					"zoneCategory": 1,
					"courseList": [{}, {}]
				}]
			}
		},
		mounted() {

		},
		methods: {
			_onReachBottom(e) {
				this.mescroll.onReachBottom();
			},
			_onPagesScroll(e) {
				this.mescroll.onPageScroll(e);
			},
			_onLoad() {
				console.log('这是首页_onLoad')
				this.get_AdvList_ZoneList()
			},
			_onShow() {
				console.log('这是首页_onShow')
			},
			viewAll() {
				this.$parent.switchTab('all') // 调整tabar
			},
			get_AdvList_ZoneList() {
				const p1 = new Promise((resolve, reject) => {
					let data = {
						zoneLocation: 2
					};
					this.$http(`/system/api/zone/list`, 'POST', data).then((res) => {
						if (res.code === 200) {
							this.indexData = res.data.list
							resolve(1)
						} else {
							reject(0)
						}
					})
				})

				const p2 = new Promise((resolve, reject) => {
					let data = {
						platShow: 2,
						mobileTerminalCategory: 1,
						advLocation: 1
					};
					this.$http(`/system/api/adv/list`, 'POST', data).then((res) => {
						if (res.code === 200) {
							this.advList = res.data.advList
							resolve(1)
						} else {
							reject(0)
						}
					})
				})

				Promise.all([p1, p2]).then((res) => {
					this.loading = false
				}).catch((error) => {
					uni.showToast({
						title: '网络不稳定',
						icon: 'none'
					})
				})
			},
			mescrollInit() {

			},
			downCallback() {
				setTimeout(() => {
					this.mescroll.endSuccess(); // 模拟刷新结束请求
				}, 1000);
			},
			upCallback() {
				setTimeout(() => {
					this.$nextTick(() => {
						this.mescroll.endBySize(5, 50)
					}) // 模拟上拉结束请求
				}, 1000);
			},
			changeSwiper(e) {
				this.swiperCurrent = e.detail.current;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.headerbar {
		width: 100%;
		height: 280rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;

		.ss {
			margin: 20rpx 30rpx 0 30rpx;
			height: 76rpx;
			background: rgba(255, 255, 255, 0.67);
			border-radius: 20rpx;
			padding-left: 28rpx;

			.ssIcon {
				width: 32rpx;
				height: 32rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ssTxt {
				color: #FFFFFF;
				font-size: 28rpx;
				margin-left: 10rpx;
			}
		}

		.topYj {
			width: 100%;
			height: 32rpx;
			border-radius: 32rpx 32rpx 0 0;
			background-color: #FFFFFF;
			position: absolute;
			bottom: -1px;
			left: 0;
		}
	}

	.banner {
		margin: 0 30rpx;
		position: relative;

		.swiper {
			width: 100%;
			height: 296rpx;
			background-color: #010F44;
			border-radius: 12rpx;
			overflow: hidden;

			.swiper-item {
				image {
					width: 100%;
					height: 100%;
					border-radius: 12rpx;
				}
			}
		}

		.qiehuan {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 20rpx;
			pointer-events: none;

			.dian {
				margin-top: 20rpx;

				.dian1 {
					padding: 0 10px;
					height: 18px;
					margin-top: 20rpx;

					.dian1-item {
						width: 5px;
						height: 5px;
						background: rgba(255, 255, 255, 0.58);
						border-radius: 50%;
						margin: 0 3px;
					}

					.active {
						width: 15px;
						border-radius: .16rem;
						background: #5171F8;
						transition: width .2s;
						-webkit-transition: width .2s;
					}
				}
			}
		}
	}

	.dht {
		margin: 0 30rpx;
		margin-bottom: 46rpx;

		.dht1 {
			flex-flow: wrap;
			-webkit-flex-flow: wrap;

			.dht-item {
				width: 104rpx;
				text-align: center;
				margin-right: 43rpx;
				margin-top: 46rpx;

				.dht-item-pic {
					width: 96rpx;
					height: 96rpx;
					margin: 0 auto;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.dht-item-txt {
					font-size: 26rpx;
					white-space: nowrap;
					color: #666666;
					margin-top: 16rpx;
				}
			}

			.dht-item:nth-child(5n+5) {
				margin-right: 0rpx;
			}
		}
	}

	.box {
		width: 100%;

		&.box1 {
			background: linear-gradient(180deg, #F3F6FF 0%, #FFFFFF 100%);
		}

		.box-padding {
			padding: 40rpx 30rpx;

			.box-t {

				.box-t-left {
					font-weight: 600;
					font-size: 32rpx;
					color: #333333;

					.box-t-left-1 {}

					.box-t-left-2 {
						width: 36rpx;
						height: 8rpx;
						background: linear-gradient(90deg, #3873E1 0%, #1C59CC 100%);
						border-radius: 4rpx;
						transform: rotate(90deg);
					}
				}

				.box-t-right {
					font-size: 26rpx;
					color: #666666;
				}
			}

			.box-c {
				.box-c-banner {
					width: 100%;
					height: 176rpx;
					margin-top: 32rpx;
					overflow: hidden;
					border-radius: 12rpx;
				}

				.rowOneBig-item:last-child {
					border-bottom: none;
					padding-bottom: 0;
				}

				.rowOneBig-item {
					padding-bottom: 32rpx;
					margin-top: 32rpx;
					border-bottom: 1px solid #F3F3F3;
				}

				.rowTwo-list {
					margin-top: 32rpx;

					.rowTwo-item {
						width: calc((100% - 18rpx*1)/2);
						margin-right: 18rpx;
						margin-bottom: 18rpx;
					}

					.rowTwo-item:nth-last-of-type(-n+2) {
						margin-bottom: 0;
					}

					.rowTwo-item:nth-of-type(even) {
						margin-right: 0;
					}
				}

				.rowOneSmall-list {
					.rowOneSmall-item {
						margin-top: 32rpx;
					}
				}
			}
		}
	}

	.line {
		width: 100%;
		height: 16rpx;
		background: #F3F3F3;
	}
</style>
