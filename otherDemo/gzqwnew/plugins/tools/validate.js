/**
 * 表单验证
 * 
 * @author momengqi
 */
$.fn.extend({
	validateForm : function() {
		var inputs = $($(this)[0]).find("input");
		// 是否通过校验
		var isPassValidate = true;
		// 遍历input
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			var attr = null;
			var attrStr = $(input).attr("validate");
			if (attrStr && attrStr != "") {
				var optionJSONStr = "";
				var options = attrStr.split(",")
				for (var j = 0; j < options.length; j++) {
					var name = options[j].split(":")[0]
					var value = options[j].split(":")[1]
					if (value == "true" || value == "false") {
						optionJSONStr += "\"" + name + "\":" + value + ",";
					} else {
						optionJSONStr += "\"" + name + "\":\"" + value + "\",";
					}
				}
				optionJSONStr = "{" + optionJSONStr.substring(0, optionJSONStr.length - 1) + "}";
				attr = $.parseJSON(optionJSONStr)
			} else {
				// 没有校验参数的跳过
				continue;
			}
			if (attr && attr.validate) {
				var val = $(input).val();
				if (!val || val == "") {
					addValidateErrorMsg(input);
					isPassValidate = false;
				} else {
					removeValidateErrorMsg(input);
				}
				// 绑定修改事件（输入东西后去除错误提示）
				$(input).keyup(function() {
					var val = $(this).val();
					if (!val || val == "") {
						addValidateErrorMsg(this);
						isPassValidate = false;
					} else {
						removeValidateErrorMsg(this);
					}
				})
			}
		}
		return isPassValidate;
	}
});

function addValidateErrorMsg(obj, msg) {
	if (!msg || msg == "") {
		msg = "该项为必填项";
	}
	if (!$(obj).parents(".form-group").hasClass("has-error")) {
		$(obj).parents(".form-group").addClass("has-error");
		$(obj).after($('<span class="help-block">' + msg + '</span>'))
	}
}

function removeValidateErrorMsg(obj) {
	if ($(obj).parents(".form-group").hasClass("has-error")) {
		$(obj).parents(".form-group").removeClass("has-error");
		$(obj).parents(".form-group").find(".help-block").remove();
	}
}
