app.service("HomeService", function($http) {
  this.graphData = undefined;
  this.findpathData = null;

  this.selectedItem = undefined;
  this.configDataForNode = null;

  this.setGraphData = function(data) {
    this.graphData = data;
  };
  this.setSelectedItem = function(cell) {
    this.selectedItem = cell;
  };
  this.setPathData = function(path) {
    this.findpathData = path;
    console.log("{{{{{{{path data{{{{{{{{{{", path);
  };

  let self = this;

  this.nodeContextMenu = [
    {
      name: "Sync Network Configuration",

      title: "finding button",
      fun: function() {
        $http
          .post("/dpt/getnetworkconfig")
          .then(function(resp, status, headers, config) {
            console.log(
              "*****Network Config Data from server:*****",
              resp.data
            );
            alert("Network configured" + " " + resp.data);
          })
          .catch(function(data, status, headers, config) {
            alert("Wrong credentials");
          });
      }
    },
    {
      name: "Load λ Configuration",

      title: "Load button",

      fun: function() {
        //this.selectedItem=cellView.model.attributes.attrs.properties;

        console.log(self);
        let pathInfo = {
          nodeip: self.selectedItem.attributes.attrs.properties.ip
        };
        console.log("Path Info ", pathInfo);
        $http
          .post("/dpt/getpathinfo", pathInfo)
          .then(function(resp, status, headers, config) {
            console.log("*****Path Info Data from server:*****", resp.data);

            self.configDataForNode = resp.data;
          })
          .catch(function(data, status, headers, config) {
            alert("no data");
          });
      }
    },
    {
      name: "λ Path Findng",

      title: "finding button",
      fun: function() {
        alert("i am add button");
      }
    }
  ];

  this.linkContextMenu = [
    {
      name: "Load Path Configuration",

      title: "Load button",
      fun: function() {}
    },
    {
      name: "λ Path Findng",

      title: "Finding button",
      fun: function() {
        alert("i am add button");
      }
    }
  ];
});
