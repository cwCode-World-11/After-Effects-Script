main();
function main()
{
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
  
 app.beginUndoGroup("Anchor point center");
    
    var comp=app.project.activeItem;
  
    var thisLayer,thisMask,myPath;
    var myVertices=[ ];
    for(i=0;i<comp.selectedLayers.length;i++)
    {
        thisLayer=comp.selectedLayers[i];
        thisMask=thisLayer.property("Masks").property(1);
        myPath=thisMask.property("Mask Path").value;
    
        myVertices=myPath.vertices;
        
        var center=centeroidSigmaFunction(myVertices)//callback function
        thisLayer.property("Anchor Point").setValue(center);
        thisLayer.property("Position").setValue(center);
    }
    app.endUndoGroup();
}
function centeroidSigmaFunction(vertices)
{
    var x,y,xOne,yOne
    var calculateX=0;
    var calculateY=0;
    var area=0;
  for(i=0;i<=vertices.length-1;i++)
    {
        x=vertices[i][0];
        y=vertices[i][1];
         if(i!=vertices.length-1)
         {
             xOne=vertices[i+1][0];
             yOne=vertices[i+1][1];
          }
         else
         {
             xOne=vertices[0][0]
             yOne=vertices[0][1]
         }
       calculateX+=(x+xOne)*(x*yOne-xOne*y)
       calculateY+=(y+yOne)*(x*yOne-xOne*y)
       
       area+=x*yOne-xOne*y
       }
       area=area*.5//1/2=0.5
       calculateX=calculateX*(1/(6*area));
       calculateY=calculateY*(1/(6*area));
       
       return[calculateX,calculateY]
       $.writeln("a");
}