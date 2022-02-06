main();//callback function
function main()
{                                                     //compItem=comp item thavira vera ethavuthu iruntha.
    if(app.project.activeItem==null||!(app.project.activeItem instanceof CompItem))
    {
        alert("Please select a comp");
        return false;
     }
    if(app.project.activeItem.selectedLayers.length<1)
    {
        alert("Please select atleast one layer");
        return false;
}
    //begin main code
    app.beginUndoGroup("Anchor point center");
    
    var comp=app.project.activeItem;
    //alert (comp)
    var thisLayer,thisMask,myPath;
    var myVertices=[ ];//ithu yen array la kudukurom na height,width use pannuvo
    for(var i=0;i<comp.selectedLayers.length;i++)
    {
        thisLayer=comp.selectedLayers[i];
        thisMask=thisLayer.property("Masks").property(1);
        myPath=thisMask.property("Mask Path").value;
        //alert("mask path value",myPath)
        myVertices=myPath.vertices;//"vertices"-nu oru property irukku      //vertices na antha mask points  //intha variable vertices la irukura location store pannuthu(e.g:1280,720)
        //alert(myPath.reflect.properties);     //ithu enna enna property irukku nu paakaruth ku
/*
        for(i=0;i<myVertices.length-1;i++)
        {
            alert (myVertices[i])     //ithu ethana vertices irukunu paarkarsathuku
         }
*/    
        var center=centeroidSigmaFunction(myVertices)//callback function
        thisLayer.property("Anchor Point").setValue(center);
        thisLayer.property("Position").setValue(center);
    }

    app.endUndoGroup();
}
/*          -
             \      =Summation symbol key board la summation symbol type panna mudiyaathunala naa summation symbol ah short-ah "s" nu type pandren.
            /_
*/



/*intha script anchor point ah cener la ku]onduvarathu  ku thaan.so,itha mathematical ah thaan mudiyum.
athu kaana sigma formula,
Cx=1/6A  (i=0)sOF(n-1)(xi+xi+1)(xiyi+1-xi+1yi)
Cy=1/6A  (i=0)sOF(n-1)(yi+yi+1)(xiyi+1-xi+1yi)
A=1/2(i=0)sOF(n-1)(xiyi+1-xi+1yi)
*/



function centeroidSigmaFunction(vertices)
{
    //first-u x,y lam declare pannalam
  //formula padi x=x,y=y,xOne=xi+1,yOne=yi+1,calculatedX=Cx,calculatedY=Cy,area=A 
    var x,y,xOne,yOne
    var calculatedX=0;//0 la iruthu start aagarathukaaga first-u 0 assign panni irukom
    var calculatedY=0;
    var area=0;
    /*
        Nammaku formula padi "i=0" athavuthu 0 la irunthu start pannanum.
        "n-1"general ah maths la "n"-noda value last nu assign pannuvom.so,athey mari program-layum last minus one assign pannanum
        0 la irunthu start aaganum athey samiyam "n-1"nu varanum na athu-ku namma for loop use panna lam
    */
  for(i=0;i<vertices.length-1;i++)//formula padi last minus one
    {
        //ippo values-ah assign pannum
        x=vertices[i][0];//"vertices[i]"ithu la i vanthu general-ah for loop poda pothu podrathu thaan.but "0"x and y nu assign pandrom(height,width)(array)
        y=vertices[i][1];
        /*detail explained of "x"and"y"
         x and y=width and hight
         "x=vertices[i][0];"ithula "i"vanthu vertices value va assign pannum(e.g: 1280,720)
         "x=vertices[i][0];"0" vanthu "i" index la irukura,array of 0([0,1])la irukura 0 va assign pannum(e.g:  [1280,720]) 0=1280
         intha for loop la irukura double array([][])va purijikunumna intha link-ah paaru
         (D:\Studies\Videos\After Effects\Getting Started with Scripting in After Effects;  time:18:30)
         formula padi i=index-nu ninaikuren confirm-ah therila.
         */
        
         if(i!=vertices.length-1)//ithu ethukunu sure ah therila
         {
             xOne=vertices[i+1][0];//formula padi "+1" varuthu
             yOne=vertices[i+1][1];
          }
         else
         {
             xOne=vertices[0][0]//intha 0 vanthu value va store aagum ninaikiren
             yOne=vertices[0][1]
         }
     //ippo formula padi inga apply pannalm
       calculateX+=(x+xOne)*(x*yOne-xOne*y)
       calculateY+=(y+yOne)*(x*yOne-xOne*y)
       
       area+=(x*yOne-xOne*y)
       
       //ippo ellam pannatha onna formula padi form pannanum
       area=.5*area//1/2=0.5
       calculateX=(1/(6*area))*calculateX
       calculateY=(1/(6*area))*calculateY
       }
}