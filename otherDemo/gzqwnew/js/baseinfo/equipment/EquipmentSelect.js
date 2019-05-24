/**
 * 装备选择 v1.0
 * 
 * @author momengqi
 */

// 选择窗口
var equipmentModalDiv = $('<div class="modal fade" id="EquipmentSelectModal"></div>');
var equipmentModalDialog = $('<div class="modal-dialog" style="width:700px"></div>')
var equipmentModalContent = $('<div class="modal-content"></div>')
var equipmentModalHeader = $('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">装备选择</h4></div>')
var equipmentModalBody = $('<div class="modal-body" style="padding:5px;"><iframe id="equipmentSelectFrame" name="equipmentSelectFrame" style="width:100%;height: 600px" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes"></iframe></div>')
var equipmentModalFooter = $('<div class="modal-footer"><button type="button" id="equipmentSelectModal_CancelButton" class="btn btn-danger" data-dismiss="modal"onclick="equipmentSelectModal_CancelButton()">取消</button><button type="button" class="btn btn-success pull-left" id="equipmentSelectModal_ConfirmButton" onClick="equipmentSelectConfirmModalButtonFunction()">确定</button></div>');

// 将DOM插入页面
$(function() {
	// 选择页面
	$(equipmentModalContent).append(equipmentModalHeader)
	$(equipmentModalContent).append(equipmentModalBody)
	$(equipmentModalContent).append(equipmentModalFooter)
	$(equipmentModalDialog).append(equipmentModalContent)
	$(equipmentModalDiv).append(equipmentModalDialog)
	$('body').append(equipmentModalDiv);
});

var equipmentSelectTool = {
	selectEquipment : function(_options) {
		if (_options.confirmed) {
			equipmentSelectModaldoConfirmCallBack = _options.confirmed;
		}
		if (_options.cancel) {
			equipmentSelectModaldoCancelCallBack = _options.cancel;
		}
		var selectPageUrl =   "../../../pages/baseinfo/equipment/EquipmentSelect.html";
		$("#equipmentSelectFrame").attr("src", selectPageUrl)
		$("#EquipmentSelectModal").modal("show");
		$("#equipmentSelectModal_CancelButton").focus();
	}
}

function equipmentSelectModal_CancelButton() {
	var selectedList = window.equipmentSelectFrame.getSelectedList();
	equipmentSelectModaldoCancelCallBack(selectedList);
	$("#EquipmentSelectModal").modal('hide');
}
function equipmentSelectConfirmModalButtonFunction() {
	var selectedList = window.equipmentSelectFrame.getSelectedList();
	equipmentSelectModaldoConfirmCallBack(selectedList);
	$("#EquipmentSelectModal").modal('hide');
}
