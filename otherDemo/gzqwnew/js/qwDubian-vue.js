
var qwDubianVue = new Vue({
	el:"#main",
	data: {
		barrierName: "天河南C1002",
		barrierId: "123424345",
		barrierParams:[
			{label: "所属辖区", value: "天河南派出所"},
			{label: "责任单位", value: "天河南派出所"},
			{label: "巡逻类别", value: "C类巡组"},
			{label: "巡逻方式", value: "机巡"},
			{label: "巡区类型", value: "巡区类型"},
			{label: "巡逻路段", value: "广州大道中"},
			{label: "班次开始时间", value: "2018-03-30 06:00"},
			{label: "班次结束时间", value: "2018-03-31 16:00"},
			{label: "工歇点", value: ""},
			{label: "备注", value: ""},
			{label: "有效开始日期", value: "2018-03-30"},
			{label: "有效结束日期", value: "2018-03-31"}
		],
		policeName: "张三",
		policeId: "5675465634523",
		policeParams:[
			{label: "警员警号", value: "028824"},
			{label: "警员类别", value: "治安警"},
			{label: "工作单位", value: "天河南派出所"},
			{label: "职位", value: "三级警长"},
			{label: "电话号码", value: "13812341234"},
			{label: "巡逻路段", value: "广州大道中"},
			{label: "响应情况", value: "2018-03-30 06:00"},
			{label: "班次结束时间", value: "正常响应"},
			{label: "备注", value: ""}
		]
	}
})
