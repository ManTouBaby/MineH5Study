		var userDeptId = "111";
		var secondedPoliceOperaVM;
		$(function() {
			$("#secondedInPoliceTable").bootstrapTable({
				pagination : true,
				sidePagination : 'server',
				height : 550,
				striped : true,
				sortable : false,
				pageNumber : 1,
				pageSize : 10,
				pageList : [ 5, 15, 50, 100 ],
				url : BASEPATH+"/pt/getPoliceTransferList.do?flag=in",
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
				},{
					field : 'presentUnit',
					visible : false
				},{
					field : 'presentUnitName',
					visible : false
				},{
					field : 'transferType',
					visible : false
				}, {
					field : 'policeName',
					title : '警员名称',
					align : 'center',
					width : '15%'
				}, {
					field : 'policeNum',
					title : '警号',
					align : 'center',
					width : '20%'
				}, {
					field : 'originalUnitName',
					title : '原单位',
					align : 'center',
					width : '40%'
				}, {
					field : '',
					title : '操作',
					align : 'center',
					width : '15%',
					formatter : function(value, row, index) {
						var htmlContnt = '<div class="btn-group"><button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" title="确认调入" data-container="body" onclick="doPoliceConfirm(\'' + index + '\')"><i class="fa fa-sign-in"></i></button></div>'
						return htmlContnt;
					}
				} ]
			});
			$("#secondedOutPoliceTable").bootstrapTable({
				pagination : true,
				sidePagination : 'server',
				height : 550,
				striped : true,
				sortable : false,
				pageNumber : 1,
				pageSize : 10,
				pageList : [ 5, 15, 50, 100 ],
				url : BASEPATH + "/pt/getPoliceTransferList.do?flag=out",
				ajaxOptions :{
					'beforeSend':function(request){
						request.setRequestHeader("Authorization",getCookieValue("xtoken"));
						request.setRequestHeader("Auth",getCookieValue("loginName"));
					}
				},
				onLoadSuccess : function(data) {
					$("[data-toggle='tooltip']").tooltip();
				},
				columns : [{
					field : 'id',
					visible : false
				}, {
					field : 'policeName',
					title : '警员名称',
					align : 'center',
					width : '15%'
				}, {
					field : 'policeNum',
					title : '警号',
					align : 'center',
					width : '20%'
				}, {
					field : 'presentUnitName',
					title : '借入单位',
					align : 'center',
					width : '40%'
				}]
			});

		});
		
 		function doPoliceConfirm(index){
 			var police = $("#secondedInPoliceTable").bootstrapTable('getData')[index];
			$.showConfirmModal({
				title : "确认调入",
				msg : "您确认将 " + police.policeName + " 调入单位吗？",
				yes : function() {
					doPoliceIn(police);
				}
			})
 		}
	
		function doPoliceIn(police) {
			police.handler = '440308990000';
			police.handlerName='盐田测试派出所';
			
			 ajaxGetDatas(BASEPATH + "/pt/doUpdatePoliceTransfer.do",
				 	police, function(data){
						setTimeout(function() {
						$.showTipsModal("操作成功", "操作成功，该已成功调入本单位");
						}, 500)
						$("#secondedInPoliceTable").bootstrapTable('refresh');
					},"application/x-www-form-urlencoded");
		}