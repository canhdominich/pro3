angular.module('JWTDemoApp')
// Creating the Angular Service for storing logged user details
.service('SelectService', function() {
	var classid = null;
	var studentid = null;
	var listRollcall = null;
	var listMark = null;
	var month = null;
	var year = null;
	var userid = null;
	var deleteMessage = null;
	var edit=null;
	var createMessage = null;
	var subjectId= null;
	var message=null;
	
	var minus=null;
	return {
		setClassId : function(id) {
			classid = id;
		},
		getClassId : function() {
			return classid;
		},
		setStudentId : function(id) {
			studentid = id;
		},
		getStudentId : function() {
			return studentid;
		},
		setListRollcall : function(list) {
			listRollcall = list;
		},
		getListRollcall : function() {
			return listRollcall;
		},
		setMonth : function(list) {
			month = list;
		},
		getMonth : function() {
			return month;
		},
		setYear : function(list) {
			year = list;
		},
		getYear : function() {
			return year;
		},
		setUserid : function(list) {
			userid = list;
		},
		getUserid : function() {
			return userid;
		}
		,
		setDeleteMessage : function(list) {
			deleteMessage = list;
		},
		getDeleteMessage : function() {
			return deleteMessage;
		},
		setEdit : function(list) {
			edit = list;
		},
		getEdit: function() {
			return edit;
		}
		,
		setCreateMessage : function(list) {
			createMessage = list;
		},
		getCreateMessage : function() {
			return createMessage;
		},
		setMessage : function(list) {
			message = list;
		},
		getMessage : function() {
			return message;
		},
		setListMark : function(list) {
			listMark = list;
		},
		getListMark : function() {
			return listMark;
		},
		
		setSubjectId : function(list) {
			subjectId = list;
		},
		getSubjectId : function() {
			return subjectId;
		},
		setMinus : function(list) {
			minus = list;
		},
		getMinus: function() {
			return minus;
		},
	}

});
