//var BASEPATH = "http://192.168.0.117:8080";

/*
 * ============================
 *  机构单位- vue数据
 * ============================
 * */

var dailyPostReportData = {
	defaultGzJigou: ['440100000000'], //选择人员
	defaultGzJigou2: ['440100000000'], //选择车辆
	defaultGzJigou3: ['440100000000'], //选择装备
	gzJigouData: [{
		value: '440100000000',
		label: '广州市公安局',
		children: [],
		loading: false
	}],

	postSearch: '',
	memberSearch: '',
	carSearch: '',
	emuiqementSearch: '',

	/*历史排班人员*/
	historyMembers: [],

	/*历史使用车辆*/
	historyCars: [],

	/*历史使用装备*/
	historyEquipments: [],

	/*人员列表*/
	currentMembers: [],

	/*车辆列表*/
	currentCars: [],

	/*装备列表*/
	currentEquipments: [],

	/*岗位列表*/
	postListData: [],
	currentWeek: getCurrentWeek(),
	selectedList: [],

	/*当前排班数据*/
	currentDutyList: [{
		postName: "测试巡段",
		postId: "72c4335a-313b-4e21-b219-0cf25411c952",
		bc: [{
				startTime: '08:30',
				endTime: '10:30',
				data: [{
						time: "2018-03-12",
						data: [{
								type: "police",
								name: "警员张三",
								id: "A10001",
								isCaption: "true",
								equipment: [{
										type: "equipment",
										name: "装备e0001",
										id: "E10001"
									},
									{
										type: "equipment",
										name: "装备e0002",
										id: "E10002"
									}
								]
							},
							{
								type: "police",
								name: "警员李四",
								id: "A10002",
								isCaption: "false",

								equipment: [{
										type: "equipment",
										name: "装备e0003",
										id: "E10003"
									},
									{
										type: "equipment",
										name: "装备e0004",
										id: "E10004"
									}
								]
							},
							{
								type: "police",
								name: "警员王五",
								id: "A10003",
								isCaption: "false",
								equipment: []
							}
						]
					},
					{
						time: "2018-03-12",
						data: [{
								type: "police",
								name: "警员张三",
								id: "A10001",
								isCaption: "false",
								equipment: [{
										type: "equipment",
										name: "装备e0001",
										id: "E10001"
									},
									{
										type: "equipment",
										name: "装备e0002",
										id: "E10002"
									}
								]
							},
							{
								type: "police",
								name: "警员李四",
								id: "A10002",
								isCaption: "true",
								equipment: [{
										type: "equipment",
										name: "装备e0003",
										id: "E10003"
									},
									{
										type: "equipment",
										name: "装备e0004",
										id: "E10004"
									}
								]
							},
							{
								type: "vehicle",
								name: "粤A10002",
								id: "A1000cvwe3"
							}
						]
					},
					{
						time: "2018-03-12",
						data: []
					},
					{
						time: "2018-03-12",
						data: []
					},
					{
						time: "2018-03-12",
						data: []
					},
					{
						time: "2018-03-12",
						data: []
					},
					{
						time: "2018-03-12",
						data: []
					}
				]
			},
			{
				startTime: '08:30',
				endTime: '10:30',
				data: [{},
					{},
					{},
					{},
					{},
					{},
					{}

				]
			}
		]
	}, {
		postName: "前台值班岗",
		postId: "8ff7e2a9-39b1-41ae-9eb6-0baf14eb65a6",
		bc: [{
			startTime: '08:30',
			endTime: '10:30',
			data: [{
					time: "2018-03-12",
					data: []
				},
				{
					time: "2018-03-12",
					data: []
				},
				{
					time: "2018-03-12",
					data: []
				},
				{
					time: "2018-03-12",
					data: []
				},
				{
					time: "2018-03-12",
					data: []
				},
				{
					time: "2018-03-12",
					data: []
				},
				{
					time: "2018-03-12",
					data: []
				}
			]
		}]
	}]

}

var dailyPostReportMethods = {
	loadData(item, callback) {
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

	,
	onDeparmentCascaderChangeHandler(labels, selectedData) {
		var deparmentId = selectedData[selectedData.length - 1].value;
		setDeparmentId(this, deparmentId);
		//	    showTips(deparmentId);
		if(currentSelectTabType == TYPE_POLICE) {
			updateCurrentMembersData(deparmentId);
		} else if(currentSelectTabType == TYPE_VEHICLE) {
			updateCurrentVehiclesData(deparmentId);
		} else if(currentSelectTabType == TYPE_EQUIPMENT) {
			updateCurrentEquipmentsData(deparmentId);
		}
	},
	onPostTreeNodeSelected(arrNode) {
		if(arrNode[0].children) return;
		var arrPostId = [{
			id: arrNode[0].barrierid
		}];
		addPostToCurrentDutyList(arrPostId);
		updateCurrentPostHistoryMemberData();
	},
	removeReportEquipmentItem(event) {
		this.currentDutyList
	},
	removReportPoliceItem(event) {
		if(event){
			debugger;
			var tagIndex = $(event.target).parents(".reportedPolice-tag").index();
			var dailyGrid = $(event.target).parents(".teamMemberContainer");
			var postIndex = dailyGrid.attr("postIndex"),
				bcIndex = dailyGrid.attr("bcIndex"),
				dayIndex = dailyGrid.attr("dayIndex");
		}
		deletePoliceTagData(postIndex, bcIndex, dayIndex, [tagIndex]);
		
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
function ajaxGetDatas(url, dataObj, successCallback, contentType) {
	$.ajax({
		type: "post",
		url: url,
		async: true,
		data: dataObj,
		contentType: contentType ? contentType : 'application/json',
		//		dataType: 'json',
		success: function(res) {
			successCallback(res);
		},
		error: function(err) {
			console.log("ajax request Error: -----url=" + url);
		}
	});
}

/*
 *	历史排班人员
 * 
 * */
/*function updateHistoryMembersData(){
//	var url = "http://192.168.0.181:8080/barrierReport/getHistoryReport.do";
	var url = BASEPATH + "/barrierReport/getHistoryReport.do";
	var dataObj = {
		barrierId:[],//单位ID
		type:'police'
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setHistoryMembersData);
}
function setHistoryMembersData(result){
	if(result){
		var tempHistoryMembers = [];
		
		for(var i=0; i<result.data.length; i++){
			var obj = result.data[i];
			tempHistoryMembers.push({
				name: obj.name,
				id:  obj.id,
				type: "police",
				equipment: []
			});
		}
		
		dailyPostReportVue.historyMembers = tempHistoryMembers;
	}
}*/

/*
 *	人员列表
 * 
 * */
function updateCurrentMembersData(deparmentId) {
	//	var url = "http://192.168.0.109:8090/police/api/getReportPoliceList";
	var url = BASEPATH + "/police/api/getReportPoliceList";
	var dataObj = {
		isLeader: 0,
		mainUnit: deparmentId ? deparmentId : "",
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
			tempCurrentMembers.push({
				name: obj.policeName,
				id: obj.id,
				type: "police",
				equipment: []
			});
		}
		dailyPostReportVue.currentMembers = tempCurrentMembers;
	}
}
/*
 *	车辆列表
 * 
 * */
function updateCurrentVehiclesData(deparmentId) {
//	var url = "http://192.168.0.109:8090/equipment/getReportEquipmentList.do";
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
	if(result) {
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
//	var url = "http://192.168.0.109:8090/equipment/getReportEquipmentList.do";
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
	if(result) {
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

/*
 * 岗位列表
 * 
 * */

function updatePostListMembersData() {
//	var url = "http://192.168.0.117:8080/barrier/getBarrierByDept.do";
	var url = BASEPATH + "/barrier/getBarrierByDept.do";
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

/*
 * arrPost ： 岗位ID数组, [{"id":"72c4335a-313b-4e21-b219-0cf25411c952"},{"id":"61881ee6-7cd5-4579-8da0-bc54cf93be7f"}]
 * startDaily: '2018-03-13'
 * */
function updateWeekListData(arrPost, startDaily) {
	//	var url = "http://192.168.0.181:8080/barrier/getBarrierByDept.do";
	var url = BASEPATH + "/barrier/getBarrierByDept.do";

	var dataObj = {
		barrierListJSON: JSON.stringify(arrPost),
		reportBeginDate: JSON.stringify(startDaily)
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setWeekListData);
}

function setWeekListData(result) {
	dailyPostReportVue.currentDutyList = result;
}

function setWeekListTitle(arrWeek) {
	dailyPostReportVue.currentWeek = arrWeek;
}

/*
 
 * policeItems: 要报备的人或车辆数组
 * {
 * 	type: "",
 * }
 * dailyGrid： 要报备的日期班次格对象数据 
 * {
 * 	bcName: "",
 * 	bcTarget: 1
 * }
 * */
function addPoliceItemToCurrentDutyList(policeItems, dailyGrid) {
	var arrPolice = [];
	for(var j = 0; j < policeItems.length; j++) {
		var policeItem = policeItems[j];
		arrPolice.push({
			type: policeItem.type,
			name: policeItem.name,
			id: policeItem.id,
			isCaption: "false",
			equipment: policeItem.equipment
		})
	}
	var postIndex, bcIndex, dayIndex;
	if(dailyGrid) {
		postIndex = dailyGrid.postIndex;
		bcIndex = dailyGrid.bcIndex;
		dayIndex = dailyGrid.dayIndex;
	}

	if(!dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data || dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data.length == 0) {
		dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex]['data'] = arrPolice;
	} else {
		for(var i = 0; i < arrPolice.length; i++) {
			dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data.push(arrPolice[i]);
		}
	}
}

function deletePoliceTagData(postIndex, bcIndex, dayIndex, arrTagIndex) {
	if(!dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data || dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data.length == 0) {
	} else {
		for(var i = 0; i < arrTagIndex.length; i++) {
			dailyPostReportVue.currentDutyList[postIndex].bc[bcIndex].data[dayIndex].data.splice(arrTagIndex[i], 1);
		}
	}
}



/*function deletePoliceTagData(tagId) {
	for(var i = 0; i < dailyPostReportVue.currentDutyList; i++) {
		var dutyListItem = dailyPostReportVue.currentDutyList[i];
		for(var ii = 0; ii < dailyPostReportVue.currentDutyList[i].bc; ii++) {
			for(var iii = 0; iii < dailyPostReportVue.currentDutyList[i].bc[ii].data; iii++) {
				for(var iiii = 0; iiii < dailyPostReportVue.currentDutyList[i].bc[ii].data[iii].data; iiii++) {
					if(tagId == dailyPostReportVue.currentDutyList[i].bc[ii].data[iii].data[iiii].tagId){
						var target = dailyPostReportVue.currentDutyList[i].bc[ii].data[iii].data[iiii];
						dailyPostReportVue.currentDutyList[i].bc[ii].data[iii].splice(target.index())
					}
				}
			}
		}
	}

}*/

function addPostToCurrentDutyList(arrPostId) {
	var url = BASEPATH + "/barrierReport/getBarrierReportMsg.do";
	//	var url = "http://192.168.0.109:8090/barrierReport/getBarrierReportMsg.do";
	var day = getFirstDailyOfCurrentWeek();
	var cmonth = day.getMonth() < 10 ? '0' + day.getMonth() : day.getMonth();
	var cday = day.getDate() < 10 ? '0' + day.getDate() : day.getDate();
	var strDay = day.getFullYear() + '-' + cmonth + '-' + cday;
	//	var strendDay = 
	var dataObj = {
		reportBarrierIdList: "0b871922-d69c-45c2-b49a-43225fc30a04",
		reportBegin: "2018-03-05",
		reportEnd: "2018-03-11"
	};

	debugger
	/*var dataObj = {
		barrierListJSON:JSON.stringify(arrPostId),
		reportBeginDate:JSON.stringify(strDay)
	};*/
	ajaxGetDatas(url, dataObj, setNewPostDataToCurrentDutyList);
	//	ajaxGetDatas(url, JSON.stringify(dataObj), setNewPostDataToCurrentDutyList, "application/x-www-form-urlencoded");
}

function setNewPostDataToCurrentDutyList(result) {
	debugger;
	//	dailyPostReportVue.currentDutyList.push();
}

function updateCurrentPostHistoryMemberData() {
	var url = BASEPATH + "/barrierReport/getHistoryReport.do";
	var arrCurrentPost = [];
	for(var i = 0; i < dailyPostReportVue.currentDutyList.length; i++) {
		var obj = dailyPostReportVue.currentDutyList[i];
		arrCurrentPost.push(obj.postId);
	}
	var dataObj = {
		barrierId: arrCurrentPost,
		type: currentSelectTabType
	};
	ajaxGetDatas(url, JSON.stringify(dataObj), setCurrentPostHistoryMemberData);
}

function setCurrentPostHistoryMemberData(result) {
	if(result) {
		if(currentSelectTabType == TYPE_POLICE) {
			var tempHistoryMembers = [];
			for(var i = 0; i < result.data.length; i++) {
				var obj = result.data[i];
				tempHistoryMembers.push({
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