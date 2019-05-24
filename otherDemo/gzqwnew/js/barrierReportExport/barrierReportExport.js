//		var BASEPATH = "http://127.0.0.1:8080";
		var barrierMouldList = "";
		var barrierList = "";
		var preViewVM;
		var watchBeginDate;
		var watchEndDate;
		$(function() {
			getBarrierData();
			initPreView();
			var watchBeginDate = new Date();
			var watchEndDate = new Date();
			watchEndDate.setDate(watchEndDate.getDate() + 6);
			preViewVM.watchBegin = watchBeginDate;
			preViewVM.watchEnd = watchEndDate;
			var dateGap = (preViewVM.watchEnd - preViewVM.watchBegin) / (3600000 * 24);
			var beginDate = new Date(preViewVM.watchBegin.format('yyyy-MM-dd').replace(/-/, "/"));
			for (var i = 0; i <= dateGap; i++) {
				if (preViewVM.dateList.length > 6) {
					preViewVM.isDateListOverShow = true;
					break;
				}
				preViewVM.dateList.push(beginDate.format('yyyy-MM-dd'));
				beginDate.setDate(beginDate.getDate() + 1);
			}
			$("#watchBegin").flatpickr({
				"locale" : "zh",
				defaultDate : watchBeginDate,
				onChange : function(selectedDates, dateStr, instance) {
					preViewVM.watchBegin = new Date(dateStr.replace(/-/, "/"));
					preViewVM.watchDateChange();
				}
			});
			$("#watchEnd").flatpickr({
				"locale" : "zh",
				defaultDate : watchEndDate,
				onChange : function(selectedDates, dateStr, instance) {
					preViewVM.watchEnd = new Date(dateStr.replace(/-/, "/"));
					preViewVM.watchDateChange();
				}
			});
		})
		
		function getBarrierData(){
			 ajaxGetDatas(BASEPATH+"/barrierReportExport/toReportBarrierExport.do", 
			 {}, function(data) {
					if (data) {
						barrierMouldList = data.data.barrierMouldList ;
						barrierList = data.data.barrierList;
					}
					getBarrierTree();
				})
		}
		
		function getBarrierTree() {
			if (!barrierMouldList || barrierMouldList.length <= 0) {
				return;
			}
			if (barrierList && barrierList.length > 0) {
				for (var i = 0; i < barrierList.length; i++) {
					barrierList[i].treeType = "barrier";
					barrierList[i].text = barrierList[i].barrierName
				}
			}
			for (var i = 0; i < barrierMouldList.length; i++) {
				barrierMouldList[i].treeType = "barrierMould";
				barrierMouldList[i].text = barrierMouldList[i].mouldName;
				barrierMouldList[i].state = "closed";
				for (var j = 0; j < barrierList.length; j++) {
					if (barrierList[j].barrierMouldId == barrierMouldList[i].id) {
						if (!barrierMouldList[i].children) {
							barrierMouldList[i].children = new Array();
						}
						barrierMouldList[i].children.push(barrierList[j]);
					}
				}
				easyloader.load('tree', function() {
					$("#barrierTree").tree({
						width : '100%',
						data : barrierMouldList,
						onLoadSuccess : function(node, data) {
							$("#barrierTree").tree('expandAll');
						},
						onClick : function(node) {
							if (node.treeType == "barrierMould") {
								return;
							}
							for (var i = 0; i < preViewVM.barrierWithClassList.length; i++) {
								if (preViewVM.barrierWithClassList[i].id == node.id) {
									return;
								}
							}
							
							ajaxGetDatas(BASEPATH + "/barrier/getBarrierWithClassInfo.do", 
							 {barrierId : node.id}, function(data) {
									if (data.data) {
										if (!data.data.classList || data.data.classList.length == 0) {
											$.showTipsModal("错误", "该岗位未设置班次，不可设置导出")
											return;
										}
										preViewVM.barrierWithClassList.push(data.data);
										getReportedPeople();
									}
								},"application/x-www-form-urlencoded")
						}
					});
				})
			}
		}
		function getReportedPeople() {
			preViewVM.getReportedPeople();
		}
		function doExportExcel() {
			preViewVM.doExportExcel();
		}
		function toggleModel() {
			if (preViewVM.modelType == 1) {
				preViewVM.modelType = 2
			} else if (preViewVM.modelType == 2) {
				preViewVM.modelType = 1
			} else {
				preViewVM.modelType = 1
			}
		}
		function initPreView() {
			preViewVM = new Vue({
				el : '#previewDiv',
				data : {
					modelType : 1,
					watchBegin : "2018-01-01",
					watchEnd : "2018-01-08",
					barrierWithClassList : new Array(),
					dateList : new Array(),
					isDateListOverShow : false,
					reportedPeopleList : new Array()
				},
				methods : {
					getDayOfWeekOfDate : function(dateStr) {
						var date = new Date(dateStr)
						return "星期" + dayOfWeekArr[date.getDay()];
					},
					watchDateChange : function() {
						preViewVM.isDateListOverShow = false;
						preViewVM.dateList = new Array();
						var dateGap = (preViewVM.watchEnd - preViewVM.watchBegin) / (3600000 * 24) + 1;
						var begindate = new Date(preViewVM.watchBegin.format('yyyy-MM-dd').replace(/-/, "/"));
						for (var i = 0; i <= dateGap; i++) {
							if (preViewVM.dateList.length > 6) {
								preViewVM.isDateListOverShow = true;
								break;
							}
							preViewVM.dateList.push(begindate.format('yyyy-MM-dd'));
							begindate.setDate(begindate.getDate() + 1);
						}
					},
					getReportedPeople : function() {
						var barrierIdList = new Array();
						for (var i = 0; i < preViewVM.barrierWithClassList.length; i++) {
							barrierIdList.push(preViewVM.barrierWithClassList[i].id);
						}
						ajaxGetDatas(BASEPATH + "/barrierReport/getReportedPeople.do", 
							 {barrierIdListJSON : JSON.stringify(barrierIdList),
								reportDateListJSON : JSON.stringify(preViewVM.dateList)}, 
								function(data) {
									preViewVM.reportedPeopleList.clearArr();
									if (data.data && data.data.length > 0) {
										for (var i = 0; i < data.data.length; i++) {
											preViewVM.reportedPeopleList.push(data.data[i])
										}
									}
								},"application/x-www-form-urlencoded")
						
					},
					doExportExcel : function() {
						var barrierIdList = new Array();
						for (var i = 0; i < preViewVM.barrierWithClassList.length; i++) {
							barrierIdList.push(preViewVM.barrierWithClassList[i].id);
						}
						if (barrierIdList.length == 0) {
							$.showTipsModal("错误", "您尚未选择任何岗位，无法输出排班表")
							return;
						}
						var param = {
							barrierIdList : JSON.stringify(barrierIdList),
							watchBegin : preViewVM.watchBegin.format("yyyy-MM-dd"),
							watchEnd : preViewVM.watchEnd.format("yyyy-MM-dd"),
							exportMode : "" + preViewVM.modelType
						}
						$.StandardPost(BASEPATH + "/barrierReportExport/exportBarrierReportExcel.do", param);
					},
					removeBarrier:function(barrierId){
						for(var i =0;i< preViewVM.barrierWithClassList.length;i++){
							if(preViewVM.barrierWithClassList[i].id == barrierId){
								preViewVM.barrierWithClassList.splice(i, 1);
								break;
							}
						}
					}
					
				},
				watch : {
					barrierWithClassList : function() {
						Vue.nextTick(function() {
							$(".tooltip").remove()
							$("[data-toggle='tooltip']").tooltip();
						});
					}
				}
			})
		}