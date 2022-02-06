//Creating UI
var uibox=new Window ("palette", "Box of text", undefined);

                          //type                    //size              //properties, here we have dropdownlist so we need to set multiple value.so,we put it on array
var dd=uibox.add("dropdownlist",undefined,["Position","Scale","Opacity"])
dd.selection=0;//Array(which means seleting a first value of dd)

var et=uibox.add("edittext",undefined,"wiggle(10,60);");

var btn=uibox.add("button",undefined,"Apply");

//to show the ui
uibox.center ();
uibox.show();

//onClick process
btn.onClick=function()
{
    if(app.project.activeItem==null)
    {
        alert("Please select one properties") 
        return false;//return false=intha alert message vanthuchi na(entha properties-um select panala),back to the UI
    }
    var comp=app.project.activeItem;
    if(comp.selectedLayers.length!=1)
    {
        alert ("Please select only one layer")
        return false;
    }
    applyexp(comp.selectedLayers[0]);//"app.project.activeItem"potavey [0] varanum
}
/*"applyexp(comp.selectedLayers[0]);" meaning=
    applyexp function ah call pandrom
    athu la "layer" ardument ah pass pandrom
    ippo call panna edathu ku pothu
    athu la "comp" already variable ah declare panni irukom,"selectedLayers"=select panna layer
    ippo pass aana edathuku varuthu athu la "property" nu irukuthu.property=opacity,position,rotation,etc...
    gettingdd() function ah namma name-ah kuthu-irukom.AE la athey name la enna property iruko athu act aaguthu
    kadaisiya expression kuduthurkom athu et(edittext) la enna value irukutho athu inga varuthu
*/

function applyexp(layer)
{
    layer.property(gettingdd()).expression=et.text;
}


function gettingdd()
{
    switch(dd.selection.index)
    {
        case 0:
        return "Position";
        break;
        case 1:
        return "Scale";
        break;
        case 2:
        return "Opacity";
        break;
    }
}