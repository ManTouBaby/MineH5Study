var barrierAdminVM;

$(function(){
	
			barrierAdminVM = new Vue({
						el : '#barrierAdminInfo',
						data : {
							defaultGzJigou: ['440100000000'],
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
			$("#mainTable").bootstrapTable({
				pagination: true,
				sidePagination:'server',
				height: 800,
				striped: true,
				sortable: false,
				pageNumber: 1,
				pageSize: 15,
				pageList: [15, 25, 50, 100],
				url: BASEPATH + "/barrier/getBarrierList.do",
				ajaxOptions :{
					'beforeSend':function(request){
						request.setRequestHeader("Authorization",getCookieValue("xtoken"));
						request.setRequestHeader("Auth",getCookieValue("loginName"));
					}
				},
				onLoadSuccess:function(data){
					$("[data-toggle='tooltip']").tooltip();
				},
				columns: [{
					field: 'id',
					visible: false
				}, {
					field: 'barrierName',
					title: '名称',
					align: 'center',
					width: '30%'
				}, {
					field: 'mainUnitName',
					title: '所属辖区',
					align: 'center',
					width: '20%'
				}, {
					field: 'xlDeptName',
					title: '责任(巡逻)单位',
					align: 'center',
					width: '20%'
				}, {
					field: 'createtime',
					title: '创建时间',
					align: 'center',
					width: '20%'
				}, {
					field: '',
					title: '操作',
					align: 'center',
					width: '10%',
					formatter: function(value, row, index) {
						var htmlContnt = "";
							htmlContnt = '<div class="btn-group">' +
							'<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" title="查看" data-container="body" onclick="doView(\'' + row.id + '\')"><i class="fa fa-search"></i></button>' +
							'<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" title="编辑" data-container="body" onclick="doEdit(\'' + row.id + '\')"><i class="fa fa-pencil-square-o"></i></button>' +
							'<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" title="删除" data-container="body" onclick="doDelConfirm(\'' + row.id + '\')"><i class="fa fa-close"></i></button>' +
							'</div>';
						return htmlContnt;
					}
				}]
			});
			
		});
		
		function getBarrierMouldTree(id,mouldType){
			easyloader.load('combobox', function() {
				$("#" + id).combobox({
					width : '100%',
					height : 33,
					valueField : 'mouldValue',
					textField : 'mouldName',
					editable : false,
					url : BASEPATH + "/barriermould/getBarrierMouldList.do",
					loadFilter : function(data) {
						if (!data || data.length <= 0) {
							data = new Array();
						}
						var allSelect = new Object();
						allSelect.mouldValue = "";
						allSelect.mouldName = "全部";
						data.unshift(allSelect);
						return data;
					},
					onClick : function(node) {
						$("#" + id + "NAME").val(node.mouldName);
						$("#" + id + "VALUE").val(node.mouldValue);
						$("#" + id + "ID").val(node.id);
						getDefinedField(node.id);
					}
				})
			});
		};
		//通过模板ID  获取自定义搜索条件
		function getDefinedField(mouldid){
			 ajaxGetDatas( BASEPATH + "/barrier/getDefinedField.do",
				 	 {mouldid:mouldid}, function(res){
						var fields = $.parseJSON(data);
					$("#fieldContainer").empty();
					//调用加载自定义搜索条件
					loadDefinedField(fields);
					},"application/x-www-form-urlencoded");
		}
		
		//加载自定义搜索条件
		function loadDefinedField(fields){
			if (typeof(fields)!=null && typeof(fields)!=null) {
				var rowdiv = $("#rowDiv").clone();
				var valarr = new Array();
				for (var i = 0; i < fields.length; i++) {
					var div = $("#inputfield").clone();
					if (fields[i].fieldType=="S") {
						var val = fields[i].fieldDicVal;
						valarr.push(val);
						div = $("#selectfield").clone();
						$(div).find(".selectType").attr("id",val);
						$(div).find(".selectTypeID").attr("id",val+"ID");
						$(div).find(".selectTypeName").attr("id",val+"NAME");
					}
					$(div).removeAttr("id");
					$(div).find("label").text(fields[i].fieldName);
					$(div).find(".mouldFieldId").val(fields[i].id);//字段id
					
					$(div).find(".mouldFieldId").attr("name","mouldFieldId"+i);//设置name的值 
					$(div).find(".selectTypeName").attr("name","name"+i);//设置name的值 
					$(div).find("#mouldValue").attr("name","name"+i);//设置name的值 
					$(div).find(".selectTypeID").attr("name","value"+i);//设置name的值 
					
					$("#bairrerMouldId").val(fields[i].barrierMouldId);//设置岗位的模板id
					$(div).find(".mouldId").val(fields[i].barrierMouldId);//设置岗位data的模板id
					 if (i%3==0 || i==0) {
						rowdiv = $("#rowDiv").clone();
						rowdiv.removeAttr("id");
					}
					rowdiv = $(rowdiv).append(div);
					$(div).show(400);
					$(rowdiv).hide();
					if ((i+1)%3==0||(i+1)==fields.length) {
					$("#fieldContainer").append(rowdiv);
					$(rowdiv).show(400);
					}
				}
				
				//将自定义搜索条件的个数放进字段中 传回后台 用于拼接sql语句使用
				$("#fieldLength").val(fields.length);
				
				setTimeout(function() {//延时加载字典
					for (var i = 0; i < valarr.length; i++) {
						$("#"+valarr[i]).comboDictionaryWithAllSelection(valarr[i]);
					}
				}, 600);
			}  
		}
		
		
		function doSearch(){
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
		function doNew(){
			var barrierMouldType =  $("#barrierTypeID").val();
			var barrierMouldName=  $("#barrierTypeNAME").val();
			var barrierMouldId =  $("#barrierType").val();
			
			if (!barrierMouldType || barrierMouldType == "") {
				$.showTipsModal("请选择", "请先选择岗位类别 ")
				return;
			}
		//barrierType
			window.location.href = "barrierDoNew.html?barrierMouldType=" + barrierMouldType
					+"&barrierMouldName="+barrierMouldName+"&barrierMouldId="+barrierMouldId;
		}
		function doView(barrierId) {
			window.location.href = "barrierDoView.html?barrierId=" + barrierId +"&viewflag=view";
		}
		function doEdit(barrierId) {
			window.location.href =  "barrierDoEdit.html?barrierId=" + barrierId +"&viewflag=edit";;
		}
		function doDelConfirm(barrierId){
			$.showConfirmModal({
				title:"删除确认",
				msg:"是否确认删除该岗位",
				yes:function(){
					doDel(barrierId);
				}
			})
		}
		function doDel(barrierId){
			 ajaxGetDatas( BASEPATH+"/barrier/doDeleteBarrier.do",
				 	 {barrierId:barrierId}, function(res){
						setTimeout(function() {
						$.showConfirmModal({
							title : "删除成功",
							msg : "删除成功"
						})
						}, 500);
						doSearch();
					},"application/x-www-form-urlencoded");
		}