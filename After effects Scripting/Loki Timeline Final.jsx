var window=new Window ("palette","Loki Timeline Slider",undefined);///
var group=window.add("group",undefined,"groupOne");
group.orientation="column";
var text=group.add("statictext",undefined,"Select the resolution")
var btn1=group.add("button",undefined,"1920 x 1080");
var btn2=group.add("button",undefined,"1280 x 720");
window.show();
window.center();


btn1.onClick=function()
{
    textComp(1920,1080,[960,719],[63,63],[960,719],[[160,0],[1750,0],[1750,1080],[168,1080]],[960,640],[44,44],0,960,1916,[330.0293,-105.9814]);
}

btn2.onClick=function()
{
    textComp(1280,720,[960,540],[100,100],[640,540],[[160,0],[1120,0],[1120,720],[168,720]],[640,430],[35,35],0,640,960,[5.769,-96.4707]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function textComp(cWidth,cHeight,straightLinePosition,circleScale,circlePosition,mskVertices,yearPosition,yearScale,leftPosition,middlePosition,rightPosition,yearAnchorPoint)
{
     var comp2=app.project.items.addComp("Main",cWidth,cHeight,1,10,25);
    //white solid for mask(set matte)
var whiteSolid=comp2.layers.addSolid([1,1,1], "White Solid 1", comp2.width,comp2.height,1, comp2.duration);////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Position
var newMask,myProperty,myShape,fea;
newMask = whiteSolid.Masks.addProperty("ADBE Mask Atom");
newMask.maskMode = MaskMode.ADD;
myProperty = newMask.property("ADBE Mask Shape");
myShape = myProperty.value;
                                //tl-1         //tr-2         //br-3          //bl-4
//myShape.vertices = [[160,0],[1120,0],[1120,720],[168,720]];////////////////////////////////////////////////////////////////////////1280,720
//myShape.vertices = [[160,0],[1750,0],[1750,1080],[168,1080]];////////////////////////////////////////////////////////////////////////1920,1080
myShape.vertices =mskVertices;
//myShape.closed = true;
fea=newMask.property("Mask Feather");
fea.setValue([50,50])
myProperty.setValue(myShape);
comp2.layers.precompose([1],"White Solid");/////////////////////////////////////////////////////////////////////////////////////////////////////

var bg=comp2.layers.addSolid([0,0,0], "BG", comp2.width,comp2.height,1, comp2.duration);

//straightLinex
var sl=comp2.layers.addShape();
sl.name="Straight Line";
var sla=sl.property("Contents").addProperty("ADBE Vector Group");//adding group
sla.name="shape 1";
var slb=sl.property("Contents").property("shape 1").property("Contents").addProperty("ADBE Vector Shape - Rect");//adding ellipse properties group
slb.property("Size").setValue([3000,3]);
var slc=sl.property("Contents").property("shape 1").property("Contents").addProperty("ADBE Vector Graphic - Fill");//adding fill properties group
slc.property("Color").setValue([1,1,1]);
//alert(sl.property(5).property(2).name)
sl.property(5).property(2).setValue(straightLinePosition)


//circle comp
//var pre=circleComp(cWidth,cHeight,circleScale,circlePosition);
var shape=comp2.layers.addShape()
shape.name="Circle";


var e2=shape.property("Contents").addProperty("ADBE Vector Group");//adding group
e2.name="Ellipse 2"
var e2ep=shape.property("Contents").property("Ellipse 2").property("Contents").addProperty("ADBE Vector Shape - Ellipse");//adding ellipse properties group
e2ep.property("Size").setValue([82.25,82.25])
var e2s=shape.property("Contents").property("Ellipse 2").property("Contents").addProperty("ADBE Vector Graphic - Stroke");//adding strokeproperties group
e2s.property("Stroke Width").setValue(0)
var e2f=shape.property("Contents").property("Ellipse 2").property("Contents").addProperty("ADBE Vector Graphic - Fill");//adding fill properties group
e2f.property("Color").setValue([1,1,1])
var e2ts=shape.property("Contents").property("Ellipse 2").property("Transform");
e2ts.property("Scale").setValue([110,110]);


var e1=shape.property("Contents").addProperty("ADBE Vector Group");//adding group
e1.name="Ellipse 1"
var e1ep=shape.property("Contents").property("Ellipse 1").property("Contents").addProperty("ADBE Vector Shape - Ellipse");//adding ellipse properties group
e1ep.property("Size").setValue([82.25,82.25])
var e1s=shape.property("Contents").property("Ellipse 1").property("Contents").addProperty("ADBE Vector Graphic - Stroke");//adding strokeproperties group
e1s.property("Stroke Width").setValue(0)
var e1f=shape.property("Contents").property("Ellipse 1").property("Contents").addProperty("ADBE Vector Graphic - Fill");//adding fill properties group
e1f.property("Color").setValue([1,1,1])


var r=shape.property("Contents").addProperty("ADBE Vector Group");//adding group
r.name="Rectangle 1"
var rp=shape.property("Contents").property("Rectangle 1").property("Contents").addProperty("ADBE Vector Shape - Rect");//adding rect properties group
rp.property("Size").setValue([173,44])
var rs=shape.property("Contents").property("Rectangle 1").property("Contents").addProperty("ADBE Vector Graphic - Stroke");//adding strokeproperties group
rs.property("Stroke Width").setValue(0)
var rf=shape.property("Contents").property("Rectangle 1").property("Contents").addProperty("ADBE Vector Graphic - Fill");//adding fill properties group
rf.property("Color").setValue([1,1,1])


var m=shape.property("Contents").addProperty("ADBE Vector Filter - Merge");
m.property("Mode").setValue(3)


var e3=shape.property("Contents").addProperty("ADBE Vector Group");//adding group
e3.name="Ellipse 3"
var e3ep=shape.property("Contents").property("Ellipse 3").property("Contents").addProperty("ADBE Vector Shape - Ellipse");//adding ellipse properties group
e3ep.property("Size").setValue([61,61])
var e3s=shape.property("Contents").property("Ellipse 3").property("Contents").addProperty("ADBE Vector Graphic - Stroke");//adding strokeproperties group
e3s.property("Stroke Width").setValue(0)
var e3f=shape.property("Contents").property("Ellipse 3").property("Contents").addProperty("ADBE Vector Graphic - Fill");//adding fill properties group
e3f.property("Color").setValue([1,1,1])


var f=shape.property("Contents").addProperty("ADBE Vector Graphic - Fill");
f.property("Color").setValue([1,1,1])


shape.property("Transform").property("Scale").setValue(circleScale);
shape.property("Transform").property("Position").setValue(circlePosition);

var pre=comp2.layers.precompose([1],"Circle Comp");
//pre.property("Transform").property("Position").expression='x=comp("Main").layer("Year").transform.position[0];[x,transform.position[1]]'/////////////////////////////////////////////////////
//pre.property("Transform").property("Scale").setValue([10,10]);
//pre.property("Transform").property("Anchor Point").setValue([640,360]);

//adjustment layer
var adjustmentLayer=comp2.layers.addSolid([1,1,1],"Adjustment Layer 1",comp2.width,comp2.height,comp2.duration)
adjustmentLayer.adjustmentLayer=true;
var ef=adjustmentLayer.property("Effects").addProperty("Set Matte");
//$.writeln(ef.property(1).name)
//$.writeln(ef.property(1).setValue(2));
ef.property(1).setValue(5);
//$.writeln(ef.property("ADBE Set Matte3-0002"));




var preComp=comp2.layers.precompose([1,2,3,4,5],"Graphical Comp");


//textLayer
   var textLayer=comp2.layers.addText();
    
    textLayer.property("Position").setValue(yearPosition)
    textLayer.property("Scale").setValue(yearScale)
    textLayer.property("Anchor Point").setValue(yearAnchorPoint)
    textLayer.name="Year"
    var myMarker = new MarkerValue("For correct position adjust 'Left,Middle,Right' effect on textLayer");
    textLayer.property("Marker").setValueAtTime(0, myMarker);
    var e=textLayer.property("Effects");
    var sLeft=e.addProperty("Slider Control");
    sLeft.name="Left";
    sLeft.property("Slider").setValue(leftPosition)
        var sMiddle=e.addProperty("Slider Control");
    sMiddle.name="Middle";
    sMiddle.property("Slider").setValue(middlePosition)
        var sRight=e.addProperty("Slider Control");
    sRight.name="Right";
    sRight.property("Slider").setValue(rightPosition)
        var sYearStart=e.addProperty("Slider Control");
    sYearStart.name="Year Start";
    sYearStart.property("Slider").setValue(2000)
        var sYearEnd=e.addProperty("Slider Control");
    sYearEnd.name="Year End";
    sYearEnd.property("Slider").setValue(1985)
    var ti=e.addProperty("Slider Control");
    ti.name="Times(Steps)";
    ti.property("Slider").setValue(5);
    var ani=e.addProperty("Slider Control")
    ani.name="Animation";
    ani.property("Slider").setValue(0);
    var st=e.addProperty("Set Matte")
    st.name="Set Matte(Don't Touch It)"
    st.property(1).setValue(2)
    
    textLayer.property("Source Text").expression='step=100/effect("Times(Steps)")("Slider");ref=Math.floor(effect("Animation")("Slider")/step);src=(effect("Animation")("Slider")%step)/step;if(ref<0){value=Math.floor(linear(ref,0,-effect("Times(Steps)")("Slider"),effect("Year End")("Slider"),effect("Year Start")("Slider")))}else{value=Math.floor(linear(ref,0,effect("Times(Steps)")("Slider"),effect("Year Start")("Slider"),effect("Year End")("Slider")))}if(ref==0){value=effect("Year Start")("Slider");}';
    textLayer.property("Position").expression='step=100/effect("Times(Steps)")("Slider");ref=(effect("Animation")("Slider")%step)/step;if(ref>0.5){res=linear(ref,0.5,1,effect("Left")("Slider"),effect("Middle")("Slider"));}else if(ref<=0.5 && ref>=0){res=linear(ref,0,0.5,effect("Middle")("Slider"),effect("Right")("Slider"))}else if(ref<-0.5){res=linear(ref,-1,-0.5,effect("Middle")("Slider"),effect("Right")("Slider"))}else if(ref<0){res=linear(ref,-0.5,0,effect("Left")("Slider"),effect("Middle")("Slider"))}else{value}value=[res,transform.position[1]]';
    comp2.openInViewer();
}