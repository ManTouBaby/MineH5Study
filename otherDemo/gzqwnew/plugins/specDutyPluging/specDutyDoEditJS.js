$(function() {
	$(".mainDiv").height($(window).height())
	$(window).resize(function() {
		$(".mainDiv").height($(window).height())
	})
})

var specReportHeadquarter = {
	"id": "",
	"dutyId": "",
	"name": "",
	"location": "",
	"description": "",
	"createTime": "",
	"updateTime": "",
	"ifuse": "",
	"type": "",
	"rankNum": 1,
	"watchBegin": "",
	"watchEnd": ""
}

var specReportUnit = {
	"id": "",
	"dutyId": "",
	"headquarterId": "",
	"stationId": "",
	"stationName": "",
	"isReport": "",
	"createTime": "",
	"updateTime": "",
	"ifuse": "",
	"mjCount": "",
	"fjCount": "",
	"unitLevel": "",
	"parentUnitId": "",
	"description": "",
	"belongType": ""
}

var specReportClasses = {
	"id": "",
	"dutyId": "",
	"headquarterId": "",
	"stationId": "",
	"belongType": "",
	"classesName": "",
	"watchBegin": "",
	"watchEnd": "",
	"createtime": "",
	"updatetime": "",
	"ifuse": ""
}

var specReportPeople = {
	"id": "",
	"dutyId": "",
	"headquarterId": "",
	"stationId": "",
	"classesId": "",
	"belongType": "",
	"teamRole": "",
	"teamRoleName": "",
	"policeId": "",
	"createTime": "",
	"updateTime": "",
	"ifuse": "",
	"policeName": "",
	"job": "",
	"mobilePhone": "",
	"locationId": "",
	"locationType": "",
	"watchBegin": "",
	"watchEnd": ""
}

var specReportMapinfo = {
	"id": "",
	"dutyId": "",
	"headquarterId": "",
	"stationId": "",
	"belongType": "",
	"mapType": "",
	"type": "",
	"typeName": "",
	"pointInfo": "",
	"createTime": "",
	"updateTime": "",
	"ifuse": "",
	"title": "",
	"remark": "",
	"color": "",
	"symbol": ""
}

var vm;

var editingZHB = null;
var editingGZZ = null;
var selectingPeopleModel = null;
var selectingUnitModel = null;
var drawingMapModel = null;
var specReportClassesModel = null;

function initVue() {
	vm = new Vue({
		el: '#mainDiv',
		data: {
			specReportInfo: specReportInfo,
			headquarterList: headquarterList,
			workGroupList: workGroupList,
			unitList: specReportUnitList,
			classesList: specReportClassesList,
			peopleList: specReportPeopleList,
			mapinfoList: specReportMapinfoList,
			editingZHB: $.deepClone(specReportHeadquarter),
			editingGZZ: $.deepClone(specReportHeadquarter),
			editingViewController: {
				zhb: false,
				gzz: false
			}
		},
		methods: {
			doAddZHB: function() {
				var headquarter = $.deepClone(specReportHeadquarter);
				headquarter.id = getNewUUID();
				headquarter.dutyId = vm.specReportInfo.id;
				headquarter.type = "headquarter";
				vm.headquarterList.push(headquarter);
			},
			delZHB: function(headquarterId) {
				this.$nextTick(function() {
					vm.editingViewController.zhb = false;
					vm.editingViewController.gzz = false;
					vm.editingZHB = $.deepClone(specReportHeadquarter);
				})
				for(var i = 0; i < vm.headquarterList.length; i++) {
					if(vm.headquarterList[i].id == headquarterId) {
						vm.headquarterList.splice(i, 1);
						break;
					}
				}

			},
			doAddGZZ: function() {
				var headquarter = $.deepClone(specReportHeadquarter);
				headquarter.id = getNewUUID();
				headquarter.dutyId = vm.specReportInfo.id;
				headquarter.type = "workGroup";
				headquarter.watchBegin = vm.specReportInfo.watchBegin;
				headquarter.watchEnd = vm.specReportInfo.watchEnd;
				vm.workGroupList.push(headquarter);
			},
			delGZZ: function(workGroupId) {
				this.$nextTick(function() {
					vm.editingViewController.zhb = false;
					vm.editingViewController.gzz = false;
					vm.editingZHB = $.deepClone(specReportHeadquarter);
				})
				for(var i = 0; i < vm.workGroupList.length; i++) {
					if(vm.workGroupList[i].id == workGroupId) {
						vm.workGroupList.splice(i, 1);
						break;
					}
				}
			},
			doEditZHB: function(headquarter) {
				vm.editingViewController.zhb = true;
				vm.editingViewController.gzz = false;
				vm.editingZHB = headquarter;
			},
			doEditGZZ: function(workGroup) {
				vm.editingViewController.zhb = false;
				vm.editingViewController.gzz = true;
				vm.editingGZZ = workGroup
				this.$nextTick(function() {
					$("#GZZ_WatchBegin_" + workGroup.id).datetimebox({
						width: '100%',
						showSeconds: false,
						editable: false,
						value: workGroup.watchBegin,
						onChange: function(val) {
							workGroup.watchBegin = val
						}
					})
					$("#GZZ_WatchEnd_" + workGroup.id).datetimebox({
						width: '100%',
						showSeconds: false,
						editable: false,
						value: workGroup.watchEnd,
						onChange: function(val) {
							workGroup.watchEnd = val
						}
					});

					// 加载单位班次easyui控件
					$(".GZZ_unit_classes_Time_datetimebox_watchBegin").each(function() {
						var classes = undefined;
						for(var i = 0; i < vm.classesList.length; i++) {
							if(vm.classesList[i].id == $(this).attr("classesid")) {
								classes = vm.classesList[i];
								break;
							}
						}
						$(this).datetimebox({
							showSeconds: false,
							editable: false,
							value: classes.watchBegin,
							onChange: function(val) {
								classes.watchBegin = val
							}
						});
					})
					$(".GZZ_unit_classes_Time_datetimebox_watchEnd").each(function() {
						var classes = undefined;
						for(var i = 0; i < vm.classesList.length; i++) {
							if(vm.classesList[i].id == $(this).attr("classesid")) {
								classes = vm.classesList[i];
								break;
							}
						}
						$(this).datetimebox({
							showSeconds: false,
							editable: false,
							value: classes.watchEnd,
							onChange: function(val) {
								classes.watchEnd = val
							}
						});
					});
					$(".easyui-linkbutton").linkbutton()
				})
			},
			selectZHBPolice: function(headquarterId) {
				selectingPeopleModel = $.deepClone(specReportPeople);
				selectingPeopleModel.dutyId = vm.specReportInfo.id;
				selectingPeopleModel.headquarterId = headquarterId;
				selectingPeopleModel.belongType = "headquarter";
				var leftwidth = ($(document).width() - 980) / 2;
				$("#reportIframe").html("");
				$('#reportWin').dialog({
					title: "人员选择",
					top: 0,
					left: leftwidth
				});
				$('#reportWin').dialog('open');
				$("#reportIframe").attr("src", "specDutyPeopleSelect.html");
			},
			selectGZZPolice: function(headquarterId) {
				selectingPeopleModel = $.deepClone(specReportPeople);
				selectingPeopleModel.dutyId = vm.specReportInfo.id;
				selectingPeopleModel.headquarterId = headquarterId;
				selectingPeopleModel.belongType = "workGroup";
				var leftwidth = ($(document).width() - 980) / 2;
				$("#reportIframe").html("");
				$('#reportWin').dialog({
					title: "人员选择",
					top: 0,
					left: leftwidth
				});
				$('#reportWin').dialog('open');
				$("#reportIframe").attr("src", "specDutyPeopleSelect.html");
			},
			delPolice: function(peopleId) {
				for(var i = 0; i < vm.peopleList.length; i++) {
					if(vm.peopleList[i].id == peopleId) {
						vm.peopleList.splice(i, 1);
						break;
					}
				}
			},
			selectZHBUnit: function(headquarterId) {
				selectingUnitModel = $.deepClone(specReportUnit);
				selectingUnitModel.dutyId = vm.specReportInfo.id;
				selectingUnitModel.headquarterId = headquarterId;
				selectingUnitModel.mjCount = 0;
				selectingUnitModel.fjCount = 0;
				selectingUnitModel.belongType = "hedaquarter";
				selectingUnitModel.unitLevel = "1";
				var leftwidth = ($(document).width() - 980) / 2;
				$("#reportIframe").html("");
				$('#reportWin').dialog({
					title: "成员单位选择",
					top: 0,
					left: leftwidth
				});
				$('#reportWin').dialog('open');
				$("#reportIframe").attr("src", "specDutyUnitSelect.html");
			},
			selectGZZUnit: function(headquarterId) {
				selectingUnitModel = $.deepClone(specReportUnit);
				selectingUnitModel.dutyId = vm.specReportInfo.id;
				selectingUnitModel.headquarterId = headquarterId;
				selectingUnitModel.mjCount = 0;
				selectingUnitModel.fjCount = 0;
				selectingUnitModel.belongType = "workGroup";
				selectingUnitModel.unitLevel = "1";
				var leftwidth = ($(document).width() - 980) / 2;
				$("#reportIframe").html("");
				$('#reportWin').dialog({
					title: "成员单位选择",
					top: 0,
					left: leftwidth
				});
				$('#reportWin').dialog('open');
				$("#reportIframe").attr("src", "specDutyUnitSelect.html");
			},
			delUnit: function(unitId) {
				for(var i = 0; i < vm.unitList.length; i++) {
					if(vm.unitList[i].id == unitId) {
						vm.unitList.splice(i, 1);
						break;
					}
				}
			},
			drawDutyMap: function() {
				drawingMapModel = $.deepClone(specReportMapinfo);
				drawingMapModel.id = getNewUUID();
				drawingMapModel.dutyId = vm.specReportInfo.id;
				drawingMapModel.belongType = "dutyInfo";
				doBeginDraw(drawingMapModel);
			},
			drawZHBMap: function(headquarterId) {
				drawingMapModel = $.deepClone(specReportMapinfo);
				drawingMapModel.id = getNewUUID();
				drawingMapModel.dutyId = vm.specReportInfo.id;
				drawingMapModel.headquarterId = headquarterId;
				drawingMapModel.belongType = "headquarter";
				doBeginDraw(drawingMapModel);
			},
			drawGZZMap: function(headquarterId) {
				drawingMapModel = $.deepClone(specReportMapinfo);
				drawingMapModel.id = getNewUUID();
				drawingMapModel.dutyId = vm.specReportInfo.id;
				drawingMapModel.headquarterId = headquarterId;
				drawingMapModel.belongType = "workGroup";
				doBeginDraw(drawingMapModel);
			},
			drawUnitMap: function(headquarterId, unitId) {
				drawingMapModel = $.deepClone(specReportMapinfo);
				drawingMapModel.id = getNewUUID();
				drawingMapModel.dutyId = vm.specReportInfo.id;
				drawingMapModel.headquarterId = headquarterId;
				drawingMapModel.stationId = unitId;
				drawingMapModel.belongType = "unit";
				doBeginDraw(drawingMapModel);
			},
			removeMapinfo: function(mapinfoId) {
				doDeleteMapGraphic(mapinfoId);
				for(var i = 0; i < vm.mapinfoList.length; i++) {
					if(vm.mapinfoList[i].id == mapinfoId) {
						vm.mapinfoList.splice(i, 1);
						break;
					}
				}
			},
			addUnitClasses: function(unit) {
				specReportClassesModel = $.deepClone(specReportClasses);
				specReportClassesModel.id = getNewUUID();
				specReportClassesModel.dutyId = unit.dutyId;
				specReportClassesModel.headquarterId = unit.headquarterId;
				specReportClassesModel.stationId = unit.id;
				specReportClassesModel.belongType = "unit";
				for(var i = 0; i < vm.workGroupList.length; i++) {
					if(vm.workGroupList[i].id == unit.headquarterId) {
						specReportClassesModel.watchBegin = vm.workGroupList[i].watchBegin;
						specReportClassesModel.watchEnd = vm.workGroupList[i].watchEnd;
						break;
					}
				}
				if(!specReportClassesModel.watchBegin || "" == specReportClassesModel.watchBegin) {
					specReportClassesModel.watchBegin = vm.specReportInfo.watchBegin;
				}
				if(!specReportClassesModel.watchEnd || "" == specReportClassesModel.watchEnd) {
					specReportClassesModel.watchEnd = vm.specReportInfo.watchEnd;
				}
				vm.classesList.push(specReportClassesModel);

				var editingClasses = specReportClassesModel;
				this.$nextTick(function() {
					$("#GZZ_unit_classes__WatchBegin_" + specReportClassesModel.id).datetimebox({
						showSeconds: false,
						editable: false,
						value: editingClasses.watchBegin,
						onChange: function(val) {
							editingClasses.watchBegin = val
						}
					})
					$("#GZZ_unit_classes__WatchEnd_" + specReportClassesModel.id).datetimebox({
						showSeconds: false,
						editable: false,
						value: editingClasses.watchEnd,
						onChange: function(val) {
							editingClasses.watchEnd = val
						}
					});
				})
			},
			removeUnitClasses: function(classesId) {
				for(var i = 0; i < vm.classesList.length; i++) {
					if(vm.classesList[i].id == classesId) {
						vm.classesList.splice(i, 1);
						break;
					}
				}
			},
			validateSaveData: function() {
				var tips = "";
				var isSpecReportInfoPass = true;
				if(!vm.specReportInfo.dutyName || vm.specReportInfo.dutyName == "") {
					tips += "'专项勤务工作名称'不能为空";
					isSpecReportInfoPass = false;
				}
				if(!isSpecReportInfoPass) {
					$.messager.alert("保存失败", tips, "error");
					return false;
				}

				var isHeadquarterPass = true;
				for(var i = 0; i < vm.headquarterList.length; i++) {
					if(vm.headquarterList[i].name == "") {
						tips += "指挥部名字不能为空，请检查后提交";
						isHeadquarterPass = false;
						break;
					}
				}
				if(!isHeadquarterPass) {
					$.messager.alert("保存失败", tips, "error");
					return false;
				}

				var isWorkGroupPass = true;
				for(var i = 0; i < vm.workGroupList.length; i++) {
					if(vm.workGroupList[i].name == "") {
						tips += "工作组名字不能为空，请检查后提交";
						isWorkGroupPass = false;
						break;
					}
				}
				if(!isWorkGroupPass) {
					$.messager.alert("保存失败", tips, "error");
					return false;
				}

				if(vm.headquarterList.length == 0 || vm.workGroupList.length == 0) {
					$.messager.confirm('提示', '您的指挥部或者工作组为空，是否保存该专项勤务?', function(r) {
						if(r) {
							vm.doSaveReport();
							return;
						} else {
							return;
						}
					});
				} else {
					$.messager.confirm('提示', '确定保存该专项勤务吗?', function(r) {
						if(r) {
							vm.doSaveReport();
							return;
						} else {
							return;
						}
					});
				}
			},
			doSaveReport: function() {
				// 没有班次的默认添加一个班次
				for(var i = 0; i < vm.unitList.length; i++) {
					if(vm.unitList[i].belongType == "workGroup") {
						var isHaveClasses = false;
						for(var j = 0; j < vm.classesList.length; j++) {
							if(vm.classesList[j].stationId == vm.unitList[i].id) {
								isHaveClasses = true;
							}
						}
						if(!isHaveClasses) {
							vm.addUnitClasses(vm.unitList[i]);
						}
					}
				}

				var specReportInfoJSON = JSON.stringify(vm.specReportInfo);
				var headquarterListJSON = JSON.stringify(vm.headquarterList);
				var workGroupListJSON = JSON.stringify(vm.workGroupList);
				var unitListJSON = JSON.stringify(vm.unitList);
				var classesListJSON = JSON.stringify(vm.classesList);
				var peopleListJSON = JSON.stringify(vm.peopleList);
				var mapinfoListJSON = JSON.stringify(vm.mapinfoList);

				specReportInfoJSON = specReportInfoJSON.replace(/\\/g, "\\\\");
				headquarterListJSON = headquarterListJSON.replace(/\\/g, "\\\\");
				workGroupListJSON = workGroupListJSON.replace(/\\/g, "\\\\");
				unitListJSON = unitListJSON.replace(/\\/g, "\\\\");
				classesListJSON = classesListJSON.replace(/\\/g, "\\\\");
				peopleListJSON = peopleListJSON.replace(/\\/g, "\\\\");
				mapinfoListJSON = mapinfoListJSON.replace(/\\/g, "\\\\");

				$.ajax({
					url: BASEPATH + "/SpecDuty/doSaveEditSpecDuty.do",
					type: "POST",
					async: true,
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", getCookieValue("xtoken"));
						request.setRequestHeader("Auth", getCookieValue("loginName"));
					},
					data: {
						specReportInfoJSON: specReportInfoJSON,
						headquarterListJSON: headquarterListJSON,
						workGroupListJSON: workGroupListJSON,
						unitListJSON: unitListJSON,
						classesListJSON: classesListJSON,
						peopleListJSON: peopleListJSON,
						mapinfoListJSON: mapinfoListJSON
					},
					type: "POST",
					cache: false,
					success: function(data) {
						if(data == "success") {
							$.messager.confirm('title', '专项勤务新建保存成功', function(r) {
								if(r) {
									window.location.href = "specDutyList.html";
								} else {
									window.location.href = "specDutyList.html";
								}
							});
						} else {
							$.messager.alert("提示", "参数错误", "error");
						}
					},
					error: function(data) {
						$.messager.alert("提示", "服务器内部错误，请联系系统管理员", "error");
					}
				})
			}
		},
		watch: {
			unitList: function() {
				this.$nextTick(function() {
					$(".easyui-linkbutton").linkbutton();
				})
			}
		},
		mounted: function() {
			drawMapinfoToMap(specReportMapinfoList)
		}
	});
}

function doAddPeople(policeList) {
	for(var i = 0; i < policeList.length; i++) {
		var people = $.deepClone(selectingPeopleModel);
		people.id = getNewUUID();
		people.teamRole = policeList[i].teamRole;
		people.teamRoleName = policeList[i].teamRoleName;
		people.policeId = policeList[i].policeId;
		people.policeName = policeList[i].policeName;
		people.job = policeList[i].job ? policeList[i].job : "";
		people.mobilePhone = policeList[i].mobilePhone;
		people.locationId = policeList[i].locationId;
		people.locationType = policeList[i].locationType;
		vm.peopleList.push(people);
	}
	closeSelectWin()
}

function doAddUnit(unitList) {
	for(var i = 0; i < unitList.length; i++) {
		var isHaveUnit = false;
		for(var j = 0; j < vm.unitList.length; j++) {
			if(vm.unitList[j].belongType == selectingUnitModel.belongType && vm.unitList[j].headquarterId == selectingUnitModel.headquarterId && vm.unitList[j].stationId == unitList[i].deptId) {
				isHaveUnit = true;
				break;
			}
		}
		if(isHaveUnit) {
			continue;
		}
		var unit = $.deepClone(selectingUnitModel);
		unit.id = getNewUUID();
		unit.stationId = unitList[i].deptId;
		unit.stationName = unitList[i].deptName;
		vm.unitList.push(unit);
	}
	closeSelectWin();
}

function doAddMapinfo(mapinfo) {
	vm.mapinfoList.push(mapinfo);
}

function doBeginDraw(drawingMapModel) {
	mapWindow.drawMapOptionSelectOpen(drawingMapModel);
}
var drawWaitCount = 0;

function drawMapinfoToMap(mapinfoList) {
	console.log("专项勤务页面地图加载尝试:" + (drawWaitCount + 1));
	if(mapWindow.drawMapinfoToMap) {
		mapWindow.drawMapinfoToMap(mapinfoList);
		return;
	} else if(drawWaitCount > 25) {
		$.messager.alert("提示", "地图服务加载失败，请联系系统管理员", "error");
		return;
	} else {
		window.setTimeout(function() {
			drawMapinfoToMap(specReportMapinfoList)
		}, 100)
		drawWaitCount++;
	}
}

function doDeleteMapGraphic(mapinfoId) {
	mapWindow.removeMapGraphic(mapinfoId);
}

function removeMapinfoByMapinfoId(mapinfoId) {
	vm.removeMapinfo(mapinfoId);
}

function closeSelectWin() {
	$("#reportIframe").html("");
	$("#reportWin").dialog('close');
}