$(function() {
	$("#backgroundTriangle").height($(window).height());
	if(isOldIE()){
		$(".browserTips").show()
	}
	// 绘制背景
	drawTriangle();
	$("#backgroundTriangle").fadeIn(3000)
	window.setInterval(function() {
		$("#backgroundTriangle").fadeOut(2000, function() {
			drawTriangle();
			$("#backgroundTriangle").fadeIn(2000)
		})
	}, 4500);

})

function keyDown() {
	if(event.keyCode == 13) {
		login()
	}
}

function login() {
	var param = new Object()
	param.userName = $("#loginName").val();
	param.passWord = $("#passWord").val();
	
	$.ajax({
		type:"post",
		url:BASEPATH + "/login/doLogin.do",
		data : param,
//		beforeSend:function(request){
//			request.setRequestHeader("Authorization","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjc3BjcyIsImlhdCI6MTUyMjI1Mjk0OCwiZXhwIjoxNTIyMjUyOTY4fQ.d3y8JmdU8ijiVpv3wRl0KLTZjWINx9RImirVycs53cs");
//			request.setRequestHeader("Auth","cspcs");
//		},
		success:function(result){
			console.log(result);
			if(result.code == 200){
				xToken.token = result.data.token;
				xToken.loginName = result.data.user.loginName;
				xToken.departmentName = result.data.user.departmentName;
				xToken.userId = result.data.user.departmentId;
				
				document.cookie = "xtoken="+result.data.token;
				document.cookie = "xdeptId="+result.data.user.departmentId;
				document.cookie = "loginName="+result.data.user.loginName;
				
				window.location.href="index.html";
			}else{
				
			}
			
		}
	});
	//window.location.href="index.html";
}

var drawTriangle = function() {
	var c = document.getElementById('backgroundTriangle'),
		x = c.getContext('2d'),
		pr = window.devicePixelRatio || 1,
		w = window.innerWidth,
		h = window.innerHeight,
		f = 60,
		q,
		m = Math,
		r = 0,
		u = m.PI * 2,
		v = m.cos,
		z = m.random
	c.width = w * pr
	c.height = h * pr
	x.scale(pr, pr)
	x.globalAlpha = 0.6;

	function i() {
		x.clearRect(0, 0, w, h)
		q = [{
			x: 0,
			y: h * .7 + f
		}, {
			x: 0,
			y: h * .7 - f
		}]
		while(q[1].x < w + f) d(q[0], q[1])
	}

	function d(i, j) {
		x.beginPath()
		x.moveTo(i.x, i.y)
		x.lineTo(j.x, j.y)
		var k = j.x + (z() * 2 - 0.25) * f,
			n = y(j.y)
		x.lineTo(k, n)
		x.closePath()
		r -= u / -50
		x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
		x.fill()
		q[0] = q[1]
		q[1] = {
			x: k,
			y: n
		}
	}

	function y(p) {
		var t = p + (z() * 2 - 1.1) * f
		return(t > h || t < 0) ? y(p) : t
	}
	i();
}