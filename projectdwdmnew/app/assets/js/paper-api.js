var paperAPI = (function() {
  nodeMap = new Map();

  createNode = (x1, y1, label) => {
    var cell = new joint.shapes.standard.Circle({
      position: { x: x1, y: y1 }
    });
    cell.resize(100, 40);
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
      }
    });
    paperAPI.graph.addCell(cell);

    return cell;
  };

  createLink = (source, target) => {
    var cell = new joint.shapes.standard.Link({
      source: { id: source.id },
      target: { id: target.id },
      // vertices: breakpoints,
      attrs: {
        ".connection": {
          fill: "none",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          stroke: "#4b4a67"
        }
      }
    });
    paperAPI.graph.addCell(cell);
    return cell;
  };

  return {
    createNode: createNode,
    createLink: createLink,
    nodeMap: nodeMap,
    init: init,
    paper: paper,
    graph: graph
  };
})();
