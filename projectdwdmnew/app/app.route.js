var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "components/login/login.html",
      controller: "LoginController"
    })
    .when("/analysis", {
      templateUrl: "components/analysis/analysis.view.html"
    })
    .when("/home", {
      resolve: {
        check: function($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path("/");
          }
        }
      },
      templateUrl: "components/home/home.view.html"
      // controller: "HomeController"
    });
});
