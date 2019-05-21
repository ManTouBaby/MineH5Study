var barrierVM;
var barrierMouldType;
var barrierMouldName;
var barrierMouldId;
var barrierId;
var viewflag;
$(document).ready(function() {
		barrierMouldType = $.getUrlParam('barrierMouldType');
		barrierMouldName = $.getUrlParam('barrierMouldName',true);
		barrierMouldId = $.getUrlParam('barrierMouldId');
		barrierId = $.getUrlParam('barrierId');
		viewflag = $.getUrlParam("viewflag");
		
		if(barrierMouldType!=null&&barrierMouldType!=""&&barrierMouldType!=undefined){
			$("#barrierMould").val(barrierMouldType);
		}
		if(barrierMouldId!=null&&barrierMouldId!=""&&barrierMouldId!=undefined){
			$("#barrierMouldId").val(barrierMouldId);
		}
		if(barrierMouldName!=null&&barrierMouldName!=""&&barrierMouldName!=undefined){
			$("#barrierMouldName").val(barrierMouldName);
		}
		
			barrierVM = new Vue({
						el : '#barrierInfo',
						data : {
							barrier : {},
							barrierFieldList : [],
							barrierClassList : [],
							barrierScheduleList : [],
							barrierDataList : [],
							
							defaultGzJigou: ['440100000000'],
							defaultGzJigou1: ['440100000000'],
						    gzJigouData: [
						        {
						            value: '440100000000',
						            label: '广州市公安局',
						            children: [],
						            loading: false
						        }
						    	]
						},
						methods : {
							loadData (item, callback) {
								      getUnitTreeComnbo(item, callback);
								   },
							setMainUnitValue (labels, selectedData) {
								if(barrierId!=''&&barrierId!=null&&barrierId!=undefined){
									setVmValue(labels,selectedData,"mainUnit",barrierVM.barrier);
								}else{
									setValue(labels, selectedData,"mainUnit");
								}
							},
							setDutyUnitValue (labels, selectedData) {
								if(barrierId!=''&&barrierId!=null&&barrierId!=undefined){
									setVmValue(labels,selectedData,"dutyUnit",barrierVM.barrier);
								}else{
									setValue(labels, selectedData,"dutyUnit");
								}
							}
						}
				});
			$("#effectiveBegin").flatpickr({
				"locale" : "zh"
			});
			$("#effectiveEnd").flatpickr({
				"locale" : "zh"
			});
		});
		
		//加载所有数据
		function getBarrier(){
			 ajaxGetDatas( BASEPATH + "/barrier/getBarrierInfo.do",
				 	 {barrierId:barrierId}, function(data){
						if (data.data) {
						barrierVM.barrier = data.data.barrier;
						barrierVM.barrierFieldList = data.data.barrierMouldField;
						barrierVM.barrierClassList = data.data.barrierclass;
						barrierVM.barrierScheduleList = data.data.barrierSchedule;
						barrierVM.barrierDataList = data.data.barrierMouldData;
						barrierVM.defaultGzJigou = [data.data.barrier.mainUnit];
						if(viewflag=='edit'){
							$("#mainUnit").find('.ivu-cascader-label')[0].innerHTML=data.data.barrier.mainUnitName;
							$("#dutyUnit").find('.ivu-cascader-label')[0].innerHTML=data.data.barrier.xlDeptName;
						}
						var geometry ={};
						geometry.point = data.data.barrier.pointInfo;
						geometry.geometry = data.data.barrier.addressType;
						cograph(geometry);
						loadSchdule();
					}
					},"application/x-www-form-urlencoded");
		}
		
		//加载班次数据
		function loadSchdule(){
			if (typeof(barrierVM.barrierClassList)!=null && typeof(barrierVM.barrierClassList)!=null) {
			 	for (var i = 0; i < barrierVM.barrierClassList.length; i++) {
					var row = addBarrierClass();
						$(row).find(".scheduleType").val(barrierVM.barrierClassList[i].classType);
						$(row).find(".scheduleTypeID").val(barrierVM.barrierClassList[i].classType);
						$(row).find(".scheduleTypeNAME").val(barrierVM.barrierClassList[i].className);
						$(row).find("#mjCount").val(barrierVM.barrierClassList[i].mjCount);
						$(row).find("#classId").val(barrierVM.barrierClassList[i].id);
						$(row).find("#barrierId").val(barrierVM.barrierClassList[i].barrierId);
						$(row).find("#id").val(barrierVM.barrierClassList[i].id);
						$(row).find(".watchBegin").val(barrierVM.barrierClassList[i].watchBegin);
						$(row).find(".watchEnd").val(barrierVM.barrierClassList[i].watchEnd);
						for (var j = 0; j < barrierVM.barrierScheduleList.length; j++) {
							if (barrierVM.barrierClassList[i].id==barrierVM.barrierScheduleList[j].classId) {
								var col  = addTime(row,true);
								$(col).find("#classId").val(barrierVM.barrierScheduleList[j].classId);
								$(col).find("#barrierId").val(barrierVM.barrierScheduleList[j].barrierId);
								$(col).find(".watchBegin").val(barrierVM.barrierScheduleList[j].watchBegin);
								$(col).find(".watchEnd").val(barrierVM.barrierScheduleList[j].watchEnd);
								$(col).find(".isOverDay").val(barrierVM.barrierScheduleList[j].isOverDay);
								$(col).find(".isOverDayID").val(barrierVM.barrierScheduleList[j].isOverDay);
							}
						}
				}  
			}
		} 		
		
		//加载自定义表格
		function loadFields(){
			
			ajaxGetDatas(  BASEPATH + "/barrier/getBarrierField.do",
				 	 {barrierMouldId : barrierMouldType}, function(data){
						if (data.data) {
						barrierVM.barrierFieldList = data.data;
					}
					},"application/x-www-form-urlencoded");
		}
		//增加班次
		var randomNumList = new Array();
		function addBarrierClass() {
			var row = $("#barrierClassRow").clone();
			var randomNum = Math.floor(Math.random () * 900) + 100;
			var flag = false;
			while(!flag){
				if($.inArray(randomNum, randomNumList)==-1){
					flag=true;
					randomNumList.push(randomNum);
				}else{
					randomNum = Math.floor(Math.random () * 900) + 100;	
				}
			}  
			$(row).find("#scheduleType").attr("id","scheduleType"+randomNum);
			$(row).find("#scheduleTypeID").attr("id","scheduleType"+randomNum+"ID");
			$(row).find("#scheduleTypeNAME").attr("id","scheduleType"+randomNum+"NAME"); 
			$(row).find("#watchBegin").attr("id","watchBegin"+randomNum);
			$(row).find("#watchEnd").attr("id","watchEnd"+randomNum);
			row.removeAttr("id");
			$(row).hide();
			$("#barrierClassContainer").append(row);
			$(row).show(400);
			setTimeout(function() {
			$("#scheduleType"+randomNum).comboDictionary("scheduleType");
				$("#watchBegin"+randomNum).flatpickr({
					enableTime: true,
					noCalendar:true,
			        locale: "zh",
			        minuteIncrement: 1,
			        time_24hr: true
				});
				$("#watchEnd"+randomNum).flatpickr({
					enableTime: true,
					noCalendar:true,
			        locale: "zh",
			        minuteIncrement: 1,
			        time_24hr: true
				});
			}, 400);
			return row;
		}
		
		/**
		 * 删除班次
		 */
		function delBarrierClass(obj) {
			$(obj).parents(".row").remove();
		}
		
		/**
		 * 增加时间
		 */
		function addTime(obj,timeFlag) {
			var prow  = $(obj).parents(".row");
			if (timeFlag) {
				prow = obj;
			}
			var scheduleType = $(prow).find(".scheduleType").val();
			var scheduleTypeName = $(prow).find(".scheduleTypeNAME").val();
			var mjCount = $(prow).find("#mjCount").val();
			if (scheduleType==''||scheduleType==null||scheduleType==undefined) {
				$.showConfirmModal({
					title : "提示",
					msg : "请先选择班次类型，再添加时间段"
				});
				return;
			}
			var row = $("#colAdd").clone();
			var randomNum = Math.floor(Math.random () * 900) + 100;
			var flag = false;
			while(!flag){
				if($.inArray(randomNum, randomNumList)==-1){
					flag=true;
					randomNumList.push(randomNum);
				}else{
					randomNum = Math.floor(Math.random () * 900) + 100;	
				}
			}
			$(row).find("#scheduleType").val(scheduleType);
			$(row).find("#scheduleTypeID").val(scheduleType);
			$(row).find("#mjCount").val(mjCount);
			$(row).find("#watchBegin").attr("id","watchBegin"+randomNum);
			$(row).find("#watchEnd").attr("id","watchEnd"+randomNum);
			$(row).find("#isOverDay").attr("id","isOverDay"+randomNum);
			$(row).find("#isOverDayID").attr("id","isOverDay"+randomNum+"ID");
			row.removeAttr("id");
			$(row).hide();
			prow.append(row);
			$(row).show(400);
			setTimeout(function() {
				if (timeFlag) {
				$("#isOverDay"+randomNum).comboDictionary("notOrIs");
				}else{
				$("#isOverDay"+randomNum).comboDictionaryAndSelectedFirst("notOrIs");
				}
				$("#watchBegin"+randomNum).flatpickr({
					enableTime: true,
					noCalendar:true,
			        locale: "zh",
			        minuteIncrement: 1,
			        time_24hr: true
				});
				$("#watchEnd"+randomNum).flatpickr({
					enableTime: true,
					noCalendar:true,
			        locale: "zh",
			        minuteIncrement: 1,
			        time_24hr: true
				});  
			}, 500);
			return row;
		}
		/**
		 * 删除事件
		 */
		function delTime(obj) {
			$(obj).parents(".colAdd").remove();
		}
		
		
		
		
	/***********************************保存方法******************************************/
		function doValidate(flag) {
			var msg = "新建";
			if(flag=='update'){
				msg = "更新";
			}
			var isPassValidate = $("#mainForm").validateForm();
			if (!isPassValidate) {
				$.showConfirmModal({
					title : "有消息未填写",
					msg : "您有必填项未填写。请检查后提交"
				})
				return;
			}
			$.showConfirmModal({
				title : "确认提交",
				msg : "您确认提交该岗位"+msg+"吗？",
				yes : function() {
					doSaveNew(flag);
				}
			})
		}
		function doSaveNew(flag) {
			var msg = "保存成功,您是否要继续添加岗位?";
			var ourl =  "barrierDoNew.html?barrierType=" + barrierMouldType;
			if(flag=='update'){
				msg = "更新成功";
				ourl =   "barrierAdmin.html";
			}
			$.hideConfirmModal();
			
			ajaxGetDatas(  BASEPATH + "/barrier/doSaveBarrier.do",
				 	 $("#mainForm").serialize(), function(data){
						setTimeout(function() {
						$.showConfirmModal({
							title : "保存成功",
							msg : msg,
							yes : function() {
								window.location.href = ourl;
							},
							no : function() {
								window.location.href = "barrierAdmin.html";
							}
						})
						}, 500)
					},"application/x-www-form-urlencoded");
		}
		
