//Creating UI
var uibox=new Window ("palette", "Expression Apply", undefined);


//var st=uibox.add("statictext",undefined,"Write a expression and apply it")
var group=uibox.add("panel",undefined,"Write a expression and apply it")
group.orientation="column"
var et=group.add("edittext",undefined,"wiggle(10,60);");
et.size=[200,30];

var btn=group.add("button",undefined,"Apply");

//to show the ui
uibox.center ()
uibox.show();

btn.onClick=function()
{
    //alert(app.project.activeItem.selectedProperties);
    var selected=app.project.activeItem.selectedProperties;
    
    if(app.project.activeItem==null || selected==false)
    {
        alert("Please select one properties") 
        return false;//return false=intha alert message vanthuchi na(entha properties-um select panala),back to the UI
    }
    for(i=0;i<selected.length;i++) 
    {
        app.beginUndoGroup("Expression Applied");
        if(selected[i].expression=="")
        {
            selected[i].expression=et.text;
        }
        else
        {
            selected[i].expression+="\n"+et.text;
        }
        
        //selected[i].expression=et.text;
        app.endUndoGroup();
    }
}