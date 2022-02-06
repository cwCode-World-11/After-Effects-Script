function mark(frmComp,toComp)
{
    app.beginUndoGroup("Undo Comp Marker Copy");
    var marker;
                                                        //counting the marker
    for(i=1;i<=frmComp.markerProperty.numKeys;i++)
    {
        $.writeln("i<frmComp.markerProperty.numKeys :"+frmComp.markerProperty.numKeys)
        //$.writeln("i<frmComp.markerProperty.numKeys(i) :"+frmComp.markerProperty.numKeys(i))
                                                                                     //keyValue=entha duration la marker la irukutho atha edathalam paakum(if marker has set in 1 sec it will get it or read/write)
        marker=new MarkerValue(frmComp.markerProperty.keyValue(i).comment);
        //$.writeln("frmComp.markerProperty.keyValues(i)  :"+frmComp.markerProperty.keyValues(i))
        //$.writeln("frmComp.markerProperty.keyValues(i).comment :"+frmComp.markerProperty.keyValues(i).comment)
        marker.chapter=frmComp.markerProperty.keyValue(i).chapter;
        marker.comment=frmComp.markerProperty.keyValue(i).comment;
        marker.cuePointName=frmComp.markerProperty.keyValue(i).cuePointName;
        marker.duration=frmComp.markerProperty.keyValue(i).duration;
        marker.url=frmComp.markerProperty.keyValue(i).url;
        marker.frameTarget=frmComp.markerProperty.keyValue(i).frameTarget;
        marker.eventCuePoint=frmComp.markerProperty.keyValue(i).eventCuePoint;
        marker.label=frmComp.markerProperty.keyValue(i).label;
        marker.protectedRegion=frmComp.markerProperty.keyValue(i).protectedRegion;
        //setValueAtTime is a method    //setValueAtTime(time,markerObject)
            toComp.markerProperty.setValueAtTime(frmComp.markerProperty.keyTime(i),marker);
    }
    app.endUndoGroup();
}
mark (app.project.item(1),app.project.activeItem);