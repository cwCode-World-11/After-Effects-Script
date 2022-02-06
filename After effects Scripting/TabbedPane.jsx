//var s=app.project.item.addComp("Loki",1280,720,1,30,25);


//var shiftChannelsEffect = s.property("Effects").addProperty("Shift Channels");

var mainWindow = new Window("palette", "Tab Script", undefined);
mainWindow.orientation = "column";

var tabbedPanel = mainWindow.add("tabbedpanel");
var footageTab = tabbedPanel.add("tab", undefined, "Tab 1");
var et1=footageTab.add("edittext",undefined,"100")
et1.size=[200,25]
var btn1=footageTab.add("button",undefined,"Button One")

var footageTab2 = tabbedPanel.add("tab", undefined, "Tab 2");
var et2=footageTab2.add("statictext",undefined,"Static Text")
et2.size=[200,25]

var footageTab3=tabbedPanel.add("tab",undefined,"Tab 3");
var group1=footageTab3.add("group",undefined,"Group One");
var dd=group1.add("dropdownlist",undefined,["List 1","List 2","List 3"])
dd.selection=2;
footageTab3.size=[10,10]

var footageTab4=tabbedPanel.add("tab",undefined,"Tab 4");
var p1=footageTab4.add("panel",undefined,"Panel");
var c1=p1.add("checkbox",undefined,"Check Box 1")
var c2=p1.add("checkbox",undefined,"Check Box 2")
var c3=p1.add("checkbox",undefined,"Check Box 3")


var footageTab5=tabbedPanel.add("tab",undefined,"Tab 5");
var p2=footageTab5.add("panel",undefined,"Panel");
p2.orientation="row";
var ck1=p2.add("checkbox",undefined,"Check Box 1")
var ck2=p2.add("checkbox",undefined,"Check Box 2")
var ck3=p2.add("checkbox",undefined,"Check Box 3")




mainWindow.show();
