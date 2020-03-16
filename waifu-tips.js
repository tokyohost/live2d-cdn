/*
 * Live2D Widget-cdn
 *
 */

function loadWidget(waifuPath, apiPath) {
	localStorage.removeItem("waifu-display");
	sessionStorage.removeItem("waifu-text");
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="300" height="300"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment"></span>
				<span class="fa fa-lg fa-paper-plane"></span>
				<span class="fa fa-lg fa-user-circle"></span>
				<span class="fa fa-lg fa-street-view"></span>
				<span class="fa fa-lg fa-camera-retro"></span>
				<span class="fa fa-lg fa-info-circle"></span>
				<span class="fa fa-lg fa-times"></span>
			</div>
		</div>`);
	// https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
	setTimeout(() => {
		document.getElementById("waifu").style.bottom = 0;
	}, 0);
	
	
	//获取所有的class的元素
	function getClass(tagName, className) //获得标签名为tagName,类名className的元素
	 {
		 if (document.getElementsByClassName) //支持这个函数
		 {
			 return document.getElementsByClassName(className);
		 }
		else {
			 var tags = document.getElementsByTagName(tagName);//获取标签
			 var tagArr = [];//用于返回类名为className的元素
			 for (var i = 0; i < tags.length; i++) {
				 if (tags[i].class == className) {
					 tagArr[tagArr.length] = tags[i];//保存满足条件的元素
				 }
			}
			 return tagArr;
		 }
	}
	

	function registerEventListener() {
		document.querySelector("#waifu-tool .fa-comment").addEventListener("click", showHitokoto);
		
		//判断是否是android 手机
		
		if(/Android|webOS|iPhone|iPod|BlackBerry|ios/i.test(navigator.userAgent)) {
	    	document.querySelector("#waifu-tool .fa-paper-plane").addEventListener("click",() => {					//是安卓手机
			showMessage("主人说这个功能没有适配好手机，所以不给你用哦~", 6000, 9);
		});
		} else {
    		document.querySelector("#waifu-tool .fa-paper-plane").addEventListener("click", () => {	//飞机大战
			if (window.Asteroids) {
				if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
				window.ASTEROIDSPLAYERS.push(new Asteroids());
			} else {
				var script = document.createElement("script");
				script.src = "https://cdn.jsdelivr.net/gh/GalaxyMimi/CDN/asteroids.js";
				document.head.appendChild(script);
			}
		});
		}
	
		document.querySelector("#waifu-tool .fa-user-circle").addEventListener("click", loadOtherModel);
		document.querySelector("#waifu-tool .fa-street-view").addEventListener("click", loadRandModel);
		document.querySelector("#waifu-tool .fa-camera-retro").addEventListener("click", () => {
			showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
			Live2D.captureName = "photo.png";
			Live2D.captureFrame = true;
		});
		document.querySelector("#waifu-tool .fa-info-circle").addEventListener("click", () => {
			showMessage("主人说我是从live2d-widget修改过来的,但是我怀疑他在骗我！我明明是他亲生的！~", 6000, 9);
		});
		document.querySelector("#waifu-tool .fa-times").addEventListener("click", () => {
			localStorage.setItem("waifu-display", Date.now());
			showMessage("愿你有一天能与重要的人重逢。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			setTimeout(() => {
				document.getElementById("waifu").style.display = "none";
				document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
			}, 3000);
		});
		var devtools = () => {};
		console.log("%c", devtools);
		devtools.toString = () => {
			showMessage("哈哈，你打开了控制台，是想要看看我的小秘密吗？", 6000, 9);
		};
		window.addEventListener("copy", () => {
			showMessage("你都复制了些什么呀，转载要记得加上出处哦！", 6000, 9);
		});
		window.addEventListener("visibilitychange", () => {
			if (!document.hidden) showMessage("哇，你终于回来了～", 6000, 9);
		});
		
		//注册登陆页面监听
		
		var studentnm = document.querySelector("#inputEmail3");
		
		if(studentnm){
			studentnm.addEventListener("click", () => {					//鼠标移动到学号输入框
				showMessage("主人说一定要记住自己的学号呀！", 6000, 9);
			});	
		}
		
		var passwdinput = document.querySelector("#inputPassword3");
		if(passwdinput){
			passwdinput.addEventListener("click",() => {					//鼠标移动到密码输入框
				showMessage("主人说密码连续输入错误两次，今天一天都不能查成绩了！QAQ", 6000, 9);
			});
		}
		
		var downloadurl = document.querySelector("#downloadApp");
		
		if(downloadurl){
				downloadurl.addEventListener("mouseover",() => {					//鼠标移动到APP下载
				showMessage("主人太菜了！他只会写Android手机的APP，所以用IOS的苹果手机亲~请看下面的提示吧！", 6000, 9);
			});
		}
		
		var downloadOver = document.querySelector("#downloadApp")
		if(downloadOver){
				downloadOver.addEventListener("click",() => {					//鼠标移动到APP下载
				showMessage("如果在微信打开这个页面的话是不能下载APP的哦~只能在浏览器或者APP下载的，嘿嘿", 6000, 9);
			});
		}
		
		
	
		var enterButton = document.querySelector("#login-button")
		if(enterButton){
				enterButton.addEventListener("mouseover",() => {					//鼠标移动到查询按钮
				showMessage("亲！请一定要好好检查一下呀！QAQ", 6000, 9);
			});
		}
		
		//判断成绩
		
		function checkchengji(chengji){
			if(chengji < 60 && chengji != 0){
				return "没关系！这次考砸啦，咱们补考就是啦！摸摸头！";
			}else if(chengji  == 0){
				return "逃课了吗?还是没去考试呀... 下次不许了哦！";
			}else if(chengji >=60 && chengji <75){
				return "哎呀！没关系！咱们至少没挂科!嘿嘿  60分万岁！";
				
			}else if(chengji >=75 && chengji <80){
				return "耶耶！全部成绩在75分以上的话，三等奖学金有希望哦！再加把劲！加油加油加油！";
			}else if(chengji >=80 && chengji <85){
				return "学霸！只要这学期所有课程分数都在80以上的话二等奖学金就能带走啦！😘";
				
			}else if(chengji >=85 && chengji <95){
				return "哇！一等一等一等奖学金哦~加油！奥里给！！！";
			}else if(chengji >=95 && chengji <100){
				return "绩点满分！给你一朵小红花🌷";
			}else if(chengji == 100){
				return "emmm,牛批！";
			}else if(chengji == "优秀"){
				return "果真优秀！~~ 代主人向你祝贺~~哈哈👍";
				
			}else if(chengji == "良好"){
				return "良好就是85分哦，这样的话，我们也可以拿到一等奖学金了哦~😊";
			}else if(chengji == "中等"){
				return "没关系啦，中等相当于75分，三等奖也能拿到的~下次再接再厉！永不放弃~奥里给";
			}else if(chengji == "及格"){
				return "及格万岁！60分万岁~";
				
			}else if(chengji == "不及格"){
				return "额~不就是补考嘛，小问题小问题！~~";
			}else{
				return "emmm,大概又出现了该死的BUG,如果不嫌麻烦可以邮件至 2508058633@qq.com 提BUG单,复现的方法也一并提交哦~";
			}
			
			
			
		}
		//计算百分比占比
		// ///计算两个整数的百分比值
		// function GetPercent(num, total) {
		// 	num = parseFloat(num);
		// 	total = parseFloat(total)-1.0;
		// 	if (isNaN(num) || isNaN(total)) {
		// 		return "-";
		// 	}
		// 	return total <= 0 ? "0%" : (parseInt(100 - (Math.round(num / total * 10000) / 100.00)) + "%");
		// }
		//curNum：当前数据，totalNum：总数据，isHasPercentStr：是否返回%字符
		function getPercent(curNum, totalNum, isHasPercentStr) {
	        	curNum =parseFloat(totalNum)- parseFloat(curNum) + 1;
	        	totalNum = parseFloat(totalNum);
	 
	         if (isNaN(curNum) || isNaN(totalNum)) {
	             return '-';
	         }
	 
	         return isHasPercentStr ?
	             totalNum <= 0 ? '0%' : (Math.round(curNum / totalNum * 10000) / 100.00 + '%') :
	             totalNum <= 0 ? 0 : (Math.round(curNum / totalNum * 10000) / 100.00);
    	}
		
		//注册成绩页面监听
		
		var classitem = document.querySelectorAll("#classitem");
		
		if(classitem.length > 0){
			
			var i;
			
			for(i=0;i<classitem.length;i++){
				var classid = classitem[i].querySelector("#classid").innerHTML;
				var classname = classitem[i].querySelector(`#classname${classid}`).innerHTML;
				var jidian = classitem[i].querySelector("#jidian").innerHTML;
				var chengji = classitem[i].querySelector(`#classchengji${classid}`).innerHTML;
				
				
				//添加课程名称的监听
				
				var classnamelistener = classitem[i].querySelector(`#classname${classid}`);
				classnamelistener.addEventListener("mouseover",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(`你的成绩是<span>${chengji}</span> 哟~`, 3000, 11);
								}
							})(classname,chengji));
				
				classnamelistener.addEventListener("onclick",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(`你的成绩是<span>${chengji}</span> 哟~`, 3000, 11);
								}
							})(classname,chengji));
				//添加绩点的监听
				var jidianlistener = classitem[i].querySelector("#jidian");
				jidianlistener.addEventListener("mouseover",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(`<span>${classname}</span>  你的成绩是<span>${chengji}</span> ~`, 3000, 11);
								}
							})(classname,chengji));
				jidianlistener.addEventListener("onclick",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(`<span>${classname}</span>  你的成绩是<span>${chengji}</span> ~`, 3000, 11);
								}
							})(classname,chengji));
				
				//添加课程ID的监听
				var classidlinstener = classitem[i].querySelector("#classid");
				classidlinstener.addEventListener("mouseover",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(`<span>${classname}</span>  你的成绩是<span>${chengji}</span> ~`, 3000, 11);
								}
							})(classname,chengji));
				classidlinstener.addEventListener("onclick",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(`<span>${classname}</span>  你的成绩是<span>${chengji}</span> ~`, 3000, 11);
								}
							})(classname,chengji));
							
				//对成绩进行监听
				var classchengjilinstener = classitem[i].querySelector(`#classchengji${classid}`);
				classchengjilinstener.addEventListener("mouseover",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(checkchengji(chengji), 3000, 11);
								}
							})(classname,chengji));
				classchengjilinstener.addEventListener("onclick",(function setMouseOver(classname,chengji){
								return function(){
									showMessage(checkchengji(chengji), 3000, 11);
								}
							})(classname,chengji));
				//对其它元素添加监听
				
				if(classname && jidian && classid){
					
					var items = document.querySelectorAll(`#classp${classid}`);
					
					if(items.length > 0){
						
						var j;
						for(j=0;j<items.length;j++){
								// classname = itemclass.innerHTML;
							// console.log("itemclassname="+classname);
							items[j].addEventListener("mouseover",(function setMouseOver(classname,chengji){
								return function(){
									// console.log(`已添加${classname}的监听`);
									showMessage(`<span>${classname}</span>  你的成绩是<span>${chengji}</span> ~`, 3000, 11);
								}
							})(classname,chengji));
							items[j].addEventListener("onclick",(function setMouseOver(classname,chengji){
								return function(){
									// console.log(`已添加${classname}的监听`);
									showMessage(`<span>${classname}</span>  你的成绩是<span>${chengji}</span> ~`, 3000, 11);
								}
							})(classname,chengji));
						};
							
					}
						
				}else{
					// showMessage("加油！总之这门课结束啦！~~", 3000, 9);
				}	
			}
			
		}	
		
			
		//对成绩排名进行监听
		var paiminDiv = document.querySelector("#paimin");	
		var paiminPnumDiv = document.querySelector("#paiminPnum");	
		var showpaiminTable = document.querySelector("#showpaimin");	//获取排名表格
		
		// if(paimin && paiminPnum && paiminTable){
		if(true){
			if(!paiminDiv){
				return;
			}
			if(!paiminPnumDiv){
				return;
			}
			var paimin = paiminDiv.innerHTML;//排名位置
			var paiminPnum = paiminPnumDiv.innerHTML;//排名人数
			
			var paiminTableTd = showpaiminTable.querySelectorAll("td");
			var k;
			for(k=0;k<paiminTableTd.length;k++){
				paiminTableTd[k].addEventListener("mouseover",(function setMouseOver(paimin,paiminPnum){
								return function(){
									var linxian = getPercent(paimin,paiminPnum,true);
									showMessage(`你在<span>${paiminPnum}</span>个同学中,排名第<span>${paimin}</span>名,在咱们专业领先${linxian}的同学哦`, 3000, 11);
								}
							})(paimin,paiminPnum));
				
			}
		}

	}
	registerEventListener();
	
	function closeDefault(){
		document.getElementById("waifu").style.bottom = "-500px";
		document.getElementById("waifu").style.display = "none";
		document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
	}
	closeDefault();
	function welcomeMessage() {
		var text;
		if (location.pathname === "/queryscore" || location.pathname === "/queryscore/") { // 如果是主页
			var now = new Date().getHours();
			if (now > 5 && now <= 7) text = "早上好！一日之计在于晨，美好的一天就要开始了。";
			else if (now > 7 && now <= 11) text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
			else if (now > 11 && now <= 13) text = "中午了，工作了一个上午，现在是午餐时间！";
			else if (now > 13 && now <= 17) text = "午后很容易犯困呢，今天的运动目标完成了吗？";
			else if (now > 17 && now <= 19) text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～";
			else if (now > 19 && now <= 21) text = "晚上好，今天过得怎么样？";
			else if (now > 21 && now <= 23) text = ["已经这么晚了呀，早点休息吧，晚安～", "深夜时要爱护眼睛呀！"];
			else text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
		} else if (document.referrer !== "") {
			var referrer = new URL(document.referrer),
				domain = referrer.hostname.split(".")[1];
			if (location.hostname == referrer.hostname) text = `欢迎来到<span>「${document.title.split(" - ")[0]}」</span>`;
			else if (domain == "baidu") text = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&wd=")[1].split("&")[0]}</span> 找到的我吗？`;
			else if (domain == "so") text = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&q=")[1].split("&")[0]}</span> 找到的我吗？`;
			else if (domain == "google") text = `Hello！来自 谷歌搜索 的朋友<br>欢迎来到<span>「${document.title.split(" - ")[0]}」</span>`;
			else text = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`;
		} else {
			text = `欢迎来到<span>「${document.title.split(" - ")[0]}」</span>`;
		}
		showMessage(text, 7000, 8);
	}
	welcomeMessage();
	// 检测用户活动状态，并在空闲时显示消息
	var userAction = false,
		userActionTimer = null,
		messageTimer = null,
		messageArray = ["好久不见，日子过得好快呢……", "大坏蛋！你都多久没理人家了呀，嘤嘤嘤～", "嗨～快来逗我玩吧！", "拿小拳拳锤你胸口！", "记得把小家加入 Adblock 白名单哦！"];
	window.addEventListener("mousemove", () => userAction = true);
	window.addEventListener("keydown", () => userAction = true);
	setInterval(() => {
		if (userAction) {
			userAction = false;
			clearInterval(userActionTimer);
			userActionTimer = null;
		} else if (!userActionTimer) {
			userActionTimer = setInterval(() => {
				showMessage(messageArray[Math.floor(Math.random() * messageArray.length)], 6000, 9);
			}, 20000);
		}
	}, 1000);

	function showHitokoto() {
		// 增加 hitokoto.cn 的 API
		fetch("https://v1.hitokoto.cn")
			.then(response => response.json())
			.then(result => {
				var text = `This message  <span>「${result.from}」</span>，from <span>${result.creator}</span> at hitokoto.cn .`;
				showMessage(result.hitokoto, 6000, 9);
				setTimeout(() => {
					showMessage(text, 4000, 9);
				}, 6000);
			});
	}

	function showMessage(text, timeout, priority) {
		if (!text) return;
		if (!sessionStorage.getItem("waifu-text") || sessionStorage.getItem("waifu-text") <= priority) {
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
			if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length)];
			sessionStorage.setItem("waifu-text", priority);
			var tips = document.getElementById("waifu-tips");
			tips.innerHTML = text;
			tips.classList.add("waifu-tips-active");
			messageTimer = setTimeout(() => {
				sessionStorage.removeItem("waifu-text");
				tips.classList.remove("waifu-tips-active");
			}, timeout);
		}
	}

	function initModel() {
		var modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (modelId == null) {
			// 首次访问加载 指定模型 的 指定材质
			var modelId = 4, // 模型 ID
				modelTexturesId = 18; // 材质 ID
		}
		loadModel(modelId, modelTexturesId);
		fetch(waifuPath)
			.then(response => response.json())
			.then(result => {
				result.mouseover.forEach(tips => {
					window.addEventListener("mouseover", event => {
						if (!event.target.matches(tips.selector)) return;
						var text = Array.isArray(tips.text) ? tips.text[Math.floor(Math.random() * tips.text.length)] : tips.text;
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
					});
				});
				result.click.forEach(tips => {
					window.addEventListener("click", event => {
						if (!event.target.matches(tips.selector)) return;
						var text = Array.isArray(tips.text) ? tips.text[Math.floor(Math.random() * tips.text.length)] : tips.text;
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
					});
				});
				result.seasons.forEach(tips => {
					var now = new Date(),
						after = tips.date.split("-")[0],
						before = tips.date.split("-")[1] || after;
					if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
						var text = Array.isArray(tips.text) ? tips.text[Math.floor(Math.random() * tips.text.length)] : tips.text;
						text = text.replace("{year}", now.getFullYear());
						//showMessage(text, 7000, true);
						messageArray.push(text);
					}
				});
			});
	}
	initModel();

	function loadModel(modelId, modelTexturesId) {
		localStorage.setItem("modelId", modelId);
		if (modelTexturesId === undefined) modelTexturesId = 0;
		localStorage.setItem("modelTexturesId", modelTexturesId);
		loadlive2d("live2d", `${apiPath}/get/?id=${modelId}-${modelTexturesId}`, console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`));
	}

	function loadRandModel() {
		var modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		// 可选 "rand"(随机), "switch"(顺序)
		fetch(`${apiPath}/rand_textures/?id=${modelId}-${modelTexturesId}`)
			.then(response => response.json())
			.then(result => {
				if (result.textures.id == 1 && (modelTexturesId == 1 || modelTexturesId == 0)) showMessage("我还没有其他衣服呢！", 4000, 10);
				else showMessage("我的新衣服好看嘛？", 4000, 10);
				loadModel(modelId, result.textures.id);
			});
	}

	function loadOtherModel() {
		var modelId = localStorage.getItem("modelId");
		fetch(`${apiPath}/switch/?id=${modelId}`)
			.then(response => response.json())
			.then(result => {
				loadModel(result.model.id);
				showMessage(result.model.message, 4000, 10);
			});
	}
}





function initWidget(waifuPath = "/waifu-tips.json", apiPath = "") {
	if (screen.width <= 320) return;
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
			<span>快点我</span>
		</div>`);
	var toggle = document.getElementById("waifu-toggle");
	toggle.addEventListener("click", () => {
		toggle.classList.remove("waifu-toggle-active");
		if (toggle.getAttribute("first-time")) {
			loadWidget(waifuPath, apiPath);
			toggle.removeAttribute("first-time");
		} else {
			localStorage.removeItem("waifu-display");
			document.getElementById("waifu").style.display = "";
			setTimeout(() => {
				document.getElementById("waifu").style.bottom = 0;
			}, 0);
		}
	});
	if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
		toggle.setAttribute("first-time", true);
		setTimeout(() => {
			toggle.classList.add("waifu-toggle-active");
		}, 0);
	} else {
		loadWidget(waifuPath, apiPath);
	}
}