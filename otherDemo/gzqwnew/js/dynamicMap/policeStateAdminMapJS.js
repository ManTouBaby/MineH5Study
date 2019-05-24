/**
 * 地图主对象    */
var map;
/**
 * 地图操作工具条，包括放大，缩小，全图，前一视图，后一视图，撤销，漫游	*/
var navToolbar;
/**
 * 地图layer  */
var vector;
var raster;
var vecRas;

/**
 * */
var drawingID;
var popup;
var isTimeContinue;
var drawLines;
var drawLinesLength;
var sumLong_drawLines;
var linesNode = [];

//测算服务包括距离量算，面积量算，更新坐标位置
var geometryDraw;
var geometryLayer;
//量算距离和面积的服务
var geometryService;
//地图画图工具,划框 划圆
var navDraw;
var drawLayer;

/**
 * 警员图层	*/
var jyLayer;	
/**
 * 轨迹图层	*/
var trackLayer;	
/**
 * 路面巡逻防控网图层	 */
var xlLayer;	
/**
 * 社区防控网图层	*/
var sqLayer;
/**
 * 视频监控网图层	*/
var spLayer;
/**
 * 重点目标网图层	*/
var zdLayer;
/**
 * 三道防线图层	*/
var sdLayer;

var searchLayer;
/**
 * 警员List	*/
var policeList = null;

var deptId = "";

/**
 * 查询时用到的通用参数Object
 */
var param_obj = new Object();
	param_obj.depId = deptId;
var img ="../";
function mapinit() {	
		dojo.require("esri.map");
		dojo.require("esri.toolbars.draw");
		dojo.require("esri.toolbars.navigation");
		dojo.require("esri.graphic");
		dojo.require("esri.symbols.SimpleLineSymbol");
		dojo.require("esri.symbols.SimpleMarkerSymbol");
		dojo.require("esri.symbols.SimpleFillSymbol");
		dojo.require("esri.symbols.TextSymbol");
		dojo.require("esri.geometry.Polygon");
		dojo.require("esri.geometry.Polyline");
		dojo.require("esri.geometry.Point");
		dojo.require("esri.layers.FeatureLayer");
		dojo.require("esri.Color");
		dojo.require("esri.SpatialReference");
		dojo.require("esri.tasks.geometry");
		dojo.require("esri.tasks.GeometryService");
		dojo.require("esri.dijit.InfoWindow");
		//是否检测CORS
		esri.config.defaults.io.corsDetection = false;
		//代理页，是否一直使用代理
		esriConfig.defaults.io.proxyUrl = "../inc/proxy.jsp";
		esriConfig.defaults.io.alwaysUseProxy = false;

		dojo.ready(init);
	}

	function init() {
		if(mapflag=="dutyStatis"){
			img = "../../"
		}
		
			initPGISLayer();
			map = new esri.Map("mapDiv", {
//				center : new esri.geometry.Point(113.859079, 22.951529),
				center : new esri.geometry.Point(113.264780,23.123900),
				zoom : 10,
				autoResize : true,
				slider : true,// 左上的缩放 +/-;
				logo : false,// 右下的esri logo
				showAttribution : false
			});
			// 加载图层
			vector = new esri.layers.CCFPGISLayer(util.MapURL);
			raster = new esri.layers.CCFPGISLayer(util.MapRasterURL);
			vecRas = new esri.layers.CCFPGISLayer(util.MapVecRasURL);
			raster.hide();
			vecRas.hide();
			map.addLayer(vector);
			map.addLayer(raster);
			map.addLayer(vecRas);

			// 叠加警员图层
			jyLayer = new esri.layers.GraphicsLayer({
				id : "jyLayer",
				opacity : 1
			});

			// 轨迹回放图层
			trackLayer = new esri.layers.GraphicsLayer({
				id: "trackLayer",
				opacity:1
			});
			xlLayer = new esri.layers.GraphicsLayer({
				id : "zx",
				opacity : 1
			});

			//叠加巡区图层
			sqLayer = new esri.layers.GraphicsLayer({
				id: "sq",
				opacity:0.7
			}); 

			spLayer = new esri.layers.GraphicsLayer({
				id: "sp",
				opacity:0.7
			}); 
			zdLayer = new esri.layers.GraphicsLayer({
				id: "zdmb",
				opacity:0.7
			});
			sdLayer = new esri.layers.GraphicsLayer({
				id: "sdfx",
				opacity:0.7
			}); 
			
			// 空间查询图层
			searchLayer = new esri.layers.GraphicsLayer({opacity:1,id: "searchLayer"});

			map.addLayer(xlLayer);
			map.addLayer(sqLayer);
			map.addLayer(spLayer);	
			map.addLayer(zdLayer);
			map.addLayer(sdLayer);
			map.addLayer(jyLayer);
			map.addLayer(trackLayer);
			map.addLayer(searchLayer);
			
			util.initMapStatusBar(map);

			xlLayer.hide();
			sqLayer.hide();
			spLayer.hide();
			zdLayer.hide();
			sdLayer.hide();
			trackLayer.hide();	

			loadjyLayer();
			loadDyLayer();

			dojo.connect(jyLayer,"onClick",showInfoWindow);

			/**
			 * 显示警员信息
			 */
			function showInfoWindow(evt){
				if(null!=evt.graphic){
					var infoWindow = new esri.dijit.InfoWindow();
					map.infoWindow.setTitle(evt.graphic.attributes.infoTitle);
					map.infoWindow.setContent(evt.graphic.attributes.infoContent);
					map.infoWindow.show(evt.graphic.geometry);
				}

				// 各类型单元报备情况 30分钟获取一次
				setInterval("loadDyLayer()",1800000); 
				//获取警员工作情况和定位信息
				if('WebSocket' in window){
					//浏览器支持ws的15分钟更新一次 
					setInterval("loadjyLayer()",900000); 
				}else{
					//浏览器不支持的以轮询为主
					setInterval("loadjyLayer()",30000); 
				}
			}
		}

/**
 * 加载警员信息 - 数据上图
 */
function loadjyLayer(unitId) {
	
	var deptId = getCookieValue("xdeptId");
		if(unitId){
			deptId = unitId;
		}
		var dataObj = {
				"deptId" : deptId
		};
	
	 ajaxGetDatas(BASEPATH + "/policeState/getLocaList.do",
				 	dataObj, function(data){
						if('error' == data.data){
							return;
						}
						policeList = data.data;
						// 每次上图前 清空上次数据
						jyLayer.clear();
						if(policeList){
						for (var i = 0; i < policeList.length; i++) {
							var obj = policeList[i];
							var lon = obj.lon;
							var lat = obj.lat;
							var attributes = new Object();
			
							attributes.lon = lon;
							attributes.lat = lat;
							attributes.locationid = obj.locationid;
			
							var poList = obj.barrierList;
							var poArr = new Array();
							if (poList != null && poList.length > 0) {
								var info = "";
								var policeId = "";
								var barrierJobName ="";
								for (var k = 0; k < poList.length; k++) {
									var att = new Object();
									policeId += poList[k].policeid + ",";
									att.policeName = poList[k].policeName;
									att.mobilePhone = poList[k].mobilephone;
									att.job = poList[k].job;
									att.dutyType = poList[k].dutytype;
									att.dutyname = poList[k].mainUnitName;
									att.dutyJobId = poList[k].dutyjobid;
									att.dutyform = poList[k].dutyform;
									barrierJobName = poList[k].barrierName;
									if(barrierJobName==""||barrierJobName==null||barrierJobName==undefined){
										barrierJobName ="-";
									}
									info += "<div><b class='dutyTitle'>警员名称:</b><span class='dutyContent'> " + att.policeName + "</span></div>";
									// info += "<div><b class='dutyTitle'>职务:</b><span
									// class='dutyContent'> " + attributes.job +
									// "</span></div>";
									info += "<div><b class='dutyTitle'>电话:</b><span class='dutyContent'>" + att.mobilePhone + "</span></div>";
									info += "<div><b class='dutyTitle'>工作内容:</b><span class='dutyContent'> <a onclick='openDutyDetailWin(\"" + att.dutyJobId + "\",\"" + barrierJobName + "\",\"" + att.dutyform + "\",\"" + att.dutyType + "\")'>" + barrierJobName + "</a></span></div>";
									info += formatStatus4View(obj, poList[k]);
									poArr.push(att);
								}
								attributes.mapId = policeId;
								attributes.poList = poArr;
								attributes.infoTitle = "警员";
								attributes.infoContent = info;
								var drawGraphic = new esri.Graphic(new esri.geometry.Point(lon, lat), new esri.symbol.PictureMarkerSymbol(img+"img/GIS//policeLocation.png", 35, 42, 0, 21), attributes);
								jyLayer.add(drawGraphic);
							}
						}
					}
						console.log("警员图层加载成功");
					},"application/x-www-form-urlencoded");

}


/**
 * 加载各类型单元报备情况信息
 */
function loadDyLayer(unitId){
	var dataList = null;
	
	var url = BASEPATH+"/barrier/getStateBarrierByDept.do";
	var deptId = getCookieValue("xdeptId");
	if(unitId){
		deptId = unitId;
	}
	var dataObj = {
			"deptId" : deptId
	};
	
	ajaxGetDatas(url, dataObj, function(data){
		if(data.data==null){
				return;
			}
			//路面巡逻
			loadLayer($.parseJSON(data.data).barrier1,xlLayer,"路面巡逻");
			//社区防控网
			loadLayer($.parseJSON(data.data).barrier2,sqLayer,"社区防控");
			//视频监控网
			loadLayer($.parseJSON(data.data).barrier3,spLayer,"视频监控");
			//重点目标网
			loadLayer($.parseJSON(data.data).barrier4,zdLayer,"重点目标");
			//三道防线
			loadLayer($.parseJSON(data.data).barrier5,sdLayer,"三道防线");
	}, "application/x-www-form-urlencoded")
}



function loadLayer(data,inlayer,title){
	//console.log("xzzz");
	//console.log(data);
	if(data==null || data.length<1){
		return;
	}
	dataList = data;
	inlayer.clear();
	for (var i =0;i< dataList.length ;i++){
		var attributes = new Object();
		// 添加页面表单信息
		var obj = dataList[i];
		if(obj.xlDeptName == null)
			obj.xlDeptName = "-";
		if(obj.typeName1 == null)
			obj.typeName1 = "-";
		if(obj.typeName2 == null)
			obj.typeName2 = "-";
		if(obj.address == null)
			obj.address = "-";
		attributes.mapId =obj.id;
		attributes.barrierName = obj.barrierName;
		attributes.pointinfo = obj.pointInfos;
		attributes.xlDeptName = obj.xlDeptName;
		attributes.typeName1 = obj.typeName1;
		attributes.typeName2 = obj.typeName2;
		attributes.address = obj.address;
		//console.log(attributes.pointinfo);
		attributes.onDuty = obj.onDuty;
		var pi = attributes.pointinfo;
		if(attributes.pointinfo == null || attributes.pointinfo.length<1){
			continue;
		}
		//var arr = changePoint(pi);
		var pointList;
		var onDuty;
		var lineSymbol;
		var layer;
		
//		if(attributes.onDuty != null){
//			onDuty = "已排班";
//			lineSymbol = new esri.symbols.SimpleLineSymbol({width:3,style:"solid",color:new esri.Color([76,174,76,1])});
//			layer = inlayer;
//		}else{
//			continue;
//		}
		onDuty = "已排班";
		if(obj.addressType=='point'){
			symbol = new esri.symbol.PictureMarkerSymbol(img+"img/GIS/position-icon.png", 22,32);
		}else if (obj.addressType =="line" || obj.addressType == "polyline") {
			symbol = new esri.symbol.SimpleLineSymbol({width:3,style:"solid",color:new esri.Color([76,174,76,1])});
		}
		else{
			symbol = new esri.symbol.SimpleLineSymbol({width:3,style:"solid",color:new esri.Color([76,174,76,1])});
			symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,symbol,new esri.Color([0,51,153,1]));
		}
		
		layer = inlayer;
		
		var info ="";
		info += "<div><b class='dutyTitle'>巡组名称:</b><span class='dutyContent'><a onclick='openDutyDetailWin(\""+attributes.mapId+"\",\""+attributes.barrierName+"\",\"0\")'>" + attributes.barrierName + "</a></span></div>";
//		info += "<div><b class='dutyTitle'>是否排班:</b><span class='dutyContent'> " + onDuty + "</span></div>";
		info += "<div><b class='dutyTitle'>责任单位:</b><span class='dutyContent'> " + attributes.xlDeptName + "</span></div>";
		info += "<div><b class='dutyTitle'>巡逻类别:</b><span class='dutyContent'> " + attributes.typeName1 + "</span></div>";
		info += "<div><b class='dutyTitle'>巡逻方式:</b><span class='dutyContent'> " + attributes.typeName2 + "</span></div>";
		info += "<div><b class='dutyTitle'>路段位置:</b><span class='dutyContent'> " + attributes.address + "</span></div>";
		var infoTemplate = new esri.InfoTemplate();
		infoTemplate.setTitle(title);
		infoTemplate.setContent(info);
		
		var _line = new esri.geometry.Polyline(attributes.pointinfo);
		if(obj.addressType=='point'){
			pointList = getPoint(obj);
			_line = new esri.geometry.Point(pointList);
		}
		var drawGraphic =new esri.Graphic(_line,symbol,attributes);
		drawGraphic.setInfoTemplate(infoTemplate);
		layer.add(drawGraphic);
		//map.graphics.add(drawGraphic); 
	}
	console.log("添加成功");
}


/**
 * 获取某个设备的历史轨迹
 * @param id
 */
function traceTrack(id){
	window.clearInterval(drawingID);
	trackLayer.clear();
	layer = jyLayer;
	var startIconPath =  BASEPATH + "/static/img/GIS/start.png";
	var endIconPath =  BASEPATH + "/static/img/GIS/end.png";


	if(id != null && ''!=id){
		
		ajaxGetDatas(BASEPATH + "/DutySupervise/getHistory.do", 
			{simId : id},
		function(data){
			if(data!=null && ''!=null){
					layersClear();
					trackLayer.show();
					map.infoWindow.hide();
					var attributes = new Object();
					var xNum = data[0].LONGITUDE.trim();
					var yNum = data[0].LATITUDE.trim();
					x2 = data[data.length-1].LONGITUDE.trim() + 0;
					y2 = data[data.length-1].LATITUDE.trim() + 0;
					var startGraphic =new esri.Graphic(new esri.geometry.Point(xNum,yNum), new esri.symbol.PictureMarkerSymbol(startIconPath, 30,53),attributes);

					var point = new esri.geometry.Point(parseFloat(xNum),parseFloat(yNum));
					map.centerAndZoom(point,12);	


					setTimeout(function(){
						var endGraphic =new esri.Graphic(new esri.geometry.Point(x2,y2), new esri.symbol.PictureMarkerSymbol(endIconPath, 30,53),attributes);
						trackLayer.add(startGraphic);
						trackLayer.add(endGraphic);
						//
						var lines = new Array();
						for(var i=0;i<data.length;i++){
							var arr = new Array();
							arr.push(data[i].LONGITUDE);
							arr.push(data[i].LATITUDE);
							lines.push(arr);
						}
						drawLines = [];
						drawLines = lines;
						//console.log("长度:"+drawLines.length);
						drawLinesLength = drawLines.length;
						sumLong_drawLines = drawLines.length;
						isTimeContinue = true;
						drawingID = window.setInterval(drawLine,1000);
					},1500);


				}
	}, "application/x-www-form-urlencoded","GET")

	}	
}

/**
 * 地图画线
 */
function drawLine(){
	//console.log("draw...");
	if(isTimeContinue){

		var pointA = drawLines[sumLong_drawLines - drawLinesLength];
		var pointB = drawLines[sumLong_drawLines - drawLinesLength + 1];
		linesNode.push(pointA);
		linesNode.push(pointB);

		var attributes =new Object();
		var lineSymbol = new esri.symbol.SimpleLineSymbol({width:3,style:"solid",color:new esri.Color([2,104,48,0.9])});
		var _line=new esri.geometry.Polyline(linesNode);	
		var drawGraphic =new esri.Graphic(_line, lineSymbol,attributes);
		trackLayer.add(drawGraphic);
		//console.log("line:"+new Date());
		linesNode = [];
		drawLinesLength--;
		if(drawLinesLength <=1)
			isTimeContinue = false;
			
	} else {
		//console.log(point);
		window.clearInterval(drawingID);
		console.log('历史轨迹加载完毕');
		//xNum = 0;
		//yNum = 0;
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
 * 图形对象中坐标
 * @param geometry 几何图形对象
 * @returns
 */
function getPoint(geometry){
	if("point"==geometry.addressType){
		var dataStrArr = geometry.pointInfo.split(' ');
		var dataDoubleArr = [];
		dataStrArr.forEach(function(data,index,arr){
			dataDoubleArr.push(data*1);
		});
		return  dataDoubleArr;
	}else{
		//polyline or polygon 
		var geometryArray = geometry.pointInfo.split(',');
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
 * 缩放回默认层级	*/
function wholeMap(){
	var center=	new esri.geometry.Point(113.264780,23.123900);
	map.centerAndZoom(center,8);
	param_obj.depId = null;
}

function layersClear(){
	jyLayer.hide();
	trackLayer.hide();	
	searchLayer.hide();
}

function toggleLayer(node){
	var layer_str = node.value;
	var layer_temp = map.getLayer(layer_str);
	if(node.checked){
		if(layer_temp)
			layer_temp.show();
	}
	else{
		if(layer_temp)
			layer_temp.hide();
	}
}


/**
 * 打开工作单位详细信息窗口
 * @param dutyId
 * @param dutyname
 * @param dutyType
 * @param dt
 */
function openDutyDetailWin(dutyId,dutyname,dutyType,dt){
	if(dt == 'zbld')
		return;
	
	if("1" == dutyType)
		var url = BASEPATH + "/barrierReport/toBarrierCal.do?1=1&barrierId="+dutyId;
	else
		return;
	
	
	var leftwidth = ($(document).width() - 980) / 2 ;
	$("#barrierIframe").html("");
	$('#barrierWin').dialog({title:dutyname,top:10,left:leftwidth});
	$('#barrierWin').dialog('open');
	

	//if("1" == dutyType)
		//var url = "";
	$("#barrierIframe").attr("src",url);
}

/**
 * 格式化地图上警员的详细信息
 * 
 * @param att
 * @param row
 * @returns
 */
function formatStatus4View(att, row) {
	var str = '';
	var modelDIV = $("#statusModel").clone(true);
	modelDIV[0].id = "";
	var html = modelDIV[0].innerHTML;
	if (row.dutyform == '1') {
		html = html.replace(/66666/g, 'dayDiv');
		html = html.replace(/77777/g, '日常');
	} else {
		html = html.replace(/66666/g, 'misDiv');
		html = html.replace(/77777/g, '任务');
	}
	var dn = row.policestatename;
	html = html.replace(/88888/g, 'height:30px;background:#57B25E;');
	html = html.replace(/99999/g, dn);

	 html = html.replace(/33333/g, '历史轨迹');
	html = html.replace(/55555/g, 'height:30px;width:50px;background:#577EB2;cursor:point;');
	html = html.replace(/44444/g, att.locationid);
	return html;
}
