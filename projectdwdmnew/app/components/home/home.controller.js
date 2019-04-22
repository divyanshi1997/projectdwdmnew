app.controller("HomeController", function(
  $scope,
  $location,
  $rootScope,
  $http,
  HomeService,
  $compile
) {
  $scope.changeip = "";
  $scope.configData = [];
  $scope.path = null;
  $http
    .post("/dpt/getnetwork")
    .then(function(resp, status, headers, config) {
      //console.log("*****Data from server:*****", resp.data);
      HomeService.setGraphData(resp.data[0]);
    })
    .catch(function(data, status, headers, config) {
      alert("Wrong credentials");
    });

  $scope.submitForm = async function() {
    let changeIpInfo = {
      changeip: $scope.changeip
    };

    $http
      .post("/dpt/getchangenetwork", changeIpInfo)
      .then(function(resp, status, headers, config) {
        console.log("*****Data from server:*****", resp.data);
        HomeService.setGraphData(resp.data[0]);
      })
      .catch(function(data, status, headers, config) {
        alert("Wrong credentials");
      });
  };

  $scope.updateModal = function() {
    console.log("Update Modal", $scope.configData);
    // console.log("Modal", $("#myModal"));
    $("#myModal .modal-title").text(
      "Path Configuration for " + $scope.configData[0].Node_ip
    );
    console.log("???????", $scope.configData[0].Node_ip);
    let template = `<div >
    <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Node Ip</th>
        <th scope="col">Rack No</th>
        <th scope="col">Subrack No</th>
        <th scope="col">Slot Index</th>
        <th scope="col">RxWavelength</th>
        <th scope="col">TxWavelength</th>
      </tr>
    </thead>
    <tbody>`;
    $scope.configData.forEach((data, index) => {
      let i = index;
      template += `<tr>
      <td>${index + 1}</td>
     <td>${data.Node_ip}</td>
      <td>${data.Rack_no}</td>
      <td>${data.Subrack_no}</td>
      <td>${data.Slot_index}</td>
      <td>${data.Rxwavwlength}</td>
      <td>${data.TxWavelength}</td>

      <td> <button class="btn btn-outline-success my-2 my-sm-0" type="button" ng-click="findpath('${
        data.Node_ip
      }',${data.Rack_no},${data.Subrack_no},${data.Slot_index},${
        data.Rxwavwlength
      },${data.TxWavelength})" >
      Find Path
    </button></td>
    </tr>`;
    });
    template += `</tbody>
    </table>
    </div>`;

    console.log(template);
    $("#myModal .modal-body")
      .empty()
      .html($compile(template)($scope));
    $("#myModal").modal("show");

    // $scope.$digest();
  };

  $scope.findpath = async function(
    nodeip,
    rackno,
    subrackno,
    slotindex,
    rxwavelength,
    txwavelength
  ) {
    let pathfind = {
      Nodeip: nodeip,
      Rackno: rackno,
      Subrackno: subrackno,
      Slotindex: slotindex,
      Rxwavelength: rxwavelength,
      Txwavelength: txwavelength
    };
    $http
      .post("/dpt/getpath", pathfind)
      .then(function(resp, status, headers, config) {
        console.log("*****Data from server:*****", resp.data);
        if(resp.data==null){
          $("#myModal").modal("hide");
          alert("There is no path");
        }
        else{
          HomeService.setPathData(resp.data);
          $("#myModal").modal("hide");
        }
       })
      .catch(function(data, status, headers, config) {
        alert("Wrong credentials");
      });
  };

  // watch the collection for changes
  $scope.$watch(watchSource, function(current, previous) {
    console.log(" change for config data", current);
    $scope.configData = current;
    $scope.updateModal();
  });

  function watchSource() {
    return HomeService.configDataForNode;
  }
});
