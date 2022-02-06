var project=app.project;
var comp=project.activeItem;
var width=comp.width;
var height=comp.height;
var piexlArray=new Array ();
var rValue=new Array ();
var gValue=new Array ();
var bValue=new Array ();
var pixels=width*height;//How many pixels are in our image
var x=1;
var y=1;
var originalScale;
var scaleFator;

app.beginUndoGroup("Color palette Generator");

var layer=comp.layer(1);//top layer la enna irukko athu thaan mension pannuthu
//$.writeln(layer);
//$.writeln(layer.name);
originalScale=layer.property("Scale").value
//$.writeln(originalScale);

//ippo point control add pannum athu main_layer(photo layer) la intract aaganum
var pointControl=layer.Effects.addProperty("Point Control");
var point=layer("Effects")("Point Control")("Point");

//ippo 3 text layers ah add pannum onnu vanthu red channel ku rendendaavathu vanthu blue channel ku moonaavathu green channel ku
var redText=comp.layers.addText();
redTextSource=redText.property("Source Text");
                                                                            //index+1=text add panna pothu photolayer first la itukum text layer add panna panna photo layer keela keela pogum athu nalathaan meethi reduthukum 2,3 nu kuduthukiren   //sampleImage()=build in function                                               //0=red,1=green,2=blue,3=alpha
redTextSource.expression='targetLayer=thisComp.layer(thisLayer.index +1);samplePoint=targetLayer.effect("Point Control")("Point");sampleRadius=[1,1];sampleColored_8bpc=255*targetLayer.sampleImage(samplePoint,sampleRadius); R=Math.round(sampleColored_8bpc[0]);outputString=R;';

var greenText=comp.layers.addText();
greenTextSource=greenText.property("Source Text");
                                                                            //text layer index                                                                                                      //How many pixel want to search in current point controler             //sampleImage()=build in function                                                                                             //0=red,1=green,2=blue,3=alpha
greenTextSource.expression='targetLayer=thisComp.layer(thisLayer.index +2);samplePoint=targetLayer.effect("Point Control")("Point");sampleRadius=[1,1];sampleColored_8bpc=255*targetLayer.sampleImage(samplePoint,sampleRadius); G=Math.round(sampleColored_8bpc[1]);outputString=G;';

var blueText=comp.layers.addText();
blueTextSource=blueText.property("Source Text");
                                                                            //text layer index                                                                                                      //How many pixel want to search in current point controler            //sampleImage()=build in function                                                                                         //0=red,1=green,2=blue,3=alpha
blueTextSource.expression='targetLayer=thisComp.layer(thisLayer.index +3);samplePoint=targetLayer.effect("Point Control")("Point");sampleRadius=[1,1];sampleColored_8bpc=255*targetLayer.sampleImage(samplePoint,sampleRadius);B=Math.round(sampleColored_8bpc[2]);outputString=B;';

//expression la enna nadakuthuna color analys aaguthu(eg: [19,80,74])apram sampleColored_8bpc la 0,1,2 nu kuduthu irukura nala athukethamari thani thani ya store panni vechikum
//text layer la irukura expression store pannatha rValue,gValue,bValue ethamari store pandrom.
//simple a sollom na oru box atha 100 by 100 grid row and colomns a perichikirom athu la irukuraovvoru box la yum 3 values irukunu vechikalam antha ovvoru values-yum eduthu ovvoru variable la store pandrom.

                              //divide whole width by 50
for(var i=1;i<=width;i+=50)
{                                       //divide whole height by 50
    for(var e=1;e<=height;e+=50)
    {
        point.setValue([i,e]);
        rValue.push(parseInt(redTextSource.value));
        gValue.push(parseInt(greenTextSource.value));
        bValue.push(parseInt(blueTextSource.value));
    }
}
//yen divided by 50 kudukurom na 4K,8K pixel lam million kanakula pixel irukum athalam calculate pannanum na late-aagum so 50,50 ya calculate pandrom
//$.writeln(rValue);


//ithu vanthu colors lam kandupudichithu-ju apram text lam remove pandrathuku
redText.remove();
greenText.remove();
blueText.remove();
//ithuverikum pannathu text la thaan
//antha text la irunthu thani thani ya eduthu rValue,gValue,bValue store pandrom,ippo ennaku text thevai illa.
//ovvoru pixel-liyum red,green,blue values irukum atha red value eduthu rVaue la,green value edthu gValue la,blue value eduthu bValue la store panni irukura mari code panninen


var colorOne=new Array();
var colorTwo=new Array();
var colorThree=new Array();
var colorFour=new Array();
var colorFive=new Array();
var low=new Array();//closly to black
var mid=new Array();//closly to black and white(middle)
var high=new Array();//closly to white

var totalColorValue;
var items=new Array();

for(var j=0;j<=rValue.length;j++)
{
    items.push ([rValue[j],gValue[j],bValue[j]])
}
//$.writeln ("text");
for(var q=0;q<items.length;q++)
{                                       
    //$.writeln ("text    2");            //0=red         //1=green           //2=blue
    totalColorValue=items[q][0]+items[q][1]+items[q][2];
    //$.writeln ("text   3");
    if(totalColorValue<=255)
    {
        low.push(items[q]);
    }
    if(totalColorValue>255&&totalColorValue<=510)
    {
        mid.push(items[q]);
    }
    if(totalColorValue>510)
    {
        high.push (items[q]);
    }
}

if(low.length<1&&mid.length>0)
{
    colorOne.push(mid[0]);
    colorTwo.push(mid[Math.round(mid.length/2)]);
}
if(low.length<1&&mid.length<1)
{
    colorOne.push(high[0]);
    colorTwo.push(high[Math.round(high.length/2)]);
}
if(low.length>0)
{
    colorOne.push(low[0]);
    colorTwo.push(low[Math.round(low.length/2)]);
}
if(mid.length<1&&low.length>0)
{
    colorThree.push(low[Math.round(low.length/2)]);
}
if(mid.length<1&&low.length<1)
{
    colorThree.push(high[Math.round(high.length/2)]);
}
if(mid.length>0)
{
    colorThree.push(mid[Math.round(low.length/2)]);//-----------------------------------------------------------------------------------doubt
}
if(high.length<1&&mid.length>0)
{
    colorFour.push(mid[0]);
    colorFive.push(mid[Math.round(low.length/2)]);
}
if(high.length<1&&mid.length<1)
{
    colorFour.push(low[0]);
    colorFive.push(low[Math.round(low.length/2)]);
}
if(high.length>0)
{
    colorFour.push(high[0]);
    colorFive.push(high[Math.round(low.length/2)]);
}
                                                                                                                                                                                       //1=pixel aspect ratio
var solidOne=comp.layers.addSolid([colorOne[0][0]/255,colorOne[0][1]/255,colorOne[0][2]/255],"Color one",comp.width,comp.height,1,comp.duration);
var solidTwo=comp.layers.addSolid([colorTwo[0][0]/255,colorTwo[0][1]/255,colorTwo[0][2]/255],"Color two",comp.width,comp.height,1,comp.duration);
var solidThree=comp.layers.addSolid([colorThree[0][0]/255,colorThree[0][1]/255,colorThree[0][2]/255],"Color three",comp.width,comp.height,1,comp.duration);
var solidFour=comp.layers.addSolid([colorFour[0][0]/255,colorFour[0][1]/255,colorFour[0][2]/255],"Color four",comp.width,comp.height,1,comp.duration);
var solidFive=comp.layers.addSolid([colorFive[0][0]/255,colorFive[0][1]/255,colorFive[0][2]/255],"Color five",comp.width,comp.height,1,comp.duration);

solidOne.property("Scale").setValue([10,10]);
solidTwo.property("Scale").setValue([10,10]);
solidThree.property("Scale").setValue([10,10]);
solidFour.property("Scale").setValue([10,10]);
solidFive.property("Scale").setValue([10,10]);

var baseX=comp.width/2;
var baseY=comp.height/2;

solidOne.property("Position").setValue([baseX,baseY*1.856]);
solidTwo.property("Position").setValue([baseX*1.2,baseY*1.856]);
solidThree.property("Position").setValue([baseX*1.4,baseY*1.856]);
solidFour.property("Position").setValue([baseX*1.6,baseY*1.856]);
solidFive.property("Position").setValue([baseX*1.8,baseY*1.856]);

comp.layers.precompose([1,2,3,4,5],"Color palette");

app.endUndoGroup();