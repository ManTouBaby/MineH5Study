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
	for(var i = 0; i < specReportUnitList.length; i++) {
		if(specReportUnitList[i].stationId == userDeptId) {
			for(var j = 0; j < headquarterList.length; j++) {
				if(headquarterList[j].id == specReportUnitList[i].headquarterId) {
					headquarterList[j].isNeedReport = true;
				}
			}
			for(var j = 0; j < workGroupList.length; j++) {
				if(workGroupList[j].id == specReportUnitList[i].headquarterId) {
					workGroupList[j].isNeedReport = true;
				}
			}
			specReportUnitList[i].isNeedReport = true;
		} else {
			specReportUnitList[i].isNeedReport = false;
		}
	}
	for(var j = 0; j < headquarterList.length; j++) {
		if(!headquarterList[j].isNeedReport) {
			headquarterList[j].isNeedReport = false;
		}
	}
	for(var j = 0; j < workGroupList.length; j++) {
		if(!workGroupList[j].isNeedReport) {
			workGroupList[j].isNeedReport = false;
		}
	}

	vm = new Vue({
		el: '#mainDiv',
		data: {
			userDeptId: userDeptId,
			specReportInfo: specReportInfo,
			headquarterList: headquarterList,
			workGroupList: workGroupList,
			unitList: specReportUnitList,
			classesList: specReportClassesList,
			peopleList: specReportPeopleList,
			mapinfoList: specReportMapinfoList,
			reportUnitList: reportUnitList,
			reportClassesList: reportClassesList,
			reportPeopleList: reportPeopleList,
			reportMapinfoList: reportMapinfoList,
			editingZHB: $.deepClone(specReportHeadquarter),
			editingGZZ: $.deepClone(specReportHeadquarter),
			editingViewController: {
				zhb: false,
				gzz: false
			}
		},
		methods: {
			doEditZHB: function(headquarter) {
				if(!headquarter.isNeedReport) {
					return;
				}
				vm.editingViewController.zhb = true;
				vm.editingViewController.gzz = false;
				vm.editingZHB = headquarter;
				this.$nextTick(function() {
					$(".easyui-linkbutton").linkbutton()
				})
			},
			doEditGZZ: function(workGroup) {
				if(!workGroup.isNeedReport) {
					return;
				}
				vm.editingViewController.zhb = false;
				vm.editingViewController.gzz = true;
				vm.editingGZZ = workGroup;
				this.$nextTick(function() {
					// 加载单位班次easyui控件
					$(".GZZ_unit_classes_Time_datetimebox_watchBegin").each(function() {
						var classes = undefined;
						for(var i = 0; i < vm.reportClassesList.length; i++) {
							if(vm.reportClassesList[i].id == $(this).attr("classesid")) {
								classes = vm.reportClassesList[i];
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
						for(var i = 0; i < vm.reportClassesList.length; i++) {
							if(vm.reportClassesList[i].id == $(this).attr("classesid")) {
								classes = vm.reportClassesList[i];
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
			selectUnitInZHBPeople: function(unit) {
				selectingPeopleModel = $.deepClone(specReportPeople);
				selectingPeopleModel.dutyId = vm.specReportInfo.id;
				selectingPeopleModel.headquarterId = unit.headquarterId;
				selectingPeopleModel.stationId = unit.id;
				selectingPeopleModel.belongType = "headquarterUnitPeople";
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
			addUnitChildrenUnit: function(unit) {
				selectingUnitModel = $.deepClone(specReportUnit);
				selectingUnitModel.dutyId = vm.specReportInfo.id;
				selectingUnitModel.headquarterId = unit.headquarterId;
				selectingUnitModel.mjCount = 0;
				selectingUnitModel.fjCount = 0;
				selectingUnitModel.belongType = "workGroupChildrenUnit";
				selectingUnitModel.unitLevel = parseInt(unit.unitLevel) + 1;
				selectingUnitModel.parentUnitId = unit.id;
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
			addChildrenClasses: function(unit) {
				specReportClassesModel = $.deepClone(specReportClasses);
				specReportClassesModel.id = getNewUUID();
				specReportClassesModel.dutyId = unit.dutyId;
				specReportClassesModel.headquarterId = unit.headquarterId;
				specReportClassesModel.stationId = unit.id;
				specReportClassesModel.belongType = "childrenUnitClasses";
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
				vm.reportClassesList.push(specReportClassesModel);
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
			selectClassesPeople: function(classes) {
				selectingPeopleModel = $.deepClone(specReportPeople);
				selectingPeopleModel.dutyId = vm.specReportInfo.id;
				selectingPeopleModel.headquarterId = classes.headquarterId;
				selectingPeopleModel.stationId = classes.stationId;
				selectingPeopleModel.classesId = classes.id;
				selectingPeopleModel.belongType = "workGroupUnitClassesPeople";
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
			selectChildrenClassesPeople: function(classes) {
				selectingPeopleModel = $.deepClone(specReportPeople);
				selectingPeopleModel.dutyId = vm.specReportInfo.id;
				selectingPeopleModel.headquarterId = classes.headquarterId;
				selectingPeopleModel.stationId = classes.stationId;
				selectingPeopleModel.classesId = classes.id;
				selectingPeopleModel.belongType = "workGroupChildrenUnitPeople";
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
			delChildrenUnit: function(childrenUnitId) {
				for(var i = 0; i < vm.reportUnitList.length; i++) {
					if(vm.reportUnitList[i].id == childrenUnitId) {
						vm.reportUnitList.splice(i, 1);
						break;
					}
				}
			},
			delReportPolice: function(peopleId) {
				for(var i = 0; i < vm.reportPeopleList.length; i++) {
					if(vm.reportPeopleList[i].id == peopleId) {
						vm.reportPeopleList.splice(i, 1);
						break;
					}
				}
			},
			validateSaveData: function() {
				vm.doSaveReport()
			},
			doSaveReport: function() {
				// 没有班次的默认添加一个班次
				for(var i = 0; i < vm.reportUnitList.length; i++) {
					if(vm.reportUnitList[i].belongType == "workGroupChildrenUnit") {
						var isHaveClasses = false;
						for(var j = 0; j < vm.reportClassesList.length; j++) {
							if(vm.reportClassesList[j].stationId == vm.reportUnitList[i].id) {
								isHaveClasses = true;
							}
						}
						if(!isHaveClasses) {
							vm.addChildrenClasses(vm.reportUnitList[i]);
						}
					}
				}

				var specReportInfoJSON = JSON.stringify(vm.specReportInfo);
				var reportUnitListJSON = JSON.stringify(vm.reportUnitList);
				var reportClassesListJSON = JSON.stringify(vm.reportClassesList);
				var reportPeopleListJSON = JSON.stringify(vm.reportPeopleList);
				var reportMapinfoListJSON = JSON.stringify(vm.reportMapinfoList);

				specReportInfoJSON = specReportInfoJSON.replace(/\\/g, "\\\\");
				reportUnitListJSON = reportUnitListJSON.replace(/\\/g, "\\\\");
				reportClassesListJSON = reportClassesListJSON.replace(/\\/g, "\\\\");
				reportPeopleListJSON = reportPeopleListJSON.replace(/\\/g, "\\\\");
				reportMapinfoListJSON = reportMapinfoListJSON.replace(/\\/g, "\\\\");

				$.ajax({
					url: BASEPATH + "/SpecDuty/doSaveReportSpecDuty.do",
					type: "get",
					async: true,
					beforeSend: function(request) {
						request.setRequestHeader("Authorization", getCookieValue("xtoken"));
						request.setRequestHeader("Auth", getCookieValue("loginName"));
					},
					data: {
						specReportInfoJSON: specReportInfoJSON,
						reportUnitListJSON: reportUnitListJSON,
						reportClassesListJSON: reportClassesListJSON,
						reportPeopleListJSON: reportPeopleListJSON,
						reportMapinfoListJSON: reportMapinfoListJSON
					},
					type: "POST",
					cache: false,
					success: function(data) {
						if(data == "success") {
							$.messager.confirm('报备完成', '专项勤务报备完成', function(r) {
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
		vm.reportPeopleList.push(people);
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
		vm.reportUnitList.push(unit);
	}
	vm.$nextTick(function() {
		$(".easyui-linkbutton").linkbutton();
	});
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

function closeSelectWin() {
	$("#reportIframe").html("");
	$("#reportWin").dialog('close');
}