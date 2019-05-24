


var vueData = {
	memberSearch: "",
	
	defaultGzJigou: ['440100000000'],//选择人员
    gzJigouData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
    /*值班领导*/
    dutyLeaderList: [],
    /*值班指挥长*/
    dutyLeaderList2: [],
    /*本周*/
    currentWeek: getCurrentWeek(),
    
    /*报备的警员list*/
    reportPoliceList: [],
    
    /*岗位列表*/
    barrierList: [
    {
    	barrierName: "值班岗位",
    	barrierId: "0b871922-d69c-45c2-b49a-43225fc30a04",
    	barrierClassList:[{
    		barrierName: "值班岗位",
    		barrierId: "0b871922-d69c-45c2-b49a-43225fc30a04",
   			barrierClassId: "87543254567989",
			startTime: "8:30",
			endTime: "17:30",
			data:[]
    	}]
    }],
	
	selectedBarrierClassDateList:[],//记录选中的日期格子
    selectedPoliceList:[],//记录选中的警员或车辆
    
    copiedReportPoliceList: []//记录已复制的警员或车辆
};

var vueMethods = {
	loadData (item, callback) {
        item.loading = true;
         ajaxGetDatas(BASEPATH + "/unitRest/getUnitListByParentId.do", 
				 	{id: item.value}, function(res){
						var arrChildren = [];
						if(res && res.data){
							for(var i=0; i<res.data.length; i++){
								var obj = res.data[i];
								if(obj.isEnd == "1"){
									arrChildren.push({
										value: obj.id,
										label: obj.name
									});
								}else{
									arrChildren.push({
										value: obj.id,
										label: obj.name,
										children: [],
		                        		loading: false
									});
								}
								
							}
						}
						item.children = arrChildren;
						item.loading = false;
						callback();
					},"application/x-www-form-urlencoded");
    }
	,onDeparmentCascaderChangeHandler(labels, selectedData){
		var deparmentId = selectedData[selectedData.length - 1].value;
		updateCurrentMembersData(deparmentId);
	}
	,saveReportBarrier(){
		
	}
	,selectBarrierClassDateItem(barrierClass, date){
		var barrierClassDateItem = {
			barrierId: barrierClass.barrierId,
			barrierName: barrierClass.barrierName,
			barrierClassId: barrierClass.barrierClassId,
			barrierClassName: barrierClass.barrierClassName,
			reportDate: date,
		}
		if(this.selectedPoliceList.length == 0){
			$(event.target).toggleClass("selected");
			if($(event.target).hasClass("selected")){
				this.selectedBarrierClassDateList.push(barrierClassDateItem);
			}else{
				for(var i=0; i<this.selectedBarrierClassDateList.length; i++){
					if(isObjectSame(barrierClassDateItem, this.selectedBarrierClassDateList[i])){
						this.selectedBarrierClassDateList.splice(i,1);
					}
				}
			}
		}else{
			addNewReportPoliceItem(this.selectedPoliceList, [barrierClassDateItem]);
			this.selectedPoliceList = [];
			this.selectedBarrierClassDateList = [];
			clearSelectedPeopleItem();
		}
	}
	,selectPeopleItem(policeItem){
		if(this.selectedBarrierClassDateList.length == 0){
			policeItem.isSelected = !policeItem.isSelected;
			if(policeItem.isSelected)
				this.selectedPoliceList.push(policeItem);
			else
				this.selectedPoliceList.splice($.inArray(policeItem, this.selectedPoliceList), 1);
		}else{
			addNewReportPoliceItem([policeItem], this.selectedBarrierClassDateList);
			this.selectedPoliceList = [];
			this.selectedBarrierClassDateList = [];
			clearSelectedBarrierClassDateItem();
		}
	}
	,deletePoliceItem(policeItem){
		for(var i = 0; i < this.reportPoliceList.length; i++){
			var item = this.reportPoliceList[i];
			if(policeItem.leaderType == item.leaderType  && policeItem.policeName == item.policeName  && policeItem.barrierId == item.barrierId && policeItem.barrierClassId == item.barrierClassId && policeItem.reportDate == item.reportDate){
				this.reportPoliceList.splice(i, 1);
			}
		}
	}
};


var dutyLeaderVue = new Vue({
	el: "#main",
	data: vueData,
	methods: vueMethods
});

/*
 * 通过单位机构代码获取值班岗位的报备
 * 
 * */
function getBarrierList(departmentId){
	var url = BASEPATH + "/barrierReport/getBarrierReport.do";
	var departmentId = "440100000000";
	
	
}



function updateBarrierReportLeaderData(){
	var url = BASEPATH + "/barrierReport/getBarrierReport.do";
	var arrWeek = [];
	for(index in dutyLeaderVue.currentWeek){
		var item = dutyLeaderVue.currentWeek[index];
		arrWeek.push(item.date);
	}

	var dataObj = {
		barrierListJSON: JSON.stringify([{"id":arrPostId[0].barrierId}]),
		reportBeginDate:JSON.stringify(arrWeek)
	};

	ajaxGetDatas(url, dataObj, setNewPostDataToCurrentDutyList, "application/x-www-form-urlencoded");
}


function updateBarrierList(){
	var url= BASEPATH + "/barrier/getBarrierByDept.do";
	
}


function updatePoliceList(departmentId){
	var url = BASEPATH + "/police/api/getReportPoliceList";
	var dataObj = {
		isLeader: 0,
		mainUnit: departmentId ? departmentId : "",
		offset: 0,
		limit: 24
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setCurrentMembersData);
}


function setCurrentMembersData(result) {
	if(result) {
		var tempCurrentMembers = [];
		for(var i = 0; i < result.data.length; i++) {
			var obj = result.data[i];
			/*var police = createPoliceItem(null, null, null, obj.id, obj.policeName, obj.policeNum, obj.policeType, [], false, false, obj.isLeader);
			tempCurrentMembers.push(police);
			*/
			var leader1 = createPoliceItem(null, null, null, obj.id, obj.policeName, obj.policeNum, obj.policeType, [], false, false, obj.isLeader);
			leader1["leaderType"] = "zbld";
			leader1["leaderTypeName"] = "值班领导";
			
			var leader2 = createPoliceItem(null, null, null, obj.id, obj.policeName, obj.policeNum, obj.policeType, [], false, false, obj.isLeader);
			leader2["leaderType"] = "zhz";
			leader2["leaderTypeName"] = "指挥长";
			
			dutyLeaderVue.dutyLeaderList.push(leader1);
			dutyLeaderVue.dutyLeaderList2.push(leader2);
			
		}
	}
}


function createPoliceItem(barrierId, barrierClassId, reportDate, policeId, policeName, policeNum, policeType, equipmentList, isCaptain, isSelected, isLeader){
	var police = {
		isSelected: isSelected ? isSelected : false,
		isLeader: isLeader ? isLeader : "0",
		teamRole:  isCaptain ? isCaptain : false,
		type: "police",
		barrierId: barrierId,
		barrierClassId: barrierClassId,
		reportDate: reportDate,
		policeId: policeId,
		policeName: policeName,
		policeNum: policeNum,
		policeType: policeType,
		equipmentList: equipmentList
	}
	return police;
}


function setWeekListTitle(arrWeek) {
	dutyLeaderVue.currentWeek = arrWeek;
}
function setWeekListData(result) {
	dutyLeaderVue.currentDutyList = result;
}

function updateWeekListData(){
	var url = BASEPATH + "/barrierReport/getBarrierReport.do";
	var arrBarrierId = [], arrWeek = [];
	for(index in dutyLeaderVue.barrierList){
		var barrier = dutyLeaderVue.barrierList[index];
		arrBarrierId.push({
			id: barrier.barrierId
		});
	}
	for(index2 in dutyLeaderVue.currentWeek){
		var item = dutyLeaderVue.currentWeek[index2];
		arrWeek.push(item.date);
	}
	var dataObj = {
		barrierListJSON: JSON.stringify(arrBarrierId),
		reportBeginDate:JSON.stringify(arrWeek)
	};

	ajaxGetDatas(url, dataObj, setNewPostDataToCurrentDutyList, "application/x-www-form-urlencoded");
}


function setNewPostDataToCurrentDutyList(result) {
	if(result && result.data){
		var barrier = 	{
    		barrierName: result.data[0].barrierName,
	    	barrierId: result.data[0].barrierId,
	    	barrierClassList:[]
	   	};
	   	for(var i=0; i<result.data[0].bc.data.length; i++){
	   		var bcItem = result.data[0].bc.data[i];
	   		var barrierClass = {
	   			barrierId: bcItem.barrierId,
	   			barrierName: bcItem.barrierName,
	   			barrierClassId: bcItem.id,
    			startTime: bcItem.watchBegin ? bcItem.watchBegin : "8:30",
    			endTime: bcItem.watchEnd ? bcItem.watchEnd : "17:30",
    			data : []
	   		};
	   		
	   		for(var j=0; j<bcItem.data.length; j++){
	   			for(var x=0; x<bcItem.data[j].data.length; x++){
	   				var tempPolice = bcItem.data[j].data[x];
	   				
		   			var policeItem;
		   			policeItem= {
						barrierId: bcItem.barrierId,
						barrierName: bcItem.barrierName,
						barrierClassId: bcItem.id,
						barrierClassName: bcItem.className,
						leaderType: tempPolice.leaderType,
						policeType: tempPolice.policeType,
						policeId: tempPolice.id,
						type: tempPolice.teamRole=="vehicle"?'vehicle':'police',
						policeName: tempPolice.policeName,
						policeNum: tempPolice.id,
						isCaptain: false,
						isLeader: "0",
						reportDate: bcItem.data[j].reportDate,
						equipmentList:[]
			    	}
		   			
		   			dutyLeaderVue.reportPoliceList.push(policeItem);
	   			}
	   		}
	   		
	   		barrier.barrierClassList.push(barrierClass);
	   	}
		addANewBarrier(barrier);
	}
}

function addANewBarrier(barrier){
	if(barrier){
		var isExist = false;
		var curBarrier = null;
		for(index in dutyLeaderVue.barrierList){
			var tempItem = dutyLeaderVue.barrierList[index];
			if(barrier.barrierId == tempItem.barrierId){
				isExist = true;
				curBarrier = index;
			}
		}
		if(isExist){
			dutyLeaderVue.barrierList[curBarrier] = barrier;
//			layer.msg("岗位已存在");
		}else{
			dutyLeaderVue.barrierList.push(barrier);
		}
	}
}

function addNewReportPoliceItem(policeList, dateList){
	for(var i=0; i< policeList.length; i++){
		var policeItem = policeList[i];
		for(var j=0; j< dateList.length; j++){
			var dateItem = dateList[j];
			var reportPolice;
			if(policeItem.type == "police"){
				reportPolice = {
				barrierId: dateItem.barrierId,
				barrierName: dateItem.barrierName,
				barrierClassId: dateItem.barrierClassId,
				barrierClassName: dateItem.barrierClassName,
				
				leaderType: policeItem.leaderType,
				leaderTypeName: policeItem.leaderTypeName,
				policeId: policeItem.policeId,
				type: policeItem.type,
				policeName: policeItem.policeName,
				policeNum: policeItem.policeNum,
				isCaptain: false,
				policeType: policeItem.policeType,
				isLeader: policeItem.isLeader,
				reportDate: dateItem.reportDate,
				equipmentList: policeItem.equipmentList
		   		};
			}else if(policeItem.type == "vehicle"){
				reportPolice = {
				barrierId: dateItem.barrierId,
				barrierName: dateItem.barrierName,
				barrierClassId: dateItem.barrierClassId,
				barrierClassName: dateItem.barrierClassName,
				
				policeId: policeItem.id,
				type: policeItem.type,
				policeName: policeItem.name,
				policeNum: '',
				isCaptain: false,
				policeType: policeItem.policeType,
				isLeader: '',
				reportDate: dateItem.reportDate,
				equipmentList: []
		   	 	};
			}else if(policeItem.type == "equipment"){
			}
			
			dutyLeaderVue.reportPoliceList.push(reportPolice);
		}
	}
	
}



function saveReportBarrier(){
	var reportPeopleBOList=[], reportVehicleBOList=[], barrierIdList=[], reportDateList=[];
	debugger
	var policeItem;
	for(var i=0; i<dutyLeaderVue.reportPoliceList.length; i++){
		policeItem = dutyLeaderVue.reportPoliceList[i];
		if(policeItem.type == "police"){
//			reportPeopleBOList.push(policeItem);
			reportPeopleBOList.push({
				barrierId: policeItem.barrierId,
				barrierClassId: policeItem.barrierClassId,
				reportDate: policeItem.reportDate,
//				leaderType: policeItem.leaderType,
				teamRole: '',
				teamRoleName:'', 
				policeId: policeItem.policeId,
				policeName: policeItem.policeName,
				policeNum: policeItem.policeNum,
				policeType: policeItem.policeType,
				equipmentList: []
			});
			if(policeItem.equipmentList.length != 0){
				var equipTempList = [];
				for(var eIndex = 0,eSize =policeItem.equipmentList.length;eIndex < eSize; eIndex++){					
					var EquipmentTemp = {
						id : policeItem.equipmentList[eIndex].id,
//						name : policeItem.equipmentList[eIndex].name,
						type : policeItem.equipmentList[eIndex].type,
						equipmentName : policeItem.equipmentList[eIndex].equipmentName,
						equipmentType : policeItem.equipmentList[eIndex].type,
						equipmentTypeName : policeItem.equipmentList[eIndex].equipmentTypeName,
						gpsnum : policeItem.equipmentList[eIndex].gpsnum,
						mainUnit : policeItem.equipmentList[eIndex].mainUnit,
						mainUnitName : policeItem.equipmentList[eIndex].mainUnitName,
						equipmentNum : policeItem.equipmentList[eIndex].equipmentNum,
						dutyUnit : policeItem.equipmentList[eIndex].dutyUnit,
						dutyUnitName : policeItem.equipmentList[eIndex].dutyUnitName
					}
					equipTempList.push(EquipmentTemp);
				}
				reportPeopleBOList[i].equipmentList = equipTempList;
			}
			
		}else {
			reportVehicleBOList.push({
				barrierId: policeItem.barrierId,
				barrierClassId: policeItem.barrierClassId,
				reportDate: policeItem.reportDate,
				vehicleId: policeItem.policeId,
				vehicleName: policeItem.policeName,
				vehicleNum: policeItem.policeNum,
				vehicleType: policeItem.policeType,
				vehicleGPS: policeItem.vehicleGPS
			});
		}
	}
	var barrierItem;
	for(var ii=0; ii<dutyLeaderVue.barrierList.length; ii++){
		barrierItem = dutyLeaderVue.barrierList[ii];
		barrierIdList.push(barrierItem.barrierId);
	}
	
	var dateItem;
	for(var iii=0; iii<dutyLeaderVue.currentWeek.length; iii++){
		dateItem = dutyLeaderVue.currentWeek[iii];
		reportDateList.push(dateItem.date);
	}
	
	var url = BASEPATH + "/barrierReport/doSaveReport.do";
	var dataObj = { 
		reportDateListJSON : JSON.stringify(reportDateList),
		reportBarrierIdListJSON : JSON.stringify(barrierIdList),
		reportPeopleBOListJSON : JSON.stringify(reportPeopleBOList),
		reportVehicleBOListJSON : JSON.stringify(reportVehicleBOList)
	};
	ajaxGetDatas(url, dataObj, saveReportBarrierSuccessHandler, "application/x-www-form-urlencoded");
	
}

function saveReportBarrierSuccessHandler(json){
	layer.msg("保存成功");
}
