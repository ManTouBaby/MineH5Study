
var tableData = [];
var homePageData = {
	isShowLevel: false,
	currentDate: getToday(),
	onDutyInfo: {
		today: "",
		currentDutyLeader: [
			{
				policeName: "张三",
				policeId: "056403",
				online: true
			}
		],
		currentDutyLeader2: [
			{
				policeName: "王五",
				policeId: "056403",
				online: true
			}
		],
		currentDutyPolice: [
			{
				policeName: "赵蓓",
				policeId: "056403",
				online: true
			},
			{
				policeName: "刘三三",
				policeId: "056403",
				online: false
			},
			{
				policeName: "柳风",
				policeId: "056403",
				online: true
			}
		],
		currentDutyGuard: [
			{
				policeName: "何大大",
				policeId: "056403",
				online: true
			},
			{
				policeName: "刘晓晓",
				policeId: "056403",
				online: true
			}
		],
		currentLeaveDuty: [
			{
				policeName: "张伟",
				policeId: "056403",
				online: true
			},
			{
				policeName: "李青青",
				policeId: "056403",
				online: true
			}
		],
	},
	qwLevelInfo: {
		today: "",
		currentLevel:"四级"
	},
	jlInfo: {
		today: "",
		reportJL: {
			total: 0,
			deparmentJL: tableData
		},
		realtimeJL:{
			total: 789
		}
	},
	staticSupervise: {//常态勤务督导
		list:[
			{
				departmentId: "44011111",
				departmentName: "天河区分局",
				abnormalNum: 6,
				qwLevel:"已落实",
				notRepoortNum: 5,
				policeErrorNum: 1
			},
			{
				departmentId: "4401111134",
				departmentName: "越秀区分局",
				abnormalNum: 3,
				qwLevel:"未落实",
				notRepoortNum: 3,
				policeErrorNum: 0
			},
			{
				departmentId: "44011111234",
				departmentName: "番禺区分局",
				abnormalNum: 1,
				qwLevel:"未落实",
				notRepoortNum: 0,
				policeErrorNum: 1
			}
		]
	},
	
	importantSuperviseContent: {//重点督导内容
		defaultExpand: ['1', '2', '3'],
		contentList: [
			{
				name: "1",
				title: "本单位未完成的勤务内容",
				textList: [
					{
						text: "视频岗未报备",
						link: "pages/barrierReport/dailyReport/dailyPostReport-new.html"
					}
				]
			},
			{
				name: "2",
				title: "下级单位异常的勤务",
				textList: [
					{
						text: "越秀警力异常，上岗勤务人数不足要求的50%",
						link: ""
					},
					{
						text: "天河勤务安排不合理，存在一人多岗问题",
						link: "pages/barrierReport/dailyReport/dailyPostReport-new.html"
					}
				]
			}
		]
	},
	
	
	showAllCurrentDutyInfo: false,
	leaveDutyPostText: "该警员已离岗"
	
	
	
	
}
var homePageMethods = {
	viewMoreDutyInfo(){
		openDutyInfoPopup();
	},
	viewMorQwLevel(){
		openQwLevelPopup();
		if(echartMap)
			echartMap.resize();
//		else
//			layer.msg("echartMap is null");
	},
	viewMorReportJL(){
		getStatisticsData(false);
	},
	viewMorRealtimeJL(){
		openRealTimeJLPopup();
	},
	gotoLink(link){
		
	}
	,viewDuDaoDetail(item){
		var url = item.link;
		if(url != "")
			parent.iFrame2Page(url);
	}
}



var homePageVue = new Vue({
	el: "#homePage",
	data: homePageData,
	methods: homePageMethods
});





function openDutyInfoPopup(){
	if(!layer){return;}
	layer.open({
		type: 1,
		title: '今天值班列表',
		shadeClose: true,
		shade: 0.8,
		area: ['500px', '400px'],
		content: $("#onDutyInfoPopup").html()
	});
}

function openReportJLPopup(){
	if(!layer){return;}
	layer.open({
		type: 1,
		title: '报备警力',
		shadeClose: true,
		shade: 0.8,
		area: ['800px', '600px'],
		content: $("#reportJLPopup").html()
	});
}

function openQwLevelPopup(){
	if(!layer){return;}
	layer.open({
		type: 2,
		title: '等级勤务详情',
		shadeClose: true,
		shade: 0.8,
		area: ['960px', '600px'],
//		content: $("#qwLevelPopup").html(),
		content: "welcomePage-new-qwLevelPopup.html"
	});
}

function openRealTimeJLPopup(){
	if(!layer){return;}
	layer.open({
		type: 2,
		title: '报备警力',
		shadeClose: true,
		shade: 0.8,
		area: ['960px', '600px'],
		content: "pages/statistics/dutyStatistics-popup.html"
	});
}


function initQWLevelEchartMap(){
	var optionSSDT = {
		title : {
			text : '广州市勤务等级',
			left : 'center',
			textStyle : {
				color : '#fff'
			},
			top : "3%"
		},
		series : [ {
			name : '勤务等级',
			type : 'map',
			aspectScale : 1,
			mapType : '广州市',
			roam : false,
			itemStyle : {
				normal : {
					areaColor : 'rgb(6,214,160)',
					label : {show:true}
				},
				emphasis : {
					areaColor : '#3498db',
					shadowBlur : 10,
					shadowColor : '#2980b9',
					opacity : 0.5
				}
			},
			label : {
				normal : {
					show : true,
					textStyle : {
						color : '#fff',
						fontWeight : 'normal',
						fontSize : '12'
					}
				},
				emphasis : {
					show : true,
					textStyle : {
						color : '#fff',
						fontWeight : 'bold',
						fontSize : '20'
					}
				}
			}
		}]
	};
	echartMap = setEchart("qwLevelMap", optionSSDT);
}
var echartMap;
function setEchart(id, option) {
	var myChart = echarts.init(document.getElementById(id));
	myChart.setOption(option);
	return myChart;
}


var fourColor = ['rgb(6,214,160)','rgb(255,209,102)','rgb(255,100,0)','rgb(255,0,0)'];
var qwLevelData = [{
	"天河":12500,
	"越秀":3000,
	"荔湾":5000,
	"白云":2000,
	"从化":7000,
	"增城":1000,
	"花都":7000,
	"南沙":8000,
	"番禺":4000,
	"黄埔":6000,
	"海珠":6000
},{
	"天河":1000,
	"越秀":2000,
	"荔湾":3000,
	"白云":4000,
	"从化":5000,
	"增城":6000,
	"花都":7000,
	"南沙":8000,
	"番禺":4000,
	"黄埔":6000,
	"海珠":6000
}]



function updateQWLevelEchartMapData(echartMap){
//	var data={TimeType:TimeType};
//	url= +"Jqcase/queryJqcaseNumberGroupByDept.do";
//	$.post(url,data,function(res){
	
	var res = qwLevelData;
	var values = new Array();
	//console.log(res);		
		for (var param in res[1]) {
			var obj4map = {
				name : '',
				value : '',
				itemStyle : {
					normal : {
						areaColor : ''
					},
					emphasis : {
						areaColor : '#3498db',
						shadowBlur : 10,
						shadowColor : '#2980b9',
						opacity : 0.5
					}
				}
			};
			obj4map.name = param;
			obj4map.value = parseInt(res[1][param]);
			var oldvalue= res[0][param];
			var flag=obj4map.value / oldvalue;
			if (flag<=1)
				obj4map.itemStyle.normal.areaColor = fourColor[0];
			else if (flag<=1.2)
				obj4map.itemStyle.normal.areaColor = fourColor[1];
			else if(flag<=1.5)
				obj4map.itemStyle.normal.areaColor = fourColor[2];
			else
				obj4map.itemStyle.normal.areaColor = fourColor[3];
			values.push(obj4map);
		}
		echartMap.setOption({
			series : [ {
				name : '勤务等级',
				type : 'map',
				aspectScale : 1,
				mapType : '广州市',
				roam : false,
				data : values
				
			} ]
		});

}


$(function(){
	/*initQWLevelEchartMap();
	
	updateQWLevelEchartMapData(echartMap);*/
	
	getStatisticsData(true);
	$(".abnormal-box").mouseover(function(e){
		e.stopPropagation();
		$(this).find(".behind").stop().slideDown(200);
	});
	$(".abnormal-box").mouseout(function(e){
		e.stopPropagation();
		$(this).find(".behind").stop().slideUp(200);
	});
})


function getStatisticsData(flag){
	tableData = [];
	ajaxGetDatas(BASEPATH+"/statistics/reportPoliceStatisticsAdmin.do",
 	{unitId:getCurrentUserId()}, function(data){
		if (data) {
			var allUnitCount = 0 ;
			for(var i=0;i<data.data.length;i++){
				if(i==0){
					allUnitCount += parseInt(data.data[i].all);
				}
				if(data.data[i].type != '1'){
						continue;
				}
				var ddata = {};
				ddata = {
					deparmentName:data.data[i].deptname,
					dutyMJCount: data.data[i].zbllMj,
					dutyFJCount: data.data[i].zbllFj,
					dutyAllCount : data.data[i].zbllAll,
					shmMJCount: data.data[i].shmMj,
					shmFJCount: data.data[i].shmFj,
					shmAllCount : data.data[i].shmAll,
					yjbqMJCount: data.data[i].yybqMj,
					yjbqFJCount: data.data[i].yybqFj,
					yjbqAllCount: data.data[i].yybqAll,
					allCount : data.data[i].all,
					unitId :data.data[i].unitId
				}
				tableData.push(ddata);
			}
			homePageVue.jlInfo.reportJL.deparmentJL = tableData;
			homePageVue.jlInfo.reportJL.total = allUnitCount;
		}
		if(!flag){
			setTimeout(function(){
				openReportJLPopup();
			},200);
		}
	},"application/x-www-form-urlencoded");
}
