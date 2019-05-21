//var BASEPATH =  "http://127.0.0.1:8080";
/**
 * jQuery勤务系统扩展功能
 */

$.extend({
	/** post跳转功能 */
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
	getUrlParam : function (name,flag) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	   var r = window.location.search.substr(1).match(reg);
	   if(r!=null && flag){r[2]=decodeURI(r[2])};
	   if (r != null) return unescape(r[2]); return null;
  	}
});

/** 表单序列化成一个param对象 */
$.fn.extend({
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

/** 组织机构树 */
$.fn.extend({
	comboDeptTree : function(vmData) {
		getDeptTree($(this).attr("id"),vmData);
	},
	comboInnerDeptTree : function() {
		getInnerDeptTree($(this).attr("id"));
	},
	comboAllDeptTree : function() {
		getAllDeptTree($(this).attr("id"));
	},
	comboDictionary : function(dictType) {
		getComboDictionary($(this).attr("id"), dictType);
	},
	comboDictionaryAndSelectedFirst : function(dictType) {
		getComboDictionaryAndSelectedFirst($(this).attr("id"), dictType);
	},
	comboDictionaryWithAllSelection : function(dictType) {
		getComboDictionaryWithAllSeclection($(this).attr("id"), dictType);
	}
})

function getDeptTree(id,vmData) {
	easyloader.load('combotree', function() {
		$("#" + id).combotree({
			width : '100%',
			height : 33,
			url : BASEPATH + "/unitRest/getUnitTreeData",
			onClick : function(node) {
				$("#" + id + "NAME").val(node.text);
				$("#" + id + "ID").val(node.id);
				if(vmData){
					vmData[id] = node.id;
					vmData [id+"Name"] = node.text;
				}
			},
			loadFilter : function(data, parent) {
				if (data && data.length > 0) {
					for (var i = data.length - 1; i >= 0; i--) {
						if (data[i].type == "5") {
							data.splice(i, 1)
						} else {
							data[i].text = data[i].name;
							data[i].state = "closed";
						}
					}
				}
				return data;
			}
		})
	});
}
function getInnerDeptTree(id) {
	easyloader.load('combotree', function() {
		$("#" + id).combotree({
			width : '100%',
			height : 33,
			url : BASEPATH + "/general/unit/getDeptTreeData.do",
			onClick : function(node) {
				if (node.type != "5") {
					$("#" + id).combotree("clear");
					$("#" + id + "NAME").val();
					$("#" + id + "ID").val();
					$.showTipsModal("错误选择", "您选择的单位不是单位内部机构，请重新选择或置空")
					return;
				}
				$("#" + id + "NAME").val(node.text);
				$("#" + id + "ID").val(node.id);
			},
			loadFilter : function(data, parent) {
				if (data && data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						data[i].text = data[i].name;
						data[i].state = "closed";
					}
				}
				return data;
			}
		})
	});
}
function getAllDeptTree(id) {
	easyloader.load('combotree', function() {
		$("#" + id).combotree({
			width : '100%',
			height : 33,
			url : BASEPATH + "/general/unit/getDeptTreeData.do",
			onClick : function(node) {
				$("#" + id + "NAME").val(node.text);
				$("#" + id + "ID").val(node.id);
			},
			loadFilter : function(data, parent) {
				if (data && data.length > 0) {
					for (var i = data.length - 1; i >= 0; i--) {
						data[i].text = data[i].name;
						data[i].state = "closed";
					}
				}
				return data;
			}
		})
	});
}
// 获取字典Combobox
function getComboDictionary(id, dictType) {
	easyloader.load('combobox', function() {
		$("#" + id).combobox({
			width : '100%',
			height : 33,
			valueField : 'dictValue',
			textField : 'dictName',
			editable : false,
			url : BASEPATH + "/general/dictionary/getDictionaryByDictType.do?dictType=" + dictType,
			onClick : function(node) {
				$("#" + id + "NAME").val(node.dictName);
				$("#" + id + "ID").val(node.dictValue);
			}
		})
	});
}
// 获取字典Combobox(默认选中第一个)
function getComboDictionaryAndSelectedFirst(id, dictType) {
	easyloader.load('combobox', function() {
		$("#" + id).combobox({
			width : '100%',
			height : 33,
			valueField : 'dictValue',
			textField : 'dictName',
			editable : false,
			url : BASEPATH + "/general/dictionary/getDictionaryByDictType.do?dictType=" + dictType,
			onClick : function(node) {
				$("#" + id + "NAME").val(node.dictName);
				$("#" + id + "ID").val(node.dictValue);
			},
			onLoadSuccess : function() { // 加载完成后,设置选中第一项
				var val = $(this).combobox('getData');
				for ( var item in val[0]) {
					if (item == 'dictName') {
						$(this).combobox('select', val[0][item]);
						$("#" + id + "NAME").val(val[0][item]);
					}
					if (item == 'dictValue') {
						$("#" + id + "ID").val(val[0][item]);
					}

				}
			}
		})
	});
}
// 获取字典Combobox(包括全部选项)
function getComboDictionaryWithAllSeclection(id, dictType) {
	easyloader.load('combobox', function() {
		$("#" + id).combobox({
			width : '100%',
			height : 33,
			valueField : 'dictValue',
			textField : 'dictName',
			editable : false,
			url : BASEPATH + "/general/dictionary/getDictionaryByDictType.do?dictType=" + dictType,
			loadFilter : function(data) {
				if (!data || data.length <= 0) {
					data = new Array();
				}
				var allSelect = new Object();
				allSelect.dictValue = "";
				allSelect.dictName = "全部";
				data.unshift(allSelect);
				return data;
			},
			onClick : function(node) {
				$("#" + id + "NAME").val(node.dictName);
				$("#" + id + "ID").val(node.dictValue);
			}
		})
	});
}
