
var tempShiJuList = [{
		departmentId: "44010000001",
		departmentName: "广州市公安局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	},{
		departmentId: "44010000000",
		departmentName: "天河区分局",
		isLastLevel: false,
		isAbnormal: true, //是否有异常
		text: "3",
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
		isAbnormal: true, //是否有异常
		text: "5",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "越秀区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	},  {
		departmentId: "44010000001",
		departmentName: "海珠区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "荔湾区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "番禺区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "增城区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "花都区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "从化区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "黄埔区分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "公共交通分局",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "食品药品与环境犯罪侦察支队侦察支队",
		isLastLevel: false,
		isAbnormal: false, //是否有异常
		text: "正常",
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
})


























var tempTianHeList = [{
		departmentId: "44010000000",
		departmentName: "林河西派出所",
		isLastLevel: true,
		isAbnormal: true, //是否有异常
		text: "3",
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
		text: "5",
		abnormalList: []
	}, {
		departmentId: "44010000001",
		departmentName: "棠下派出所",
		isLastLevel: true,
		isAbnormal: false, //是否有异常
		text: "正常",
		abnormalList: []
	}

]
