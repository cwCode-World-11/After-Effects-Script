var window=new Window("palette","Marker",undefined);
var applyMarkers=window.add("button",undefined,"Apply Markers");
window.show();

applyMarkers.onClick=function()
{
    var marker=new MarkerValue("");
    marker.comment="Hello World"
    var comp=app.project.activeItem;
    var layer=comp.layers.addText("Markers Text Layer");
    //layer.property("Marker").setValueAtTime(time,value);
    layer.property("Marker").setValueAtTime(10,marker);
    layer.property("Marker").setValueAtTime(40,marker);
    layer.inPoint=layer.property("Marker").keyTime(1);
    layer.outPoint=layer.property("Marker").keyTime(2);
    
}