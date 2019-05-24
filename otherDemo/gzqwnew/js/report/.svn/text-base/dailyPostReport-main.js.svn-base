var TYPE_POLICE = "police";
var TYPE_EQUIPMENT = "equipment";
var TYPE_VEHICLE = "vehicle";



var MemberCopyMode = false;
var DateCopyMode = false;
var memberSelectedList = [];
var dutySelectedList = [];
var currentSelectTabType = TYPE_POLICE;
var copyContent;//复制内容

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
	debugger
	if(dateCopyMode){
		if(dutySelectedList.length==1){
			var dailyGrid = dutySelectedList[0];
			if(dailyGrid) {
				postIndex = dailyGrid.postIndex;
				bcIndex = dailyGrid.bcIndex;
				dayIndex = dailyGrid.dayIndex;
				var dayData = dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex];
				if(dayData[data] || dayData.data.length==0){
					layer.msg("内容为空, 复制失败");
				}else{
					copyContent = null;
					copyContent = dayData.clone();
					layer.msg("已复制");
				}
			}
		}else{
			layer.msg("只能复制一个班次");
		}
		$(".teamLeaderContainer").removeClass("reportingLeaderContainer");
		memberSelectedList = [];
		dutySelectedList = [];
	}
}
function pasteDate(){
	debugger
	if(dateCopyMode){
		if(!copyContent) return;
		if(dutySelectedList.length==0){
			layer.msg("请先选择要复制到哪个日期");
		}else{
			for(var i=0; i<dutySelectedList.length; i++){
				var dailyGrid = dutySelectedList[i];
				if(dailyGrid) {
					postIndex = dailyGrid.postIndex;
					bcIndex = dailyGrid.bcIndex;
					dayIndex = dailyGrid.dayIndex;
					/*var dayData = dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data;
					if(dayData[data] || dayData.data.length=0){
						layer.msg("内容为空, 复制失败");
					}else{
						copyContent = dayData.clone();
						layer.msg("已复制");
					}
					addPoliceItemToCurrentDutyList(policeItems, dailyGrid);*/
				}
				
			}
		}
		$(".teamLeaderContainer").removeClass("reportingLeaderContainer");
		memberSelectedList = [];
		dutySelectedList = [];
		
	}
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




/*function onBoxTitleTabClickHandler(target) {
	$(target).addClass("active").siblings().removeClass("active");
	$(target).parents(".box-tab").find(".box-tab-content").eq($(target).index()).addClass("active").siblings().removeClass("active");
}*/

function setBoxTitleTab(index){
	$("#member-selecter-container .tab-item").eq(index).addClass("active").siblings().removeClass("active");
	$("#member-selecter-container .box-tab-content").eq(index).addClass("active").siblings().removeClass("active");
}

/*function onReportedPoliceTagCloseHandler(target) {
//	$(target).parents(".reportedPolice-tag").remove();
	event.stopPropagation();
	event.preventDefault();
	var tagIndex = $(target).parents(".reportedPolice-tag").index();
	var parent = $(target).parents(".teamMemberContainer").attr("postINdex");
	var postIndex = parent.attr("postIndex"),
		bcIndex = parent.attr("bcIndex"),
		dayIndex = parent.attr("dayIndex");
	deletePoliceTagData(postIndex, bcIndex, dayIndex, tagIndex);
}*/

function onCaptionClickHandler(target){
	layer.tips('我是组长', $(target),{
	  tips: [4, '#78BA32']
	});
}


function onEquipmentClickHandler(target) {
	event.stopPropagation();
	event.preventDefault();
	setBoxTitleTab(2);
	showEquipmentList(target);
}

function showEquipmentList(target){
	$(target).parents(".reportedPolice-tag").find(".equipment-list-container").toggleClass("active");
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
//	console.log(event);
	event.stopPropagation();
	event.preventDefault();
	if(event.target != target) return;
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
			/*if($(target).find(".name").html()) {
				policeItem = $(target).find(".name").html();
			} else {
				policeItem = $(target).html()
			}*/
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
		for(var i=0; i<dutySelectedList.length; i++){
			var dailyGrid = dutySelectedList[i];
			addPoliceItemToCurrentDutyList(policeItems, dailyGrid);
		}
	}
}



function onEquiqmentItemClickHandler(target){
	
}




function prevWeek(){
	var arrWeek = getAWeek(addDate(getFirstDailyOfCurrentWeek(),-7));
	setWeekListTitle(arrWeek);
	var arrPost = [];
	var startDaily = "2018-03-14";
	updateWeekListData(arrPost, startDaily);
}


function nextWeek(){
	var arrWeek = getAWeek(addDate(getFirstDailyOfCurrentWeek(),7));
	setWeekListTitle(arrWeek);
	var arrPost = [];
	var startDaily = "2018-03-14";
	updateWeekListData(arrPost, startDaily);
}

function setDeparmentId(target, deparmentId) {
	$(target).parents(".form-group").find(".deparment-select-value").val(deparmentId);
}


function showEquipmentListContainer(flag){
//	if($(".equipment-list-container"))
}
