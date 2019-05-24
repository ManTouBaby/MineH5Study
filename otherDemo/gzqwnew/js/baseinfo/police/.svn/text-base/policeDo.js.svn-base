var isIDNUMValidatePass = false;
var policeVM;
var policeId;

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
	$("#mainUnit").comboDeptTree();
	$("#dutyUnit").comboDeptTree();
	if (policeId!=''&&policeId!=null&&policeId!=undefined) {
		$("#genderSelect").comboDictionary("gender");
		$("#isLeaderSelect").comboDictionary("notOrIs");
		$("#policeType").comboDictionary("policeType");
	}else{
		$("#genderSelect").comboDictionaryAndSelectedFirst("gender");
		$("#isLeaderSelect").comboDictionaryAndSelectedFirst("notOrIs");
		easyloader.load('combobox', function() {
				$("#policeType").combobox({
					width : '100%',
					height : 33,
					valueField : 'dictValue',
					textField : 'dictName',
					editable : false,
					url :BASEPATH+"/general/dictionary/getDictionaryByDictType.do?dictType=" + "policeType",
					onClick : function(node) {
						$("#policeTypeNAME").val(node.dictName);
						$("#policeTypeID").val(node.dictValue);
						var jz = $("#policeTypeID").val();
						if (jz != "mj") {
							removeValidateErrorMsg($("#police_policeNum")[0]);
							$("#police_policeNum").removeAttr("validate")
						} else {
							$("#police_policeNum").attr("validate","validate:true");
						}
					},
					onLoadSuccess : function() { // 加载完成后,设置选中第一项
						var val = $(this).combobox('getData');
						for ( var item in val[0]) {
							if (item == 'dictName') {
								$(this).combobox('select', val[0][item]);
								$("#policeTypeNAME").val(val[0][item]);
							}
							if (item == 'dictValue') {
								$("#policeTypeID").val(val[0][item]);
							}
						}
					}
				})
			});
	}
	$("#jobSelect").comboDictionary("job");
	$("#birthday").flatpickr({
				"locale" : "zh"
			});		

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


function getPoliceInfo(policeId) {
	
			 ajaxGetDatas( BASEPATH+"/police/api/getPoliceInfo",
				 	{policeId : policeId}, function(data){
						if (data.data) {
						policeVM.policeInfo = data.data.police;
						policeVM.equipmentList = data.data.policeEquipment;
						$("#deptId").val(data.data.police.mainUnit);
						$("#xldeptId").val(data.data.police.dutyUnit);
					}
					},"application/x-www-form-urlencoded");
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
			$('#genderSelect').combobox('select', '1');
			$("#genderSelectID").val("1")
		} else {
			$('#genderSelect').combobox('select', '2');
			$("#genderSelectID").val("2")
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
	 ajaxGetDatas( BASEPATH+"/police/api/isExistPoliceNum",
				 	{policeNum: policeNum}, function(data){
							if(data && data.flag == "1") {
								addValidateErrorMsg(obj, "警号已经存在");
							} else {
								removeValidateErrorMsg(obj);
							}
					},"application/x-www-form-urlencoded");
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
			 ajaxGetDatas( BASEPATH+"/police/api/insertPolice",
				 	$("#mainForm").serialize(), function(data){
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
					},"application/x-www-form-urlencoded");
		}