

var tempMemberList = [
	{key: "1", label: "张三", description: "", disabled: false},
	{key: "2", label: "张三", description: "", disabled: false},
	{key: "3", label: "张三", description: "", disabled: false},
	{key: "4", label: "张三", description: "", disabled: false},
	{key: "5", label: "张三", description: "", disabled: false}
]




var vueData = {
	taskName: "",
	mainUnit: "",
	mainUnitName: "",
	xlDept: "",
	xlDeptName: "",
	remark: "",
	address: "",
	pointInfo:{},
	deptId:"",
	watchBegin:"",
	watchEnd:"",
	deptId:"",
	
	mainUnitList: [],
	xlDeptList: [],
	
	
	showMap: false,
	
	memberList: [],
	targetKeys: [],
	
	
	selectedMemberList:[],
	showSelectMember: false,
	isOpenTransfer: false,
	
	defaultGzJigou: ['440100000000'],//选择人员
    gzJigouData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
    formValidate:{
    	name:'', address:'', dept:'', date: ''
    },
    ruleValidate: {
    	name: [{required: true, message:""}],
    	address: [{required: true, message:""}],
    	dept: [{required: true, message:""}],
    	date: [{required: true, message:""}]
    }
    
    
	
};
var vueMethods = {
	loadData (item, callback) {
        item.loading = true;
        
        /*var url = BASEPATH + "/unitRest/getUnitListByParentId.do";
        var data = {id: item.value};
        ajaxGetDatas(url, data, this.loadDataSuccess);*/
        
    	$.ajax({
			type:"post",
			url:BASEPATH + "/unitRest/getUnitListByParentId.do",
			async:true,
			data: {id: item.value},
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
				item.children = arrChildren;
				item.loading = false;
				callback();
			},
			error: function(err){
				console.log("-----------------"+err);
			}
		});
    }
	,loadDataSuccess(res){
		
	}
	,onDeparmentCascaderChangeHandler(labels, selectedData){
		var deparmentId = selectedData[selectedData.length - 1].value;
		updateCurrentMembersData(deparmentId);
	}
	
	,drawMap(){
		this.showMap = true;
		loadMap();
	}
	,finishDrawMap(){
		this.showMap = false;
	}
	
	,getMemberList(){
		
	}
	,openMenberSelecter(){
		this.isOpenTransfer = true;
		this.showSelectMember = true;
	}
	,setMainUnit(labels, selectedData){
		this.mainUnit = selectedData[selectedData.length - 1].value;
		this.mainUnitName = selectedData[selectedData.length - 1].label;
	}
	,setXlDept(){
		this.xlDept = selectedData[selectedData.length - 1].value;
		this.xlDeptName = selectedData[selectedData.length - 1].label;
	}
	,deleteMember(item){
		for(index in this.selectedMemberList){
			var member = this.selectedMemberList[index];
			if(member.name == item.name && member.policeId == item.policeId){
				this.selectedMemberList.splice(index, 1);
			}
		}
	}
	,selectAMember(item){
		if(dynamicDutyDetailVue.selectedMemberList.length>0){
			for(index in this.selectedMemberList){
				var member = this.selectedMemberList[index];
				if(member.name == item.name && member.policeId == item.policeId){
					this.$Message.info("成员已存在");
					return;
				}
			}
		}
		this.selectedMemberList.push(item);
	}
	,saveNewTask(){
//		var xtoken = getCookieValue("xtoken");
		this.deptId = getCookieValue('xdeptId');
		
		var url = BASEPATH + "/barrierReport/doSaveTemporaryBarrierReport.do";
		var barrierInfo = {
			"barrierName": this.taskName,
		    "barrierMould": "temporary",
		    "barrierMouldName": "临时任务",
		    "mainUnit": this.mainUnit,
		    "mainUnitName": this.mainUnitName,
		    "xlDept": this.xlDept,
		    "xlDeptName": this.xlDeptName,
		    "remark": this.remark,
		    "address": this.address,
		    "groupId":"",
		    "deptId" :this.deptId,//用户ID
		    "systemId":"gzqw",
		    "schedule": {
		        "classType": "ls",
		        "className": "临时",
		        "watchBegin": getDateTime(this.watchBegin),
		        "watchEnd": getDateTime(this.watchEnd)
		    }

		};
		var reportPeopleBOList = [];
		for(index in this.selectedMemberList){
			var sMember = this.selectedMemberList[index];
			var member = {
				"reportDate": getDateTime(this.watchBegin),
				"policeId":	sMember.policeId, 
				"policeName": sMember.name, 
				"policeNum": sMember.policeNum, 
				"policeType":sMember.policeType, 
				"equipmentList":[]
			}
			reportPeopleBOList.push(member);
		}
		
		var data = {
			barrierInfoJSON: JSON.stringify(barrierInfo),
			reportPeopleBOListJSON: JSON.stringify(reportPeopleBOList),
			reportVehicleBOListJSON :JSON.stringify(new Array())
		}
		
		ajaxGetDatas(url, data, this.saveTaskSuccess,"application/x-www-form-urlencoded");
		
		
	}
	,saveTaskSuccess(result){
		debugger;
		console.log(result);
		if(result.code == 200){
			layer.msg("保存成功");
			parent.iFrame2Page("pages/dynamicDuty-detail.html?type=task");
		}else{
			layer.msg("保存失败！！！！");
		}
	}
};




var dynamicDutyDetailVue = new Vue({
	el: "#main",
	data: vueData,
	methods: vueMethods

});


$(function(){
	updateCurrentMembersData();
});



/*
 *	人员列表
 * 
 * */
function updateCurrentMembersData(deparmentId) {
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
				policeId: obj.id,
				policeNum: obj.policeNum,
				policeType: obj.policeType ? obj.policeType : "mj"
			});
		}
		dynamicDutyDetailVue.memberList = tempCurrentMembers;
	}
}

