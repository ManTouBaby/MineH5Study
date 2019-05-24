//var BASEPATH = "http://127.0.0.1:8080";
var barrierListVM;
$(function() {
			
			$("#mainTable").bootstrapTable({
				pagination: true,
				sidePagination:'server',
				height: 800,
				striped: true,
				sortable: false,
				pageNumber: 1,
				pageSize: 15,
				pageList: [15, 25, 50, 100],
				url: BASEPATH+"/barrier/getBarrierList.do",
				ajaxOptions :{
					'beforeSend':function(request){
						request.setRequestHeader("Authorization",getCookieValue("xtoken"));
						request.setRequestHeader("Auth",getCookieValue("loginName"));
					}
				},
				onLoadSuccess : function(data) {
					$("[data-toggle='tooltip']").tooltip();
				},
				columns : [ {
					field : 'id',
					visible : false
				}, {
					field : 'barrierName',
					title : '名称',
					align : 'center',
					width : '30%'
				}, {
					field : 'mainUnitName',
					title : '所属辖区',
					align : 'center',
					width : '20%'
				}, {
					field : 'xlDeptName',
					title : '责任(巡逻)单位',
					align : 'center',
					width : '20%'
				}, {
					field : 'createtime',
					title : '创建时间',
					align : 'center',
					width : '20%'
				}, {
					field : '',
					title : '操作',
					align : 'center',
					width : '10%',
					formatter : function(value, row, index) {
						var htmlContnt = "";
						htmlContnt = '<div class="btn-group">&nbsp;&nbsp;' 
						+ '<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" title="按周视图查看" data-container="body" onclick="doViewByWeek(\'' + row.id + '\')"><i class="fa fa-calendar-minus-o"></i></button>' 
						+ '<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" title="按月日历查看" data-container="body" onclick="doViewByMonth(\'' + row.id + '\')"><i class="fa fa-calendar"></i></button>'
						+ '&nbsp;&nbsp;</div>';
						return htmlContnt;
					}
				} ]
			});
	
			barrierListVM = new Vue({
						el : '#barrierListInfo',
						data : {
							defaultGzJigou: ['440100000000'],//选择人员
						    gzJigouData: [
						        {
						            value: '440100000000',
						            label: '广州市公安局',
						            children: [],
						            loading: false
						        }
						    	],
					    	defaultBarrierType: ['qb'],//选择岗位类型
						    barrierTypeData: [
						        {
						            value: 'qb',
						            id:'qb',
						            label: '全部',
						            children: [],
						            loading: false
						        }
						    	],		
						},
						methods : {
							 loadData (item, callback) {
								      getUnitTreeComnbo(item, callback);
								    },
							 loadBarrierTypeData (item, callback) {
							        getBarrierTypeTreeComnbo(item, callback);
								    },
							setDutyUnitValue (labels, selectedData) {
									setValue(labels,selectedData,"dutyUnit");
							},
							setBarrierTypeValue (labels, selectedData) {
									setValue(labels,selectedData,"barrierType");
							},
						}
				});
		});

		//通过模板ID  获取自定义搜索条件
		function getDefinedField(mouldid) {
			 ajaxGetDatas(BASEPATH + "/barrier/getDefinedField.do", 
				 	{mouldid : mouldid}, function(data){
						var fields = $.parseJSON(data);
						$("#fieldContainer").empty();
						//调用加载自定义搜索条件
						loadDefinedField(fields);
					},"application/x-www-form-urlencoded");
		}

		//加载自定义搜索条件
		function loadDefinedField(fields) {
			if (typeof (fields) != null && typeof (fields) != null) {
				var rowdiv = $("#rowDiv").clone();
				var valarr = new Array();
				for (var i = 0; i < fields.length; i++) {
					var div = $("#inputfield").clone();
					if (fields[i].fieldType == "S") {
						var val = fields[i].fieldDicVal;
						valarr.push(val);
						div = $("#selectfield").clone();
						$(div).find(".selectType").attr("id", val);
						$(div).find(".selectTypeID").attr("id", val + "ID");
						$(div).find(".selectTypeName").attr("id", val + "NAME");
					}
					$(div).removeAttr("id");
					$(div).find("label").text(fields[i].fieldName);
					$(div).find(".mouldFieldId").val(fields[i].id);//字段id

					$(div).find(".mouldFieldId").attr("name", "mouldFieldId" + i);//设置name的值 
					$(div).find(".selectTypeName").attr("name", "name" + i);//设置name的值 
					$(div).find("#mouldValue").attr("name", "name" + i);//设置name的值 
					$(div).find(".selectTypeID").attr("name", "value" + i);//设置name的值 

					$("#bairrerMouldId").val(fields[i].barrierMouldId);//设置岗位的模板id
					$(div).find(".mouldId").val(fields[i].barrierMouldId);//设置岗位data的模板id
					if (i % 3 == 0 || i == 0) {
						rowdiv = $("#rowDiv").clone();
						rowdiv.removeAttr("id");
					}
					rowdiv = $(rowdiv).append(div);
					$(div).show(400);
					$(rowdiv).hide();
					if ((i + 1) % 3 == 0 || (i + 1) == fields.length) {
						$("#fieldContainer").append(rowdiv);
						$(rowdiv).show(400);
					}
				}

				//将自定义搜索条件的个数放进字段中 传回后台 用于拼接sql语句使用
				$("#fieldLength").val(fields.length);

				setTimeout(function() {//延时加载字典
					for (var i = 0; i < valarr.length; i++) {
						$("#" + valarr[i]).comboDictionaryWithAllSelection(valarr[i]);
					}
				}, 600);
			}
		}

		function doSearch() {
			var searchParam = $("#searchFrom").serializeObject();
			$("#mainTable").bootstrapTable('refreshOptions', {
				pageNumber : 1,
				queryParams : function(param) {
					for(var field in searchParam){
						param[field] = searchParam[field]
					}
					return param;
				}
			});
		}
		function doViewByMonth(barrierId) {
			window.location.href = "barrierWatchDetailByMonth.html?barrierId=" + barrierId;
		}
		function doViewByWeek(barrierId) {
			window.location.href = "barrierWatchDetailByWeek.html?barrierId=" + barrierId;
		}