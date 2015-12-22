var TOKEN_STORAGE = "secretdreams-token";

angular.module("DreamServices", ["ngResource"])
.factory("Dream", ["$resource", function($resource, Auth) {
  return $resource("/api/dreams/:id");
}])
.factory("Symbol", ["$resource", function($resource) {
  return $resource("/api/symbols/:id");
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