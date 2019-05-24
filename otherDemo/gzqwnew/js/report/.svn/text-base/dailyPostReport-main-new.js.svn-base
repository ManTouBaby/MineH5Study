var TYPE_POLICE = "police";
var TYPE_EQUIPMENT = "equipment";
var TYPE_VEHICLE = "vehicle";



var MemberCopyMode = false;
var DateCopyMode = false;
var memberSelectedList = [];
var dutySelectedList = [];
var currentSelectTabType = TYPE_POLICE;


$(document).ready(function(){
	initPage();
	initDatas();
	
});

$(document).keyup(function(e){
	if(e.ctrlKey==1 && e.keyCode == 67){
		console.log("你按下了Ctrl+C");
		copyData();
		
	}
	if(e.ctrlKey==1 && e.keyCode == 86){
		console.log("你按下了Ctrl+V");
		pasteDate();
	}
})


function copyData(){
	if(dailyPostReportVue.selectedBarrierClassDateList.length==1){
		var dailyGrid = dailyPostReportVue.selectedBarrierClassDateList[0];
		if(dailyGrid) {
			var dayData = dailyGrid.reportDate;
			var reportPolice;
			dailyPostReportVue.copiedReportPoliceList = [];
			for(var i=0; i<dailyPostReportVue.reportPoliceList.length; i++){
				reportPolice = dailyPostReportVue.reportPoliceList[i];
				if(reportPolice.barrierId == dailyGrid.barrierId && reportPolice.barrierClassId == dailyGrid.barrierClassId  && reportPolice.reportDate == dailyGrid.reportDate ){
					var policeItem;
					if(reportPolice.type == "police"){
						policeItem = createPoliceItem(
							reportPolice.barrierId,
							reportPolice.barrierClassId, 
							reportPolice.reportDate, 
							reportPolice.policeId, 
							reportPolice.policeName, 
							reportPolice.policeNum, 
							reportPolice.policeType, 
							reportPolice.equipmentList, 
							reportPolice.isCaptain, 
							reportPolice.isSelected, 
							reportPolice.isLeader
						)
					}else if(reportPolice.type == "vehicle"){
						policeItem = createVehicleItem(
							reportPolice.barrierId,
							reportPolice.barrierClassId, 
							reportPolice.reportDate, 
							reportPolice.policeId, 
							reportPolice.policeName, 
							reportPolice.policeNum, 
							reportPolice.policeType, 
							reportPolice.equipmentList, 
							reportPolice.isCaptain, 
							reportPolice.isSelected, 
							reportPolice.isLeader
						)
					}
					dailyPostReportVue.copiedReportPoliceList.push(policeItem);
				}
			}
			
			
			if(dailyPostReportVue.copiedReportPoliceList.length==0){
				layer.msg("内容为空, 复制失败");
			}else{
				layer.msg("复制成功");
				dailyPostReportVue.selectedBarrierClassDateList = [];
			}
		}
	}else{
		layer.msg("只能复制一个班次");
	}
	clearSelectedBarrierClassDateItem();
	memberSelectedList = [];
	dutySelectedList = [];
}

function pasteDate(){
	if(dailyPostReportVue.copiedReportPoliceList.length==0){
		layer.msg("没有可粘贴的内容");
		return;
	}
	if(dailyPostReportVue.selectedBarrierClassDateList.length==0){
		layer.msg("请先选择某个岗位的其中一个班次的某一天");
	}else{
		for(var i=0; i<dailyPostReportVue.selectedBarrierClassDateList.length; i++){
			var dailyGrid = dailyPostReportVue.selectedBarrierClassDateList[i];
			if(dailyGrid) {
				for(var j=0; j<dailyPostReportVue.copiedReportPoliceList.length; j++){
					var reportPolice = dailyPostReportVue.copiedReportPoliceList[j];
					if(reportPolice){
						var policeItem;
						if(reportPolice.type == "police"){
							policeItem = createPoliceItem(
								dailyGrid.barrierId,
								dailyGrid.barrierClassId, 
								dailyGrid.reportDate, 
								reportPolice.policeId, 
								reportPolice.policeName, 
								reportPolice.policeNum, 
								reportPolice.policeType, 
								reportPolice.equipmentList, 
								reportPolice.isCaptain, 
								reportPolice.isSelected, 
								reportPolice.isLeader
							)
						}else if(reportPolice.type == "vehicle"){
							policeItem = createVehicleItem(
								dailyGrid.barrierId,
								dailyGrid.barrierClassId, 
								dailyGrid.reportDate, 
								reportPolice.policeId, 
								reportPolice.policeName, 
								reportPolice.policeNum, 
								reportPolice.policeType, 
								reportPolice.equipmentList, 
								reportPolice.isCaptain, 
								reportPolice.isSelected, 
								reportPolice.isLeader
							)
						}
						
						dailyPostReportVue.reportPoliceList.push(policeItem);
					}
				}
			}
		}
	}
	clearSelectedBarrierClassDateItem();
	dailyPostReportVue.selectedBarrierClassDateList = [];
	memberSelectedList = [];
	dutySelectedList = [];
}





function initPage(){
	initPageEventHandler();
}


function initDatas(){
	updatePostListMembersData();
	
	updateCurrentMembersData();
	updateCurrentVehiclesData();
	updateCurrentEquipmentsData();
	
}

function initPageEventHandler(){
	addBoxTitleTabChangeEventHandler();
	
}


function addBoxTitleTabChangeEventHandler(){
	$(".box-title-tab .tab-item").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parents(".box-tab").find(".box-tab-content").eq($(this).index()).addClass("active").siblings().removeClass("active");
		
		if($(this).index() == 0){
			currentSelectTabType = TYPE_POLICE;
		}else if($(this).index() == 1){
			currentSelectTabType = TYPE_VEHICLE;
		}else if($(this).index() == 2){
			currentSelectTabType = TYPE_EQUIPMENT;
		}
		updateCurrentPostHistoryMemberData();
	});
}


function clearSelectedBarrierClassDateItem(){
	$(".teamMemberContainer").removeClass("selected");
}
function clearSelectedPeopleItem(){
	$(".peopleItem").removeClass("selected");
}


function setBoxTitleTab(index){
	$("#member-selecter-container .tab-item").eq(index).addClass("active").siblings().removeClass("active");
	$("#member-selecter-container .box-tab-content").eq(index).addClass("active").siblings().removeClass("active");
}



function onReportedPoliceTagCloseHandler(target) {
	event.stopPropagation();
	event.preventDefault();
	var tagIndex = $(target).parents(".reportedPolice-tag").index();
	var parent = $(target).parents(".teamMemberContainer").attr("postINdex");
	var postIndex = parent.attr("postINdex"),
		bcIndex = parent.attr("bcIndex"),
		dayIndex = parent.attr("dayIndex");
	deletePoliceTagData(postIndex, bcIndex, dayIndex, tagIndex);
}

function onCaptionClickHandler(target){
}


function onEquipmentClickHandler(target) {
	event.stopPropagation();
	event.preventDefault();
//	setBoxTitleTab(2);
	showEquipmentList(target);
}

function showEquipmentList(target){
	
	$(target).parents(".reportedPolice-tag").find(".equipment-list-container").toggleClass("active").siblings(".equipment-list-container").removeClass("active");
}

function isObjectSame( x, y ) {   
    var in1 = x instanceof Object;  
    var in2 = y instanceof Object;  
    if(!in1||!in2){  
      return x===y;  
    }  
    if(Object.keys(x).length!==Object.keys(y).length){
      return false;  
     }  
    for(var p in x){  
    var a = x[p] instanceof Object;  
    var b = y[p] instanceof Object;  
      if(a&&b){  
        return equals( x[p], y[p]);  
       }  
       else if(x[p]!==y[p]){  
         return false;  
       }  
    }  
      
    return true;  
} 

function onteamMemberClickHandler(target){
	event.stopPropagation();
	event.preventDefault();
	if(memberSelectedList.length == 0){
		var obj = {
			postIndex: $(target).attr("postIndex"),
			bcIndex: $(target).attr("bcIndex"),
			dayIndex: $(target).attr("dayIndex")
		}
		if($(target).hasClass("reportingLeaderContainer")){
			for(var ii=0; ii<dutySelectedList.length; ii++){
				if(isObjectSame(obj, dutySelectedList[ii])){
					dutySelectedList.splice(ii, 1);
				}
			}
			
			
			$(target).removeClass("reportingLeaderContainer");
		}else{
			dutySelectedList.push(obj);
			$(target).addClass("reportingLeaderContainer");
		}
		
		dateCopyMode = true;
	}else{
		var obj = {
				postIndex: $(target).attr("postIndex"),
				bcIndex: $(target).attr("bcIndex"),
				dayIndex: $(target).attr("dayIndex")
			}
		dutySelectedList.push(obj);
		reportPeople(memberSelectedList);
		memberSelectedList = [];
		dutySelectedList = [];
		
		$(".peopleItem").removeClass("selected");
		memberCopyMode = false;
		dateCopyMode = false;
	}
}

function onPeopleItemClickHandler(target){
	if(dutySelectedList.length == 0){
		//未选中日期时， 变成人员多选状态
		$(target).toggleClass("selected");
		var policeItem = {
			type: $(target).find(".policeType").val(), 
			name: $(target).find(".policeName").val(), 
			id: $(target).find(".policeId").val(),
			isCaption: "false", 
			equipment: []
		};
		$(target).find("policeEquipment").each(function(){
			var equipmentObj = {
				type: $(this).attr("equipmentType"),
				id: $(this).attr("equipmentId"),
				name: $(this).attr("equipmentName")
			}
			policeItem.equipment.push(equipmentObj);
		});
		
		if($(target).hasClass("selected")){
			memberSelectedList.push(policeItem);
		}else{
			memberSelectedList.splice($.inArray(policeItem, memberSelectedList), 1);
		}
		memberCopyMode = true;
	}else {
		if(dutySelectedList && dutySelectedList.length>0) {
			var policeItems=[],policeItem;
			var policeItem = {
				type: $(target).find(".policeType").val(), 
				name: $(target).find(".policeName").val(), 
				id: $(target).find(".policeId").val(),
				isCaption: "false", 
				equipment: []
			};
			$(target).find("policeEquipment").each(function(){
				var equipmentObj = {
					type: $(this).attr("equipmentType"),
					id: $(this).attr("equipmentId"),
					name: $(this).attr("equipmentName")
				}
				policeItem.equipment.push(equipmentObj);
			});
			policeItems.push(policeItem);
			reportPeople(policeItems);
			dateCopyMode = true;
			$(".teamMemberContainer").removeClass("reportingLeaderContainer");
			dutySelectedList = [];
		}
		
	}
}

function reportPeople(policeItems) {
	if(dutySelectedList && dutySelectedList.length>0) {
		addNewReportPoliceItem(policeItems, dutySelectedList);
	}
}

function prevWeek(){
	var arrWeek = getAWeek(addDate(getFirstDailyOfCurrentWeek(),-7));
	setWeekListTitle(arrWeek);
	dailyPostReportData.reportPoliceList = [];
	updateWeekListData();
}


function nextWeek(){
	var arrWeek = getAWeek(addDate(getFirstDailyOfCurrentWeek(),7));
	setWeekListTitle(arrWeek);
	dailyPostReportData.reportPoliceList = [];
	updateWeekListData();
}

function setDeparmentId(target, deparmentId) {
	$(target).parents(".form-group").find(".deparment-select-value").val(deparmentId);
}
