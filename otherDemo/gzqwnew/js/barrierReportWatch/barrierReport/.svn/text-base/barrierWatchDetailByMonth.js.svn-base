//		var BASEPATH = "http://127.0.0.1:8080";
		var barrierId = "";
		var date = new Date();
		$(function() {
			barrierId = $.getUrlParam('barrierId');
			$('#calendar').fullCalendar({
				header : {
					left : 'prev,next today',
					center : 'title',
					right : ''
				},
				buttonText : {
					today : '今日',
					month : '月视图',
					week : '周视图',
					day : '日视图'
				},
				eventRender : function(event, element) {
					element.html(event.title);
				},
				firstDay : 7,
				firstHour : 8,
				editable : false,
				events : function(start, end, timezone, callback) {
				 ajaxGetDatas(BASEPATH + "/reportWatch/reportWatch/getBarrierWatchCalendarInfo.do",
				 	{barrierId : barrierId,
					start : start.format(),
					end : end.format()}, function(data){
						var calData = data.data;
							if (!calData || calData.length <= 0) {
								return;
							}
							var events = new Array();
							for (var i = 0; i < calData.length; i++) {
								var event = new Object();
								event.id = calData[i].id;
								event.start = calData[i].reportDate;
								event.title = "";
								event.title += "<div class='fullWidth alignCenter cal_policeName'>" + calData[i].policeName + "</div>";
								event.title += "<div class='fullWidth alignCenter'>" + calData[i].barrierClassName + "</div>";
								
								if (calData[i].classTimeList && calData[i].classTimeList.length > 0) {
									for (var j = 0; j < calData[i].classTimeList.length; j++) {
										event.title += "<div class='fullWidth alignCenter'>" + calData[i].classTimeList[j] + "</div>"
									}
								}
								events.push(event);
							}
							callback(events);
					},"application/x-www-form-urlencoded");
				}
			});
		})