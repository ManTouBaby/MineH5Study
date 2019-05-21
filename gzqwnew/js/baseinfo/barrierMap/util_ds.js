util = {
		GeometryServiceURL:"http://10.41.1.162:8399/arcgis/rest/services/Geometry/GeometryServer",
//		MapURL : "http://10.235.180.170:5080/PGIS_S_TileMapServer/ags2/vector/",
//		MapURL : "http://68.28.7.135:7080/PGIS_S_TileMapServer/ags/vector/",
		MapURL : "http://10.41.219.142:6080/PGIS_S_TileMapServer/ags/vector/",
		MapRasterURL : "http://10.235.180.170:5080/PGIS_S_TileMapServer/ags2/raster/",
		MapVecRasURL : "http://10.235.180.170:5080/PGIS_S_TileMapServer/ags2/vecRas/",
		addrToolServiceURL:"http://10.41.219.142/PGIS_AddrToolService/search.do",
		addrToolServiceJSONP : "http://10.41.1.167:6060/PGIS_AddrService/search.do",
		THBJ : "http://10.41.1.163:8399/arcgis/rest/services/20170412TIANHE_PCS/FQ_PCS_PG_TH/MapServer",
		PcsBoundsServiceURL:"http://10.41.1.163:8399/arcgis/rest/services/zcpcs/MapServer",
		PcsBoundsQueryServiceURL:"http://10.41.1.163:8399/arcgis/rest/services/zcpcs/MapServer/0",
		
	initExtent : null,
	jqedit_tab_colors:["yellow","yellow","yellow","yellow"],
	getRootPath : function() {
		var pathname = window.location.pathname.substr(1);
		var webname = pathname.substr(0, pathname.indexOf('/'));
		return window.location.protocol + "//" + window.location.host + "/"
				+ webname;
	},
	imgPath : function() {
		return this.getRootPath() + "/resources/images/";
	},
	dateFormat : function(date, format) {
		var o = {
			"M+" : date.getMonth() + 1, // month
			"d+" : date.getDate(), // day
			"h+" : date.getHours(), // hour
			"m+" : date.getMinutes(), // minute
			"s+" : date.getSeconds(), // second
			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
			"S" : date.getMilliseconds()
		// millisecond
		};

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		}

		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
			}
		}

		return format;
	},
	// 提示信息
	showTipMessage : function(message, title, timeout, type) {
		$.messager.show({
			msg : message,
			title : title || '操作提示',
			timeout : timeout || 3000,
			showType : type || 'slide'
		});
	},
	isEmpty : function(_value) {
		return typeof _value == "undefined" || _value == null || _value == "";
	},
	isFalse : function(_value) {
		return this.isEmpty(_value) || _value == "false" || value == "f";
	},
	initMapStatusBar : function(map) {
		var $map_info = $(window.document.body).find("#_map_info");
		var $map_zoom = $(window.document.body).find("#_map_zoom");
		dojo.connect(map, "onMouseMove", function(event) {
			var mp = event.mapPoint;
			// var mp2 = event.screenPoint;
			$map_info.text("坐标：" + mp.x.toFixed(6) + "," + mp.y.toFixed(6));
		});
		dojo.connect(map, "onMouseOut", function() {
			$map_info.text("");
		});
		dojo.connect(map, "onLoad", function(map) {
			$map_zoom.text("缩放级别:" + (map.getLevel() + 4));
		});
		dojo.connect(map, "onZoomEnd", function(anchor, extent, level,
				zoomFactor) {
			console.log("缩放级别:" + (zoomFactor + 4));
			$map_zoom.text("缩放级别:" + (zoomFactor + 4));
		});

		// 统一的填充样式
		var lineSymbol = new esri.symbol.SimpleLineSymbol(
				esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([ 6,
						93, 160, 0.9 ]), 2);
		var symbol = new esri.symbol.SimpleFillSymbol(
				esri.symbol.SimpleFillSymbol.STYLE_SOLID, lineSymbol,
				new esri.Color([ 6, 93, 160, 0.3 ]));

		$("#search_area").click(function() {
			layersClear();
			//map.graphics.clear();
			map.infoWindow.hide();
			var toolbarss = new esri.toolbars.Draw(map);
			toolbarss.activate(esri.toolbars.Draw.CIRCLE);
			toolbarss.on("draw-end", function(ext){
				toolbarss.deactivate();
				searchLayer.clear();
				searchLayer.show();
				map.setMapCursor("default");
				var graphics = jyLayer.graphics;
				for(var i=0,total=graphics.length;i<total;i++){
					if(ext.geometry.contains(graphics[i].geometry)){
						var attr = graphics[i].attributes;
						var drawGraphic =new esri.Graphic(new esri.geometry.Point(attr.lon,attr.lat), new esri.symbol.PictureMarkerSymbol(util.getRootPath()+"/static/img/GIS/policeLocation.png", 35,42,0,21),null);
						drawGraphic.setInfoTemplate(attr.infoTemplate);
						searchLayer.add(drawGraphic);
					}
				}
			});
			//toolbarss.deactivate();
		});
		// 消除地图上的graphics
		$("#map_clean").click(function() {
			util.cleanMap(map);
            crptype='0';//变为0则是没有选中范围的查询
			
		});
		$("#map_ranging").click(function() {
			map.graphics.clear();
			map.infoWindow.hide();
			var toolbar = new esri.toolbars.Draw(map);
			toolbar.deactivate();
			toolbar.activate("polyline");
			toolbar.on("draw-end", function(event) {
				toolbar.deactivate();
				var graphic = new esri.Graphic(event.geometry, lineSymbol);
				map.graphics.add(graphic);
				util.measureMap(map, event);
			});
		});
		$("#map_full").click(function() {
			util.initMapExtent(map);
		});
		$("#map_area").click(function() {
			map.graphics.clear();
			map.infoWindow.hide();
			var toolbar = new esri.toolbars.Draw(map);
			toolbar.deactivate();
			toolbar.activate("polygon");
			toolbar.on("draw-end", function(event) {
				toolbar.deactivate();
				var graphic = new esri.Graphic(event.geometry, symbol);
				map.graphics.add(graphic);
				util.measureMap(map, event);
			});
		});
		
		function initMapLocationTool(){
			if ($('#map_location_div').size() == 0) {
				var $html = $("<div id='map_location_div' data-options='closed:true'><div id='map_location_div_body'></div><div>");
				var $content = $("<div data-options='region:\"north\"' style=\"padding:4px;\">" +
						"<div>&nbsp;经度：<input id=\"map_location_lon\" type='text' class='easyui-numberbox' data-options='min:0,precision:6'/><div>" +
						"<div>&nbsp;纬度：<input id=\"map_location_lat\" type='text' class='easyui-numberbox' data-options='min:0,precision:6'/>" +
						"&nbsp;<span  class=\"easyui-linkbutton\" style=\"width:80px;\" data-options=\"iconCls:'icon-search'\" id=\"map_location_button\">定位</span></div>" +
						"关键词：<input id='key_words' type='text' class='easyui-textbox'/>"+
						"&nbsp;<span class=\"easyui-linkbutton\" style=\"width:80px;\" data-options=\"iconCls:'icon-search'\" id=\"map_location_queryButton\">查询</span>" +
						"</div>");
				var $dataContent = $("<div data-options='region:\"center\"'></div>");
				var $pager = $('<div class="easyui-pagination" data-options="region:\'south\',showPageList:false,showRefresh:false">22</div>');
				$body = $html.find("#map_location_div_body");
				$body.append($content);
				$body.append($dataContent);
				$body.append($pager);
				$.parser.parse($html);
				$("body").append($html);
				$html.find("#map_location_button").on("click",function(){
					var lon=$html.find("#map_location_lon").val();
					var lat=$html.find("#map_location_lat").val();
					if(lon>0&&lat>0){
						map.graphics.clear();
						var point=new esri.geometry.Point(lon, lat);
						var graphic=new esri.Graphic(point,new esri.symbol.PictureMarkerSymbol(util.getRootPath()+"/resources/js/easyui/themes/icons/icon_location.png",25,25));
						map.graphics.add(graphic);
						map.centerAt(point);
					}
				});
				$html.window({
					onClose : function() {
						map.graphics.clear();
					}
				});
				//公布查询方法，给外部调用
				$html.data("setAddress",function(_address,_isAutoSearch){
					$html.window({
						iconCls : "icon_location",
						title : "快速定位",
						collapsible : true,
						left:200,
						width : 320,
						closed:false,
						height : 400
					});
					$html.find("#key_words").textbox("setValue",_address);
					queryForLocation();
				});
				$pager.pagination({
					onSelectPage : function(_arg1, _arg2) {
						queryForLocation();
					}
				});
				function createDataItem(_itemData){
					var itemDomHtml = null;
					if(_itemData.address==_itemData.addressLong){
						itemDomHtml = "<div class='map-location-row'><table valign='middle'><tr><td class='map-location-address'>{address}</td></tr></table></div>";
					}else{
						itemDomHtml = "<div class='map-location-row'><table valign='middle'><tr><td><span class='map-location-address'>{address}</span><br><span class='map-location-address-long'>地址：{addressLong}</span></td></tr></table></div>";
					}
					var itemDom = $(itemDomHtml);
					itemDom.html(itemDom.html().format(_itemData));
					itemDom.on("click",function(){
						map.graphics.clear();
						var point=new esri.geometry.Point(_itemData.longitude, _itemData.latitude);
						var graphic=new esri.Graphic(point,new esri.symbol.PictureMarkerSymbol(util.getRootPath()+"/resources/js/easyui/themes/icons/icon_location.png",25,25));
						map.graphics.add(graphic);
						map.centerAt(point);
						$html.trigger("onAddressRowClick",_itemData);
					});
					return itemDom;
				}
				function queryForLocation(){
					var pageData = $pager.pagination("options");
					var address = $("#key_words").val();
					if(!address || address==""){
						util.showTipMessage("请先输入关键词，再查询！");
						return;
					}
					var data = {
							keyword:address,
							numPerPage:pageData.pageSize,
							page:pageData.pageNumber?pageData.pageNumber:1
					};
					
					$.ajax(util.addrToolServiceJSONP,{
						dataType : "jsonp",
						jsonp : 'callback',
						data : data,
						success:function(data){
							if(data == ""){
								return;
							}
							var pageInfo = data[0];
							var dataArr = data.slice(1);
							$pager.pagination({
								total:pageInfo.totalDocs
							});
							
							var itemDom = null;
							$dataContent.empty();
							for(var i=0;i<dataArr.length;i++){
								itemDom = createDataItem(dataArr[i]);
								$dataContent.append(itemDom);
							}
							$html.trigger("onQueryForLocation",data);
						},
						error:function(e){
							util.showTipMessage("没有搜索到关联信息！");
							$html.trigger("onQueryForLocation",null);
						}
					});
					
				}
				
				$html.find("#map_location_queryButton").on("click",function(){
					$pager.pagination({
						pageNumber : 1,
						total : 0
					});
					queryForLocation();
				});
			}
		}
		initMapLocationTool();
		$("#map_location")
				.click(
						function() {
							$('#map_location_div').window({
								iconCls : "icon_location",
								title : "快速定位",
								collapsible : true,
								collapsed : false,
								closed:false,
								left:500,
								top:100,
								width : 320,
								height : 400
							});
						});
	},
	initMapExtent : function(map) {
		if (util.initExtent) {
			map.setExtent(util.initExtent, true);
		} else {
			map.centerAt(new esri.geometry.Point(113.339669, 23.148429));
			map.setZoom(14);
		}
	},	//消除地图上的所有的添加
	cleanMap:function(map){
		map.graphics.clear();
		map.infoWindow.hide();
		var Layers=map.graphicsLayerIds;	
		for ( var i = 0; i < Layers.length; i++) {
			map.getLayer(Layers[i]).clear();
			map.getLayer(Layers[i]).hide();
		}
		$("#jqGourpBtn button").removeClass('btn-success');
		$("#jqGourpBtn button").addClass('btn-default');
		$("#BtnGroup .btn-sm").removeClass('btn-success');
		$("#BtnGroup .btn-sm").addClass('btn-default');
		Jcflag=false;
		M800flag=false;
		TimeCondition=false;
		jcData={};
		jcurl=rootPath+"/JC/LoadCar.do";
		$(".rlabovep").find(".My_active").removeClass("My_active");
		layerList=[];
		$("#reslist").empty();
		$("#reslist_a").text("地理信息搜索结果("+0+")");
	},
	measureMap : function(map, geometry) {
		var geometryService = new esri.tasks.GeometryService(
				util.GeometryServiceURL);
		switch (geometry.type) {
		case "polyline":
			var lengthParams = new esri.tasks.LengthsParameters();
			lengthParams.polylines = [ geometry ];
			lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
			lengthParams.geodesic = true;
			lengthParams.polylines[0].spatialReference = new esri.SpatialReference(
					4326);
			geometryService.lengths(lengthParams);
			// 可以用dojo绑定时间，也可以自己写方法lengths(lengthsParameter, callback?,
			// errback?)
			dojo
					.connect(
							geometryService,
							"onLengthsComplete",
							function(result) {
								console.log("距离：" + result.lengths[0]);
								var point = geometry.paths[0][geometry.paths[0].length - 1];
								var CurX = point[0];
								var CurY = point[1];
								var CurPos = new esri.geometry.Point(CurX,
										CurY, map.spatialReference);
								map.infoWindow.setTitle("距离测量");
								map.infoWindow.setContent(" 测 量 长 度 ： <strong>"
										+ parseInt(String(result.lengths[0]))
										+ "米</strong>");
								map.infoWindow.show(CurPos);
							});
			break;
		case "polygon":
			var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();
			areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
			areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
			var outSR = new esri.SpatialReference({
				wkid : 102113
			});
			geometryService
					.project(
							[ geometry ],
							outSR,
							function(geometry) {
								geometryService
										.simplify(
												geometry,
												function(simplifiedGeometries) {
													areasAndLengthParams.polygons = simplifiedGeometries;
													areasAndLengthParams.polygons[0].spatialReference = new esri.SpatialReference(
															102113);
													geometryService
															.areasAndLengths(areasAndLengthParams);
												});
							});
			dojo
					.connect(
							geometryService,
							"onAreasAndLengthsComplete",
							function(result) {
								var CurX = (geometry._extent.xmax + geometry._extent.xmin) / 2;
								var CurY = (geometry._extent.ymax + geometry._extent.ymin) / 2;
								var CurPos = new esri.geometry.Point(CurX,
										CurY, map.spatialReference);
								map.infoWindow.setTitle("面积测量");
								map.infoWindow.setContent(" 面积 ： <strong>"
										+ parseInt(String(result.areas[0]))
										+ "平方米</strong> 周长："
										+ parseInt(String(result.lengths[0]))
										+ "米");
								map.infoWindow.show(CurPos);
							});

			break;
		default:
			break;
		}

	},
	measureMap2 : function(map,geometry){
		var geometryService=new esri.tasks.GeometryService(util.GeometryServiceURL);
		switch (geometry.type) {
			case "polyline":
				var lengthParams = new esri.tasks.LengthsParameters();
				lengthParams.polylines = [geometry];
				lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
				lengthParams.geodesic = true;
				lengthParams.polylines[0].spatialReference = new esri.SpatialReference(4326);
				geometryService.lengths(lengthParams);
				dojo.connect(geometryService, "onLengthsComplete", function(result){
					console.log("距离："+result.lengths[0]);
					$("#workingTrajectory").html(result.lengths[0]);
				});
				break;
			case "polygon":
				break;
			default:
				break;
		}
	}

};


String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof (args) == "object") {
			for ( var key in args) {
				if (args[key] != undefined) {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]||"");
				}
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					//var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]||"");
				}
			}
		}
	}
	return result;
}

function queryGraphicByPolygon(ext){
	toolbarss.deactivate();
	searchLayer.clear();
	searchLayer.show();
	map.setMapCursor("default");
	var graphics = jyLayer.graphics;
	for(var i=0,total=graphics.length;i<total;i++){
		if(ext.geometry.contains(graphics[i].geometry)){
			searchLayer.add(graphics[i]);
		}
	}
}

//计算图形中心坐标并缩放
function getCenterPoint(checkGraphics){
	var type = checkGraphics.geometry.type;
	var pointData = new Array();
	if("point" == type){
		pointData.push(parseFloat(checkGraphics.geometry.x));
		pointData.push(parseFloat(checkGraphics.geometry.y));
		map.centerAndZoom (new esri.geometry.Point(pointData[0], pointData[1]),20);
	}
	else if("polygon" == type){
		var pointArr = checkGraphics.geometry.rings[0];
		var node = checkGraphics.getNode();
		zoomToPonOrLine(pointArr,17);
		moveToFronts(checkGraphics);
		
	}else if("polyline" == type){
		var pointArr = checkGraphics.geometry.paths[0];
		var node = checkGraphics.getNode();
		//node.click();
		zoomToPonOrLine(pointArr,17);
		moveToFronts(checkGraphics);
		checkGraphics.getDojoShape().moveToFront();

	}
}


function moveToFronts(graphics){
	if(graphics != null){
		try{
			var dojos = graphics.getDojoShape();
			if(dojos != null)
				dojos.moveToFront();
			else{
				dojos = graphics.getShape();
				dojos.moveToFront();
			}
		}
		catch(e){
			
		}
	}
}

//缩放图形
function zoomToPonOrLine(pointArr,level){
	if (pointArr!=null && pointArr.length>0){
		var xSum=0.0;
		var ySum=0.0;
		for(var i=0,size=pointArr.length;i<size;i++){
				xSum = accAdds(xSum,pointArr[i][0]);
				ySum = accAdds(ySum,pointArr[i][1]);
		}
		var pointx = xSum/(pointArr.length);
		var pointy = ySum/(pointArr.length);
		map.centerAndZoom (new esri.geometry.Point(pointx, pointy),level);	
	}
}


function measureMaps(map,geometry){
	var geometryService=new esri.tasks.GeometryService(util.GeometryServiceURL);
	switch (geometry.type) {
		case "polyline":
			var lengthParams = new esri.tasks.LengthsParameters();
			lengthParams.polylines = [geometry];
			lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
			lengthParams.geodesic = true;
			lengthParams.polylines[0].spatialReference = new esri.SpatialReference(4326);
			geometryService.lengths(lengthParams);
			dojo.connect(geometryService, "onLengthsComplete", function(result){
				console.log("距离："+result.lengths[0]);
				return result.lengths[0];
			});
			break;
		case "polygon":
			break;
		default:
			break;
	}
}

//计算图形中点
function accAdds(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m = Math.pow(10,Math.max(r1,r2))
	return (arg1*m+arg2*m)/m
}
function accDivs(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	with(Math){
		r1=Number(arg1.toString().replace(".",""))
		r2=Number(arg2.toString().replace(".",""))
		return (r1/r2)*pow(10,t2-t1);
	}
}	