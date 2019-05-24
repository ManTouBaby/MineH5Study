
var equipmentVM;
var equipmentId;
$(function() {
			equipmentId = $.getUrlParam('equipmentId');
			equipmentVM = new Vue({
							el : '#equipmentInfo',
							data : {
								equipmentInfo : {}
							}
					});
			if (equipmentId!=''&&equipmentId!=null&&equipmentId!=undefined) {
					getEquipmentInfo(equipmentId);
			}
			$("#mainUnit").comboDeptTree(equipmentVM.equipmentInfo);
			$("#dutyUnit").comboDeptTree(equipmentVM.equipmentInfo);
			$("#equipmentType").comboDictionaryAndSelectedFirst("equipmentType");		
		})

	function getEquipmentInfo(equipmentId) {
			 ajaxGetDatas( BASEPATH +  "/equipment/getEquipmentInfo.do",
				 	{equipmentId : equipmentId}, function(data){
						if (data.data) {
						equipmentVM.equipmentInfo = data.data;
						$("#equipmentType").val(data.data.equipmentTypeName);
						$("#mainUnit").val(data.data.mainUnitName);
						$("#dutyUnit").val(data.data.dutyUnitName);
						$("#mainUnit").comboDeptTree(equipmentVM.equipmentInfo);
						$("#dutyUnit").comboDeptTree(equipmentVM.equipmentInfo);
					}
					},"application/x-www-form-urlencoded");
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
			var str = '新建';
			if(flag=='update'){
				str = '更新';
			}
			$.showConfirmModal({
				title : "确认提交",
				msg : "您确认提交该装备"+str+"吗？",
				yes : function() {
					doSaveNew(flag)
				}
			})
		}
		function doSaveNew(flag) {
			var msg = "保存成功,您是否要继续添加装备?";
			var aurl =  "equipmentDoNew.html";
			var data =  $("#mainForm").serialize();
			if(flag=='update'){
				msg = "保存成功";
				aurl =  "equipmentAdmin.html";
				data = equipmentVM.equipmentInfo;
			}
			$.hideConfirmModal();
			
			ajaxGetDatas(BASEPATH +  "/equipment/doSaveEquipment.do",
				 	data, function(data){
						setTimeout(function() {
						$.showConfirmModal({
							title : "保存成功",
							msg : msg,
							yes : function() {
								window.location.href =aurl;
							},
							no : function() {
								window.location.href = "equipmentAdmin.html"
							}
						})
						}, 500);
					},"application/x-www-form-urlencoded");
		}