//		var BASEPATH = "http://127.0.0.1:8080";
		var barrierWithClass ;
		var datePicker;
		var vm;
		$(function() {
			var barrierId = $.getUrlParam('barrierId');
			
			
			 ajaxGetDatas( BASEPATH + "/reportWatch/reportWatch/toBarrierWatchDetailByWeek.do", 
				 	{barrierId :barrierId}, function(data){
						barrierWithClass = data.data;
						if (barrierWithClass && barrierWithClass.classList && barrierWithClass.classList.length > 0) {
							barrierWithClass.classList[0].isFirstRow = true;
						}
						loadVM();
					},"application/x-www-form-urlencoded");
		})
		function loadVM(){
				vm = new Vue({
				el : "#mainSection",
				data : {
					firstDayDateStr : new Date().format("yyyy-MM-dd"),
					barrierWithClass : barrierWithClass,
					dateList : new Array(),
					reportedPoliceList : new Array()
				},
				methods : {
					getReprtedPolice : function() {
						$("#reportBox").showBoxLoadin();
						var barrierIdList = new Array();
						barrierIdList.push(vm.barrierWithClass.id);
						
						
				 ajaxGetDatas(BASEPATH + "/barrierReport/getReportedPeople.do",
				 	{barrierIdListJSON : JSON.stringify(barrierIdList),
					reportDateListJSON : JSON.stringify(vm.dateList)}, 
					function(data){
						vm.reportedPoliceList.clearArr();
								var reportedPoliceData = data.data;
								$("#reportBox").hideBoxLoadin();
								for (var i = 0; i < reportedPoliceData.length; i++) {
									var reportPolice = new Object();
									reportPolice.policeId = reportedPoliceData[i].policeId;
									reportPolice.policeName = reportedPoliceData[i].policeName;
									reportPolice.policeNum = reportedPoliceData[i].policeNum;
									reportPolice.policeType = reportedPoliceData[i].policeType;
									reportPolice.barrierId = reportedPoliceData[i].barrierId;
									reportPolice.barrierClassId = reportedPoliceData[i].barrierClassId;
									reportPolice.reportDate = reportedPoliceData[i].reportDate;
									reportPolice.barrierName = reportedPoliceData[i].barrierName;
									reportPolice.barrierClassName = reportedPoliceData[i].barrierClassName;
									reportPolice.equipmentList = reportedPoliceData[i].equipmentList;
									vm.reportedPoliceList.push(reportPolice);
								}
					},"application/x-www-form-urlencoded");
					},
					getOneWeekDayStr : function() {
						vm.dateList.clearArr();
						var d = new Date(vm.firstDayDateStr)
						vm.dateList.push(d.format("yyyy-MM-dd"));
						for (var i = 0; i < 6; i++) {
							d.setDate(d.getDate() + 1)
							vm.dateList.push(d.format("yyyy-MM-dd"));
						}
					},
					getDayOfWeekOfDate : function(dateStr) {
						var date = new Date(dateStr)
						return "星期" + dayOfWeekArr[date.getDay()];
					},
					openDatePicker : function() {
						datePicker.open();
					},
					doGoBack : function() {
						window.history.go(-1);
					}
				},
				watch : {
					firstDayDateStr : function() {
						vm.getOneWeekDayStr();
						vm.getReprtedPolice();
					}
				},
				mounted : function() {
					this.$nextTick(function() {
						datePicker = $("#datePicker").flatpickr({
							"locale" : "zh"
						});
						vm.getOneWeekDayStr()
						vm.getReprtedPolice();
					});
				}
			})
		}
