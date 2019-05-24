
var xToken = {
	token: "",
	loginName: "",
	userName: "",
	userId: ""
};


$(function() {
	// 提示框生效
	$('[data-toggle="tooltip"]').tooltip();
})

function isOldIE() {
	if(window.ActiveXObject || "ActiveXObject" in window) {
		return true;
	} else {
		return false;
	}
}

function jQueryAjaxError(data) {
	var text = data.responseText;
	var tips = "";
	try {
		tips = $.parseJSON(text).msg;
	} catch (exception) {
		tips = text;
	}
	if ($.showTipsModal) {
		setTimeout(function() {
			$.showTipsModal("提交失败", "提交失败: " + tips)
		}, 500)

	} else {
		alert("提交失败:" + tips)
	}

}


// 数组清空
Array.prototype.clearArr = function() {
	this.splice(0, this.length);
	return this;
}

// 日期格式化
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

var dayOfWeekArr = new Array("日", "一", "二", "三", "四", "五", "六");