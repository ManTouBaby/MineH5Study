/**
 * 获取单位树
 * @param {Object} item
 * @param {Object} callback
 */
function getUnitTreeComnbo(item, callback){
	   			item.loading = true;
				 ajaxGetDatas(BASEPATH + "/unitRest/getUnitListByParentId.do", 
				 	{id: item.value}, function(res){
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
					},"application/x-www-form-urlencoded");
}

/**
 * 获取岗位下拉树
 * @param {Object} item
 * @param {Object} callback
 */
function getBarrierTypeTreeComnbo(item, callback){
	item.loading = true;
	 ajaxGetDatas(BASEPATH + "/barrierMould/getBarrierMouldListByParentId.do",
				 	{id: item.id}, function(res){
						var arrChildren = [];
							if(res && res.data){
								for(var i=0; i<res.data.length; i++){
									var obj = res.data[i];
									if(obj.iftail == "1"){
										arrChildren.push({
											id : obj.id,
											value: obj.mouldValue,
											label: obj.mouldName
										});
									}else{
										arrChildren.push({
											id : obj.id,
											value: obj.mouldValue,
											label: obj.mouldName,
											children: [],
			                        		loading: false
										});
									}
									
								}
							}
							item.children = arrChildren;
							item.loading = false;
							callback();
					},"application/x-www-form-urlencoded");
}


function getVmComboDictionary(dictType,item,callback) {
	item.loading = true;
	 ajaxGetDatas(BASEPATH + "/general/dictionary/getDictionaryByDictType.do",
				 	{dictType: dictType}, function(res){
						var arrChildren = [];
							if(res){
								for(var i=0; i<res.length; i++){
									var obj = res[i];
										arrChildren.push({
											id : obj.id,
											value: obj.dictValue,
											label: obj.dictName
										});
								}
							}
							item.children = arrChildren;
							item.loading = false;
							callback();
					},"application/x-www-form-urlencoded");
}


/**
 * 设置值 value 和 name
 */
function setValue(labels, selectedData,id){
	if(selectedData!=null&&selectedData!=undefined&&selectedData!=''){
									var definedId =  selectedData[selectedData.length - 1].id;
									var defined = selectedData[selectedData.length - 1].value;
									var definedNAME = selectedData[selectedData.length - 1].label;
									$("#"+id).val(definedId);
									$("#"+id+"ID").val(defined);
									$("#"+id+"NAME").val(definedNAME);
								}
}

/**
 * 设置值 value 和 name
 */
function setVmValue(labels, selectedData,id,odata){
	if(selectedData!=null&&selectedData!=undefined&&selectedData!=''){
									var definedID = selectedData[selectedData.length - 1].value;
									var definedNAME = selectedData[selectedData.length - 1].label;
									odata[id]= definedID;
									odata[id+"ID"]= definedID;
									odata[id+"Name"] = definedNAME;
									odata[id+"NAME"] = definedNAME;
								}
}