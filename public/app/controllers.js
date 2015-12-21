angular.module('DreamCtrls', ['DreamServices'])
.controller('HomeCtrl', ['$scope', 'Symbol', function($scope, Symbol) {

  $scope.symbols = [];
  $scope.search = '';

  Symbol.query(function success(data) {
    $scope.symbols = data;
  }, function error(data) {
    console.log(data)
  });

  // $scope.deleteSymbol = function(id, symbolsIdx) {
  //   Symbol.delete({id: id}, function success(data) {
  //     $scope.symbols.splice(symbolsIdx, 1);
  //   }, function error(data) {
  //     console.log(data);
  //   });
  // }

}])

.controller('ShowCtrl', ['$scope', '$routeParams', 'Dream', function($scope, $routeParams, Dream) {
  $scope.dream = {};

  Dream.get({id: $routeParams.id}, function success(data) {
    $scope.dream = data;
  }, function error(data) {
    console.log(data);
  });
}])

.controller('ShowAllCtrl', ['$scope', '$routeParams', 'Dream', function($scope, $routeParams, Dream) {
  $scope.dreams = [];
  $scope.search = '';

  Dream.query(function success(data) {
    $scope.dreams = data;
  }, function error(data) {
    console.log(data)
  });

  $scope.deleteDream = function(id, dreamsIdx) {
    Dream.delete({id: id}, function success(data) {
      $scope.dreams.splice(dreamsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('NewDreamCtrl', ['$scope', '$location', 'Dream', function($scope, $location, Dream) {
  $scope.dream = {
    user_id: '',
    date: '',
    theme: '',
    content: ''
  };

  $scope.createDream = function() {
    Dream.save($scope.dream, function success(data) {
      // $location.path('/dreams/' + data._id);
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('NewSymbolCtrl', ['$scope', '$location', 'Symbol', function($scope, $location, Symbol) {
  $scope.symbol = {
    term: '',
    meaning: ''
  };

  $scope.createSymbol = function() {
    Symbol.save($scope.symbol, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])

.controller('NavCtrl', ['$scope', "Auth", function($scope, Auth) {
  $scope.logout = function() {
    Auth.removeToken();
  };
}])
.controller("LoginCtrl", [
  "$scope", 
  "$http",
  "$location",
  "Auth",
  function($scope, $http, $location, Auth) {
    $scope.user = {
      email: "",
      password: ""
    };
    $scope.actionName = "Login";
    $scope.userAction = function() {
      $http.post("/api/auth", $scope.user).then(function(res) {
        Auth.saveToken(res.data.token);
        $location.path("/");
      }, function(res) {
        console.log(res.data);
      });
    };
  }])
  .controller("SignupCtrl", [
    "$scope",
    "$http",
    "$location",
    "Auth",
    function($scope, $http, $location, Auth) {
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.actionName = "Signup";
      $scope.userAction = function() {
        $http.post("/api/users", $scope.user).then(function(res) {
          $http.post("/api/auth", $scope.user).then(function(res) {
            Auth.saveToken(res.data.token);
            $location.path("/");
          }, function(res) {
            console.log(res.data);
          });
        }, function(res) {
          console.log(res.data);
        });
      }      
  }]);

