var vehicleVM;
var equipmentId;
var defaultGzJigouData=['440100000000'];
var defaultGzJigouData1=['440100000000'];
$(function() {
			$("#vehicleType").comboDictionaryAndSelectedFirst("vehicleType");
			equipmentId = $.getUrlParam('equipmentId');
			vehicleVM = new Vue({
							el : '#vehicleInfo',
							data : {
								vehicleInfo : {},
								defaultGzJigou: defaultGzJigouData,
								defaultGzJigou1: defaultGzJigouData1,
							    gzJigouData: [
							        {
							            value: '440100000000',
							            label: '广州市公安局',
							            children: [],
							            loading: false
							        }
							    	]
							},
						methods : {
							loadData (item, callback) {
								      getUnitTreeComnbo(item, callback);
								   },
							setMainUnitValue (labels, selectedData) {
									setVmValue(labels,selectedData,"mainUnit",vehicleVM.vehicleInfo);
							},
							setDutyUnitValue (labels, selectedData) {
									setVmValue(labels,selectedData,"dutyUnit",vehicleVM.vehicleInfo);
							}
						}
					});
			if (equipmentId!=''&&equipmentId!=null&&equipmentId!=undefined) {
					getVehicleInfo(equipmentId);
			}			
	});
	
	function getVehicleInfo(equipmentId) {
			 ajaxGetDatas(BASEPATH+"/equipment/getEquipmentInfo.do",
				 	{equipmentId : equipmentId}, function(data){
						if (data.data) {
						$("#vehicleType").val(data.data.equipmentTypeName);
						vehicleVM.vehicleInfo = data.data;
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
				msg : "您确认提交该车辆的"+str+"保存吗？",
				yes : function() {
					doSaveNew(flag)
				}
			})
		}
		function doSaveNew(flag) {
			var msg = "保存成功,您是否要继续添加车辆?";
			var aurl =  "vehicleDoNew.html";
			var data =  $("#mainForm").serialize();
			if(flag=='update'){
				msg = "保存成功";
				aurl =  "vehicleAdmin.html";
				data = vehicleVM.vehicleInfo;
			}
			$.hideConfirmModal();
			
			ajaxGetDatas(BASEPATH+"/equipment/doSaveEquipment.do",
				 	data, function(data){
							setTimeout(function() {
							$.showConfirmModal({
								title : "保存成功",
								msg : msg,
								yes : function() {
									window.location.href = aurl;
								},
								no : function() {
									window.location.href = "vehicleAdmin.html"
								}
							})
						}, 500)
					},"application/x-www-form-urlencoded");
		}