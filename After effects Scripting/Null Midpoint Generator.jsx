// null mid point
var window = new Window("palette", "Generate Midpoint Null", undefined);
var et = window.add("edittext", undefined, 3);
et.size = [30, 30];
var btn = window.add("button", undefined, "Apply");

window.show();

var comp = app.project.activeItem;

btn.onClick = function () {
    app.beginUndoGroup("Null Midpoint Generator")
  var num = Number(et.text) + 1;

  if (
    comp.selectedLayers[0] == null ||
    comp.selectedLayers[1] == null ||
    comp == null
  ) {
    alert("Please select comp and two layers");
  } else {
    var pos1 = comp.selectedLayers[0];
    var pos2 = comp.selectedLayers[1];
    pos1.name = "Point 1";
    pos2.name = "Point 2";
    var i = 0;
    var diff = 100 / num;
    var labelColor = Math.ceil(Math.random() * 16); //0=none,1 to 16 is a default preference color in after effects
    for (var index = 0; index < num - 1; index++) {
      i += diff;
      var n = comp.layers.addNull(comp.duration);
      n.label = labelColor;
      n.name = "Midpoint " + (index + 1);
      var sValue = n.property("Effects").addProperty("Slider Control");
      sValue.name = "Bias Percentage";
      n.property("Transform").property("Position").expression =
        'var p = effect("Bias Percentage")("Slider");\nvar a = thisComp.layer("Point 1").transform.position[0];\nvar b = thisComp.layer("Point 1").transform.position[1];\nvar c = thisComp.layer("Point 2").transform.position[0];\nvar d = thisComp.layer("Point 2").transform.position[1];\nx = linear(p,0,100,a,c);\ny = linear(p,0,100,b,d);\n[x,y];';
      sValue.property(1).setValue(i);
    }
  }
app.endUndoGroup()
};
