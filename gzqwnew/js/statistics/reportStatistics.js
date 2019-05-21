	var reportVM;
	var zbllData;//值班力量data
	var shmData;//社会面data
	var yybqData;//应急备勤data
	var allData;//统计data
	var unitData=[];//分局名data
	var unitMjCount=[];//该单位民警总数
	var unitFjCount=[];//该单位辅警总数
	var unitAllCount=[];//该单位总警力
	
	var tableData = [];
	$(document).ready(function() {
		
			//获取数据
			getStatisticsData();
			reportVM = new Vue({
					el: "#reportStatistics",
					data: {
						switchs : false,
						deparmentJL: tableData,
						defaultGzJigou: ['440100000000'],
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
									setValue(labels,selectedData,"mainUnit");
							},
							showOtherUnit (status){
								doSearch(status);
							}
					},
					watch : {
							deparmentJL : function() {
								Vue.nextTick(function() {
									splitPage();
								});
							}
						}
				});
			$("#beginDate").flatpickr({
				"locale" : "zh"
			});	
			$("#endDate").flatpickr({
				"locale" : "zh"
			});		
			
			
			
			
                
            $("#btn1").click(function firstPage(){    // 首页
            	pageNum=0;
                curPage=1;
                direct = 0;
                displayPage();
            }
			);
            $("#btn2").click(function frontPage(){    // 上一页
            	pageNum=0;
                direct=-1;
                displayPage();
            });
            $("#btn3").click(function nextPage(){    // 下一页
            	pageNum=0;
                direct=1;
                displayPage();
            });
            $("#btn4").click(function lastPage(){    // 尾页
            	pageNum=0;
                curPage=page;
                direct = 0;
                displayPage();
            });
            $("#btn5").click(function changePage(){    // 转页
                curPage=document.getElementById("changePage").value * 1;
                if (!/^[1-9]\d*$/.test(curPage)) {
                    $.showTipsModal("提示", "请输入正整数");
                    return ;
                }
                if (curPage > page) {
                    $.showTipsModal("提示", "超出数据页面");
                    return ;
                }
                pageNum=0;
                direct = 0;
                displayPage();
            });
            
            
            $("#pageSizeSet").click(function setPageSize(){    // 设置每页显示多少条记录
                pageSize = document.getElementById("pageSize").value;    //每页显示的记录条数
                if (!/^[1-9]\d*$/.test(pageSize)) {
                	$.showTipsModal("提示", "请输入正整数");
                    return ;
                }
                len =$("#reportJLTable tr").length - 1;
                page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
                pageNum=0;
                curPage=1;        //当前页
                 direct=0;        //方向
                 displayPage();
            });
		});
		
		/**
		 * 点击表格 单位名时间
		 */
		function clickUnit(obj){
			var unitId  = $(obj).parent().parent().children('.unitId').val();
			$('#mainUnitID').val(unitId);
			var status = reportVM.switchs;
			doSearch(status);
		}
				
		function getStatisticsData(){
			ajaxGetDatas(BASEPATH + "/statistics/reportPoliceStatisticsAdmin.do", 
				{unitId:getCurrentUserId()}, successCallback,"application/x-www-form-urlencoded");
		}
		
		function successCallback(data){
			if (data) {
						setData(data,false);
					}
				loadCharts();
		}
		
		function doSearch(flag){
			pageSize = 15;    //每页显示的记录条数
	       	curPage=0;        //当前页
	      	lastPage;        //最后页
	       	direct=0;        //方向
	      	len;            //总行数
	       	page;            //总页数
	       	begin;
	       	end;
	       	pageNum=0; //加载次数
			flag = reportVM.switchs;
			debugger
			var searchParam = $("#searchFrom").serializeObject();
			
			
			 ajaxGetDatas(BASEPATH + "/statistics/reportPoliceStatisticsAdmin.do",
				 	searchParam, function(data){
						if (data) {
							setData(data,flag);
						}
						loadCharts();
					},"application/x-www-form-urlencoded");
		}
		
		function successCallback1(data,flag){
			if (data) {
					setData(data,flag);
				}
				loadCharts();
		}
		
		function setData(data,flag){
						unitData=[];//分局名data
					 	unitMjCount=[];//该单位民警总数
						unitFjCount=[];//该单位辅警总数
						unitAllCount=[];//该单位总警力
						tableData = [];
						reportVM.deparmentJL = [];
						zbllData = [
				                {value:data.data[0].zbllMj, name:'民警'},
				                {value:data.data[0].zbllFj, name:'辅警'}
				            ];
				        shmData = [
				        		{value:data.data[0].shmMj, name:'民警'},
				                {value:data.data[0].shmFj, name:'辅警'}
				        ];
				        yybqData = [
				        		{value:data.data[0].yybqMj, name:'民警'},
				                {value:data.data[0].yybqFj, name:'辅警'}
				        ];
				        
				        allData = [
					                {value:data.data[0].zbllMj, name:'值班力量民警'},
					                {value:data.data[0].zbllFj, name:'值班力量辅警'},
					                {value:data.data[0].shmMj, name:'社会面警力民警'},
					                {value:data.data[0].shmFj, name:'社会面警力辅警'},
					                {value:data.data[0].yybqMj, name:'应急备勤民警'},
					                {value:data.data[0].yybqFj, name:'应急备勤辅警'}
						           ];
						
						for(var i=0;i<data.data.length;i++){
							if(!flag){//只查看 分局 派出所之类的
								if(data.data[i].type != '1'){
									continue;
							}
							}
							var ddata = {};
							unitData.push(data.data[i].deptname);
								unitMjCount.push(data.data[i].mjAll);
								unitFjCount.push(data.data[i].fjAll);
								unitAllCount.push(data.data[i].all);
								
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
						reportVM.deparmentJL = tableData;
		}
		
		function loadCharts(){
			
			var dom = document.getElementById("container");
				var myChart = echarts.init(dom);
				var app = {};
				option = null;
				option = {
				    title : {
				        text: '值班力量',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['民警','辅警']
				    },
				    series : [
				        {
				            name: '值班力量',
				            type: 'pie',
				            selectedMode: 'single',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:zbllData,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				;
				if (option && typeof option === "object") {
				    myChart.setOption(option, true);
				}
				
				var dom1 = document.getElementById("container1");
				var myChart1 = echarts.init(dom1);
				var app1 = {};
				option1 = {
				    title : {
				        text: '社会面警力',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['民警','辅警']
				    },
				    series : [
				        {
				            name: '社会面警力',
				            type: 'pie',
				            selectedMode: 'single',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:shmData,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				;
				if (option1 && typeof option1 === "object") {
				    myChart1.setOption(option1, true);
				}
				
				var dom2 = document.getElementById("container2");
				var myChart2 = echarts.init(dom2);
				var app2 = {};
				option2 = {
				    title : {
				        text: '应急备勤',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['民警','辅警']
				    },
				    series : [
				        {
				            name: '应急备勤',
				            type: 'pie',
				            selectedMode: 'single',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:yybqData,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				if (option2 && typeof option2 === "object") {
				    myChart2.setOption(option2, true);
				}
				
				var dom3 = document.getElementById("container3");
				var myChart3 = echarts.init(dom3);
				var app3 = {};
				option3 = {
				    title : {
				        text: '警力统计',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    series : [
				        {
				            name: '警力分布',
				            type: 'pie',
				            selectedMode: 'single',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:allData,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				if (option3 && typeof option3 === "object") {
				    myChart3.setOption(option3, true);
				}
				
				
				var dom4 = document.getElementById("container4");
				var myChart4 = echarts.init(dom4);
				var app4 = {};
				option4 = {
					    title: {
					        text: '警力分布'
					    },
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: { // 坐标轴指示器，坐标轴触发有效
					            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    legend: {
					        data: ['民警', '辅警', '总警力'],
					        align: 'right',
					        right: 10
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: [{
					        type: 'category',
					        data: unitData
//					        ['越秀', '天河', '黄埔', '海珠', '白云']
					    }],
					    yAxis: [{
					        type: 'value',
					        name: '人',
					        axisLabel: {
					            formatter: '{value}'
					        }
					    }],
					    series: [{
					        name: '民警',
					        type: 'bar',
					        data: unitMjCount
//					        [20, 12, 31, 34, 31]
					    }, {
					        name: '辅警',
					        type: 'bar',
					        data:unitFjCount 
//					        [10, 20, 5, 9, 3]
					    }, {
					        name: '总警力',
					        type: 'bar',
					        data: unitAllCount
//					        [1, 1, 2, 3, 1]
					    }]
					};
				if (option4 && typeof option4 === "object") {
				    myChart4.setOption(option4, true);
				}
			
		} 
						
		/**
		 * 分页方法
		 */
		var pageSize = 15;    //每页显示的记录条数
       	var curPage=0;        //当前页
      	var lastPage;        //最后页
       	var direct=0;        //方向
      	var len;            //总行数
       	var page;            //总页数
       	var begin;
       	var end;
       	var pageNum=0; //加载次数
        function splitPage(){
        		if(pageNum>=1){
        			return;
        		}
        		len =$("#reportJLTable tr").length - 2;    // 求这个表的总行数，剔除第一行介绍
                page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
                // alert("page==="+page);
                curPage=1;    // 设置当前为第一页
                displayPage();//显示第一页
                
                document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";    // 显示当前多少页
                document.getElementById("sjzl").innerHTML="数据总量 " + len + "";        // 显示数据量
                document.getElementById("pageSize").value = pageSize;
        }
 		
        function displayPage(){ 
        		if(pageNum>=1){
        			return;
        		}
                if(curPage <=1 && direct==-1){
                    direct=0;
                    $.showTipsModal("提示", "已经是第一页了");
                    return;
                } else if (curPage >= page && direct==1) {
                    direct=0;
                    $.showTipsModal("提示", "已经是最后一页了");
                    return ;
                }
                
                lastPage = curPage;
               
                // 修复当len=1时，curPage计算得0的bug
                if (len > pageSize) {
                    curPage = ((curPage + direct + len) % len);
                } else {
                    curPage = 1;
                }
          
                
                document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";        // 显示当前多少页
                
                begin=(curPage-1)*pageSize + 1;// 起始记录号
                end = begin + 1*pageSize-1 ;    // 末尾记录号
             	if(curPage==1){
         		 end = begin + 1*pageSize;
             	}
                
                if(end > len ) {
                	end=len+1;
                }
                $("#reportJLTable tr").hide();    // 首先，设置这行为隐藏
                $("#reportJLTable tr").each(function(i){    // 然后，通过条件判断决定本行是否恢复显示
                    if((i>=begin && i<=end) || i==0 ||i==1)//显示begin<=x<=end的记录
                        $(this).show();
                });
				pageNum++;
             }