var isIDNUMValidatePass = false;
var policeVM;
var policeId;
var isLeaderSelectData = [{

	id: 1,
	text: '是',
}, {
	id: 0,
	text: '否',
}];

var sexSelectData = [{

	id: 1,
	text: '男',
}, {
	id: 0,
	text: '女',
}]

var treeData = [{
	id: 440100000000,
	text: '广州市公安局',
	children: [{
		id: 440104000000,
		text: '越秀区分局',
		children: [{
			id: 440104500000,
			text: '北京派出所'
		}]
	}, {
		id: 440106000000,
		text: '天河区分局',
		children: [{
			id: 440106520000,
			text: '五山派出所'
		}]
	}, {
		id: 440113000000,
		text: '番禺区分局',
		children: [{
			id: 440113500000,
			text: '市桥派出所'
		}]
	}]
}];

var treeDataPoliceType = [{

	id: 11,
	value : 'mj',
	text: '民警',
},{
	id: 14,
	value : 'fj',
	text: '辅警',
}]

var treeDataPoliceDuty = [{

	id: 11,
	text: '局长',
}, {
	id: 12,
	text: '副局长',
}, {
	id: 13,
	text: '政委',
}, {
	id: 14,
	text: '一级警长',
}, {
	id: 15,
	text: '二级警长',
}, {
	id: 16,
	text: '三级警长',
}]
var treeStudy = [{

	id: 11,
	text: '博士',
}, {
	id: 12,
	text: '硕士',
}, {
	id: 13,
	text: '本科',
}, {
	id: 14,
	text: '大专',
}, {
	id: 15,
	text: '高中',
}, {
	id: 16,
	text: '初中',
}]
var treeZzmm = [{

	id: 11,
	text: '党员',
}, {
	id: 12,
	text: '团员',
}, {
	id: 13,
	text: '群众',
}, {
	id: 14,
	text: '其他',
}]

$(document).ready(function() {
		
	policeId = $.getUrlParam('policeId');
		policeVM = new Vue({
						el : '#policeInfo',
						data : {
							policeInfo : {},
							equipmentList : []
						}
				});
		if (policeId!=''&&policeId!=null&&policeId!=undefined) {
			getPoliceInfo(policeId);
	}
		
	easyloader.load('combotree', function() {
		$('#deptId').combotree({
			width: '100%',
			height: 33,
			data: treeData,
			 onSelect:function(node){
		        $('#deptIdID').val(node.id);
		        $('#deptIdName').val(node.text);
	           if(policeVM.policeInfo.mainUnit!=undefined){
	           	 	policeVM.policeInfo.mainUnit = node.id;
	        		policeVM.policeInfo.mainUnitName = node.text;
	           }
		     }
		});
		$('#xldeptId').combotree({
			width: '100%',
			height: 33,
			data: treeData,
			 onSelect:function(node){
		        $('#xldeptIdID').val(node.id);
		        $('#xldeptIdName').val(node.text);
	           if(policeVM.policeInfo.dutyUnit!=undefined){
	           	 	policeVM.policeInfo.dutyUnit = node.id;
	        		policeVM.policeInfo.dutyUnitName = node.text;
	           }
		     }
		});
		$('#type').combotree({
			width: '100%',
			height: 33,
			data: treeDataPoliceType
		});
		$('#duty').combotree({
			width: '100%',
			height: 33,
			data: treeDataPoliceDuty
		});
		$('#study').combotree({
			width: '100%',
			height: 33,
			data: treeStudy
		});
		$('#zzmm').combotree({
			width: '100%',
			height: 33,
			data: treeZzmm
		});

		$('#isLeaderSelect').combotree({
			width: '100%',
			height: 33,
			data: isLeaderSelectData
		});
		
		$('#sex').combotree({
			width: '100%',
			height: 33,
			data: sexSelectData
		});
		
		$("#deptId").combotree('tree').tree("collapseAll");
		$("#xldeptId").combotree('tree').tree("collapseAll");
		$("#type").combotree('tree').tree("collapseAll");
		$("#duty").combotree('tree').tree("collapseAll");
		$("#isLeaderSelect").combotree('tree').tree("collapseAll");
		//					$("#study").combotree('tree').tree("collapseAll");
		//					$("#zzmm").combotree('tree').tree("collapseAll");

	});
	easyloader.load('combobox', function() {
		$("#xlfs").combobox({
			width: '100%',
			editable: false,
			height: 33,
			valueField: 'id',
			textField: 'text',
			data: [{
				text: "机巡",
				id: "a"
			}, {
				text: "步巡",
				id: "b"
			}]
		})
	})

	easyloader.load(['draggable', 'droppable'], function() {
		$('.objectRemove').draggable({
			revert: true,
			proxy: 'clone',
			onStartDrag: function() {
				$(this).draggable('options').cursor = 'not-allowed';
				$(this).draggable('proxy').css('z-index', 999);
			},
			onStopDrag: function() {
				$(this).draggable('options').cursor = 'move';
			}
		});
		$('#tagObjectContainer').droppable({
			onDragEnter: function(e, source) {
				$(source).draggable('options').cursor = 'auto';
			},
			onDragLeave: function(e, source) {
				$(source).draggable('options').cursor = 'not-allowed';
			},
			onDrop: function(e, source) {
				$(e.target).append(source)
			}
		});
	});
});

$("#birthday").flatpickr({
	"locale": "zh"
});


function getPoliceInfo(policeId) {
			$.ajax({
				url :  BASEPATH+ "/police/api/getPoliceInfo",
				data : {
					policeId : policeId
				},
				type : "POST",
				cache : false,
				success : function(data) {
					if (data.data) {
						policeVM.policeInfo = data.data.police;
						policeVM.equipmentList = data.data.policeEquipment;
						$("#deptId").val(data.data.police.mainUnit);
						$("#xldeptId").val(data.data.police.dutyUnit);
					}
				},
				error : function(data) {
					jQueryAjaxError(data)
				}
			})
		}

function equipmentSelectWin() {
	equipmentSelectTool.selectEquipment({
		confirmed: function(data) {
			var selectedEquipmentIdList = new Array();
			$("input[name='equipment.id']").each(function() {
				selectedEquipmentIdList.push($(this).val())
			});
			for(var i = 0; i < data.length; i++) {
				var isHaveSelected = false;
				for(var j = 0; j < selectedEquipmentIdList.length; j++) {
					if(selectedEquipmentIdList[j] == data[i].id) {
						isHaveSelected = true;
						break;
					}
				}
				if(isHaveSelected) {
					continue;
				}
				var div = $("#equipmentModel").clone();
				$(div).find(".selectEquipment-item-equName-text").html(data[i].equipmentName);
				$(div).find(".selectEquipment-item-equNum").html(data[i].equipmentNum);
				$(div).find(".selectEquipment-item-equType").html(data[i].equipmentTypeName);
				$(div).find("input[name='equipment.id']").val(data[i].id);
				$(div).find("input[name='equipment.equipmentName']").val(data[i].equipmentName);
				$(div).find("input[name='equipment.equipmentNum']").val(data[i].equipmentNum);
				$(div).find("input[name='equipment.equipmentType']").val(data[i].equipmentType);
				$(div).find("input[name='equipment.equipmentTypeName']").val(data[i].equipmentTypeName);
				$(".equipmentsContainer").append(div)
			}
		},
		cancel : function(){
			
		}
	})
}

// 身份证校验和计算出生日期性别
function validateAndGenerateID(obj) {
	var idNum = $(obj).val();
	var validateObj = IDNUMValidate(idNum);
	if(validateObj && !validateObj.flag) {
		addValidateErrorMsg(obj, validateObj.tips)
	} else {
		isIDNUMValidatePass = true;
		removeValidateErrorMsg(obj);
		if(parseInt(idNum.substr(16, 1)) % 2 == 1) {
			//					$('#genderSelect').combobox('select', '1');
			//					$("#genderSelectID").val("1")
			$("#sex").val("男");
		} else {
			//					$('#genderSelect').combobox('select', '2');
			//					$("#genderSelectID").val("2")
			$("#sex").val("女");
		}
		$("#birthday").val(idNum.substring(6, 10) + "-" + idNum.substring(10, 12) + "-" + idNum.substring(12, 14))
	}
}

// 警号是否存在判断
function isExistPoliceNum(obj) {
	var policeNum = $(obj).val();
	if(!policeNum || policeNum == "") {
		return;
	}
	$.ajax({
		url: BASEPATH+ "/police/api/isExistPoliceNum",
		data: {
			policeNum: policeNum
		},
		type: "POST",
		cache: false,
		success: function(data) {
			if(data && data.flag == "1") {
				addValidateErrorMsg(obj, "警号已经存在");
			} else {
				removeValidateErrorMsg(obj);
			}
		}
	});
}

function delObject(obj) {
	var delObj = $(obj).parents(".objectItem").clone()
	$(delObj).find(".delButton").remove();
	$("#allObjectContainer").append(delObj);
	easyloader.load(['draggable', 'droppable'], function() {
		$(delObj).draggable({
			revert: true,
			proxy: 'clone',
			onStartDrag: function() {
				$(this).draggable('options').cursor = 'not-allowed';
				$(this).draggable('proxy').css('z-index', 999);
			},
			onStopDrag: function() {
				$(this).draggable('options').cursor = 'move';
			}
		});
	})
	$(obj).parents(".objectItem").remove();
}

function doRemoveSelectedEquipment(obj) {
	$(obj).parents(".selectEquipment-itemContent").remove()
}


function doValidate(flag) {
			var isPassValidate = $("#mainForm").validateForm();
			if (!isPassValidate) {
				$.showConfirmModal({
					title : "有消息未填写",
					msg : "您有必填项未填写。请检查后提交"
				})
				return;
			}
			doSaveNew(flag);
		}
function doSaveNew(flag) {
			var msg = "保存成功,您是否要继续添加警员?";
			var aurl = "policeDoNew.html";
			if(flag=='update'){
				msg = "警员信息更新成功";
				aurl = "policeAdmin.html";
			}
			$.hideConfirmModal();
			$.ajax({
				url :BASEPATH+ "/police/api/insertPolice",
				data : $("#mainForm").serialize(),
				type : "POST",
				cache : false,
				success : function(data) {
					setTimeout(function() {
						$.showConfirmModal({
							title : "保存成功",
							msg : msg,
							yes : function() {
								window.location.href =  aurl;
							},
							no : function() {
								window.location.href = "policeAdmin.html";
							}
						})
					}, 500)
				},
				error : function(data) {
					jQueryAjaxError(data)
				}
			})
		}