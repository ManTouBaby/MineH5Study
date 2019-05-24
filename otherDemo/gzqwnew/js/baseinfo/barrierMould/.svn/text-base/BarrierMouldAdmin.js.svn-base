var treeClickNode = "";
var barrierMouldVM;
var randomNumList = new Array();
$(function() {
			$("#mainTreeBox").height($(window).height() - 100);
			getTreeData();
			barrierMouldVM = new Vue({
						el : '#barrierMouldInfo',
						data : {
							fieldList : []
						}
				});
	});

function getTreeData() {
		treeClickNode = "";
		 ajaxGetDatas(BASEPATH + "/barrierMould/getBarrierMouldList.do",
				 	{}, 
				 	function(data){
						var treeData = new Array();
						for(var i = 0; i < data.data.length; i++) {
							data.data[i].text = data.data[i].mouldName;
							if(!data.data[i].iftail || data.data[i].iftail != "1") {
								data.data[i].state = "closed";
							}
							for(var j = 0; j < data.data.length; j++) {
								if(data.data[i].parentId == data.data[j].id) {
									if(!data.data[j].children) {
										data.data[j].children = new Array();
									}
									data.data[j].children.push(data.data[i]);
									break;
								}
							}
							if(data.data[i].parentId == "root") {
								treeData.push(data.data[i]);
							}
						}
						easyloader.load('tree', function() {
							$("#mainTree").tree({
								onClick: function(node) {
									treeClickNode = node.id;
									clearData();
									$("#detailContainer").fadeIn(300);
									setDetailInfo(node);
									setDefinedField(node.id)
								}
							});
							$("#mainTree").tree('loadData', treeData);
							$("#mainTree").tree("expandAll");
						})
					},"application/x-www-form-urlencoded","get");
		}
		
/****************************************界面操作**************************************************************/
function doNewRoot(flag){
	//flag ture为根节点    false为子节点
	if(flag){
		$("#iftail").val("0");
		$("#parentId").val("root");
	}else{
		if (!treeClickNode || treeClickNode == "") {
			$.showTipsModal("请选择", "请在左侧选择需要父级模板 ")
			return;
		}
		$("#iftail").val("1");
		$("#parentId").val(treeClickNode);
	}
	clearData();
	$("#detailContainer").fadeIn(300);
}

function doAddField(flag){
			var div = $("#inputfield").clone();
			var randomNum = Math.floor(Math.random () * 900) + 100;
			var randnumflag = false;
			while(!randnumflag){
				if($.inArray(randomNum, randomNumList)==-1){
					randnumflag=true;
					randomNumList.push(randomNum);
				}else{
					randomNum = Math.floor(Math.random () * 900) + 100;	
				}
			}  
			if (!flag) {
				div = $("#selectfield").clone();
				setTimeout(function() {
					$("#barrier"+randomNum).comboDictionary("barrier");
				}, 400);
				$(div).find(".selectType").attr("id","barrier"+randomNum);
				$(div).find(".selectTypeID").attr("id","barrier"+randomNum+"ID");
				$(div).find(".selectTypeName").attr("id","barrier"+randomNum+"NAME"); 
			}
			setTimeout(function() {
				$("#isquery"+randomNum).comboDictionary("isOrNot");
				$("#ifrequired"+randomNum).comboDictionary("isOrNot");
			}, 400);
			$(div).find(".isquery").attr("id","isquery"+randomNum);
			$(div).find(".isqueryID").attr("id","isquery"+randomNum+"ID");
			$(div).find(".ifrequired").attr("id","ifrequired"+randomNum);
			$(div).find(".ifrequiredID").attr("id","ifrequired"+randomNum+"ID");
			$(div).removeAttr("id");
			$(div).find(".removeBotton").click(function() {
				doDel(this);
			})
			$(div).hide();
			if (flag) {
				$(".fieldContainer").append(div);
			}else{
				$(".fieldSelectContainer").append(div);
			}
			$(div).show(400);
			return div;
}

function doDel(obj){
			$(obj).parents(".field").hide(400);
			setTimeout(function() {
				$(obj).parents(".field").remove()
			}, 800);
}

function clearContent(){ //清空界面
			 clearData();
			$("#detailContainer").fadeOut(300);
		}


function doDelConfirm() {//删除模板
			var id = $("#mouldId").val();
			var name = $("#mouldName").val();
			if (!id || id == "") {
				$.showTipsModal("请选择", "请在左侧选择需要删除的模板 ")
				return;
			}
			$.showConfirmModal({
				title : "确认删除",
				msg : "您确认删除该"+name+"模板吗？",
				yes : function() {
					doDelMould(id)
				}
			})
		}
//删除模板
function doDelMould(barrierMouldId){
		 ajaxGetDatas( BASEPATH + "/barrierMould/doDeleteBarrierMould.do", 
				 	{barrierMouldId : barrierMouldId},
				 	function(data){
						setTimeout(function() {
						getTreeData();
						$.showConfirmModal({
							title : "删除成功",
							msg : "删除成功"
							})
						}, 500);
						clearData();
					},"application/x-www-form-urlencoded");
	}
/****************************************数据操作**************************************************************/

		//根据模板id查找对应的字段，进行展示
		/*
		*
		*/
		function setDefinedField(mouldid) {
			barrierMouldVM.fieldList = [];
			ajaxGetDatas( BASEPATH + "/barrierMould/getBarrierMouldField.do",
				 	{mouldid: mouldid},
				 	function(data){
						barrierMouldVM.fieldList = data.data;
						showField(data.data,false);
					},"application/x-www-form-urlencoded","get");
		}
	
	/*
	*flag true只读   false可编辑
	*/
	//获取模板字段成功后对数据进行展示
	function showField(data,flag){
			if (typeof(data)!=undefined && typeof(data)!=null) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].fieldType=='I') {//判断时候是下拉框 I输入框 S下拉框
						var div = "";
						if (flag) {
//							div = doAddReadOnlyField(true);	
						}else{
							div = doAddField(true);	
						}
						$(div).find("input[name='barriermouldfield.fieldName']").val(data[i].fieldName);						
						$(div).find("input[name='barriermouldfield.id']").val(data[i].id);						
					}else if(data[i].fieldType=='S'){
						var div = "";
						if (flag) {
//							div = doAddReadOnlyField(false);	
						}else{
							div = doAddField(false);
						}
						$(div).find("input[name='barriermouldfield.fieldName']").val(data[i].fieldName);
						$(div).find("input[name='barriermouldfield.fieldDicVal']").val(data[i].fieldDicVal);
						$(div).find("input[name='barriermouldfield.fieldDicName']").val(data[i].fieldDicName);
						$(div).find("input[name='barriermouldfield.barrier']").val(data[i].fieldDicName);
						$(div).find("input[name='barriermouldfield.id']").val(data[i].id);
					}
					if (flag) {
						if (data[i].ifquery=='1') {
							$(div).find("input[name='barriermouldfield.ifquery']").val('是');
						}else{
							$(div).find("input[name='barriermouldfield.ifquery']").val('否');
						}
						if (data[i].ifrequired=='1') {
							$(div).find("input[name='barriermouldfield.ifrequired']").val('是');
						}else{
							$(div).find("input[name='barriermouldfield.ifrequired']").val('否');
						}
					}else{
						$(div).find("input[name='barriermouldfield.ifquery']").val(data[i].ifquery);
						$(div).find("input[name='barriermouldfield.ifrequired']").val(data[i].ifrequired);
					}
				}
			}
		}

	function clearData() {//清空表单数据 
			$("#mouldId").val('');
			$("#mouldValue").val("");
			$("#mouldName").val("");
			$("#remark").val("");
			$(".fieldContainer").empty(); 
			$(".fieldSelectContainer").empty(); 
		}
	//将值设入岗位模板详细
	function setDetailInfo(data) {
			$("#mouldId").val(data.id);
			$("#mouldValue").val(data.mouldValue);
			$("#mouldName").val(data.mouldName);
			$("#rank").val(data.rank);
			$("#remark").val(data.remark);
		}

	function doValidate() {
			var isPassValidate = $("#mainForm").validateForm();
			if (!isPassValidate) {
				$.showConfirmModal({
					title : "有消息未填写",
					msg : "您有必填项未填写。请检查后提交"
				})
				return;
			}
			$.showConfirmModal({
				title : "确认提交",
				msg : "您确认提交该模板吗？",
				yes : function() {
					doSave();
				}
			})
		}

	function doSave() {
			$.hideConfirmModal();
			ajaxGetDatas( BASEPATH + "/barrierMould/doSaveBarrierMould.do",
				 	$("#mainForm").serialize(),
				 	function(data){
						getTreeData();
						setTimeout(function() {
							$.showTipsModal("保存成功", "保存成功 ")
						}, 500);
						clearContent();
					},"application/x-www-form-urlencoded");
		}