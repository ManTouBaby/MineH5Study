/*
 * ============================
 *  机构单位- vue数据
 * ============================
 * */

var dailyPostReportData = {
	defaultGzJigou: ['440100000000'],//选择人员
	defaultGzJigou2: ['440100000000'],//选择车辆
	defaultGzJigou3: ['440100000000'],//选择装备
    gzJigouData: [
        {
            value: '440100000000',
            label: '广州市公安局',
            children: [],
            loading: false
        }
    ],
    
    
    members: [{
		message: '张三'
	},{
		message: '李四'
	}]
    
    
}

var dailyPostReportMethods = {
	loadData (item, callback) {
        item.loading = true;
    	$.ajax({
			type:"post",
			url:"http://192.168.0.108:8080/unitRest/getUnitListByParentId.do",
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
}


var dailyPostReportVue = new Vue({
	el: "#main",
	data: dailyPostReportData,
	methods: dailyPostReportMethods
	
})


/*




var gzDeparment = {
    data: function() {
        return {
        	defaultGzJigou: ['440100000000'],//选择人员
        	defaultGzJigou2: ['440100000000'],//选择车辆
        	defaultGzJigou3: ['440100000000'],//选择装备
            gzJigouData: [
                {
                    value: '440100000000',
                    label: '广州市公安局',
                    children: [],
                    loading: false
                }
            ]
        }
    },
    methods: {
        
    }
}

var gzDeparmentComponent = Vue.extend(gzDeparment);
new gzDeparmentComponent().$mount('#main');
*/

/*var gzDeparment = new Vue({
	el: "#member-selecter-container",
	data: function() {
        return {
        	defaultGzJigou: ['440100000000'],//选择人员
        	defaultGzJigou2: ['440100000000'],//选择车辆
        	defaultGzJigou3: ['440100000000'],//选择装备
            gzJigouData: [
                {
                    value: '440100000000',
                    label: '广州市公安局',
                    children: [],
                    loading: false
                }
            ]
        }
   	},
   	methods: {
        loadData (item, callback) {
            item.loading = true;
        	$.ajax({
				type:"post",
				url:"http://192.168.0.108:8080/unitRest/getUnitListByParentId.do",
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
    }
});*/


/*
 * ============================
 *  历史排班人员 - vue数据
 * ============================
 * */
/*var memberHistory =  new Vue({
	el: '#member-history',
	data: {
		members: [{
			message: '张三'
		},{
			message: '李四'
		}]
	}
});*/
/*var memberHistory = {
    data :function() {
        return {
        	members: [{
				message: '张三'
			},{
				message: '李四'
			}]
		}
    }
    
}

var gzDeparmentComponent = Vue.extend(memberHistory);
new gzDeparmentComponent().$mount('#main');*/