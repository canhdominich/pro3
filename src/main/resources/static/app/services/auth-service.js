angular.module('JWTDemoApp')
// Creating the Angular Service for storing logged user details
.service('AuthService', function() {
	var loguser = null;
	var listuser = null;
	var listclass = null;
	var liststudent = null;
	var listteacher = null;
	var listemployee= null;
	var selectTable=null;
	return {
//		getUserName : function() {
//			return userName;
//		},
//		setUserName : function(newName) {
//			userName = newName;
//		}
		setSelectedTable : function(table) {
			selectTable = table;
		},
		getSelectedTable : function() {
			return selectTable;
		},
		setLogUser : function(user) {
			loguser = user;
		},
		getLogUser : function() {
			return loguser;
		},
		setListUser : function(users) {
			listuser = users;
		},
		getListUser : function() {
			return listuser;
		},
		
		setListClass : function(classes) {
			listclass = classes;
		},
		getListClass : function() {
			return listclass;
		},
		
		setListStudent : function(classes) {
			liststudent = classes;
		},
		getListStudent : function() {
			return liststudent;
		},
		
		setListTeacher: function(classes) {
			listteacher= classes;
		},
		getListTeacher : function() {
			return listteacher;
		},
		
		setListEmployee : function(classes) {
			listemployee = classes;
		},
		getListEmployee : function() {
			return listemployee;
		}
	}
	// return {
	// user: null
	// }
	
});
