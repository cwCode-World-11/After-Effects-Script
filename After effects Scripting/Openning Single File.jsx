var fdr="D:/Studies/Programs/After effects";

var mainWindow=new Window("palette","",undefined);
var btn=mainWindow.add("button",undefined,"Open")
mainWindow.show();

btn.onClick=function ()
{
    var f=File(fdr+"/Calculator pixel.jsx");
    $.evalFile(f);
}