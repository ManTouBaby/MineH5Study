



$(document).ready(function(){
	initData();
})


function initData(){
	updatePoliceList();
	updateWeekListData();
}



function clearSelectedPeopleItem(){
	$(".peopleItem").removeClass("selected");
}
function clearSelectedBarrierClassDateItem(){
	$(".teamMemberContainer").removeClass("selected");
}


function prevWeek(){
	debugger
	var arrWeek = getAWeek(addDate(getFirstDailyOfCurrentWeek(),-7));
	setWeekListTitle(arrWeek);
	dutyLeaderVue.reportPoliceList = [];
	updateWeekListData();
}


function nextWeek(){
	var arrWeek = getAWeek(addDate(getFirstDailyOfCurrentWeek(),7));
	setWeekListTitle(arrWeek);
	dutyLeaderVue.reportPoliceList = [];
	updateWeekListData();
}


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
	if(dutyLeaderVue.selectedBarrierClassDateList.length==1){
		var dailyGrid = dutyLeaderVue.selectedBarrierClassDateList[0];
		if(dailyGrid) {
			var dayData = dailyGrid.reportDate;
			var reportPolice;
			dutyLeaderVue.copiedReportPoliceList = [];
			for(var i=0; i<dutyLeaderVue.reportPoliceList.length; i++){
				reportPolice = dutyLeaderVue.reportPoliceList[i];
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
						policeItem.leaderType = reportPolice.leaderType;
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
					dutyLeaderVue.copiedReportPoliceList.push(policeItem);
				}
			}
			
			
			if(dutyLeaderVue.copiedReportPoliceList.length==0){
				layer.msg("内容为空, 复制失败");
			}else{
				layer.msg("复制成功");
				dutyLeaderVue.selectedBarrierClassDateList = [];
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
	if(dutyLeaderVue.copiedReportPoliceList.length==0){
		layer.msg("没有可粘贴的内容");
		return;
	}
	if(dutyLeaderVue.selectedBarrierClassDateList.length==0){
		layer.msg("请先选择某个岗位的其中一个班次的某一天");
	}else{
		for(var i=0; i<dutyLeaderVue.selectedBarrierClassDateList.length; i++){
			var dailyGrid = dutyLeaderVue.selectedBarrierClassDateList[i];
			if(dailyGrid) {
				for(var j=0; j<dutyLeaderVue.copiedReportPoliceList.length; j++){
					var reportPolice = dutyLeaderVue.copiedReportPoliceList[j];
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
							policeItem.leaderType = reportPolice.leaderType;
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
						
						dutyLeaderVue.reportPoliceList.push(policeItem);
					}
				}
			}
		}
	}
	clearSelectedBarrierClassDateItem();
	dutyLeaderVue.selectedBarrierClassDateList = [];
	memberSelectedList = [];
	dutySelectedList = [];
}


