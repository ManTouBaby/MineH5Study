/**
 * 
 */
//var BASEPATH = "http://127.0.0.1:18080";

// 提示框生效
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
})

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

// 得到uuid
function getNewUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};

// 数组克隆
Array.prototype.shallowClone = function() {
	return [].concat(this);
}
Array.prototype.deepClone = function() {
	var newArr = new Array();
	for (var i = 0; i < this.length; i++) {
		newArr.push($.deepClone(this[i]))
	}
	return newArr;
}

// 数组清空
Array.prototype.clearArr = function() {
	this.splice(0, this.length);
	return this;
}

function isOldIE() {
	if (window.ActiveXObject || "ActiveXObject" in window) {
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

function toggleThisBox(obj) {
	if ($(obj).find("i").hasClass("fa-minus")) {
		$(obj).parents(".box").find(".box-body").hide(500);
	} else {
		$(obj).parents(".box").find(".box-body").show(500);
	}
	$(obj).find("i").toggleClass("fa-minus");
	$(obj).find("i").toggleClass("fa-plus");
}

function toPage(url) {
	window.location.href = BASEPATH + url;
}

function getDateByStringYYYYMMDDHHMI(dateStr) {
	var yyyymmddhhmi = dateStr.split(" ");
	var yyyymmdd = yyyymmddhhmi[0].split("-");
	var hhmi = yyyymmddhhmi[1].split(":");
	var yyyy = yyyymmdd[0];
	var mm = parseInt(yyyymmdd[1]) - 1;
	var dd = yyyymmdd[2];
	var hh = hhmi[0];
	var mi = hhmi[1];
	return new Date(yyyy, mm, dd, hh, mi, 0, 0)
}
// 按格式获取时间（YYYY-MM-DD HH:MI:ss）
function getDateByStringYYYYMMDDHHMISS(dateStr) {
	var yyyymmddhhmi = dateStr.split(" ");
	var yyyymmdd = yyyymmddhhmi[0].split("-");
	var hhmi = yyyymmddhhmi[1].split(":");
	var yyyy = yyyymmdd[0];
	var mm = parseInt(yyyymmdd[1]) - 1;
	var dd = yyyymmdd[2];
	var hh = hhmi[0];
	var mi = hhmi[1];
	var ss = hhmi[2];
	return new Date(yyyy, mm, dd, hh, mi, ss, 0)
}
