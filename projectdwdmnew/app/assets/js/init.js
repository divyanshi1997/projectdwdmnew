var test = {
  NetworkGraph: {
    nodes: [
      {
        id: "n1",
        label: "node A",
        properties: {
          hostname: "node1.my.net"
        }
      },
      {
        id: "n2",
        label: "node B",
        properties: {
          hostname: "node2.my.net"
        }
      },
      {
        id: "n3",
        label: "node C",
        properties: {
          hostname: "node3.my.net"
        }
      }
    ],
    links: [
      {
        source: "n1",
        target: "n2",
        cost: 1.0
      },
      {
        source: "n1",
        target: "n3",
        cost: 1.0
      },
      {
        source: "n2",
        target: "n3",
        cost: 1.0
      }
    ]
  }
};

let x1 = 200,
  y1 = 25;

// node(x1,y1);

var i, x, y;
var myObj = JSON.stringify(test);

for (i in test.NetworkGraph.nodes) {
  console.log(test.NetworkGraph.nodes[i].label);

  x += "<h2>" + test.NetworkGraph.nodes[i].label + "</h2>";
  let cellAdded = paperAPI.createNode(x1, y1, test.NetworkGraph.nodes[i].label);
  paperAPI.nodeMap.set(test.NetworkGraph.nodes[i].id, cellAdded);
  x1 = 2 * y1;
  y1 = 2 * x1;
}
for (i in test.NetworkGraph.links) {
  var source = test.NetworkGraph.links[i].source;
  var target = test.NetworkGraph.links[i].target;

  let sourceNode = paperAPI.nodeMap.get(source);
  let targetNode = paperAPI.nodeMap.get(target);
  paperAPI.createLink(sourceNode, targetNode);
}
