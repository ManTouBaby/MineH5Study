
/*
 * iview 级联控件封装
 * 
 * author: 莫梦琦
 * 
 * */

/*
 * 例子：
 * 
 * <unit-select ：initdeptid="deptId" :initdeptname="deptName" :deptid.sync="deptId" :deptname.sync="deptName"></unit-select >
 * 
 * 
 * */



var unit_selectComponents = {
	template : '<Cascader :data="unit_select_selectUnitData" v-model="unit_select_selectedUnitData" :load-data="unit_select_loadData" change-on-select></Cascader>',
	props : {
		isqueryinnerunit : {
			required : false
		},
		initdeptid : null,
		initdeptname : null
	},
	data : function() {
		return {
			unit_select_nowUserUnitData : new Object(),
			unit_select_selectedUnitData : new Array(),
			unit_select_selectUnitData : new Array(),
			unit_select_selectAllUnitData : new Array()
		}
	},
	methods : {
		unit_select_loadData : function(item, callback) {
			var unit_selectVM = this
			item.loading = true;
			var isQIU = "0";
			if (this.isqueryinnerunit && this.isqueryinnerunit == "1") {
				isQIU = "1"
			}
			$.ajax({
				url : BASEPATH + "/iView/unit/getDeptTreeData.do",
				type : "GET",
				cache : false,
				data : {
					id : item.value,
					isQueryInnerUnit : isQIU
				},
				success : function(data) {
					item.children = new Array();
					if (data && data.length > 0) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].children) {
								item.children.push({
									value : data[i].id,
									label : data[i].name,
									children : [],
									loading : false
								})
							} else {
								item.children.push({
									value : data[i].id,
									label : data[i].name
								})
							}
							unit_selectVM.unit_select_selectAllUnitData.push({
								id : data[i].id,
								name : data[i].name
							})
						}
					} else {
						item.children = [], item.loading = undefined
					}
					item.loading = false;
					callback();
				}
			})
		}
	},
	watch : {
		unit_select_selectedUnitData : function() {
			console.log(11111)
			var selectedUnit = {
				deptName : "",
				deptId : ""
			};
			var k = this.unit_select_selectedUnitData.length - 1;
			for (var i = 0; i < this.unit_select_selectAllUnitData.length; i++) {
				if (this.unit_select_selectAllUnitData[i].id == this.unit_select_selectedUnitData[k]) {
					selectedUnit.deptName = this.unit_select_selectAllUnitData[i].name;
					selectedUnit.deptId = this.unit_select_selectAllUnitData[i].id;
					break;
				}
			}
			this.$emit('update:deptid', selectedUnit.deptId)
			this.$emit('update:deptname', selectedUnit.deptName)
		}
	},
	created : function() {
		var unit_selectVM = this;
		$.ajax({
			url : BASEPATH + "/general/getCurrentUserUnitInfo.do",
			type : "GET",
			cache : false,
			success : function(data) {
				unit_selectVM.this_user_unit_info = data.data;
				var isQIU = "0";
				if (unit_selectVM.isqueryinnerunit && unit_selectVM.isqueryinnerunit == "1") {
					isQIU = "1"
				}
				$.ajax({
					url : BASEPATH + "/iView/unit/getDeptTreeData.do",
					type : "GET",
					cache : false,
					data : {
						id : unit_selectVM.this_user_unit_info.id,
						isQueryInnerUnit : isQIU
					},
					success : function(data) {
						if (data && data.length > 0) {
							unit_selectVM.unit_select_selectUnitData.push({
								value : unit_selectVM.this_user_unit_info.id,
								label : unit_selectVM.this_user_unit_info.name,
								children : [],
								loading : false
							})
						} else {
							unit_selectVM.unit_select_selectUnitData.push({
								value : unit_selectVM.this_user_unit_info.id,
								label : unit_selectVM.this_user_unit_info.name
							})
						}
						unit_selectVM.unit_select_selectAllUnitData.push({
							id : unit_selectVM.this_user_unit_info.id,
							name : unit_selectVM.this_user_unit_info.name
						});
						if (unit_selectVM.initdeptid && unit_selectVM.initdeptname && unit_selectVM.initdeptid != unit_selectVM.this_user_unit_info.id) {
							unit_selectVM.unit_select_selectUnitData.push({
								value : unit_selectVM.initdeptid,
								label : unit_selectVM.initdeptname
							})
							unit_selectVM.unit_select_selectAllUnitData.push({
								id : unit_selectVM.initdeptid,
								name : unit_selectVM.initdeptname
							});
							unit_selectVM.unit_select_selectedUnitData.push(unit_selectVM.initdeptid);
						} else {
							unit_selectVM.unit_select_selectedUnitData.push(unit_selectVM.this_user_unit_info.id);
						}
					}
				})
			}
		})
	}
}