var policeAdminTransferVM;
var policeAdminVM;
$(document).ready(function() {
				policeAdminTransferVM = new Vue({
									el : '#transferPolice',
									data : {
										defaultGzJigou: ['440100000000'],//选择单位
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
										}
									}
							});
				
				policeAdminVM = new Vue({
									el : '#policeAdmin',
									data : {
										defaultGzJigou: ['440100000000'],//选择单位
									    gzJigouData: [
									        {
									            value: '440100000000',
									            label: '广州市公安局',
									            children: [],
									            loading: false
									        }
									    	],
							    		policeType: [''],
									    policeTypeData: [{
									    		value: '',
									            label: '全部',
									            children: [],
									            loading: false
									    }]
									},
									methods : {
										 loadData (item, callback) {
											      getUnitTreeComnbo(item, callback);
											    },
										setMainUnitValue (labels, selectedData) {
												setValue(labels,selectedData,"mainUnit");
										},
										loadPoliceTypeData (item, callback) {
											getVmComboDictionary("policeType",item,callback); 
									   },
									   setPoliceTypeValue (labels, selectedData){
									   		if(selectedData!=null&&selectedData!=undefined&&selectedData!=''){
												var definedId =  selectedData[selectedData.length - 1].id;
												var defined = selectedData[selectedData.length - 1].value;
												var definedNAME = selectedData[selectedData.length - 1].label;
												$("#policeTypeID").val(defined);
												$("#policeType").val(definedNAME);
											}
									   }
									}
							});
				$('#mainTable').bootstrapTable({
					pagination: true,
					sidePagination:'server',
					height: 700,
					striped: true,
					sortable: false,
					pageNumber: 1,
					pageSize: 15,
					pageList: [15, 25, 50, 100],
					url:BASEPATH+"/police/getPoliceList.do",
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
					},{
						field: 'mainUnit',
						visible: false
					},
					{
						field: 'mainUnitName',
						visible: false
					},{
						field: 'policeName',
						title: '警员名称',
						align: 'center',
						width: '15%'
					}, {
						field: 'policeNum',
						title: '警号',
						align: 'center',
						width: '15%'
					}, {
						field: 'policeTypeName',
						title: '警种',
						align: 'center',
						width: '15%'
					},{
						field: 'dutyUnitName',
						title: '工作单位',
						align: 'center',
						width: '20%'
					}, {
						field: 'createtime',
						title: '创建时间',
						align: 'center',
						width: '15%'
					},{
						field: '',
						title: '操作',
						align: 'center',
						width: '10%',
						formatter: function(value, row, index) {
							var htmlContnt = '<div class="btn-group">' +
								'<button title="借调" type="button" class="btn btn-primary btn-xs" onclick="doTransfer(\'' + row.id+','+row.policeName
								+','+row.mainUnit+','+row.mainUnitName+ '\')"><i class="fa fa-reply"></i></button>' +
								'<button title="查看" type="button" class="btn btn-primary btn-xs" onclick="doView(\'' + row.id + '\')"><i class="fa fa-search"></i></button>' +
								'<button title="编辑" type="button" class="btn btn-primary btn-xs" onclick="doEdit(\'' + row.id + '\')"><i class="fa fa-pencil-square-o"></i></button>' +
								'<button title="删除" type="button" class="btn btn-primary btn-xs" onclick="doDelConfirm(\'' + row.id + '\')"><i class="fa fa-close"></i></button>' +
								'</div>';
							return htmlContnt;
						}
					}]
				});
//				$("#deptId").comboDeptTree();
//				$("#policeType").comboDictionaryWithAllSelection("policeType");
				easyloader.locale = "zh_CN";
			});
			
			
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
				window.location.href='policeDoNew.html';
			}

			function doDelConfirm(policeId){
			$.showConfirmModal({
				title:"删除确认",
				msg:"是否确认删除该警员",
				yes:function(){
					doDel(policeId);
				}
			})
			}
			function doDel(policeId){
				 ajaxGetDatas(BASEPATH+"/police/api/deletePolice", 
				 	{policeId :policeId}, function(data){
						setTimeout(function() {
							$.showConfirmModal({
								title : "删除成功",
								msg : "删除成功"
							})
						}, 500);
						doSearch();
					},"application/x-www-form-urlencoded");
			}
			function doView(policeId){
				window.location.href="policeDoView.html?policeId="+policeId;
			}
			function doEdit(policeId){
				window.location.href="policeDoEdit.html?policeId="+policeId;
			}
			
			function doTransferAdmin(){
				window.location.href="policeTransferAdmin.html";
			}
			
			//打开调度界面
			function doTransfer(police){
				var arrPol = police.split(",");
				$('#policeId').val(arrPol[0]);
				$('#policeName').val(arrPol[1]);
				$('#originalUnitID').val(arrPol[2]);
				$('#originalUnitNAME').val(arrPol[3]);
				$('#transferPolice').modal('show');
			}
			
			function doTransferSubmit(){
				var data =  $("#transferForm").serialize();
				 ajaxGetDatas( BASEPATH+"/pt/doSavePoliceTransfer.do",
				 	data, function(data){
						setTimeout(function() {
							$.showConfirmModal({
								title : "借调成功",
								msg : "借调成功",
								yes : function() {
									$('#transferPolice').modal('hide');
								},
								no : function() {
									$('#transferPolice').modal('hide');
								}
							})
						}, 500)
					},"application/x-www-form-urlencoded");
			}
			
			function doExport(){
				
			}