//Please select a layer
alert(app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade"))
alert(app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade").property(1).name)
alert(app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade").parentProperty)
alert(app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade").parentProperty.containingComp)
alert(app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade").parentProperty.containingComp.name)
alert(app.project.activeItem.layers.addSolid([0,0,0], "Temp Solid", 10, 10, 1).source);
var a=app.project.activeItem.layers.addSolid([0,0,0], "MySldOpenblendmode", 10, 10, 1);
a.moveToEnd();
a.duplicate();
a.moveToBeginning();
a.blendingMode=BlendingMode.OVERLAY;
a.property("Position").dimensionsSeparated = true;