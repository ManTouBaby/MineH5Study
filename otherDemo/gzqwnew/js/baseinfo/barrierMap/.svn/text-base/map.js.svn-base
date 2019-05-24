var map, editToolbar,tb; 
var linePoint=new Array();
var pointStr;
var type;
var drawFlag = false,editFlag=false;
dojo.require("esri.toolbars.draw");
dojo.require("esri.graphic");
dojo.require("esri.dijit.InfoWindow");
var pointLayer , lineLayer, polyGonLayer;
var pointGraphic;
var graphic;
var pointObject;
var pointData=new Array();
require([
	"esri/map", 
	"esri/toolbars/edit",
	"esri/graphic",

	"esri/geometry/Point",
	"esri/geometry/Polyline",
	"esri/geometry/Polygon",

	"esri/symbols/SimpleLineSymbol",
	"esri/symbols/SimpleFillSymbol",
	"esri/symbols/TextSymbol",

	"dojo/_base/event",
	"dojo/parser",
	"dojo/dom", 
	"dojo/dom-style", 
	"dijit/registry", 
	"dijit/Menu",


	"dijit/form/ToggleButton",
	"dijit/form/DropDownButton",
	"dijit/CheckedMenuItem",
	"dijit/layout/BorderContainer", 
	"dijit/layout/ContentPane", 
	"dojo/domReady!"

	], function(
			Map, Edit, Graphic,
			Point, Polyline, Polygon,
			SimpleLineSymbol, SimpleFillSymbol, TextSymbol,
			event, parser, dom, domStyle, registry, Menu
	) {
	parser.parse();
	domStyle.set(registry.byId("mainWindow").domNode, "visibility", "visible");
	initPGISLayer();
	map = new esri.Map("map", {
//		center : new esri.geometry.Point(113.33959201407585, 23.14853101939957),
//		center : new esri.geometry.Point(113.859079, 22.951529),
		center : new esri.geometry.Point(113.264780,23.123900),
		zoom : 10,
		autoResize:true,
		//nav:true,//8个pan 箭头
		slider:true,//左上的缩放 +/-;
		logo:false,//右下的esri logo
		showAttribution:false//右下的gisNeu (logo左侧)
	});
	
	//加载图层
	vector = new esri.layers.CCFPGISLayer(util.MapURL);
	map.addLayer(vector);
	
	raster = new esri.layers.CCFPGISLayer(util.MapRasterURL);
	map.addLayer(raster);
	raster.hide();
	
	vecRas = new esri.layers.CCFPGISLayer(util.MapVecRasURL);	
	map.addLayer(vecRas);
	vecRas.hide();
	
	hisPointLayer = new esri.layers.GraphicsLayer({opacity:1,id: "hisPointLayer"});
	map.addLayer(hisPointLayer);
	
	polyGonLayer = new esri.layers.GraphicsLayer({opacity:0.6,id: "polyGonLayer"});
	map.addLayer(polyGonLayer);
	
	lineLayer = new esri.layers.GraphicsLayer({opacity:0.8,id: "lineLayer"});
	map.addLayer(lineLayer);
	
	pointLayer = new esri.layers.GraphicsLayer({opacity:1,id: "pointLayer"});
	map.addLayer(pointLayer);
	
	
//	if(barrierType == 'yjzblx'){
//		loadHisLayer();
//	}
	
	if(pointData.length!=0){
		pointObject = eval('('+pointData+')');
		if(pointObject.length!=0)
			getCenterPoint(pointObject);
	}
	createToolbar(map);
	function createToolbar(map) {
		tb = new esri.toolbars.Draw(map);
		if(pointData.length>0){
			var pointList  = pointObject;
			for (var i = 0,size = pointList.length; i < size; i++) {
				var geometryObject =  pointList[i];
				cograph(geometryObject);
			}
		}
		editToolbar = new Edit(map);
			dojo.connect(pointLayer,"onClick",function(evt){
				if(null!=evt.graphic){
//					if((evt.graphic.geometry.type=='point')&&("3" == barrierType||"7" == barrierType)){  
						if((evt.graphic.geometry.type=='point')){
						pointGraphic = evt.graphic;
						openTable();
					}
				}
				graphic =evt.graphic; 
			});
//		}
		dojo.connect(lineLayer,"onClick",function(evt){
			if(editFlag){
				event.stop(evt);
				graphic =evt.graphic; 
				activateToolbar(evt.graphic);
			}
		});
		dojo.connect(polyGonLayer,"onClick",function(evt){
			if(editFlag){
				event.stop(evt);
				graphic =evt.graphic; 
				activateToolbar(evt.graphic);
			}
		});

		dojo.connect(tb,"onDrawEnd", addGraphics);
	}
	function addGraphics(geometry) {
		 cleanLayer();
		tb.deactivate();
		var symbol = dojo.byId("symbol").value;

		if (symbol) {
			symbol = eval(symbol);
		} else {
			var type = geometry.type;
			if (type === "point" || type === "multipoint") {
				symbol = new esri.symbol.PictureMarkerSymbol("../../../img/GIS/position-icon.png", 22,
						32);
				drawFlag = false;
				var attributes = {
						id : "pointLayer" + pointLayer.graphics.length
				};
				var drawGraphic = new esri.Graphic(geometry, symbol,
						attributes);
				pointLayer.add(drawGraphic);
			} else if (type === "line" || type === "polyline") {
				symbol = tb.lineSymbol;
				var attributes = {
						id : "lineLayer" + lineLayer.graphics.length
				};
				var drawGraphic = new esri.Graphic(geometry, symbol,
						attributes);
				lineLayer.add(drawGraphic);
			} else {
				symbol = tb.fillSymbol;
				var attributes = {
						id : "polyGonLayer" + polyGonLayer.graphics.length
				};
				var drawGraphic = new esri.Graphic(geometry, symbol,
						attributes);
				polyGonLayer.add(drawGraphic);
			}
		}
	}

	function activateToolbar(graphic) {
		var tool = 0;
		if (registry.byId("tool_vertices").checked) {
			tool = tool | Edit.EDIT_VERTICES;
		}
		if (graphic.symbol.declaredClass === "esri.symbol.TextSymbol") {
			tool = tool | Edit.EDIT_TEXT;
		}
		var options = {
				allowAddVertices : registry.byId("vtx_ca").checked,
				allowDeleteVertices : registry.byId("vtx_cd").checked,
				uniformScaling : registry.byId("uniform_scaling").checked
		};
		editToolbar.activate(tool, graphic, options);
	}
	
	if(barrierId!=''&&barrierId!=null&&barrierId!=undefined){
				getBarrier();
			}else{
				loadFields();
	}
});


/**
 *设置选中图形的infoTemplate 
 * @returns
 */
function setTemplate(){
	var name = $("#point_name").val();
	var type = $("#point_type").val();
	var typeName = $("#point_type").find("option:selected").text();
	var describe = $("#point_describe").val();
	if(""==name||""==describe){
		alert("名称描述不能为空!");
		return ;
	}
	if(""==typeName||""==type){
		alert("请选择点位类型!");
		return ;
	}
	var infoTemplate = new esri.InfoTemplate();
	var info = "";
	info += "<div><b class='dutyTitle'>名称:</b><span class='dutyContent'> " + name + "</span></div>";
	info += "<div><b class='dutyTitle'>属性:</b><span class='dutyContent'> " + typeName + "</span></div>";
	info += "<div><b class='dutyTitle'>描述:</b><span class='dutyContent'> " + describe + "</span></div>";
	info += "<div><a href='javascript:void(0)' onclick='deletePoint()'>删除</a></div>";
	var symbolImg;
	if(type=="jjPoint"){
		infoTemplate.setTitle("交接点");
		symbolImg=new esri.symbol.PictureMarkerSymbol("../../../img/GIS/jjwpb.png", 35,35);
	}else{
		 symbolImg=new esri.symbol.PictureMarkerSymbol("../../../img/GIS/gxwpb.png", 35,35);
		infoTemplate.setTitle("工歇点");
	}
	pointGraphic.setSymbol(symbolImg);
	infoTemplate.setContent(info);
	pointGraphic.setInfoTemplate(infoTemplate);
	pointGraphic.attributes.pointName = name;
	pointGraphic.attributes.pointType = type;
	pointGraphic.attributes.pointDesc = describe;
	$("#point_name").val("");
	$("#point_Type").prop("selected","selected");
	$("#point_describe").val("");
	$("#divTable").hide();
}
/**
 * 关闭展示交接点信息
 * @returns
 */
function closeDivTable(){
	$("#divTable").hide();
	$("#point_name").val("");
	$("#point_describe").val("");
	$("#point_Type").prop("selected","selected");
}

function startCommonDraw(type) {
	drawFlag = true;
	if (null != type) {
		if (type == "point") {
			tb.activate(esri.toolbars.Draw.POINT);
		} else if (type == "polyline") {
			tb.activate(esri.toolbars.Draw.POLYLINE);
		} else if (type == "polygon") {
			tb.activate(esri.toolbars.Draw.POLYGON);
		}
	}
}
/**
 * 打开infoTemplate 
 * 展示交接点的信息
 * @returns
 */
function openTable() {
	if(null!=pointGraphic.infoTemplate){
		$("#point_name").val(pointGraphic.attributes.pointName);
		$("#point_Type").prop("selected","selected");
		$("#point_type option[value='"+pointGraphic.attributes.pointType+"']").prop("selected","selected");
		$("#point_describe").val(pointGraphic.attributes.pointDesc);
	}
	$("#divTable").show();
}

function deletePoint(){
	console.log(pointGraphic);
	closeDivTable();
	pointLayer.remove(pointGraphic);
	
}
/**
 * 开始标绘  根据父页面传递的类型  进行选择工具
 * @returns
 */
function startDraw() {
	drawFlag = true;
	cleanLayer();
	if (mapType == "point") {
		tb.activate(esri.toolbars.Draw.POINT);
	} else if (mapType == "polyline") {
		tb.activate(esri.toolbars.Draw.POLYLINE);
	} else if (mapType == "polygon") {
		tb.activate(esri.toolbars.Draw.POLYGON);
	}
}

function cleanLayerGraphics(){
	console.log(graphic);
}

function deleleGraphics(){
	if(null != graphic && editFlag){
		var layars =  graphic.getLayer();
		var delFlag = confirm("是否要删除选中的图形?");
		if(delFlag){
			layars.remove(graphic);
		}
	}else{
		alert("请先打开编辑功能后，再点击要删除的标绘图形!");
	}
}

/**
 * 清除图层上多余的图形 初始化坐标
 * @returns
 */
function cleanLayer() {
	var pointList = pointLayer.graphics;
	var lineList = lineLayer.graphics;
	var polyGonList = polyGonLayer.graphics;
	while (pointList.length > 0) {
		pointLayer.remove(pointList[0]);
	}
	while (lineList.length > 0) {
		lineLayer.remove(lineList[0]);
	}
	while (polyGonList.length > 0) {
		polyGonLayer.remove(polyGonList[0]);
	}
}


/**
 * 保存点位
 * @returns
 */
function savePoint() {
	if (pointLayer.graphics.length != 0||lineLayer.graphics.length != 0||polyGonLayer.graphics.length != 0) {
		changePoint();
//		window.parent.closeDrawWin();
	} else {
		alert("请在开始标绘后,标绘地图!");
	}

}
/**  
 * 将地图上 pointLayer lineLayer polyGonLayer 
 * 三个图层中的几何图形对象的点位转为数据库存放格式 x y 
 * @returns
 */
function changePoint() {
	var pointGraphics =  pointLayer.graphics;
	var lineGraphics =  lineLayer.graphics;
	var polyGonGraphics =  polyGonLayer.graphics;
	var pointArr = new Array();
	pointData = new Array();
	
	if(polyGonGraphics.length!=0){
		for(var i =0,size =polyGonGraphics.length; i<size;i++){
			var polyGonPoint ="";
			var pointObject  = new Object();
			var polyGon = polyGonGraphics[i];
			var polyGonarr = polyGon.geometry.rings;
			pointObject.geometry = polyGon.geometry.type;
			for (var int = 0; int < polyGonarr.length; int++) {
				var arr =polyGonarr[int];
				for(var j =0,arrsize =arr.length; j<arrsize;j++){
					var pointX = arr[j][0];
					var pointY = arr[j][1];
					polyGonPoint += pointX+" "+pointY+",";
				}
			}
			pointObject.point=polyGonPoint.substring(0, polyGonPoint.length - 1);
			pointData.push(pointObject);
		}
	}
	if(lineGraphics.length!=0){
		for(var i =0,size =lineGraphics.length; i<size;i++){
			var linePoint ="";
			var pointObject  = new Object();
			var line = lineGraphics[i];
			var linearr = line.geometry.paths;
			pointObject.geometry = line.geometry.type;
			for (var int = 0; int < linearr.length; int++) {
				var arr =linearr[int];
				for(var j =0,arrsize =arr.length; j<arrsize;j++){
					var pointX = arr[j][0];
					var pointY = arr[j][1];
					linePoint +=pointX+" "+pointY+",";
				}
			}
			pointObject.point=linePoint.substring(0, linePoint.length - 1);
			pointData.push(pointObject);
		}
	}
	if(pointGraphics.length!=0){
		for(var i =0,size =pointGraphics.length; i<size;i++){
			var pointObject  = new Object();
			pointObject.point = pointGraphics[i].geometry.x+" "+pointGraphics[i].geometry.y;
			if(null!=pointGraphics[i].infoTemplate){
				pointObject.pointName = pointGraphics[i].attributes.pointName;
				pointObject.pointDesc = pointGraphics[i].attributes.pointDesc;
				pointObject.pointType = pointGraphics[i].attributes.pointType;
			}
			pointObject.geometry = pointGraphics[i].geometry.type;
			pointData.push(pointObject);
		}
	}
	if(pointData.length>0){
		$("#addressType").val(pointData[0].geometry);
		$("#pointInfo").val(pointData[0].point);
	}
	pointData =JSON.stringify(pointData);
	var param = new Object();
	param.barrierId = barrierId;
	param.pointData = pointData;
}
/**
 * 初始化地图 将几何图形 添加对应图层
 * @param geometry 几何图形对象
 * @returns
 */
function cograph(geometry){
	if(geometry  != undefined && null != geometry ){
		var polyline;
		var symbol;
		var drawGraphic;

		var point = updatePoint(geometry);
		if("point"==geometry.geometry){
			polyline=new esri.geometry.Point(point);
			symbol=new esri.symbol.PictureMarkerSymbol("../../../img/GIS/position-icon.png", 22,32);
			var infoTemplate = new esri.InfoTemplate();
				var info ="";
				info += "<div><b class='dutyTitle'>名称:</b><span class='dutyContent'> " + geometry.pointName + "</span></div>";
				if(geometry.pointType=="jjPoint"){
					infoTemplate.setTitle("交接点");
					info += "<div><b class='dutyTitle'>属性:</b><span class='dutyContent'>交接点</span></div>";
					symbol=new esri.symbol.PictureMarkerSymbol("../../../img/GIS/jjwpb.png", 35,35);
				}else if(geometry.pointType=="gxPoint"){
					infoTemplate.setTitle("工歇点");
					info += "<div><b class='dutyTitle'>属性:</b><span class='dutyContent'>工歇点</span></div>";
					symbol=new esri.symbol.PictureMarkerSymbol("../../../img/GIS/gxwpb.png", 35,35);
				}else{
					symbol=new esri.symbol.PictureMarkerSymbol("../../../img/GIS/position-icon.png", 22,32);
				}
				info += "<div><b class='dutyTitle'>描述:</b><span class='dutyContent'> " + geometry.pointDesc + "</span></div>";
				infoTemplate.setContent(info);
			var attributes ={id:"pointLayer"+pointLayer.graphics.length};
			attributes.pointName=geometry.pointName;
			attributes.pointDesc=geometry.pointDesc;
			attributes.pointType=geometry.pointType;
			drawGraphic =new esri.Graphic(polyline, symbol,attributes,infoTemplate);
			pointLayer.add(drawGraphic);
		}else if("polyline"==geometry.geometry){
			polyline=new esri.geometry.Polyline(point);
			symbol=new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([27,14,222]),4);
			drawGraphic =new esri.Graphic(polyline, symbol);
			lineLayer.add(drawGraphic);
		}else if("polygon"==geometry.geometry){
			polyline=new esri.geometry.Polygon(point);
			symbol=new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([27,14,222]),4);
			SimpleFillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,symbol,new esri.Color([50,68,57,1]));
			drawGraphic =new esri.Graphic(polyline, SimpleFillSymbol);
			polyGonLayer.add(drawGraphic);
		}
	}
}
/**
 * 初始化图形对象中坐标
 * @param geometry 几何图形对象
 * @returns
 */
function updatePoint(geometry){
	if("point"==geometry.geometry){
		var dataStrArr = geometry.point.split(' ');
		var dataDoubleArr = [];
		dataStrArr.forEach(function(data,index,arr){
			dataDoubleArr.push(data*1);
		});
		return  dataDoubleArr;
	}else{
		//polyline or polygon 
		var geometryArray = geometry.point.split(',');
		for (var i = 0,size=geometryArray.length; i < size; i++) {
			var dataStrArr=geometryArray[i].split(' ');
			var dataDoubleArr = [];
			dataStrArr.forEach(function(data,index,arr){
				dataDoubleArr.push(data*1);
			});
			geometryArray[i]=dataDoubleArr;
		}
		return  geometryArray;
	}
}
/**
 * double 相加 (防止丢失精度)
 * @param arg1 double
 * @param arg2 double
 * @returns
 */
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}

//计算中心坐标
function getCenterPoint(point) {
	point = point[0].point;
	var pointArr = new Array();
	if (point != "" && null != point) {
		var pointStr = point.replace(/\s+/g, ',');
		pointArr = pointStr.split(',');
		if (pointArr.length == 2) {
			map.centerAndZoom(new esri.geometry.Point(pointArr[0] * 1,
					pointArr[1] * 1), 12);
		} else {
			var xSum = 0.0;
			var ySum = 0.0;
			for (var i = 0, size = pointArr.length; i < size; i++) {
				if (i % 2 == 0) {
					xSum = accAdd(xSum, pointArr[i]);
				} else {
					ySum = accAdd(ySum, pointArr[i]);
				}
			}
			var pointx = xSum / (pointArr.length / 2);
			var pointy = ySum / (pointArr.length / 2);
			map.centerAndZoom(new esri.geometry.Point(pointx, pointy), 12);
		}
	}
}
/**
 * 初始化地图
 * @returns
 */
function resizeMap() {
	cleanLayer();
	map.centerAndZoom(new esri.geometry.Point(113.264780,23.123900),10);
}
function drawEdit() {
	if (editFlag) {
		editFlag = false;
		$("#drawEdit").text("打开编辑");
		editToolbar.deactivate();
	} else {
		editFlag = true;
		$("#drawEdit").text("关闭编辑");
	}
}

//加载
function loadHisLayer(){
	 ajaxGetDatas(BASEPATH + "/equipment/getEmeEquipmentList4Map.do",
				 	{}, function(data){
						if(data == null && data.length == 0){
							return;
						}
						hisPointLayer.clear();
						for (var i =0;i< data.length ;i++){
							var obj = data[i];
							//console.log(obj);
							var lon = obj.x;
							var lat = obj.y;
							var attributes = new Object();
							attributes.lon = lon;
							attributes.lat = lat;
							attributes.pointJson = obj.pointJson;
							attributes.address = obj.address;
							
							var equipList = obj.equipList;
							var poArr = new Array();
							if(equipList != null && equipList.length > 0){
								var info = "";
								info += "<div style='margin-bottom: 10px;'>" +
										"<label style='margin-right:15px;color:#316989;font-weight: bold;'>"+obj.address+"</label>" +
										"<input type='button' id='doChoose' onclick='doChoose(this)' class='layui-btn' style='color:white;text-align: center;width:60px; height:30px; background: rgb(255, 138, 84);border:0px;' value='选择' />" +
										"<input type='hidden' class='choose_pointJson' value='"+obj.pointJson+"'/>"+
										"<input type='hidden' class='choose_address' value='"+obj.address+"'/>"+
										"</div>";
								info += "<table class = 'mainTable'><tr>";
								info += "<th>装备名称</th><th>装备类型</th><th>数量</th>";
								for(var k = 0; k < equipList.length ; k++){
									//info += "<div><b class='dutyTitle'>装备名称:</b><span class='dutyContent'> " + equipList[k].equipmentName + "</span></div>";
									//info += "<div><b class='dutyTitle'>装备类型:</b><span class='dutyContent'>" + equipList[k].equipmentTypeName + "</span></div>";
									//info += "<div><b class='dutyTitle'>数量:</b><span class='dutyContent'>" + equipList[k].quantity + "&nbsp;" + equipList[k].unit + "</span></div><br><br>";
									info += "<tr>";
									info += "<td>"+equipList[k].equipmentName+"</td>";
									info += "<td>"+equipList[k].equipmentTypeName+"</td>";
									info += "<td>"+equipList[k].quantity+" "+equipList[k].unit+"</td>";
									info += "</tr>";
								}
								info += "</tr></table>";
								var infoTemplate = new esri.InfoTemplate();
								infoTemplate.setTitle("存储地");
								infoTemplate.setContent(info);
								var drawGraphic =new esri.Graphic(new esri.geometry.Point(lon,lat), new esri.symbol.PictureMarkerSymbol("../../../img/GIS/b4.png", 35,35),attributes);
								drawGraphic.setInfoTemplate(infoTemplate);
								hisPointLayer.add(drawGraphic);
							}
						}
						console.log("仓储地添加成功");
					},"application/x-www-form-urlencoded");
}

function doChoose(obj){
	//console.log($(obj).parent().find(".choose_pointJson").val());
	//console.log($(obj).parent().find(".choose_address").val());
	
	var pointJsons = $(obj).parent().find(".choose_pointJson").val();
	var address = $(obj).parent().find(".choose_address").val();
	window.parent.pointData(pointJsons, mapType,address);
	window.parent.closeDrawWin();
}
