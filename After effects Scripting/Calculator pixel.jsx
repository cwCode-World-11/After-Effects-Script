//Calculating size of layer(pixel)
var mainWindow=new Window("palette","Pixel Calculator",undefined);

var groupOne=mainWindow.add("group",undefined,"groupOne");
groupOne.orientation="row";

var w=groupOne.add("statictext",undefined,"Width");
w.size=[50,25];
var wChangeText=groupOne.add("statictext",undefined,"-");
wChangeText.size=[50,25]
var h=groupOne.add("statictext",undefined,"Height");
h.size=[50,25];
var hChangeText=groupOne.add("statictext",undefined,"-");
hChangeText.size=[50,25];

var b=mainWindow.add("button",undefined,"Calculate");

mainWindow.center();
mainWindow.show();

b.onClick=function()
{
    if(app.project.activeItem==null || !(app.project.activeItem instanceof CompItem)) 
    {
        alert ("Select a Comp");
        return false;
    }
    if(app.project.activeItem.selectedLayers.length!=1)
    {
        alert ("Please select a one Layer")
        return false;
    }
    calculateSize(wChangeText , hChangeText , app.project.activeItem.selectedLayers[0]);
}

function calculateSize(wt,ht,layer)
{//containingComp=select panni irukura layer uda comp  //time=timeline la current time sollum       //containingComp=oru layer select panna atha layer entha comp la irukunu kaatuthu   //false=second parameter(sourceRectAtTime(parameterOne,parameterTwo))
    var rect= layer.sourceRectAtTime(layer.containingComp.time,false);//NOTICE : layer=app.project.activeItem.selectedLayers[0](itha namma call panni irukom)
    wt.text=rect.width;
    ht.text=rect.height;
}