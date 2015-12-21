var app = angular.module('DreamApp', ['ngRoute', 'DreamCtrls', 'DreamServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
  $routeProvider
  .when('/', {
      templateUrl: 'app/views/home.html',
      // controller: 'HomeCtrl'
    })
  .when('/dreams', {
    templateUrl: 'app/views/dreams.html',
    controller: 'ShowAllCtrl'
  })
  .when('/dreams/new', {
    templateUrl: 'app/views/newDream.html',
    controller: 'NewDreamCtrl'
  })
  .when('/dreams/:id', {
    templateUrl: 'app/views/showDream.html',
    controller: 'ShowCtrl'
  })
  .when('/symbols/new', {
    templateUrl: 'app/views/newSymbol.html',
    controller: 'NewSymbolCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
    templateUrl: 'app/views/userLogin.html',
    controller: 'SignupCtrl'
  })
  .when('/about', {
    templateUrl: 'app/views/about.html'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);

 }])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]) 
.run(["$rootScope", "Auth", function($rootScope, Auth) {
  $rootScope.isLoggedIn = function() {
    return Auth.isLoggedIn.apply(Auth);
  }
}]);