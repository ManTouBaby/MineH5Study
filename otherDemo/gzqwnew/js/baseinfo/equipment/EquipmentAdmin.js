var equipmentVM;
$(function(){
			equipmentVM = new Vue({
									el : '#equipmentAdminInfo',
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
								    	equipmentType: [''],
									    equipmentTypeData: [{
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
										loadEquipmentTypeData (item, callback) {
											getVmComboDictionary("equipmentType",item,callback); 
									   },
									   setEquipmentTypeValue (labels, selectedData){
									   		setValue(labels,selectedData,"equipmentType");
									   }
									}
							});
	
			$("#mainTable").bootstrapTable({
				pagination: true,
				sidePagination:'server',
				height: 700,
				striped: true,
				sortable: false,
				pageNumber: 1,
				pageSize: 15,
				pageList: [15, 25, 50, 100],
				url:BASEPATH +  "/equipment/getEquipmentList.do?type=equipment",
				ajaxOptions :{
					'beforeSend':function(request){
						request.setRequestHeader("Authorization",getCookieValue("xtoken"));
						request.setRequestHeader("Auth",getCookieValue("loginName"));
					}
				},
				onLoadSuccess:function(data){
					$("[data-toggle='tooltip']").tooltip();
				},
				columns: [
		        {
					field: 'id',
					visible: false
				}, {
					field: 'equipmentName',
					title: '装备名称',
					align: 'center',
					width: '20%'
				}, {
					field: 'equipmentNum',
					title: '装备编号',
					align: 'center',
					width: '20%'
				}, {
					field: 'equipmentTypeName',
					title: '装备类型',
					align: 'center',
					width: '15%'
				}, {
					field: 'gpsnum',
					title: '定位装备编号',
					align: 'center',
					width: '15%'
				}, {
					field: 'dutyUnitName',
					title: '工作单位',
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
		})
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
			window.location.href = "EquipmentDoNew.html"
		}
		function doView(equipmentId) {
			window.location.href = "EquipmentDoView.html?equipmentId="+equipmentId;
		}
		function doEdit(equipmentId) {
			window.location.href =  "EquipmentDoEdit.html?equipmentId="+equipmentId;
		}
		function doDelConfirm(equipmentId){
			$.showConfirmModal({
				title:"删除确认",
				msg:"是否确认删除该装备",
				yes:function(){
					doDel(equipmentId);
				}
			})
		}
		function doDel(equipmentId){
			 ajaxGetDatas(BASEPATH +  "/equipment/doDeleteEquipment.do",
				 	{equipmentId:equipmentId}, function(data){
						setTimeout(function() {
						$.showConfirmModal({
							title : "删除成功",
							msg : "删除成功"
						})
						}, 500);
						doSearch();
					},"application/x-www-form-urlencoded");
		}