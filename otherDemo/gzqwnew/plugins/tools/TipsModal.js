/**
 * 提示弹出框
 * 
 * @author momengqi
 */

// 构造DOM
var modalDiv = $('<div class="modal fade" id="TipsModal"></div>');
var modalDialog = $('<div class="modal-dialog"></div>')
var modalContent = $('<div class="modal-content"></div>')
var modalHeader = $('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title"></h4></div>')
var modalBody = $('<div class="modal-body"><p class="modal-msg"></p></div>')
var modalFooter = $('<div class="modal-footer"><button type="button" id="TipsModal_CancelButton" class="btn btn-danger" data-dismiss="modal"onclick="doCancelModalCallBack()">取消</button><button type="button" class="btn btn-success pull-left" id="TipsModal_ConfirmButton" onClick="doConfirmModalCallBack()">确定</button></div>');

// 将DOM插入页面
$(function() {
	$(modalContent).append(modalHeader)
	$(modalContent).append(modalBody)
	$(modalContent).append(modalFooter)
	$(modalDialog).append(modalContent)
	$(modalDiv).append(modalDialog)
	$('body').append(modalDiv);
})
// 回调函数
var confirmModalCallBack = function() {
	$("#TipsModal").modal('hide');
}
var cancelModalCallBack = function() {
	$("#TipsModal").modal('hide');
}
// 扩展jQuery
$.extend({
	// 显示提示modal(title:提示框标题,msg:提示信息)
	showTipsModal : function(title, msg) {
		$("#TipsModal").find(".modal-title").html(title);
		$("#TipsModal").find(".modal-msg").html(msg);
		$("#TipsModal").modal("show");
		$("#TipsModal_CancelButton").focus();
	},
	// 显示提示modal(title:提示框标题,msg:提示信息,callBack:确认回调函数)
	showConfirmModal : function(_options) {
		if (!_options) {
			$("#TipsModal").find(".modal-title").html("提示");
			$("#TipsModal").find(".modal-msg").html("您确定？");
		}
		$("#TipsModal").find(".modal-title").html(_options.title);
		$("#TipsModal").find(".modal-msg").html(_options.msg);
		if (_options.yes) {
			confirmModalCallBack = _options.yes;
		}
		if (_options.no) {
			cancelModalCallBack = _options.no;
		}
		$("#TipsModal").modal("show");
		$("#TipsModal_ConfirmButton").focus();
	},
	hideConfirmModal : function() {
		$("#TipsModal").modal('hide');
		confirmModalCallBack = function() {
			$("#TipsModal").modal('hide');
		};
		cancelModalCallBack = function() {
			$("#TipsModal").modal('hide');
		};
	},
	hideTipsModal : function() {
		$("#TipsModal").modal('hide');
		confirmModalCallBack = function() {
			$("#TipsModal").modal('hide');
		};
		cancelModalCallBack = function() {
			$("#TipsModal").modal('hide');
		};
	}
});

// 执行回调函数
function doConfirmModalCallBack() {
	confirmModalCallBack();
	// 执行完复位回调函数
	confirmModalCallBack = function() {
		$("#TipsModal").modal('hide');
	};
	cancelModalCallBack = function() {
		$("#TipsModal").modal('hide');
	};
	$("#TipsModal").modal('hide');
}
function doCancelModalCallBack() {
	cancelModalCallBack();
	confirmModalCallBack = function() {
		$("#TipsModal").modal('hide');
	};
	cancelModalCallBack = function() {
		$("#TipsModal").modal('hide');
	};
	$("#TipsModal").modal('hide');
}

// box显示loading框
var loadingDivDOM = $('<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>')
$.fn.extend({
	showBoxLoadin : function() {
		$(this).append(loadingDivDOM.clone());
	},
	hideBoxLoadin : function() {
		$(this).find(".overlay").remove();
	}
})