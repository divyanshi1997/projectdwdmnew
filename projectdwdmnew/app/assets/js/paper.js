var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
  el: document.getElementById("canvas"),
  //   width: 800,
  //   height: 400,
  model: graph,
  drawgrid: true,
  gridSize: 10
});

// var paperScroller = new joint.ui.PaperScroller({
//   paper: paper,
//   cursor: "grab"
// });

// $("#canvas").append(paperScroller.render().el);

// var nav = new joint.ui.Navigator({
//   paperScroller: paperScroller,
//   width: 300,
//   height: 200,
//   padding: 10,
//   zoomOptions: { max: 2, min: 0.2 }
// });
// nav.$el.appendTo("#navigator");
// nav.render();

// paperScrolle r.center();
