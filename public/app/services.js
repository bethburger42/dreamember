var TOKEN_STORAGE = "secretdreams-token";

angular.module("DreamServices", ["ngResource"])
.factory("Dream", ["$resource", function($resource, Auth) {
  return $resource("http://localhost:3000/api/dreams/:id");
}])
.factory("Auth", ["$window", function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage[TOKEN_STORAGE] = token;
    },
    getToken: function() {
      return $window.localStorage[TOKEN_STORAGE];
    },
    removeToken: function() {
      $window.localStorage.removeItem(TOKEN_STORAGE);
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false
    }
  };
}])
.factory("AuthInterceptor", ["Auth", function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if(token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  };
}]);