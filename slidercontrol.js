function addSlider(){
	var container = document.getElementById("container");
	var list = document.getElementById("list");
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById("prev");
	var index = 1;
	var animated = false;
	var timer;


	//设置小圆点随着点击亮起的功能
	function buttonLight(){
		for (var i =0; i < buttons.length;i++){
			if (buttons[i].className == "on"){
				buttons[i].className = "";
				break;
			}
		}
		buttons[index-1].className = "on";
	}

	//点击左右翻动图片功能
	function animate(offset){
		animated = true;
		var newLeft = parseInt(list.style.left) + offset;
		var finishTime = 300;    //切换一张图片的总时间消耗
		var interval = 10;       //切换图片效果中的间隔时间
		var speed = offset/(finishTime/interval);    //每一次的位移量
		function go(){
			if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)){
				list.style.left =  parseInt(list.style.left) + speed + "px";
				setTimeout(go,interval);
			}
			else{
				animated = false;
				list.style.left = newLeft + "px";
				if(newLeft > -400){
					list.style.left = -2000 + "px";
				}
				if (newLeft < -2000) {
					list.style.left = -400 + "px";
				}
			}
		}
		go();
	}

	//自动轮播
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},2000);
	}

	function stop(){
		clearInterval(timer);
	}
	//向左点击事件
	prev.onclick = function () {
		if (index == 1){
			index = 5;
		}else{
			index -= 1;
		}
		buttonLight();
		if (!animated) {
			animate(400);
		}
	}
	//向右点击事件
	next.onclick = function () {
		if (index == 5){
			index = 1;
		}else{
			index += 1;
		}
		buttonLight();
		if (!animated){
			animate(-400);
		}
	}

	//设置点击圆点按钮的切换操作
	for (var i=0; i<buttons.length; i++){
		buttons[i].onclick = function () {
			if (this.className == "on"){
				return;
			}
			var myIndex = parseInt(this.getAttribute("index"));
			var offset = -400 * (myIndex - index);
			index = myIndex;
			animate(offset);
			buttonLight();
			
		}
	}
	container.onmouseover = stop;
	container.onmouseout = play;
	play();
};