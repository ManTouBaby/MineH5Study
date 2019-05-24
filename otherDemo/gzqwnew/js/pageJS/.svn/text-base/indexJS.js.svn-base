$(function() {
	$("#mainIFrame").height($(window).height() - $(".main-header").height() -5);
	$(window).resize(function() {
		$("#mainIFrame").height($(window).height() - $(".main-header").height()-5);
	});
	
})

function iFrame2Page(url){
	$("#mainIFrame").attr("src",url)
}

function logout(){
	$("#logoutModal").modal()
}

function doLogout(){
	window.location.href = "login.html"
}



var indexVue = new Vue({
	el: '#indexMain',
	data:{
		userName: getCookieValue('loginName')
	}
});
