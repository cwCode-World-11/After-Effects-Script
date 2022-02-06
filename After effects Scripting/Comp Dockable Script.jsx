//Paste this script on this path="C:\Program Files\Adobe\Adobe After Effects CC 2018\Scripts\ScriptUI Panels"

/*
    compOne=1920x1080
    compTwo=1280x720
    compThree=1080x1080
    compFour=640x640
*/

{
function myScript(thisObj)    
{
    function myScript_buildUI(thisObj)
    {
        var myPanel=(thisObj instanceof Panel)?thisObj:new Window("palette","Creating Comp",undefined,{resizeable:true})
        res="group{orientation:'column',\
                groupOne:Group{orientation:'row',\
                compOne:Button{text:'1920 x 1080'},\
                compThree:Button{text:'1080 x 1080'},\
                },\
                groupTwo:Group{orientation:'row',\
                compTwo:Button{text:'1280 x 720'},\
                compFour:Button{text:'640 x 640'},\
                },\
                }";
        
        myPanel.grp=myPanel.add(res)
        
        
        //Adding Function to button
        myPanel.grp.groupOne.compOne.onClick=function()
        {
            comp(1920,1080);
        }
    
    myPanel.grp.groupOne.compThree.onClick=function()
    {
        comp(1080,1080);
    }

myPanel.grp.groupTwo.compTwo.onClick=function()
{
    comp(1280,720);
}

myPanel.grp.groupTwo.compFour.onClick=function()
{
    comp(640,640);
}
        
        myPanel.layout.layout(true)
        return myPanel;
    }
var myScriptPal=myScript_buildUI (thisObj);
if(myScriptPal!=null && myScriptPal instanceof Window)
{
    myScriptPal.center ();
    myScriptPal.show();
}
}
myScript (this);
}

function comp(width,height)
{
    var c=app.project.items.addComp("Comp Created",width,height,1,90,25);
    c.openInViewer();
}