

/*
 * ============================
 *  机构单位- vue数据
 * ============================
 * */

var dailyPostReportData = {
	defaultGzJigou: ['440100000000'],//选择人员
	defaultGzJigou2: ['440100000000'],//选择车辆
	defaultGzJigou3: ['440100000000'],//选择装备
    gzJigouData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
    
    
    postSearch: '',
    memberSearch: '',
    carSearch: '',
    emuiqementSearch: '',
    
    selectedPolice: "",
    
    /*报备的警员list*/
    reportPoliceList: [],
    
    /*岗位列表*/
    barrierList: [],
    
    
    /*历史排班人员*/
    historyMembers: [],
	
    /*历史使用车辆*/
    historyCars: [],
	
    /*历史使用装备*/
    historyEquipments: [],
	
	currentDutyList:[],
	
    /*人员列表*/
    currentMembers: [],
    currentMemberTotal: 0,
    currentMemberPageSize: 24,
	
    /*车辆列表*/
    currentCars: [],
    currentVehicleTotal: 0,
    currentVehiclePageSize: 24,
	
    /*装备列表*/
    currentEquipments: [],
    currentEquipmentTotal: 0,
    currentEquipmentPageSize: 24,
	
	/*岗位列表*/
	postListData : [],
    currentWeek: getCurrentWeek(),
    selectedList:[],
   
    selectedBarrierClassDateList:[],//记录选中的日期格子
    selectedPoliceList:[],//记录选中的警员或车辆
    
    copiedReportPoliceList: []//记录已复制的警员或车辆
}



var dailyPostReportMethods = {
	loadData (item, callback) {
        item.loading = true;
    	$.ajax({
			type:"post",
			url:BASEPATH + "/unitRest/getUnitListByParentId.do",
			async:true,
			beforeSend:function(request){
				request.setRequestHeader("Authorization",getCookieValue("xtoken"));
				request.setRequestHeader("Auth",getCookieValue("loginName"));
			},
			data: {id: item.value},
			success: function(res){
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
			},
			error: function(err){
				console.log("-----------------"+err);
			}
		});
    }
	,deletePoliceItem(policeItem){
		for(var i = 0; i < this.reportPoliceList.length; i++){
			var item = this.reportPoliceList[i];
			if(policeItem.policeName == item.policeName  && policeItem.barrierId == item.barrierId && policeItem.barrierClassId == item.barrierClassId && policeItem.reportDate == item.reportDate){
				this.reportPoliceList.splice(i, 1);
			}
		}
	}
	,onPostTreeNodeSelected(arrNode){
		if(arrNode.length != 0 ){
			if(!arrNode[0].children){
				var arrPostId = [{
					barrierId: arrNode[0].barrierid,
					barriermould: arrNode[0].barriermould
				}];
				addPostToCurrentDutyList(arrPostId);
				
			}
		}
		
	}
	,onDeparmentCascaderChangeHandler(labels, selectedData){
		var deparmentId = selectedData[selectedData.length - 1].value;
		setDeparmentId(this, deparmentId);
		if(currentSelectTabType == TYPE_POLICE) {
			updateCurrentMembersData(deparmentId);
		} else if(currentSelectTabType == TYPE_VEHICLE) {
			updateCurrentVehiclesData(deparmentId);
		} else if(currentSelectTabType == TYPE_EQUIPMENT) {
			updateCurrentEquipmentsData(deparmentId);
		}
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
	,viewAndAddEquipment(policeItem){
		this.selectedPolice = policeItem;
		showEquipmentList($(event.target));
		setBoxTitleTab(2);
		$(event.target).addClass("selected");
	}
	,setCaptain(policeItem){
		policeItem.isCaptain = !policeItem.isCaptain;
	}
	,selectEquipment(equipment){
		this.selectedPolice.equipmentList.push(equipment);
	}
	,removeReportEquipmentItem(policeItem, equipmentItem){
		for(var i = 0; i < policeItem.equipmentList.length; i++){
			var item = policeItem.equipmentList[i];
			if(equipmentItem.equipmentName == item.equipmentName  && equipmentItem.equipmentId == item.equipmentId){
				policeItem.equipmentList.splice(i, 1);
			}
		}
	}
	,searchBarrier(text){
		if(text && text != ""){
			
		}
	}
	,currentMembersPageChange(pageIndex){
		var deparmentId = this.defaultGzJigou[this.defaultGzJigou.length - 1];
		updateCurrentMembersData(deparmentId, pageIndex);
	}
	,currentVehiclesPageChange(pageIndex){
		var deparmentId = this.defaultGzJigou2[this.defaultGzJigou2.length - 1];
		updateCurrentVehiclesData(deparmentId, pageIndex);
	}
	,currentEquipmentsPageChange(pageIndex){
		var deparmentId = this.defaultGzJigou2[this.defaultGzJigou2.length - 1];
		updateCurrentEquipmentsData(deparmentId, pageIndex);
	}
}



var dailyPostReportVue = new Vue({
	el: "#main",
	data: dailyPostReportData,
	methods: dailyPostReportMethods
	
});




/*
 * ============================
 *  数据操作方法
 * ============================
 * */


/*
 *	ajax 通用 ， 获取数据 
 * 
 * */
/*function ajaxGetDatas(url, dataObj, successCallback, contentType, type){
	$.ajax({
		type:type ? type: "post",
		url:url,
		async:true,
		data: dataObj,
		contentType: contentType ? contentType : 'application/json',
		dataType: 'json',
		success: function(res){
			successCallback(res);
		},
		error:function(err){
			console.log("ajax request Error: -----url=" + url);
		}
	});
}*/

/*
 * 岗位列表
 * 
 * */
function updatePostListMembersData() {
	var url = BASEPATH + "/barrier/getBarrierByDept.do";
//	var url = "http://192.168.0.140:8080/barrier/getBarrierReport";
	//ifUse: 不要值班领导， 值为1， 只要值班领导， 为0， 不传， 为全部
	var dataObj = {
		xlDept: getCurrentUserId(),
		ifuse: "1"
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setPostListData);
}

function setPostListData(result) {
	if(result) {
		var tempPostListDatas = [];
		tempPostListDatas = result.data;
		dailyPostReportVue.postListData = tempPostListDatas;
	}
}

function addPostToCurrentDutyList(arrPostId) {
	var url = BASEPATH + "/barrierReport/getBarrierReport.do";
	
	var arrWeek = [];
	for(index in dailyPostReportVue.currentWeek){
		var item = dailyPostReportVue.currentWeek[index];
		arrWeek.push(item.date);
	}

	var dataObj = {
		barrierListJSON: JSON.stringify([{"id":arrPostId[0].barrierId}]),
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
						policeType: tempPolice.policeType,
						policeId: tempPolice.policeId,
						type: tempPolice.teamRole=="vehicle"?'vehicle':'police',
						policeName: tempPolice.policeName,
						policeNum: tempPolice.policeNum,
						isCaptain: tempPolice.teamRole=="1"?true:false,
						teamRole : tempPolice.teamRole,
						teamRoleName : tempPolice.teamRoleName,
						isLeader: "0",
						reportDate: bcItem.data[j].reportDate,
						equipmentList:[]
			    	}
		   			console.log(policeItem);
		   			if(tempPolice.equipmentList.length != 0){
						var equipTempList = [];
						for(var eIndex = 0,eSize =tempPolice.equipmentList.length;eIndex < eSize; eIndex++){					
							var EquipmentTemp = {
								id : tempPolice.equipmentList[eIndex].id,
//								name : tempPolice.equipmentList[eIndex].name,
								type : tempPolice.equipmentList[eIndex].type,
								equipmentName : tempPolice.equipmentList[eIndex].equipmentName,
								equipmentType : tempPolice.equipmentList[eIndex].type,
								equipmentTypeName : tempPolice.equipmentList[eIndex].equipmentTypeName,
								gpsnum : tempPolice.equipmentList[eIndex].gpsnum,
								mainUnit : tempPolice.equipmentList[eIndex].mainUnit,
								mainUnitName : tempPolice.equipmentList[eIndex].mainUnitName,
								equipmentNum : tempPolice.equipmentList[eIndex].equipmentNum,
								dutyUnit : tempPolice.equipmentList[eIndex].dutyUnit,
								dutyUnitName : tempPolice.equipmentList[eIndex].dutyUnitName
							}
							equipTempList.push(EquipmentTemp);
						}
						policeItem.equipmentList = equipTempList;
					}
		   			
		   			dailyPostReportData.reportPoliceList.push(policeItem);
	   				
	   			}
	   		}
	   		
	   		barrier.barrierClassList.push(barrierClass);
	   	}
		addANewBarrier(barrier);
		updateCurrentPostHistoryMemberData();
	}
	
}



function saveReportBarrier(){
	var reportPeopleBOList=[], reportVehicleBOList=[], barrierIdList=[], reportDateList=[];
	var policeItem;
	for(var i=0; i<dailyPostReportData.reportPoliceList.length; i++){
		policeItem = dailyPostReportData.reportPoliceList[i];
		if(policeItem.type == "police"){
//			reportPeopleBOList.push(policeItem);
			reportPeopleBOList.push({
				barrierId: policeItem.barrierId,
				barrierClassId: policeItem.barrierClassId,
				reportDate: policeItem.reportDate,
				policeId: policeItem.policeId,
				policeName: policeItem.policeName,
				policeNum: policeItem.policeNum,
				teamRole: policeItem.teamRole,
				teamRoleName: policeItem.teamRoleName,
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
	for(var ii=0; ii<dailyPostReportData.barrierList.length; ii++){
		barrierItem = dailyPostReportData.barrierList[ii];
		barrierIdList.push(barrierItem.barrierId);
	}
	
	var dateItem;
	for(var iii=0; iii<dailyPostReportData.currentWeek.length; iii++){
		dateItem = dailyPostReportData.currentWeek[iii];
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




function createPoliceItem(barrierId, barrierClassId, reportDate, policeId, policeName, policeNum, policeType, equipmentList, isCaptain, isSelected, isLeader){
	var police = {
		isSelected: isSelected ? isSelected : false,
		isLeader: isLeader ? isLeader : "0",
//		isCaptain: isCaptain ? isCaptain : false,
		teamRole:  isCaptain ? isCaptain : false,
		type: "police",
		barrierId: barrierId,
		barrierClassId: barrierClassId,
		reportDate: reportDate,
		policeId: policeId,
		policeName: policeName,
		policeNum: policeNum,
		policeType: policeType,
		teamRole : '2',
		teamRoleName : '组员',
		equipmentList: equipmentList
	}
	return police;
}
function createVehicleItem(barrierId, barrierClassId, reportDate, policeId, policeName, policeNum, policeType, equipmentList, isCaptain, isSelected, isLeader){
	var police = {
		isSelected: isSelected ? isSelected : false,
		isLeader: isLeader ? isLeader : "0",
		type: "vehicle",
		barrierId: barrierId,
		barrierClassId: barrierClassId,
		reportDate: reportDate,
		policeId: policeId,
		policeName: policeName,
		policeNum: policeNum,
		policeType: policeType,
		teamRole : 'vehicle',
		teamRoleName : '车辆',
		equipmentList: []
	}
	return police;
}





function addANewBarrier(barrier){
	if(barrier){
		var isExist = false;
		var curBarrier = null;
		for(index in dailyPostReportData.barrierList){
			var tempItem = dailyPostReportData.barrierList[index];
			if(barrier.barrierId == tempItem.barrierId){
				isExist = true;
				curBarrier = index;
			}
		}
		if(isExist){
			dailyPostReportData.barrierList[curBarrier] = barrier;
//			layer.msg("岗位已存在");
		}else{
			dailyPostReportData.barrierList.push(barrier);
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
				
				policeId: policeItem.policeId,
				type: policeItem.type,
				policeName: policeItem.policeName,
				policeNum: policeItem.policeNum,
				isCaptain: false,
				teamRole : policeItem.teamRole,
				teamRoleName : policeItem.teamRoleName,
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
				teamRole : policeItem.teamRole,
				teamRoleName : policeItem.teamRoleName,
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
//				reportPolice = {
//					type : policeItem.type,
//					name : equipmentName,
//					id : id
//				}
			}
			
			dailyPostReportData.reportPoliceList.push(reportPolice);
		}
	}
	
}



function updateBarrierReportPoliceData(arrBarrierId, startTime, endTime){
	if(!endTime){
		var endTime = startTime;
	}
	var url = "";
}


/*
 * 根据岗位更新历史人员列表数据
 * 
 * */
function updateCurrentPostHistoryMemberData() {
	var url = BASEPATH + "/barrierReport/getHistoryReport.do";
	var arrCurrentPost = [];
	for(var i = 0; i < dailyPostReportVue.barrierList.length; i++) {
		var obj = dailyPostReportVue.barrierList[i];
		arrCurrentPost.push(obj.barrierId);
	}
	var dataObj = {
		barrierId: arrCurrentPost,
		type: currentSelectTabType
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setCurrentPostHistoryMemberData);
}

function setCurrentPostHistoryMemberData(result) {
	if(result && result.data) {
		if(currentSelectTabType == TYPE_POLICE) {
			var tempHistoryMembers = [];
			for(var i = 0; i < result.data.length; i++) {
				var obj = result.data[i];
				if(obj.NAME){
					
					tempHistoryMembers.push({
						isSelected:false,
						name: obj.NAME ?obj.NAME : "---" ,
						id: obj.ID,
						type: obj.TYPE,
						equipment: []
					});
				}
			}
			dailyPostReportVue.historyMembers = tempHistoryMembers;

		} else if(currentSelectTabType == TYPE_VEHICLE) {
			var tempHistoryVehicles = [];
			for(var i = 0; i < result.data.length; i++) {
				var obj = result.data[i];
				tempHistoryVehicles.push({
					isSelected:false,
					name: obj.NAME,
					id: obj.ID,
					//					type: obj.TYPE
					type: 'vehicle'
				});
			}
			dailyPostReportVue.historyCars = tempHistoryVehicles;
		} else if(currentSelectTabType == TYPE_EQUIPMENT) {
			var tempHistoryEquipMents = [];
			for(var i = 0; i < result.data.length; i++) {
				var obj = result.data[i];
				tempHistoryEquipMents.push({
					isSelected:false,
					name: obj.NAME,
					id: obj.ID,
					//					type: obj.TYPE
					type: "equipment"
				});
			}
			dailyPostReportVue.historyEquipments = tempHistoryEquipMents;
		}
	}
}


/*
 *	人员列表
 * 
 * */
function updateCurrentMembersData(deparmentId, pageIndex) {
	//	var url = "http://192.168.0.109:8090/police/api/getReportPoliceList";
	var url = BASEPATH + "/police/api/getReportPoliceList";
	var dataObj = {
		isLeader: 0,
		mainUnit: deparmentId ? deparmentId : "",
		offset: pageIndex ? pageIndex : 0,
		limit: 24
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setCurrentMembersData);
}

function setCurrentMembersData(result) {
	if(result) {
		var tempCurrentMembers = [];

		for(var i = 0; i < result.data.length; i++) {
			var obj = result.data[i];
			
			
//			var police = createPoliceItem(barrierId, barrierClassId, reportDate, policeId, policeName, policeNum, policeType, equipmentList, isCaptain, isSelected, isLeader);
			var police = createPoliceItem(null, null, null, obj.id, obj.policeName, obj.policeNum, obj.policeType, [], false, false, obj.isLeader);
			tempCurrentMembers.push(police);
			/*tempCurrentMembers.push({
				isSelected: false,
				type: "police",
				policeId: obj.id,
				policeName: obj.policeName,
				policeNum: obj.policeNum,
				policeType: obj.policeType ? obj.policeType : "mj",
				isLeader: obj.isLeader ? obj.isLeader : "0",
				equipmentList: []
			});*/
		}
		dailyPostReportVue.currentMembers = tempCurrentMembers;
		dailyPostReportVue.currentMemberTotal = result.total;
	}
}

/*
 *	车辆列表
 * 
 * */
function updateCurrentVehiclesData(deparmentId, pageIndex) {
	var url = BASEPATH + "/equipment/getReportEquipmentList.do";
	var dataObj = {
		type: "vehicle",
		mainUnit: deparmentId ? deparmentId : "",
		offset: pageIndex ? pageIndex : 0,
		limit: 24
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setCurrentVehiclesData);
}

function setCurrentVehiclesData(result) {
	if(result && result.data) {
		var tempCurrentCars = [];

		for(var i = 0; i < result.data.length; i++) {
			var obj = result.data[i];
			tempCurrentCars.push({
				name: obj.equipmentName,
				id: obj.id,
				type: "vehicle"
			});
		}
		dailyPostReportVue.currentCars = tempCurrentCars;
		dailyPostReportVue.currentVehicleTotal = result.total;
	}
}
/*
 *	装备列表
 * 
 * */
function updateCurrentEquipmentsData(deparmentId, pageIndex) {
	var url = BASEPATH + "/equipment/getReportEquipmentList.do";
	var dataObj = {
		type: "equipment",
		mainUnit: deparmentId ? deparmentId : "",
		offset: pageIndex ? pageIndex : 0,
		limit: 24
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setCurrentEquipmentsData);
}

function setCurrentEquipmentsData(result) {
	if(result && result.data) {
		var tempCurrentEquipments = [];

		for(var i = 0; i < result.data.length; i++) {
			var obj = result.data[i];
			tempCurrentEquipments.push({
				name: obj.equipmentName,
				id: obj.id,
				type: "equipment",
				equipmentName :obj.equipmentName,
				equipmentType : obj.equipmentType,
				equipmentTypeName : obj.equipmentTypeName,
				gpsnum : obj.gpsnum,
				mainUnit : obj.mainUnit,
				mainUnitName : obj.mainUnitName,
				equipmentNum : obj.equipmentNum,
				dutyUnit : obj.dutyUnit,
				dutyUnitName : obj.dutyUnitName
			});
		}
		dailyPostReportVue.currentEquipments = tempCurrentEquipments;
		dailyPostReportVue.currentEquipmentTotal = result.total;
	}
}

function setWeekListData(result) {
	dailyPostReportVue.currentDutyList = result;
}

function setWeekListTitle(arrWeek) {
	dailyPostReportVue.currentWeek = arrWeek;
}



function updateWeekListData(){
	var url = BASEPATH + "/barrierReport/getBarrierReport.do";
	var arrBarrierId = [], arrWeek = [];
	for(index in dailyPostReportVue.barrierList){
		var barrier = dailyPostReportVue.barrierList[index];
		arrBarrierId.push({
			id: barrier.barrierId
		});
	}
	for(index2 in dailyPostReportVue.currentWeek){
		var item = dailyPostReportVue.currentWeek[index2];
		arrWeek.push(item.date);
	}
	var dataObj = {
		barrierListJSON: JSON.stringify(arrBarrierId),
		reportBeginDate:JSON.stringify(arrWeek)
	};

	ajaxGetDatas(url, dataObj, setNewPostDataToCurrentDutyList, "application/x-www-form-urlencoded");
}
