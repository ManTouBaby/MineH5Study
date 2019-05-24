$(document).ready(function() {
				$('#mainTable').bootstrapTable({
					pagination: true,
					sidePagination:'server',
					height: 700,
					striped: true,
					sortable: false,
					pageNumber: 1,
					pageSize: 15,
					pageList: [15, 25, 50, 100],
					url:BASEPATH+ "/police/getPoliceList.do",
					onLoadSuccess:function(data){
					$("[data-toggle='tooltip']").tooltip();
					},
					columns: [{
						field: 'id',
						visible: false
					}, {
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
								'<button type="button" class="btn btn-primary btn-xs" onclick="doView(\'' + row.id + '\')"><i class="fa fa-search"></i></button>' +
								'<button type="button" class="btn btn-primary btn-xs" onclick="doEdit(\'' + row.id + '\')"><i class="fa fa-pencil-square-o"></i></button>' +
								'<button type="button" class="btn btn-primary btn-xs" onclick="doDelConfirm(\'' + row.id + '\')"><i class="fa fa-close"></i></button>' +
								'</div>';
							return htmlContnt;
						}
					}]
				});
				easyloader.load('combotree', function() {
					$('#deptId').combotree({
						width: '100%',
						height: 33,
						data: treeData
					});
					$('#xldeptId').combotree({
						width: '100%',
						height: 33,
						data: treeData
					});
					$('#biaoqian').combotree({
						width: '100%',
						height: 33,
						data: treeDataBQ
					});
					$('#type').combotree({
						width: '100%',
						height: 33,
						data: treeDataPoliceType
					});
//					$("#deptId").combotree('tree').tree("collapseAll");
//					$("#xldeptId").combotree('tree').tree("collapseAll");
				});
			
				easyloader.locale = "zh_CN";
			});
			
			
			var treeDataPoliceType = [{

				id: 11,
				value : 'mj',
				text: '民警',
			}, {
				id: 12,
				value:'fj',
				text: '辅警',
			}];
			
			var treeData = [{
			id: 440100000000,
			text: '广州市公安局',
			children: [{
				id: 440104000000,
				text: '越秀区分局',
				children: [{
					id: 440104500000,
					text: '北京派出所'
				}]
			}, {
				id: 440106000000,
				text: '天河区分局',
				children: [{
					id: 440106520000,
					text: '五山派出所'
				}]
			}, {
				id: 440113000000,
				text: '番禺区分局',
				children: [{
					id: 440113500000,
					text: '市桥派出所'
				}]
			}]
		}];
			
			
			var treeDataBQ = [{
				id: 1,
				text: '人员特征',
				children: [{
					id: 11,
					text: '年轻',
				}, {
					id: 12,
					text: '年长',
				}, {
					id: 13,
					text: '男性',
				}, {
					id: 14,
					text: '女性',
				}, {
					id: 15,
					text: '已婚',
				}, {
					id: 16,
					text: '未婚',
				}]
			},{
				id: 2,
				text: '职位',
				children: [{
					id: 11,
					text: '领导',
				},{
					id: 12,
					text: '非领导',
				}]
				
			},{
				id: 3,
				text: '特长',
				children: [{
					id: 11,
					text: '狙击',
				},{
					id: 12,
					text: '搏击',
				}]
				
			}]
			
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
				$.ajax({
					url : BASEPATH+ "/police/api/deletePolice",
					data : {policeId :policeId},
					type : "POST",
					cache : false,
					success : function(data) {
						setTimeout(function() {
							$.showConfirmModal({
								title : "删除成功",
								msg : "删除成功"
							})
						}, 500);
						doSearch();
					},
					error : function(data) {
						jQueryAjaxError(data)
					}
				})
			}
			function doView(policeId){
				window.location.href="policeDoView.html?policeId="+policeId;
			}
			function doEdit(policeId){
				window.location.href="policeDoEdit.html?policeId="+policeId;
			}
			function doExport(){
				
			}