$(function() {
	$(".mainDiv").height($(window).height())
	$(window).resize(function() {
		$(".mainDiv").height($(window).height())
	})
})

var specReportHeadquarter = {
	"id" : "",
	"dutyId" : "",
	"name" : "",
	"location" : "",
	"description" : "",
	"createTime" : "",
	"updateTime" : "",
	"ifuse" : "",
	"type" : "",
	"rankNum" : 1,
	"watchBegin" : "",
	"watchEnd" : ""
}

var specReportUnit = {
	"id" : "",
	"dutyId" : "",
	"headquarterId" : "",
	"stationId" : "",
	"stationName" : "",
	"isReport" : "",
	"createTime" : "",
	"updateTime" : "",
	"ifuse" : "",
	"mjCount" : "",
	"fjCount" : "",
	"unitLevel" : "",
	"parentUnitId" : "",
	"description" : "",
	"belongType" : ""
}

var specReportClasses = {
	"id" : "",
	"dutyId" : "",
	"headquarterId" : "",
	"stationId" : "",
	"belongType" : "",
	"classesName" : "",
	"watchBegin" : "",
	"watchEnd" : "",
	"createtime" : "",
	"updatetime" : "",
	"ifuse" : ""
}

var specReportPeople = {
	"id" : "",
	"dutyId" : "",
	"headquarterId" : "",
	"stationId" : "",
	"classesId" : "",
	"belongType" : "",
	"teamRole" : "",
	"teamRoleName" : "",
	"policeId" : "",
	"createTime" : "",
	"updateTime" : "",
	"ifuse" : "",
	"policeName" : "",
	"job" : "",
	"mobilePhone" : "",
	"locationId" : "",
	"locationType" : "",
	"watchBegin" : "",
	"watchEnd" : ""
}

var specReportMapinfo = {
	"id" : "",
	"dutyId" : "",
	"headquarterId" : "",
	"stationId" : "",
	"belongType" : "",
	"mapType" : "",
	"type" : "",
	"typeName" : "",
	"pointInfo" : "",
	"createTime" : "",
	"updateTime" : "",
	"ifuse" : "",
	"title" : "",
	"remark" : "",
	"color" : "",
	"symbol" : ""
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
		el : '#mainDiv',
		data : {
			specReportInfo : specReportInfo,
			headquarterList : headquarterList,
			workGroupList : workGroupList,
			unitList : specReportUnitList,
			classesList : specReportClassesList,
			peopleList : specReportPeopleList,
			mapinfoList : specReportMapinfoList,
			editingZHB : $.deepClone(specReportHeadquarter),
			editingGZZ : $.deepClone(specReportHeadquarter),
			lookingUnit : $.deepClone(specReportUnit),
			editingViewController : {
				zhb : false,
				gzz : false,
				unitDetail : false,
			}
		},
		methods : {
			doEditZHB : function(headquarter) {
				vm.editingViewController.zhb = true;
				vm.editingViewController.gzz = false;
				vm.editingViewController.unitDetail = false;
				vm.editingZHB = headquarter;
			},
			doEditGZZ : function(workGroup) {
				vm.editingViewController.zhb = false;
				vm.editingViewController.gzz = true;
				vm.editingViewController.unitDetail = false;
				vm.editingGZZ = workGroup
			},
			doLookingUnit : function(unit) {
				vm.lookingUnit = unit;
				vm.editingViewController.unitDetail = true;
			}
		},
		mounted : function() {
			drawMapinfoToMap(specReportMapinfoList)
		}
	});
}

var drawWaitCount = 0;
function drawMapinfoToMap(mapinfoList) {
	console.log("专项勤务页面地图加载尝试:" + (drawWaitCount + 1));
	if (mapWindow.drawMapinfoToMap) {
		mapWindow.drawMapinfoToMap(mapinfoList);
		return;
	} else if (drawWaitCount > 25) {
		$.messager.alert("提示", "地图服务加载失败，请联系系统管理员", "error");
		return;
	} else {
		window.setTimeout(function() {
			drawMapinfoToMap(specReportMapinfoList)
		}, 100)
		drawWaitCount++;
	}
}