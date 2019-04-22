app.controller("PaperController", function(
  $scope,
  $location,
  HomeService,
  $timeout
) {
  $scope.networkData = HomeService.graphData;
  $scope.nodeMenu = HomeService.nodeContextMenu;
  $scope.linkMenu = HomeService.linkContextMenu;
  $scope.pathData = HomeService.findpathData;
  $scope.nodeMap = new Map();
  $scope.element = document.getElementById("canvas");
  $scope.graph = new joint.dia.Graph();

  $scope.defaultLinkStyle = {
    stroke: "#333",
    strokeWidth: "2",
    sourceMarker: {
      fill: "#333",
      stroke: "none",
      d: "M 2 -5 L -3 0 L 2 5 Z"
    },
    targetMarker: {
      fill: "#333",
      stroke: "none",
      d: "M 2 -5 L -3 0 L 2 5 Z"
    }
  };

  $scope.highlightLinkStyle = {
    stroke: "blue",
    strokeWidth: "6",
    // sourceMarker: {
    //   fill: "blue",
    //   stroke: "none",
    //   d: "M 5 -7 L -15 0 L 5 10 Z"
    // },
    targetMarker: {
      fill: "yellow",
      stroke: "none",
      d: "M 5 -7 L -15 0 L 5 10 Z"
    },
    
  };

  $scope.paper = new joint.dia.Paper({
    el: $scope.element,
    model: $scope.graph,
    drawgrid: true,
    gridSize: 10
  });

  //console.log("PaperController", $scope);
  $scope.init = () => {
    $scope.graph.clear();
    var centre = { x: 500, y: 250 };
    var radius;
    if (HomeService.graphData) {
      if ($scope.networkData.nodes.length < 5) radius = 100;
      else radius = 100 + $scope.networkData.nodes.length * 10;
      var thetaInc = 360 / $scope.networkData.nodes.length;
      var theta = 0,
        radian = 0;
      var x1, y1;
      var i, x, y;
      var myObj = JSON.stringify($scope.networkData);

      for (i in $scope.networkData.nodes) {
        //console.log($scope.networkData.nodes[i].label);

        x += "<h2>" + $scope.networkData.nodes[i].label + "</h2>";
        radian = Math.PI * (theta / 180);
        x1 = Math.cos(radian) * radius + centre.x;
        y1 = Math.sin(radian) * radius + centre.y;

        theta += thetaInc;

        let cellAdded = $scope.createNode(
          x1,
          y1,
          $scope.networkData.nodes[i].label,
          $scope.networkData.nodes[i].id
        );
        $scope.nodeMap.set($scope.networkData.nodes[i].id, cellAdded);
      
      }

      for (i in $scope.networkData.links) {
        var source = $scope.networkData.links[i].source;
        var target = $scope.networkData.links[i].target;
        //console.log(source);
        //console.log(target);
        let sourceNode = $scope.nodeMap.get(source);
        let targetNode = $scope.nodeMap.get(target);
        $scope.createLink(sourceNode, targetNode);
      }

      // Add Context Menu to each node on paper
      $scope.graph.getElements().forEach(node => {
        let cellView = $scope.paper.findViewByModel(node);
        let el = $("#" + cellView.el.id);
        el.contextMenu($scope.nodeMenu, {
          mouseClick: "right",
          triggerOn: "click"
        });
      });

      // Add Context Menu to each link on paper
      $scope.graph.getLinks().forEach(link => {
        let cellView = $scope.paper.findViewByModel(link);
        let el = $("#" + cellView.el.id);
        el.contextMenu($scope.linkMenu, {
          mouseClick: "right",
          triggerOn: "click"
        });
      });
    }
  };

  $scope.createLink = (source, target) => {
    var cell = new joint.shapes.standard.Link({
      source: { id: source.id },

      target: { id: target.id },
      attrs: {
        line: {
          stroke: "#333",
          strokeWidth: "2",
          sourceMarker: {
            fill: "#333",
            stroke: "none",
            d: "M 2 -5 L -3 0 L 2 5 Z"
          },
          targetMarker: {
            fill: "#333",
            stroke: "none",
            d: "M 2 -5 L -3 0 L 2 5 Z"
          }
        }
      }
    });
    $scope.graph.addCell(cell);
    return cell;
  };

  $scope.createNode = (x1, y1, label, id) => {
    var cell = new joint.shapes.standard.Circle({
      position: { x: x1, y: y1 }
    });
    cell.resize(100, 60);
    cell.attr({
      body: {
        fill: "#E74C3C",
        rx: 20,
        ry: 20,
        strokeWidth: 0
      },
      label: {
        text: label,
        fill: "#ECF0F1",
        fontSize: 11,
        fontVariant: "small-caps"
      },
      properties: {
        ip: id
      }
    });

    $scope.graph.addCell(cell);
    return cell;
  };

  $scope.init();

  // watch the collection for changes
  $scope.$watch(watchSource, function(current, previous) {
    console.log("Data change", current);
    $scope.networkData = current;
    $scope.init();
  });

  function watchSource() {
    return HomeService.graphData;
  }

  // Disable browser context menu
  $(document).on("contextmenu", function(e) {
    return false;
  });

  /************Paper Events*****************/

  $scope.paper.on("blank:pointerdown", (x, y) => {
    console.log("Blank Pointer");
  });

  $scope.paper.on("cell:pointerclick", function(cellView) {
    var ip = cellView.model.attributes.attrs.properties;
    //console.log(cellView.model.attributes);
    console.log(ip);
  });
  $scope.paper.on("cell:contextmenu", function(cellView, x, y) {
    HomeService.setSelectedItem(cellView.model);
    // console.log(cellView.model.attributes.attrs.properties);
  });
  $scope.initpath = () => {
    //$scope.LinkHighlight.clear();
    console.log(">>>>>>>>>inside>>>>>>>>>>");
    if (HomeService.findpathData) {
      console.log(">>>>>>>>>>>>>>>>>>>", HomeService.findpathData);
      for (i in $scope.pathData.links) {
        var source = $scope.pathData.links[i].source;
        var target = $scope.pathData.links[i].target;
        let sourceNode = $scope.nodeMap.get(source);
        let targetNode = $scope.nodeMap.get(target);
        $scope.LinkHighlight(sourceNode, targetNode);
      }
      for (i in $scope.pathData.nodes) {
        var node_source = $scope.pathData.nodes[i].start_node;
        var node_target = $scope.pathData.nodes[i].end_node;
        //var label = $scope.pathData.links[i].label;
       // x += "<h2>" + $scope.pathData.links[i].label+ "</h2>";
        let sourceNode = $scope.nodeMap.get(node_source);
        let targetNode = $scope.nodeMap.get(node_target);
        $scope.NodeHighlight(sourceNode, targetNode);
      }
  };
  $scope.LinkHighlight = (source, target) => {
    // var path = $scope.graph.getLinks();
    $scope.graph.getLinks().forEach(link => {
      let src = link.getSourceElement(),
        dest = link.getTargetElement();
      console.log("source :", src);
      console.log("target :", dest);
      if (source == src && target == dest) {
        console.log({ link });

        link.attr("line", $scope.highlightLinkStyle);
        //console.log("///// MATCHED /////", link);
      } else {
        //console.log("///// NOT MATCHED /////");
      }
    })
  }
  $scope.NodeHighlight = (source, target) => {
    // var path = $scope.graph.getLinks();
    $scope.graph.getElements().forEach(node => {
     
      let node_src = node.getElement(),
        node_dest = node.getElement();
      console.log("node_source :", node_src);
      console.log("node_target :", node_dest);
      if (source == node_src && target == node_dest) {
        console.log({ node });
        node.attr("line", $scope.defaultLinkStyle);
        node.attr("line", $scope.highlightLinkStyle);
        console.log("///// NODE MATCHED /////", node);
      } else {
        console.log("///// NODE NOT MATCHED /////");
      }
    })
  }
  };

  $scope.initpath();

  $scope.$watch(watchSourceforpath, function(current, previous) {
    console.log("Data change", current);
    $scope.pathData = current;
    $scope.initpath();
  });

  function watchSourceforpath() {
    return HomeService.findpathData;
  }
});
