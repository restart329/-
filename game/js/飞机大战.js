onload=function jiazai(){
				var startbtn=document.getElementById("kaishi");
				var index=document.getElementById("start");
				var myplane=document.getElementById("myPlane");
				var bigbox=document.getElementById("box");
				var mainbox=document.getElementById("main");
				var JiFen=document.getElementById("jifen");
				var TanChu=document.getElementById("tanchu");
				var Esc=document.getElementById("esc");
				var TanChuP=document.getElementById("tanchup");
				var TanChuBtn=document.getElementById("tanchubtn");
				//开始游戏
				startbtn.onclick=function(){
					index.style.display="none";
					myplane.style.display="block";
					jishu=0;
					mainboxBKPositionY=0;
					fupao=0;
					wudi=0;
					move();
					timer=setInterval(function(){
						dingshiqi();
					},100);
				}
				//定时器函数
				function dingshiqi(){mainboxBKPositionY+=10;
					mainbox.style.backgroundPositionY=mainboxBKPositionY+"px";
					mainbox.style.opacity=Number(mainbox.style.opacity)+0.1;
					var WoJiZiDans=document.getElementsByClassName("myZidans");
					var dijis=document.getElementsByClassName("diji");
					var baos=document.getElementsByClassName("bao");
					myzidan();
					qingchu(dijis);
					if(jishu%5==0){
						createxiaodiji();
					}
					if(jishu%10==0){
						createzhongdiji();	
					}
					if(jishu%50==0){
						createdadiji();
					}
					jishu++;
					pengzhuang(WoJiZiDans,dijis);
					xiaodijimove();
					zhongdijimove();
					dadijimove();
					if(wudi>0){
						for(var x=0;x<dijis.length;x++){
							baozha(dijis[x]);
						}
						wudi--;
						if(wudi<=30){
							if(wudi%2==0){
								myplane.style.opacity=1;
							}
							else{
								myplane.style.opacity=0.5;
							}
						}
						console.log(wudi);
					}
					else{
						myplane.style.opacity=1;
						for(var x=0;x<dijis.length;x++){
							baozha(dijis[x]);
							myplanebaozha(dijis[x]);
						}
					}
					for(var y=0;y<baos.length;y++){
						chibao(baos[y],dijis);
						baomove(baos[y]);
					}
				}
				//我机移动
				function move(){
					mainbox.onmousemove=function(e){
						myplane.style.left=e.clientX-500-33+"px";
						myplane.style.top=e.clientY-50-40+"px";
					}
				}
				//我机子弹
				function myzidan(){
					var myZidan=document.createElement("img");
					myZidan.className="myZidans";
					myZidan.style.left=myplane.offsetLeft+30+"px";
					myZidan.style.top=myplane.offsetTop-14+"px";
					mainbox.appendChild(myZidan);
					if(fupao!=0){
						var myZidanleft=document.createElement("img");
						myZidanleft.className="myZidans";
						myZidanleft.style.left=myplane.offsetLeft+10+"px";
						myZidanleft.style.top=myplane.offsetTop+14+"px";
						mainbox.appendChild(myZidanleft);
						var myZidanright=document.createElement("img");
						myZidanright.className="myZidans";
						myZidanright.style.left=myplane.offsetLeft+50+"px";
						myZidanright.style.top=myplane.offsetTop+14+"px";
						mainbox.appendChild(myZidanright);
						fupao--;
					}
					var WoJiZiDans=document.getElementsByClassName("myZidans");
					for(var i=0;i<WoJiZiDans.length;i++){
						WoJiZiDans[i].style.top=WoJiZiDans[i].offsetTop-20+"px";
						if(WoJiZiDans[i].offsetTop<-14){
							WoJiZiDans[i].remove();
						}
					}
				}
				//生成小型敌机
				function createxiaodiji(){
					var xiaodiji=document.createElement("img");
					xiaodiji.className="littlediji diji";
					xiaodiji.src="image/enemy1_fly_1.png";
					xiaodiji.xue=10;
					xiaodiji.style.position="absolute";
					xiaodiji.style.top=-24+"px";
					xiaodiji.style.left=Math.round(Math.random()*286)+"px";
					mainbox.appendChild(xiaodiji);
				}
				//小型敌机移动
				function xiaodijimove(){
					var littleDiJi=bigbox.getElementsByClassName("littlediji");
					for(var i=0;i<littleDiJi.length;i++){
						if(littleDiJi[i].xue>0){
							littleDiJi[i].style.top=littleDiJi[i].offsetTop+20+"px";
						}
						if(littleDiJi[i].offsetTop>568){
							littleDiJi[i].remove();
						}
					}
				}
				//生成中型敌机
				function createzhongdiji(){
					var zhongdiji=document.createElement("img");
					zhongdiji.className="middlediji diji";
					zhongdiji.src="image/enemy3_fly_1.png";
					zhongdiji.xue=50;
					zhongdiji.style.position="absolute";
					zhongdiji.style.top=-60+"px";
					zhongdiji.style.left=Math.round(Math.random()*274)+"px";
					mainbox.appendChild(zhongdiji);
				}
				//中型敌机移动
				function zhongdijimove(){
					var middleDiJi=bigbox.getElementsByClassName("middlediji");
					for(var i=0;i<middleDiJi.length;i++){
						if(middleDiJi[i].xue>0){
							middleDiJi[i].style.top=middleDiJi[i].offsetTop+10+"px";
						}
						if(middleDiJi[i].offsetTop>568){
							middleDiJi[i].remove();
						}
					}
				}
				//生成大型敌机
				function createdadiji(){
					var dadiji=document.createElement("img");
					dadiji.className="bigdiji diji";
					dadiji.src="image/enemy2_fly_1.png";
					dadiji.xue=100;
					dadiji.style.position="absolute";
					dadiji.style.top=-164+"px";
					dadiji.style.left=Math.round(Math.random()*210)+"px";
					mainbox.appendChild(dadiji);
				}
				//大型敌机移动
				function dadijimove(){
					var bigDiJi=bigbox.getElementsByClassName("bigdiji");
					for(var i=0;i<bigDiJi.length;i++){
						if(bigDiJi[i].xue>0){
							bigDiJi[i].style.top=bigDiJi[i].offsetTop+5+"px";
						}
						if(bigDiJi[i].offsetTop>568){
							bigDiJi[i].remove();
						}
					}
				}
				//碰撞
				function pengzhuang(WoJiZiDans,dijis){
					for(var i=0;i<WoJiZiDans.length;i++){
						for(var j=0;j<dijis.length;j++){
							if(WoJiZiDans[i].offsetTop<=dijis[j].offsetTop+dijis[j].offsetHeight&&WoJiZiDans[i].offsetLeft+6>=dijis[j].offsetLeft&&WoJiZiDans[i].offsetLeft<=dijis[j].offsetLeft+dijis[j].offsetWidth&&dijis[j].xue>0){
								if(dijis[j].className=="littlediji diji"){
									dijis[j].xue-=10;
								}
								if(dijis[j].className=="middlediji diji"){
									dijis[j].src="image/中飞机挨打.png";
									dijis[j].xue-=10;
								}
								if(dijis[j].className=="bigdiji diji"){
									dijis[j].src="image/大飞机挨打.png";
									dijis[j].xue-=10;
								}
								WoJiZiDans[i].remove();
								break;
							}
						}
					}
				}
				//爆炸
				function baozha(dijis){
					if(dijis.xue<=0){
						if(dijis.className=="littlediji diji"){
							dijis.src="image/小飞机爆炸.gif";
							JiFen.innerHTML=Number(JiFen.innerHTML)+1;
						}
						if(dijis.className=="middlediji diji"){
							dijis.src="image/中飞机爆炸.gif";
							JiFen.innerHTML=Number(JiFen.innerHTML)+2;
						}
						if(dijis.className=="bigdiji diji"){
							dijis.src="image/大飞机爆炸.gif";
							JiFen.innerHTML=Number(JiFen.innerHTML)+3;
							var bao=document.createElement("div");
							var suiji=Math.floor(Math.random()*4);
							switch(suiji){
								case 0:bao.remove();break;
								case 1:bao.className="bao1 bao";break;
								case 2:bao.className="bao2 bao";break;
								case 3:bao.className="bao3 bao";break;
							}
							bao.time=50;
							bao.style.left=dijis.offsetLeft+dijis.offsetWidth/2+"px";
							bao.style.top=dijis.offsetTop+dijis.offsetHeight/2+"px";
							mainbox.appendChild(bao);
						}
					}	
				}
				//宝移动和消失
				function baomove(baos){
					baos.style.top=baos.offsetTop+2+"px";
					baos.time--;
					if(baos.time<=0){
						baos.remove();
					}
				}
				//我机吃宝
				function chibao(baos,dijis){
					if(baos.offsetLeft>=myplane.offsetLeft&&baos.offsetTop>=myplane.offsetTop&&baos.offsetLeft+10<=myplane.offsetLeft+66&&baos.offsetTop+10<=myplane.offsetTop+80){
						if(baos.className=="bao1 bao"){
							for(var i=0;i<dijis.length;i++){
								dijis[i].xue=0;
								mainbox.style.opacity=0.5;
							}
						}
						if(baos.className=="bao2 bao"){
							fupao+=100;
						}
						if(baos.className=="bao3 bao"){
							myplane.style.opacity=0.5;
							wudi+=100;
						}
						baos.style.display="none";
					}
				}
				//清除爆炸敌机
				function qingchu(dijis){
					for(var i=0;i<dijis.length;i++){
						if(dijis[i].xue<=0){
							dijis[i].remove();
						}
					}
				}
				//清除所有敌机
				function clearalldijis(){
					var dijis=document.getElementsByClassName("diji");
					while(dijis.length!=0){
						var dijis=document.getElementsByClassName("diji");
						for(var i=0;i<dijis.length;i++){
							dijis[i].remove();
						}
					}
				}
				//清除所有我机子弹
				function clearallmyzidans(){
					var myZidans=document.getElementsByClassName("myZidans");
					while(myZidans.length!=0){
						var myZidans=document.getElementsByClassName("myZidans");
						for(var i=0;i<myZidans.length;i++){
							myZidans[i].remove();
						}
					}
				}
				//清除所有宝
				function clearallbao(){
					var baos=document.getElementsByClassName("bao");
					while(baos.length!=0){
						var baos=document.getElementsByClassName("bao");
						for(var i=0;i<baos.length;i++){
							baos[i].remove();
						}
					}
				}
				//重新开始
				function chongkai(){
					clearallmyzidans();
					clearalldijis();
					clearallbao();
					Esc.style.display="none";
					TanChu.style.display="none";
					myplane.src="image/我的飞机.gif";
					JiFen.innerHTML=0;
					jishu=0;
					mainboxBKPositionY=0;
					fupao=0;
					wudi=0;
					move();
					timer=setInterval(function(){
						dingshiqi();
					},100);
				}
				//我机碰撞爆炸
				function myplanebaozha(diji){
					if(myplane.offsetLeft>=diji.offsetLeft-myplane.offsetWidth&&myplane.offsetLeft<=diji.offsetLeft+diji.offsetWidth&&myplane.offsetTop<=diji.offsetTop+diji.offsetHeight&&myplane.offsetTop>=diji.offsetTop||myplane.offsetLeft>=diji.offsetLeft-myplane.offsetWidth&&myplane.offsetLeft<=diji.offsetLeft+diji.offsetWidth&&myplane.offsetTop+myplane.offsetHeight>=diji.offsetTop&&myplane.offsetTop+myplane.offsetHeight<=diji.offsetTop+diji.offsetHeight){
						mainbox.onmousemove="";
						myplane.src="image/本方飞机爆炸.gif";
						clearInterval(timer);
						TanChu.style.display="block";
						TanChuP.innerHTML="最终得分为："+JiFen.innerHTML;
						TanChuBtn.onclick=function(){
							chongkai();
						}
					}
				}
				//Esc菜单
				document.onkeydown=function(e){
					if(e.which==27){
						if(TanChu.style.display!="block"){
							if(Esc.style.display!="block"){
								clearInterval(timer);
								Esc.style.display="block";
								mainbox.onmousemove="";
								var JiXu=document.getElementById("jixu");
								var ChongKai=document.getElementsByClassName("chongkai")[0];
								var FanHui=document.getElementById("fanhui");
								//继续
								JiXu.onclick=function(){
									Esc.style.display="none";
									move();
									timer=setInterval(function(){
										dingshiqi();
									},100);
								}
								//重新开始
								ChongKai.onclick=function(){
									chongkai();
								}
								//返回
								FanHui.onclick=function(){
									clearalldijis();
									clearallmyzidans();
									clearallbao();
									Esc.style.display="none";
									index.style.display="block";
									JiFen.innerHTML=0;
									jishu=0;
									mainboxBKPositionY=0;
									fupao=0;
									wudi=0;
								}
							}
							else if(Esc.style.display!="none"){
								Esc.style.display="none";
								move();
								timer=setInterval(function(){
									dingshiqi();
								},100);
							}
						}
					}
				}
			}