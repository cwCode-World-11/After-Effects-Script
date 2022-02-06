var w=new Window ("palette", "Comp Marker Copy",undefined);
w.orientation="row"
var g1=w.add ("group", undefined, "groupOne");
var c=g1.add("button",undefined,"Copy");
var g2=w.add ("group", undefined, "groupTwo");
var pst=g2.add("button",undefined,"Paste");
w.show();


var frmComp=app.project.item(1);
var toComp=app.project.activeItem;
var marker=new Object ();
marker.fr=fn (frmComp);
$.write (marker)

c.addEventListener ("click",marker, false)


pst.addEventListener("click",toComp.markerProperty.setValueAtTime(frmComp.markerProperty.keyTime(1),marker),false);

function fn(fc)
{
    for(i=1;i<=fc.markerProperty.numKeys;i++)
    {
        $.writeln("i<frmComp.markerProperty.numKeys :"+fc.markerProperty.numKeys)
        //$.writeln("i<frmComp.markerProperty.numKeys(i) :"+frmComp.markerProperty.numKeys(i))
                                                                                     //keyValue=entha duration la marker la irukutho atha edathalam paakum(if marker has set in 1 sec it will get it or read/write)
        marker=new MarkerValue(fc.markerProperty.keyValue(i).comment);
        //$.writeln("frmComp.markerProperty.keyValues(i)  :"+frmComp.markerProperty.keyValues(i))
        //$.writeln("frmComp.markerProperty.keyValues(i).comment :"+frmComp.markerProperty.keyValues(i).comment)
        marker.chapter=fc.markerProperty.keyValue(i).chapter;
        marker.comment=fc.markerProperty.keyValue(i).comment;
        marker.cuePointName=fc.markerProperty.keyValue(i).cuePointName;
        marker.duration=fc.markerProperty.keyValue(i).duration;
        marker.url=fc.markerProperty.keyValue(i).url;
        marker.frameTarget=fc.markerProperty.keyValue(i).frameTarget;
        marker.eventCuePoint=fc.markerProperty.keyValue(i).eventCuePoint;
        marker.label=fc.markerProperty.keyValue(i).label;
        marker.protectedRegion=fc.markerProperty.keyValue(i).protectedRegion;
        //alert ("message", "itle", 0)
}
}

/*function tc(c)
{
    toComp.markerProperty.setValueAtTime(frmComp.markerProperty.keyTime(i),marker);
}*/