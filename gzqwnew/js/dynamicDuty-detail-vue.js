
//var BASEPATH = "http://127.0.0.1:8080";


var layerArr = ['list','zx','sq','sp','zdmb','sdfx'];
var pyflag =0;
var tableColumns = ["岗位名称", "岗位类型", "单位", "值班时间", "带队民警", "操作"];
var tableData = [
		{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		,{
            barrierName: '北京A1001',
            barrierType: '巡组',
            department: '越秀北京所',
            dutyTime: '08:00 - 12:00',
            captain: '张三'
        }
		
	]






var vueData = {
	//搜索-所属单位
	selectedDapartmentValue: '440100000000',
	departmentValue: ['440100000000'],//选择装备
    departmentData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
	
	//搜索-岗位类型
	barrierTypeValue : 'zx',
	barrierType:[
		{name:'岗位列表', value: 'list'},
		{name:'路面巡逻防控网', value: 'zx'},
		{name:'社区防控网', value: 'sq'},
		{name:'视频监控网', value: 'sp'},
		{name:'重点目标网', value: 'zdmb'},
		{name:'三道防线', value: 'sdfx'}
	],
	
	//搜索-异常类型
	abnormalTypeValue: '1',
	abnormalType: [
		{name:'报备异常', value: '1'},
		{name:'执勤异常', value: '2'},
		{name:'警力异常', value: '3'}
	],
	
	leaderTableColumns:tableColumns,
	leaderTableData: tableData,
	
	roadTableColumns:tableColumns,
	roadTableData: tableData,
	
	reserveTableColumns:tableColumns,
	reserveTableData: tableData,
	
	taskTableColumns:tableColumns,
	taskTableData: tableData,
	
	currentTableData : 'zbld',
	
	mapDepartmentValue: "",
	

}

var vueMethods = {
	loadData (item, callback) {
        item.loading = true;
    	$.ajax({
			type:"post",
			url:BASEPATH + "/unitRest/getUnitListByParentId.do",
			async:true,
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
	,selectDepartment(labels, selectedData){
		thisselectedDapartmentValue = selectedData[selectedData.length - 1].value;
	}
	,newTask(){
		parent.iFrame2Page("pages/newTask.html");
	}
	,selectMapDepartment(labels, selectedData){
		if(selectedData!=null&&selectedData!=undefined&&selectedData!=''){
					var unitId = selectedData[selectedData.length - 1].value;
					loadjyLayer(unitId);
					loadDyLayer(unitId);
			}
	}
	,selectBarrierType (name){
		if(name!=null&&name!=""&&name!=undefined){
			for(var j=0;j<dynamicDutyDetailVue.barrierType.length;j++){
				var vale = dynamicDutyDetailVue.barrierType[j].value;
				if(vale==name){
					$("#barrierButton")[0].innerText =dynamicDutyDetailVue.barrierType[j].name;
					break;
				}
			}
			var layer_temp = map.getLayer(name);
			if(layer_temp!=null){
				layer_temp.show();
			}
			for(var i=0;i<layerArr.length;i++){
				if(layerArr[i]!=name){
					var layer_temp1 = map.getLayer(layerArr[i]);
					if(layer_temp1!=null){
						layer_temp1.hide();
					}
				}
			}
		}
	},
	clickJy (name){
		if(pyflag==0){
				 $("#policeButton").css("color","black");
				 $("#policeButton").css("background-color","aliceblue");
				pyflag++;	
			}else{
				 $("#policeButton").css("color","white");
				 $('#policeButton').css('background-color', "rgb(45, 183, 245)");
				pyflag--;
			}
		var layer_temp = map.getLayer('jyLayer');
		if(layer_temp!=null){
			if(pyflag==0){
				layer_temp.hide();
				pyflag++;	
			}else{
				layer_temp.show();
				pyflag--;
			}
		}
	}
	,onTrack(policeItem){//跟踪
		getPoliceTrackData(policeItem);
	}
	,onDuBian(policeItem){
		getQwDuBainData(policeItem);
	}
}

var dynamicDutyDetailVue = new Vue({
	el: "#main",
	data: vueData,
	methods: vueMethods

});


$(function(){
	addBoxTitleTabChangeEventHandler();
	updateTableData(getCookieValue("xdeptId"), 'zbgw', null);
})



function addBoxTitleTabChangeEventHandler(){
	$(".box-title-tab .tab-item").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(this).parents(".box-tab").find(".box-tab-content").eq($(this).index()).addClass("active").siblings().removeClass("active");
		
		var barrierMould = 'zbgw';
		if($(this).text() =="领导"){
			barrierMould = 'zbgw';
		}
		else if($(this).text() =="路面"){
//			barrierMould = 'zx';
			barrierMould = 'xz';
		}
		else if($(this).text() =="备勤"){
			barrierMould = 'yjbq';
		}
		else if($(this).text() =="任务"){
			barrierMould = 'temporary';
		}
		
		
		updateTableData(getCookieValue("xdeptId"), barrierMould, null);
	});
}



function getPoliceTrackData(policeItem){
	var url = BASEPATH + "";
	var data = {
		policeId: policeItem.policeId,
		barrierId: policeItem.barrierId
	}
	
	if(layer){
		layer.open({
			type: 2,
			title: '勤务跟踪',
			shadeClose: true,
			shade: 0.8,
			area: ['500px', '600px'],
			content: "qwTrack.html"
		});
	}
	
//	ajaxGetDatas(url, data, setPolice)
}

function getQwDuBainData(policeItem){
	var url = BASEPATH + "";
	var data = {
		policeId: policeItem.policeId,
		barrierId: policeItem.barrierId
	}
	
	if(layer){
		layer.open({
			type: 2,
			title: '督办点名',
			shadeClose: true,
			shade: 0.8,
			area: ['960px', '600px'],
			content: "qwDubian.html"
		});
	}
	
//	ajaxGetDatas(url, data, setPolice)
}




function updateTableData(deptId, barrierMould, barrierName){
	var url = BASEPATH + "/policeState/getDynamicPolice.do";
	var data = {
		deptId: deptId,
		barrierMould: barrierMould,
//		barrierMould: 'zbgw',
		barrierName: barrierName,
		limit: 10,
		offset: 0
	}
	dynamicDutyDetailVue.currentTableData = barrierMould;
	ajaxGetDatas(url,JSON.stringify(data), setTableData);
}


function setTableData(res){
	switch(dynamicDutyDetailVue.currentTableData){
		case "zbgw":
			dynamicDutyDetailVue.leaderTableData = [];
		break;
		case "zx":
		case "xz":
			dynamicDutyDetailVue.roadTableData = [];
		break;
		case "yjbq":
			dynamicDutyDetailVue.reserveTableData = [];
		break;
		case "temporary":
			dynamicDutyDetailVue.taskTableData = [];
		break;
	}
	for(var i=0; i<res.rows.length; i++){
		var xrow = res.rows[i];
		var item = {
            barrierName: xrow.BARRIERNAME,
            barrierType:  xrow.BARRIERMOULDNAME,
            department:  xrow.DUTYUNITNAME,
            dutyTime: xrow.DUTYBEGIN + '-' + xrow.DUTYEND,
            captain: xrow.POLICENAME/*,
            policeId: xrow.POLICEID*/
        }
		switch(dynamicDutyDetailVue.currentTableData){
			case "zbgw":
				dynamicDutyDetailVue.leaderTableData.push(item);
			break;
			case "zx":
			case "xz":
				dynamicDutyDetailVue.roadTableData.push(item);
			break;
			case "yjbq":
				dynamicDutyDetailVue.reserveTableData.push(item);
			break;
			case "temporary":
				dynamicDutyDetailVue.taskTableData.push(item);
			break;
		}
	}
}








function setLeaderTable(result){
	if(result && result.data){
		var columns = tableColumns;
		var datas = [];
		
		for(var i=0; i<result.data.length; i++){
			var item = resutl.data[i];
			item.barrierName
			datas.push({
	            barrierName: item.barrierName,
	            barrierType: item.barrierType,
	            department: item.departmentName,
	            dutyTime: item.watchBegin+"-"+item.watchEnd,
	            captain: item.teamRoleName
	      });
		}
		dynamicDutyDetailVue.leaderTableColumns = columns;
		dynamicDutyDetailVue.leaderTableData = datas;
	}
}
