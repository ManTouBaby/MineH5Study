var userDeptId = "440100000000";
		var unitVM;
		$(function() {
//			$("#unitInfoType").comboDictionary("unitType");
			getUnitTreeInfo();
			unitVM = new Vue({
				el : '#unitInfo',
				data : {
					unitInfo : unitInfo,
					newUnit : new Object(),
					newInnerUnit : new Object(),
					isShowDoNewUnitButton : true,
					isShowDoNewInnerUnitButton : true
				},
				watch : {
					unitInfo : function(val, oldVal) {
						easyloader.load('combobox', function() {
//							$("#unitInfoType").combobox({
//								disabled : true
//							});
//							$("#unitInfoType").combobox("setValue", val.type);
						})
					}
				}
			})
			getUnitInfo(userDeptId);
		});
		function getUnitTreeInfo() {
			easyloader.load('tree', function() {
				var treeInited = false;
				$("#unitTree").tree({
					width : '100%',
					height : '100%',
					url : BASEPATH+"/unitRest/getUnitTreeData",
					onClick : function(node) {
						doClearNewUnit();
						$("#doNewInnerUnitDIV").hide();
						$("#doNewUnitDIV").hide();
						getUnitInfo(node.id);
					},
					onLoadSuccess : function(node, data) {
						if (!treeInited) {
							var roots = $("#unitTree").tree('getRoots');
							if (roots && roots.length > 0) {
								$("#unitTree").tree('expand', roots[0].target);
							}
						}
						treeInited = true;
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
		function getUnitInfo(deptId) {
			 ajaxGetDatas( BASEPATH+"/unitRest/getUnitInfo",
				 	{id : deptId}, function(data){
						if (data) {
						if (data.type && data.type == '5') {
							unitVM.isShowDoNewUnitButton = false;
							unitVM.isShowDoNewInnerUnitButton = false;
						} else {
							unitVM.isShowDoNewUnitButton = true;
							unitVM.isShowDoNewInnerUnitButton = true;
						}
						unitVM.unitInfo = data;
					}
					},"application/x-www-form-urlencoded");
		}
		function doUpdate() {
			var isPassValidate = $("#watchingUnitForm").validateForm();
			if (!isPassValidate) {
				$.showConfirmModal({
					title : "有消息未填写",
					msg : "您有必填项未填写。请检查后提交"
				})
				return;
			}
			ajaxGetDatas(  BASEPATH+"/unitRest/doUpdateUnitInfo",
				 	unitVM.unitInfo, function(data){
						setTimeout(function() {
						$.showConfirmModal({
							title : "更新成功",
							msg : "更新单位信息成功",
							yes : function() {
								return;
							},
							no : function() {
								return;
										}
									})
								}, 500)
					},"application/x-www-form-urlencoded");
		}
		function doClearNewUnit() {
			var newUnit = new Object();
			newUnit.parentId = unitVM.unitInfo.id;
			newUnit.parentName = unitVM.unitInfo.fullName;
			unitVM.newUnit = newUnit;
		}

