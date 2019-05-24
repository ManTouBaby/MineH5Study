//var BASEPATH = "http://10.235.180.157:8080";
//var BASEPATH = "http://10.235.180.164:18080";
//var BASEPATH = "http://68.32.104.23:8080";
var BASEPATH = "http://127.0.0.1:8080";
var currentFirstDate;

var xdoc = document;


var hoursData = ['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时',
				'11时','12时','13时','14时','15时','16时','17时','18时','19时','20时',
				'21时','22时','23时'];


var getCookieValue = function (cname){
	var name = cname+"=";
	var cookie = xdoc.cookie.split(';');
	for(var i=0; i<cookie.length; i++){
		var xc = cookie[i].trim();
		if(xc.indexOf(name) == 0){
			return xc.substring(name.length, xc.length);
		}
	}
	return "";
		
}



/*获取当前的用户ID*/
function getCurrentUserId(){
	var id = "440308990000";
	id = getCookieValue("xdeptId");
	return id;
}


function formatDate(date) {
	var year = date.getFullYear() + '年';        
	var month = (date.getMonth() + 1) + '月';        
	var day = date.getDate() + '日';        
	var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];         
//	return month + day + ' ' + week;
	
	return {daily: month + day, day: week, date: getDate(date), isSelected: false};
	
};

function getToday(type){
	var date = new Date();
	var year = date.getFullYear();        
	var month = (date.getMonth() + 1) ;        
	var day = date.getDate() ;
	
	var today = year + '年'+month+ '月'+day+ '日';
	
	if(type){
		switch(type){
			case 1: 
				today = year + '/'+month+ '/'+day;
			break;
			case 2: 
				today = year + '-'+month+ '-'+day;
			break;
			case 3: 
				today = year + '年'+month+ '月'+day+ '日';
			break;
		}
	}
	
	return today;
}

function getCurrentWeek(){
//	var arrWeek = getAWeek(new Date());
	return getAWeek(new Date());
}

function getAWeek(date){
	var week = date.getDay() - 1;
	date = addDate(date, week * -1);
	currentFirstDate = new Date(date);
	var arrWeek = [];
	for(var i = 0; i < 7; i++) {                  
		arrWeek.push(formatDate(i == 0 ? date : addDate(date, 1)));      
	}
	return arrWeek;
}



function addDate(date, n) {           
	date.setDate(date.getDate() + n);
	return date;      
};


function getFirstDailyOfCurrentWeek(){
	return currentFirstDate;
}


function showTips(text){
	layer.msg(text);
}


function getDate(date){
	var day = new Date(date);
	var cmonth = (day.getMonth()+1)<10 ? '0' + (day.getMonth()+1) : (day.getMonth()+1);
	var cday = day.getDate()<10 ? '0'+day.getDate() : day.getDate();
	var strDay = day.getFullYear()+'-'+ cmonth + '-'+ cday;
	return strDay;
}
function getDateTime(date){
	var day = new Date(date);
	var cmonth = (day.getMonth()+1)<10 ? '0' + (day.getMonth()+1) : (day.getMonth()+1);
	var cday = day.getDate()<10 ? '0'+day.getDate() : day.getDate();
	
	var hour = (day.getHours()+1)<10 ? '0' + (day.getHours()+1) : (day.getHours()+1);
	var min = (day.getMinutes()+1)<10 ? '0' + (day.getMinutes()+1) : (day.getMinutes()+1);
	
	var strDay = day.getFullYear()+'-'+ cmonth + '-'+ cday + ' '+ hour + ":"+min;
	return strDay;
}


/*
 *	ajax 通用 ， 获取数据 
 * 
 * */
function ajaxGetDatas(url, dataObj, successCallback, contentType, type){
	$.ajax({
		type:type ? type: "post",
		url:url,
		async:true,
		data: dataObj,
		contentType: contentType ? contentType : 'application/json',
		dataType: 'json',
		beforeSend:function(request){
			request.setRequestHeader("Authorization",getCookieValue("xtoken"));
			request.setRequestHeader("Auth",getCookieValue("loginName"));
		},
		success: function(res){
			successCallback(res);
		},
		error:function(err){
			console.log("ajax request Error: -----url=" + url);
		}
	});
}


function isObjectSame( x, y ) {   
    var in1 = x instanceof Object;  
    var in2 = y instanceof Object;  
    if(!in1||!in2){  
      return x===y;  
    }  
    if(Object.keys(x).length!==Object.keys(y).length){
      return false;  
     }  
    for(var p in x){  
    var a = x[p] instanceof Object;  
    var b = y[p] instanceof Object;  
      if(a&&b){  
        return equals( x[p], y[p]);  
       }  
       else if(x[p]!==y[p]){  
         return false;  
       }  
    }  
      
    return true;  
} 
