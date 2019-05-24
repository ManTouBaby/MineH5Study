//var BASEPATH = "http://192.168.0.136:8080";
//var BASEPATH = "http://127.0.0.1:8080";

/*
 * ============================
 *  机构单位- vue数据
 * ============================
 * */

var dailyPostReportData = {
	defaultGzJigou: ['440100000000'],//选择人员
    gzJigouData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
    gzJigouData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
    policeType : [
    	{
            dictValue: "我是傻川--value",
			id: '11111',
			dictName : "我是傻川--label"
       },
    	{
            dictValue: "我是傻川2--value",
			id: '11111',
			dictName : "我是傻川2--label"
        }
    ],
    policeTypeValue: "",
    
    
    
    memberSearch: '',
    carSearch: '',
    emuiqementSearch: '',
    
    selectedPoliceList:[],
    selectedPolice: "",
    
    
    reportPoliceList: [
//  	{
//			barrierId:"barrier_001",
//			barrierName:"测试巡段",
//			barrierClassId:"barrier_001_01",
//			barrierClassName:"",
//			
//			policeId: "police_123456",
//			type: "police",
//			policeName: "王七七",
//			policeNum: "123456",
//			isCaptain: false,
//			isLeader: "0",
//			reportDate:"2018-03-13",
//			equipmentList:[
//				{
//					equipmentType:"手台",
//					equipmentName: "PDT001",
//					equipmentId: "pdt_440101010001"
//				},
//				{
//					equipmentType:"手台",
//					equipmentName: "PDT002",
//					equipmentId: "pdt_440101010002"
//				}
//			]
//  	},
//  	{
//			barrierId:"barrier_002",
//			barrierName:"测试巡段",
//			barrierClassId:"barrier_002_02",
//			barrierClassName:"",
//			
//			policeId: "police_123456",
//			type: "police",
//			policeName: "七王八",
//			policeNum: "123456",
//			isCaptain: false,
//			isLeader: "0",
//			reportDate:"2018-03-17",
//			equipmentList:[]
//  	}
    ],
    
    policeList: [
//  		 {
//          "REPORTWATCH": [
//              {
//                  "DATA": [],
//                  "RDATE": "2018-03-19"
//              },
//              {
//                  "DATA": [],
//                  "RDATE": "2018-03-20"
//              },
//              {
//                  "DATA": [
//                      {
//                          "BARRIERID": "437c8c02-7c64-455a-9ec0-6ee0c9d68263",
//                          "WATCHID": "b6b6eb57-0e72-4781-9224-b4f4a453c8e4",
//                          "WATCHBEGIN": "2018-03-21 00:00:00",
//                          "POLICENUM": "069639",
//                          "BARRIERNAME": "测试值班岗位2",
//                          "BARRIERMOULD": "zbgw",
//                          "BARRIERXLDEPT": "440308990000",
//                          "POLICEID": "069639",
//                          "WATCHEND": "2018-03-21 14:00:00",
//                          "REPORTDATE": "2018-03-21",
//                          "POLICENAME": "丁三章"
//                      }
//                  ],
//                  "RDATE": "2018-03-21"
//              },
//              {
//                  "DATA": [],
//                  "RDATE": "2018-03-22"
//              },
//              {
//                  "DATA": [],
//                  "RDATE": "2018-03-23"
//              },
//              {
//                  "DATA": [],
//                  "RDATE": "2018-03-24"
//              },
//              {
//                  "DATA": [],
//                  "RDATE": "2018-03-25"
//              }
//          ],
//          "ID": "069639",
//          "POLICENAME": "丁三章",
//          "ROW_ID": 1
//      }
    
    
    
    
    
    /*
    	{
    		barrierName: "测试巡段",
	    	barrierId: "barrier_001",
	    	barrierClassList:[
	    		{
	    			barrierName: "测试巡段",
	    			barrierId: "barrier_001",
	    			barrierClassId: "barrier_001_01",
	    			barrierClassName: "",
	    			startTime: '08:30',
	    			endTime: '10:30'
	    		},
	    		{
	    			barrierName: "测试巡段",
	    			barrierId: "barrier_001",
	    			barrierClassId: "barrier_001_02",
	    			barrierClassName: "",
	    			startTime: '08:30',
	    			endTime: '10:30'
	    		}
	    	]
	    },
    	{
    		barrierName: "测试巡段2",
	    	barrierId: "barrier_002",
	    	barrierClassList:[
	    		{
	    			barrierName: "测试巡段2",
	    			barrierId: "barrier_002",
	    			barrierClassId: "barrier_002_01",
	    			barrierClassName: "",
	    			startTime: '08:30',
	    			endTime: '10:30'
	    		},
	    		{
	    			barrierName: "测试巡段2",
	    			barrierId: "barrier_002",
	    			barrierClassId: "barrier_002_02",
	    			barrierClassName: "",
	    			startTime: '08:30',
	    			endTime: '10:30'
	    		}
	    	]
	    }*/
    ],
    
    
    
    
	
	
    /*人员列表*/
    currentMembers: [],
	
    
	
   
	
	/*岗位列表*/
	postListData : [],
    currentWeek: getCurrentWeek(),
    selectedList:[],
   
    selectedBarrierClassDateList:[],//记录选中的日期格子
    selectedPoliceList:[]//记录选中的警员或车辆
}



var dailyPostReportMethods = {
	loadData (item, callback) {
        item.loading = true;
        
    	ajaxGetDatas(BASEPATH + "/unitRest/getUnitListByParentId.do",
				 	{id: item.value}, 
					function(res){
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
	,deletePoliceItem(policeItem){
		for(var i = 0; i < this.reportPoliceList.length; i++){
			var item = this.reportPoliceList[i];
			if(policeItem.policeName == item.policeName  && policeItem.barrierId == item.barrierId && policeItem.barrierClassId == item.barrierClassId && policeItem.reportDate == item.reportDate){
				this.reportPoliceList.splice(i, 1);
			}
		}
	}
	,onPostTreeNodeSelected(arrNode){
		if(arrNode.length != 0 && arrNode[0].children) return;
		var arrPostId = [{
			barrierId: arrNode[0].barrierid,
			barriermould: arrNode[0].barriermould
		}];
		addPostToCurrentDutyList(arrPostId);
		updateCurrentPostHistoryMemberData();
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
	},onPoliceTypeSelectChangeHandler(selectData){
//		var PoliceTypeId = selectData[selectData.length - 1].value;
//		setPoliceTypeId(this, PoliceTypeId);
//		console.log(selectData);
//		this.policeType =selectData;
//		setPoliceTypeId(this,selectData);
	}
	,selectPeopleItem(policeItem){
		console.log(policeItem);
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
	},searchPoliceWork(target){
		getPoliceWorkMsg(target);
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
function ajaxGetDatas(url, dataObj, successCallback, contentType, type){
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
		equipmentList: equipmentList
	}
	return police;
}


/*
var jsonObject = new Object();
reportPeopleBOList = [{
	"barrierId": "72c4335a-313b-4e21-b219-0cf25411c952",
	"barrierClassId": "1d35898f-afe1-44a4-8bc4-3da5a97f70c2",
	"reportDate": "2018-03-13",
	"policeId": "10000181",
	"policeName": "钱七",
	"policeNum": "test005",
	"policeType": "mj",
	"equipmentList": []
}, {
	"barrierId": "72c4335a-313b-4e21-b219-0cf25411c952",
	"barrierClassId": "e627d107-27d6-4d5b-87e8-2a42f402ede8",
	"reportDate": "2018-03-13",
	"policeId": "10000000",
	"policeName": "郭靖",
	"policeNum": "000333",
	"policeType": "mj",
	"equipmentList": [{
		"id": "10000099",
		"equipmentName": "测试PDT",
		"equipmentNum": "123123",
		"equipmentType": "pdt",
		"equipmentTypeName": "pdt",
		"ifuse": "R",
		"createtime": "2018-02-28 10:20:40",
		"updatetime": "2018-02-28 10:20:40",
		"mainUnit": "440308990000",
		"mainUnitName": "测试派出所",
		"dutyUnit": "440308990000",
		"dutyUnitName": "测试派出所",
		"gpsnum": "123123"
	}, {
		"id": "10000094",
		"equipmentName": "测试PDT",
		"equipmentNum": "123",
		"equipmentType": "pdt",
		"equipmentTypeName": "pdt",
		"ifuse": "R",
		"createtime": "2018-02-27 17:18:18",
		"updatetime": "2018-02-27 17:18:18",
		"mainUnit": "440308990000",
		"mainUnitName": "测试派出所",
		"dutyUnit": "440308990000",
		"dutyUnitName": "测试派出所",
		"gpsnum": "321"
	}, {
		"id": "10000100",
		"equipmentName": "测试云终端",
		"equipmentNum": "12321312312",
		"equipmentType": "yzd",
		"equipmentTypeName": "云终端",
		"ifuse": "R",
		"createtime": "2018-03-01 17:56:35",
		"updatetime": "2018-03-01 17:56:35",
		"mainUnit": "440308990000",
		"mainUnitName": "测试派出所",
		"dutyUnit": "440308990000",
		"dutyUnitName": "测试派出所",
		"gpsnum": "1231232131"
	}]
}];
reportVehicleBOList = [{
	"barrierId": "72c4335a-313b-4e21-b219-0cf25411c952",
	"barrierClassId": "1d35898f-afe1-44a4-8bc4-3da5a97f70c2",
	"reportDate": "2018-03-13",
	"vehicleId": "100000",
	"vehicleName": "测试车辆001",
	"vehicleNum": "深BA123警",
	"vehicleType": "C1",
	"vehicleGPS": "12345"
}, {
	"barrierId": "72c4335a-313b-4e21-b219-0cf25411c952",
	"barrierClassId": "1d35898f-afe1-44a4-8bc4-3da5a97f70c2",
	"reportDate": "2018-03-13",
	"vehicleId": "100001",
	"vehicleName": "测试车辆2",
	"vehicleNum": "深BA124警",
	"vehicleType": "A1",
	"vehicleGPS": "321456"
}, {
	"barrierId": "72c4335a-313b-4e21-b219-0cf25411c952",
	"barrierClassId": "e627d107-27d6-4d5b-87e8-2a42f402ede8",
	"reportDate": "2018-03-13",
	"vehicleId": "10003163",
	"vehicleName": "测试车辆",
	"vehicleNum": "粤B0000警",
	"vehicleType": "C1",
	"vehicleGPS": "123456"
}];
barrierIdList = ["72c4335a-313b-4e21-b219-0cf25411c952"];
reportDateList = ["2018-03-13", "2018-03-14", "2018-03-15", "2018-03-16", "2018-03-17", "2018-03-18", "2018-03-19"];

*/



function addANewBarrier(barrier){
	dailyPostReportData.barrierList.push(barrier);
}

function addNewReportPoliceItem(policeList, dateList){
//	for(var i=0; i< policeList.length; i++){
//		var policeItem = policeList[i];
//		for(var j=0; j< dateList.length; j++){
//			var dateItem = dateList[j];
//			var reportPolice = {
//				barrierId: dateItem.barrierId,
//				barrierName: dateItem.barrierName,
//				barrierClassId: dateItem.barrierClassId,
//				barrierClassName: dateItem.barrierClassName,
//				
//				policeId: policeItem.policeId,
//				type: policeItem.type,
//				policeName: policeItem.policeName,
//				policeNum: policeItem.policeNum,
//				isCaptain: false,
//				policeType: policeItem.policeType,
//				isLeader: policeItem.isLeader,
//				reportDate: dateItem.reportDate,
//				equipmentList: policeItem.equipmentList
//		    };
//			dailyPostReportData.reportPoliceList.push(reportPolice);
//		}
//	}
	
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
				tempHistoryMembers.push({
					isSelected:false,
					name: obj.NAME,
					id: obj.ID,
					type: obj.TYPE,
					equipment: []
				});
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
function updateCurrentMembersData(deparmentId) {
	//	var url = "http://192.168.0.109:8090/police/api/getReportPoliceList";
	var url = BASEPATH + "/police/api/getReportPoliceList";
//	var policeName = ;
//	var policeType = ;
//	var policeNum = ;
	var dataObj = {
		isLeader: 0,
		mainUnit: deparmentId ? deparmentId : "",
//		policeName : 
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
	}
}

/*
 *	车辆列表
 * 
 * */
function updateCurrentVehiclesData(deparmentId) {
	var url = BASEPATH + "/equipment/getReportEquipmentList.do";
	var dataObj = {
		type: "vehicle",
		mainUnit: deparmentId ? deparmentId : "",
		offset: 0,
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
	}
}
/*
 *	装备列表
 * 
 * */
function updateCurrentEquipmentsData(deparmentId) {
	var url = BASEPATH + "/equipment/getReportEquipmentList.do";
	var dataObj = {
		type: "equipment",
		mainUnit: deparmentId ? deparmentId : "",
		offset: 0,
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
				type: "equipment"
			});
		}
		dailyPostReportVue.currentEquipments = tempCurrentEquipments;
	}
}

/**
 * 
 * 获取字典
 */
function getDictionaryType(dicType){
	var url = BASEPATH + "/dic/getDic.do";
	var dataObj = {
		dictType: dicType,
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setDictionary);
}
/**
 * 设置select参数
 */
function setDictionary(result){
	if(result && result.data) {
		var tempCurrentType = [];
//		dailyPostReportData;
		for(var i = 0; i < result.data.length; i++) {
			var obj = result.data[i];
			tempCurrentType.push({
				dictValue: obj.dictValue,
				id: obj.id,
				dictValue: obj.dictValue,
				dictName : obj.dictName
			});
		}
		dailyPostReportVue.policeType = tempCurrentType;
		console.log(result);
	}
}
function getPoliceWorkMsg(target){
	 var url = BASEPATH + "/barrierReportWatch/getPoliceWorkMsg.do";
	 var dataObj = new Object();
	 dataObj.mainUnit = '440306540000';
     dataObj.reportDate = ['2018-03-19','2018-03-20','2018-03-21','2018-03-22','2018-03-23','2018-03-24','2018-03-25'];
     dataObj.offset = 0;
     dataObj.limit = 15;
	 ajaxGetDatas(url, JSON.stringify(dataObj),setPoliceWorkMsg);
//ajaxGetDatas(url, dataObj,setPoliceWorkMsg,'application/x-www-form-urlencoded');
}
function setPoliceWorkMsg(result){
	if(result && result.data){
		console.log(result.data);
		dailyPostReportVue.policeList = result.data;
	}
}
