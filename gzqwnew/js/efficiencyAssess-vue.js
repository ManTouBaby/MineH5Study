
var tempShiJuList = [{
		departmentId: "44010000001",
		departmentName: "广州市公安局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	},{
		departmentId: "44010000000",
		departmentName: "天河区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "70%",
		abnormalList: [{
			departmentName: "",
			type: "报备",
			total: 3,
			text: ''
		}]
	}, {
		departmentId: "44010000001",
		departmentName: "白云区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "95%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "越秀区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	},  {
		departmentId: "44010000001",
		departmentName: "海珠区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "78%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "荔湾区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "68%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "番禺区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "89%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "增城区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "72%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "花都区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "从化区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "黄埔区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "公共交通分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "食品药品与环境犯罪侦察支队侦察支队",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	}]












var vueData = {
	dutyData: {
		isTopLevel: true,
		total: 10,
		list: tempShiJuList,
		subordinateList: []
	},
	currentDepartment:{
		departmentId: '',
		departmentName:'广州市公安局',
		isLastLevel:'',
		isAbnormals:''
		
	}
}

var vueMethods = {
	viewDepartMentDetail(departmentItem) {
		this.currentDepartment.departmentId = departmentItem.departmentId;
		this.currentDepartment.departmentName = departmentItem.departmentName;
		this.currentDepartment.isLastLevel = departmentItem.isLastLevel;
		this.currentDepartment.isAbnormal = departmentItem.isAbnormal;
	}
	,getSubordinateList(departmentItem) {
		event.stopPropagation();
		event.preventDefault();
		if(departmentItem.isLastLevel){
			this.goToSubordinatePage(departmentItem);
		}else{
			this.dutyData.list = tempTianHeList;
			this.viewDepartMentDetail(departmentItem);
		}
	}
	,backToPrevLevel() {
		this.dutyData.list = tempShiJuList;
		this.dutyData.isTopLevel = false;
	}
	,goToSubordinatePage(departmentItem) {
		parent.iFrame2Page('pages/dynamicDuty-detail.html');
		
	}
}

var dynamicDutyVue = new Vue({
	el: "#main",
	data: vueData,
	methods: vueMethods

});



function getSubordinates(){}


$(function(){
	$.ajax({
		type:"post",
		url:BASEPATH + "/unitRest/getUnitListByParentId.do",
		async:true,
		data: {id: "440100000000"},
		beforeSend:function(request){
			request.setRequestHeader("Authorization",getCookieValue("xtoken"));
			request.setRequestHeader("Auth",getCookieValue("loginName"));
		},
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
		},
		error: function(err){
			console.log("-----------------"+err);
		}
	});
	
	setEchartLine();
	setEchartPie();
})

function setEchartPie(){
	var opt = {
		title:{show:false},
		legend: {
			show:false,
	        orient: 'vertical',
	        left: 'left',
	        data: ['民警','辅警']
	    },
		series:[
			{
				name: '警力警情比',
				type: 'pie',
				radius: "65%",
				center:["50%", "50%"],
				data: [
					{value: 2104, name: '警力'},
					{value: 2731, name: '警情'}
				]
			}
		]
	};
	var echartPie = echarts.init(xdoc.getElementById("echart-pie"));
	echartPie.setOption(opt);
}	
	
function setEchartLine(){
	var opt = {
		title:{show:false},
		legend: {show:false},
		xAsis:{
			type: 'category',
			boundaryGap: false,
			data:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
		},
		yAsis: {
			type: 'value',
			axislabel:{formatter: '{value}人'}
		},
		series:[
			{
				name: '警力',
				type: 'line',
				data: [200, 232,250,287,235, 110,99,200, 232,250,287,535,410,499,200, 232,250,287,235,310,699,300, 132,430,387,235,110,99]
			},
			{
				name: '警情',
				type: 'line',
				data: [200, 232,250,287,235, 410,599,200, 732,250,287,535,410,499,200, 232,150,287,235,610,699,200, 432,430,387,109,110,99]
			}
		]
	};
	
	var echartLine = echarts.init(xdoc.getElementById("echart-line"));
	echartLine.setOption(opt);
}


























var tempTianHeList = [{
		departmentId: "44010000000",
		departmentName: "林河西派出所",
		isLastLevel: true,
		isAbnormal: true, //是否有异常
		text: "30%",
		abnormalList: [{
			departmentName: "",
			type: "报备",
			total: 3,
			text: ''
		}]
	}, {
		departmentId: "44010000001",
		departmentName: "五山派出所",
		isLastLevel: true,
		isAbnormal: true, //是否有异常
		text: "50%",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "棠下派出所",
		isLastLevel: true,
		isAbnormal: false, //是否有异常
		text: "80%",
		abnormalList: []
	}

]
