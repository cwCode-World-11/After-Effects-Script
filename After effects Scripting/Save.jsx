var word=[];

var path=File("D:\\Studies\\Programs\\After effects\\Save.txt");
if(!path.exists)
{
    path.open("w");
    path.write("true\r Sample");
    path.close();
}
else
{
    path.open("r");
    while(!path.eof)
    {
        word.push(path.readln().toString())
    }
}
mainWindow=new Window("palette","Save text",undefined);
mainWindow.orientation="column";
var groupOne=mainWindow.add("group",undefined,"groupOne");
groupOne.orientation="row"
var checkBox=groupOne.add("checkbox",undefined,"True");
if(word[0]=="true")
{
    checkBox.value==true;
}
var text=groupOne.add("edittext",undefined,"Hello");
text.size=[100,25]
text.text=word[1];
var groupTwo=mainWindow.add("group",undefined,"groupTwo");
groupTwo.orientation="row"
var resetBtn=groupTwo.add("button",undefined,"Reset");
var saveBtn=groupTwo.add("button",undefined,"Save");

mainWindow.center ();
mainWindow.show();


resetBtn.onClick=function()
{
    path.open("w");
    path.write ("true\rSample");
    path.close();
}

saveBtn.onClick=function()
{
    path.open("w");
    path.write (checkBox.value.toString()+"\r"+text);
    path.close();
}
