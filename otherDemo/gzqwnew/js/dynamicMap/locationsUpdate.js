//	var ws = null;
//	var url = null;
//	var transports = [];
	
	
//	window.onbeforeunload = function(){
//		if(ws!=null)
//			ws.close();
//	}
//	
//	//判断浏览器是否支持WebSocket
//	if('WebSocket' in window){
//			ws = new WebSocket("ws://10.235.180.156:6061/dgqwTimetask/webSocketServer");
//			if(ws != null){
//			// 成功建立连接
//			ws.onopen = function(){
//				console.log("open");
//			};
//			// 关闭连接
//			ws.onclose = function(event){
//				console.log("close");
//			};
//			// 出现异常
//			ws.onerror = function(){
//				console.log("ws连接错误");
//				console.log(event);
//			};
//			// 处理服务器消息
//			ws.onmessage = function(event){
//				//console.log(event.data);
//				//更新坐标
//				locationUpdate(event.data);
//			};			
//		}	
//
//	}

	/**
	 * 更新坐标
	 * @param event
	 */
	function locationUpdate(msg){
		var locObj = null;
		if(msg == null){
			return;
		}
		if(!map)
			return;
		
		try {
			locObj = JSON.parse(msg);
		} catch (e) {
			console.log("坐标更新Exception:"+e);
			return;
		}
		
		/** 对应目标图形		*/
		var checkGraphics = null;
		/**	获取警员图层		*/
		var Layer=map.getLayer("jyLayer");
		if(Layer == null){
			Layer = jyLayer;
			if(Layer == null)
				return;
		}
		var graphics = Layer.graphics;
		//console.log("上图后"+graphics.length);
		for(var k = 0; k<graphics.length;k++){
			if(graphics[k].attributes){
				if(graphics[k].attributes.locationid == locObj.devid){
					checkGraphics = graphics[k];
					var lon = locObj.longitude;
					var lat = locObj.latitude;
					var p = new esri.geometry.Point(lon,lat);
					graphics[k].setGeometry(p);
					break;
				}
			}				
		}
	}