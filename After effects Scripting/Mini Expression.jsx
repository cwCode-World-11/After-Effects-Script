var mainWindow=new Window("palette","Mini Expression",undefined);
var tb=mainWindow.add("tabbedpanel");

var t1=tb.add("tab",undefined,"Basic");/////////////////////////////
var dd=t1.add("dropdownlist",undefined,["<--Please select a list-->","time;","wiggle(5,8);","loopIn();","loopOut();","linear(tVal,tValMin,tValMax,thisMinVal,thisMaxVal);","Math.floor(number);","tColorsVal.sampleImage(point,radius=[.5,.5],postEffect=true,t=time);","posterizeTime(framePerSecond);"]);
dd.selection=1;
var apBtn1=t1.add("button",undefined,"Apply");

var t2=tb.add("tab",undefined,"Time");////////////////////////////////
var g1=t2.add("group",undefined,"Group One");
g1.orientation="row";
var r1=g1.add("radiobutton",undefined,"Countdown");
var r2=g1.add("radiobutton",undefined,"Date");
r2.value=true;
var g2=t2.add("group",undefined,"Group Two");
g2.orientation='row';
var txt=g2.add("statictext",undefined,"Enter the symbol that display in middle of the date"); 
var et=g2.add("edittext",undefined,"-");
et.size=[30,30]
var g3=t2.add("group",undefined,"Group Three");
var apBtn2=g3.add("button",undefined,"Apply");

var t3=tb.add("tab",undefined,"Bounce");////////////////////////////
var g4=t3.add("panel",undefined,"Bounce Effect");
g4.size=[300,60]
var apBtn3=g4.add("button",undefined,"Apply Bounce Effect");

mainWindow.show();
mainWindow.location=[350,250];

var comp=app.project.activeItem;
var selectedProperties=comp.selectedProperties;

apBtn1.onClick=function(){
    b(app.project.activeItem.selectedProperties,dd.selection);
}

apBtn2.onClick=function(){
    if(r1.value==true){
        //alert ("message 1");
        if(app.project.activeItem==null)
    {
        alert("Please select one comp") 
        return false;
    }
    var txtLayer=comp.layers.addText();
    txtLayer.name="Countdown";
    var eff=txtLayer.property("Effects");
    var sl1=eff.addProperty("Slider Control");
    sl1.name="Countdown";
    sl1.property("Slider").setValue(10);
    sl1.property("Slider").expression='Math.floor(effect("Countdown")(1));';
    txtLayer.property("Source Text").expression='effect("Countdown")("Slider");';
}else if(r2.value==true){
//    alert ("message 2");
   dateRadio(); 
}else{
    alert ("Nothing was selected");
    }
}

apBtn3.onClick=function()
{
    var com=app.project.activeItem;
    var l=com.selectedLayers[0];
    var slted=com.selectedProperties;
     if(com==null || l==null)
    {
        alert("Please select one comp and layer") 
    }else
    {
        var fre=l.property("Effects").addProperty("Slider Control");
        fre.name="Frequency";
        fre.property("Slider").setValue(5);
        var decay=l.property("Effects").addProperty("Slider Control");
        decay.name="Decay";
        decay.property("Slider").setValue(10);
       for(var q=0;q<slted.length;q++)
       {
            if(slted[q].expression=="")
            {
                slted[q].expression='freq = effect("Frequency")("Slider");decay =effect("Decay")("Slider"); n = 0;if (numKeys > 0){n = nearestKey(time).index;if (key(n).time > time) n--;}if (n > 0){t = time - key(n).time;amp = velocityAtTime(key(n).time - .001);w = freq*Math.PI*2;value + amp*(Math.sin(t*w)/Math.exp(decay*t)/w);}else value'
              }
            else{
                slted[q].expression+="\n"+"n.toString()";
            }
        }
    }
}

function dateRadio(){
    if(app.project.activeItem==null)
    {
        alert("Please select one comp") 
        return false;
    }
    var textLayer=comp.layers.addText();
    textLayer.name="Date";
    var e=textLayer.property("Effects");
    var s1=e.addProperty("Slider Control");
    s1.name="Date";
    s1.property("Slider").setValue(31);
    s1.property("Slider").expression='Math.floor(effect("Date")(1));';
    var s2=e.addProperty("Slider Control");
    s2.name="Month";
    s2.property("Slider").setValue(12);
    s2.property("Slider").expression='Math.floor(effect("Month")(1));';
    var s3=e.addProperty("Slider Control");
    s3.name="Year";
    s3.property("Slider").setValue(2000);
    s3.property("Slider").expression='Math.floor(effect("Year")(1));';
    textLayer.property("Source Text").expression='value=effect("Date")("Slider").value.toString()+"'+et.text+'"+effect("Month")("Slider").value.toString()+"'+et.text+'"+effect("Year")("Slider").value.toString();';
}

function b(sldPro,ddName){
    if(app.project.activeItem==null || sldPro[0]==null)
        {
            alert ("Please select one propety!");
            return false;
        }
    else
    {
        applyExp(sldPro,ddName);
    }
}

function applyExp(sp,n)
{
     for(var i=0;i<sp.length;i++) {
    if(sp[i].expression=="")
        {
            sp[i].expression=n;
        }else
        {
            sp[i].expression+="\n"+n.toString();
        }
    }
}

function checkingComp(c){
    if(app.project.activeItem==null || c==false)
    {
        alert("Please select one properties") 
    }
return false;
}