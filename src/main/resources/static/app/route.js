angular.module('JWTDemoApp').config(function ($stateProvider, $urlRouterProvider) {

    // the ui router will redirect if a invalid state has come.
    $urlRouterProvider.otherwise('/page-not-found');
    // parent view - navigation state
    $stateProvider.state('nav', {
        abstract: true,
        url: '',
        views: {
            'nav@': {
                templateUrl: 'app/views/nav.html',
                controller: 'NavController'
            }
        }
    }).state('login', {
// parent: 'nav',
        url: '/login',
        views: {
            'login@': {
                templateUrl: 'app/views/login.html',
                controller: 'LoginController'
            }
        }
    }).state('users', {
        parent: 'nav',
        url: '/users',
        data: {
            role: 'ADMIN'
        },
        views: {
            'content@': {
                templateUrl: 'app/views/users.html',
                controller: 'UsersController',
            }
        }
    }) 
    .state('school', {
       
        url: '/school',
        data: {
            role: 'school'
        },
        views: {

        'nav@': {
            templateUrl: 'app/views/nav.html',
            controller: 'NavController'
        },
        'sidebar-school@':{
        	templateUrl: 'app/views/sidebar-school.html',
        	 controller:'SidebarSchoolController'
        	
        }
        }
       
    })
    .state('school.user', {
       
        url: '/user',
        data: {
            role: 'school'
        },
        views: {

        'content@':{
        	templateUrl: 'app/views/user-table.html',
            controller:'UserTableController'
        	
        },
        
        'conf-del@school.user':{
        	templateUrl: 'app/views/confirm-deletion.html',
        	controller:'ConfirmController'
        },
        'userform@school.user':{
        	templateUrl: 'app/views/user-form.html',
        	controller:'UserFormController'
        }
          
        }
       
    })
    .state('school.class', {
       
        url: '/class',
        data: {
            role: 'school'
        },
        views: {

        'content@':{
        	templateUrl: 'app/views/class-table.html',
           controller:'ClassTableController'
        	
        },'class-form@school.class':{
        	templateUrl: 'app/views/class-form.html',
        	 controller:'ClassFormController'
        	
        	
        },'conf-del@school.class':{
        	templateUrl: 'app/views/confirm-deletion.html',
        	controller:'ConfirmController'
        },
        
          
        }
       
    })
    .state('school.class.classinfo', {
       
        url: '/info',
        data: {
            role: 'school'
        },
        views: {

        'classinf@school.class':{
        	templateUrl: 'app/views/class-tab.html',
        	 controller:'ClassTabController'
        	
        },'studenttab@school.class.classinfo':{
        	templateUrl: 'app/views/student-table.html',
        	 controller:'StudentTableController'
        	
        },
        'student-form@school.class.classinfo':{
        	templateUrl: 'app/views/student-form.html',
           controller:'StudentFormController'
        	
        },
        'conf-minus@school.class.classinfo':{
        	templateUrl: 'app/views/confirm-minus.html',
        	controller:'ConfirmMinusController'
        },
          
        }
       
    })
// .state('school.class.classinfo.students', {
//       
// url: '',
// data: {
// role: 'school'
// },
// views: {
//
// 'studenttab@school.class.classinfo':{
// templateUrl: 'app/views/student-table.html',
//        	
//        	
// }
//          
// }
//       
// })
    .state('school.student', {
       
        url: '/student',
        data: {
            role: 'school'
        },
        views: {

        'content@':{
        	templateUrl: 'app/views/student-table.html',
           controller:'StudentTableController'
        	
        },
        'student-form@school.student':{
        	templateUrl: 'app/views/student-form.html',
           controller:'StudentFormController'
        	
        },
        'class-box@school.student':{
        	templateUrl: 'app/views/search.html',
        	controller:'SearchBoxController'
        	
        },
        'conf-del@school.student':{
        	templateUrl: 'app/views/confirm-deletion.html',
        	controller:'ConfirmController'
        },
          
        }
       
    })
    
    .state('school.student.detail', {
       
        url: '/detail',
        data: {
            role: 'school'
        },
        views: {

        'detailtab@school.student':{
        	templateUrl: 'app/views/student-tab.html',
        	controller:'StudentTabController'
        },
        'rollcall@school.student.detail':{
        	templateUrl: 'app/views/rollcall.html',
        	controller:'RollCallController'
        	
        },
        'calendar-month@school.student.detail':{
        	templateUrl: 'app/views/datepicker-month.html',
        	controller: 'DatepickerMonthController'
        },
        'mark@school.student.detail':{
        	templateUrl: 'app/views/mark.html',
        	controller: 'MarkController'
        }
        }
       
    })
       .state('school.teacher', {
       
        url: '/teacher',
        data: {
            role: 'school'
        },
        views: {

        'content@':{
        	templateUrl: 'app/views/teacher-table.html',
        	controller:'TeacherTableController'
        	
        }
        
          
        }
       
    })
    .state('school.employee', {
       
        url: '/employee',
        data: {
            role: 'school'
        },
        views: {

        'content@':{
        	templateUrl: 'app/views/employee-table.html',
        	controller:'EmployeeTableController'
        	
        }
        
          
        }
       
    })
    .state('home', {
        parent: 'nav',
        url: '/',
        views: {
            'content@': {
                templateUrl: 'app/views/home.html',
                controller: 'HomeController'
            }
        }
    }).state('page-not-found', {
      
        url: '/page-not-found',
        views: {
            'content@': {
                templateUrl: 'app/views/page-not-found.html',
                controller: 'PageNotFoundController'
            }
        }
    }).state('access-denied', {
        parent: 'nav',
        url: '/access-denied',
        views: {
            'content@': {
                templateUrl: 'app/views/access-denied.html',
                controller: 'AccessDeniedController'
            }
        }
    }).state('register', {
        parent: 'nav',
        url: '/register',
        views: {
            'content@': {
                templateUrl: 'app/views/register.html',
                controller: 'RegisterController'
            }
        }
    });
});
