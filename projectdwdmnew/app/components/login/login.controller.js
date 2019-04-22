app.controller("LoginController", function(
  $scope,
  $location,
  $rootScope,
  $http,
  $timeout
) {
  $scope.username = "admin";
  $scope.password = "admin";
  $scope.ipAdd = "192.168.115.230";

  $scope.submitForm = function() {
    //console.log("Username", $scope.username, " Password", $scope.password,"ipaddress",$scope.ipAdd);
    $rootScope.loggedIn = true;

    let userInfo = {
      username: $scope.username,
      password: $scope.password,
      ipAdd: $scope.ipAdd
    };

    $http
      .post("/dpt/", userInfo)
      .then(function(data, status, headers, config) {
        $timeout(function(){
          
          //console.log("/////Data from server:", data.config.data);
          $rootScope.loggedIn = true;
          $location.path("/home");
        },8000);
       
      })
      .catch(function(data, status, headers, config) {
        alert("Wrong credentials");
      });
  };
});
