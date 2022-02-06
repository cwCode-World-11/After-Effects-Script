var mainWindow=new Window("palette","Auto width text",undefined);

var groupOne=mainWindow.add("group",undefined,"groupOne");
groupOne.orientation="row";
var widthText=groupOne.add("statictext",undefined,"Width");
widthText.size=[40,25];
var widthEditText=groupOne.add("edittext",undefined,"100");
widthEditText.characters=6;

var groupTwo=mainWindow.add("group",undefined,"groupTwo");
groupTwo.orientation="row";
var heightText=groupTwo.add("statictext",undefined,"Height");
heightText.size=[40,25];
var heightEditText=groupTwo.add("edittext",undefined,"100");
heightEditText.characters=6;

var groupThree=mainWindow.add("group",undefined,"groupThree");
groupThree.orientation="row";
var checkbox=groupThree.add("checkbox",undefined,"Apply Control");
checkbox.value=true;
var applyButton=groupThree.add("button",undefined,"Apply");

mainWindow.center();
mainWindow.show();

applyButton.onClick=function()
{
    if(app.project.activeItem==null || !(app.project.activeItem instanceof CompItem))
    {
        alert ("Please select the comp");
        return false;
    }
    var comp=app.project.activeItem;

    if(comp.selectedLayers.length=0)
    {
        alert ("Please select atleast one layer");
        return false;
    }

    var checkedTextLayers=checkForTextLayers(comp.selectedLayers)//ithu text layer thaana nu check pandrom

    if(checkedTextLayers.length<1)
    {
        alert ("Please select atleast one layer of  text");
        return false;
    }
    
    app.beginUndoGroup("Auto Scale undo");
    
    applyFunction(checkedTextLayers,parseInt(widthEditText.text),parseInt(heightEditText.text),checkbox.value)
    
    app.endUndoGroup()

}


function applyFunction(layers,width,height,expressionBool)
{
    var activeComp=layers[0].containingComp;
    var widthEffect;
    var heightEffect;
    for(var i=0;i<layers.length;i++)
    {
        if(expressionBool)
        {
            if(layers[i].property("Transform").property("Scale").expressionEnabled==false)
            {
                widthEffect=layers[i].Effects.addProperty("Slider Control")
                widthEffect.name="Width";
                widthEffect.property(1).setValue(width)
                heightEffect=layers[i].Effects.addProperty("Slider Control")
                heightEffect.name="Height";
                heightEffect.property(1).setValue(height)
                layers[i].property("Transform").property("Scale").expression=
                'maxX=effect("Width")("Slider");\r maxY=effect("Height")("Slider");\r r=sourceRectAtTime(time);\r w=r.width;\r h=r.height\r s=w/h>maxX/maxY?maxX/w:maxY/h;\r [100,100]*s';
            }
        }
        else
        {
          if(layers[i].property("Transform").property("Scale").expressionEnabled==false) 
            {
                layers[i].property("Transform").property("Scale").expression=
                'maxX='+width+';\r maxY='+height+';\r r=sourceRectAtTime(time);\r w=r.width;\r h=r.height\r s=w/h>maxX/maxY?maxX/w:maxY/h;\r [100,100]*s';
            }
        }
    }
}



function checkForTextLayers(layers)
{
    var textLayers=[ ];
    for(var i=0;i<layers.length;i++)
    {
        if(layers[i].property("Source Text"))//text layers  layers la muttum thaan "Source Text" nu property varum
        {
            textLayers.push (layers[i])
        }
    }
    return textLayers;
}