/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
const BASE_URL = uni.BASE_URL
export const checkUserinfo=()=> {
	const userinfo_update = uni.getStorageSync('userinfo')
	console.log(userinfo_update)
	const pid=uni.getStorageSync('pid')
	if (!userinfo_update || !userinfo_update.uid) {
		setTimeout(function(){
			uni.navigateTo({
				url: '/pages/login/login',
			});
		},1500)
	}else{
		uni.request({
			url: BASE_URL+'index/user/update_userdata',
			data: {
				uid:userinfo_update.uid,
				pid:pid?pid:0
			},
			method:'POST',
			success:(res) =>{			
				const userinfo_check = uni.getStorageSync('userinfo');
				if(res.data.code==200){
					const userdata = res.data.data
					userinfo_check.userdata=userdata
					uni.setStorageSync('userinfo',userinfo_check)
				}else{
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon:'none'
					});
					uni.removeStorageSync('userinfo');
					setTimeout(function(){
						uni.navigateTo({
							url: '/pages/login/login',
						});
					},1500)
				}
			},
			fail:(err)=> {
		
			}
		});
	}
	}
	
	
	
	export const wx_login =()=>{
		var pid=uni.getStorageSync('pid')
		pid=pid?pid:0
		var set=uni.getStorageSync('base_set')
		// #ifdef H5
		var appid=set.h5.appid
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {  
		   function GetQueryString(name) {
		     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		     var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
		     var context = ""; 
		     if (r != null) 
		   	 context = r[2]; 
		     reg = null; 
		     r = null; 
		     return context == null || context == "" || context == "undefined" ? "" : context; 
		   }
		   
		   var code1 = GetQueryString('code')
		   localStorage.setItem('code',code1)
		   var code = localStorage.getItem('code')
		   if (code == null || code === '') {
			   var H5_URL=window.location.href.split('#')[0]
			   //var H5_URL=uni.H5_URL
		   	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+
		   	    '&redirect_uri=' + encodeURIComponent(H5_URL) + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'

		   }else{
		   	console.log(code)
			//window.location.href ='https://h5.sxjiangyan.com/#/'
		   	const BASE_URL=uni.BASE_URL
		   	uni.request({
		   		url: BASE_URL+'index/user/gzh_code',
		   		data: {
		   			code:code,
					pid:pid
		   		},
		   		method:'POST',
		   		success:(res) =>{
		   			console.log(res.data);
					var userinfo ={}
					userinfo.uid=res.data.data.uid
					userinfo.phone=res.data.data.phone
					userinfo.token=res.data.data.token
					userinfo.userdata=res.data.data
					uni.setStorageSync('userinfo',userinfo)
					uni.showToast({
						title:'登录成功！'
					})
					// uni.switchTab({
					// 	url:'/pages/index/index'
					// })
					uni.navigateBack()
		   		},
		   		fail:(res)=> {
		   			console.log(res.data);
		   		}
		   	});
		   }
		}
		// #endif
		// #ifdef MP-WEIXIN
		var apptype='MP-WEIXIN';
		const userinfo = uni.getStorageSync('userinfo');
		// 获取用户信息
		uni.getUserProfile({
		  desc:'登录',
		  success: function (infoRes) {
		    console.log(infoRes.userInfo);
			var userinfo = uni.getStorageSync('userinfo');
			if(!userinfo || userinfo==''){
				var userinfo={};
				userinfo.wxinfo=infoRes.userInfo;
			}else{
				userinfo.wxinfo=infoRes.userInfo;
			}
			uni.setStorageSync('userinfo',userinfo);
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes);
				const BASE_URL=uni.BASE_URL;
				const code=loginRes.code;
				uni.request({
					url: BASE_URL+'index/user/wxapp_code',
					data: {
						code:code,
						apptype:apptype
					},
					method:'POST',
					success:(res) =>{
						// console.log(res.data);
						let openid=res.data.openid;
						let unionid=res.data.unionid;
						var userinfo=uni.getStorageSync('userinfo');
						uni.request({
							url: BASE_URL+'index/user/update_userinfo',
							data: {
								pid:pid,
								uid:userinfo.uid?userinfo.uid:'',
								avatar:userinfo.wxinfo.avatarUrl,
								country:userinfo.wxinfo.country,
								province:userinfo.wxinfo.province,
								city:userinfo.wxinfo.city,
								unionid:unionid,
								openid:openid,
								nickname:userinfo.wxinfo.nickName,
								apptype:apptype
							},
							method:'POST',
							success:(res) =>{
								// console.log(res.data);
								var userinfo=uni.getStorageSync('userinfo');
								userinfo.userdata=res.data.data;
								userinfo.uid=res.data.data.uid;
								userinfo.phone=res.data.data.phone;
								userinfo.token=res.data.data.token;
								uni.setStorageSync('userinfo',userinfo);
								uni.showToast({
									title:'登录成功！'
								});
								uni.navigateBack();
							},
							fail:(res)=> {
								console.log(res.data);
							}
						});
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			  }
			});
		  }
		});

		// #endif
		// #ifdef APP-PLUS || MP-TOUTIAO || MP-ALIPAY || MP-BAIDU || MP-360 || MP-QQ
			var apptype='APP-PLUS'
			const userinfo = uni.getStorageSync('userinfo');
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes);
				const BASE_URL=uni.BASE_URL
				uni.request({
					url: BASE_URL+'index/user/app_wxauth',
					data: {
						token:loginRes.authResult.access_token,
						openid:loginRes.authResult.openid,
						apptype:apptype,
						pid:pid
					},
					method:'POST',
					success:(res) =>{
						console.log(res.data);
						var userinfo ={}
						userinfo.uid=res.data.data.uid
						userinfo.phone=res.data.data.phone?res.data.data.phone:''
						userinfo.token=res.data.data.token
						userinfo.userdata=res.data.data
						uni.setStorageSync('userinfo',userinfo)
						uni.showToast({
							title:'登录成功！'
						})
						uni.switchTab({
							url:'/pages/user/user'
						})
					},
					fail:(res)=> {
						console.log(res.data);
					}
				});
			
			  }
			});
			
		// #endif
	}