/**
 * jQuery勤务系统扩展功能
 */

$.extend({
	// post跳转功能
	StandardPost : function(url, args) {
		var body = $(document.body), form = $("<form method='post'></form>"), input;
		form.attr({
			"action" : url
		});
		$.each(args, function(key, value) {
			input = $("<input type='hidden'>");
			input.attr({
				"name" : key
			});
			input.val(value);
			form.append(input);
		});
		form.appendTo(document.body);
		form.submit();
		document.body.removeChild(form[0]);
	},
	/** 深克隆 */
	deepClone : function(oldObject) {
		var newObject = jQuery.extend(true, {}, oldObject);
		return newObject;
	},
	/** 浅克隆 */
	shallowClone : function(oldObject) {
		var newObject = jQuery.extend({}, oldObject);
		return newObject;
	},
	/**获取rul路径参数**/
	getUrlParam : function (name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if (r != null) return unescape(r[2]); return null;
  	}

});

$.fn.extend({
	// 表单序列化成一个param对象
	serializeObject : function() {
		var params = $(this).serializeArray();
		if (!params || params.length == 0) {
			return null;
		}
		var resObjStr = "{";
		for (var i = 0; i < params.length; i++) {
			resObjStr += '"' + params[i].name + '":"' + params[i].value + '",'
		}
		resObjStr = resObjStr.substring(0, resObjStr.lastIndexOf(','));
		resObjStr += "}";
		var resObj = $.parseJSON(resObjStr);
		return resObj;
	}
});