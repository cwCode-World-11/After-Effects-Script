var f=File("D:/logo.png");
$.write ("text")
f.encoding='BINARY';//encoding as binary value
f.open('e');//e (edit) Opens an existing file for reading and writing.

var binary;
binary=f.read().toSource();

var myFile=new File("D:/Studies/Programs/After effects/binaryLogo.txt");
myFile.open("w");//w (write) Opens a file for writing. If the file exists, its contents are destroyed. If the file does not exist, creates a new, empty file.
myFile.encoding="UTF-8";//text
myFile.write(binary);
myFile.close();


f.close();//closing


//UI
/*var w=new Window ("palette","myImage", undefined)
var a=w.add("image",undefined,"D:/Studies/Programs/After effects/Logo PNG.png");
var b=w.add("button",undefined,"Close");

a.addEventListener ("click",function()
{
    alert (" If you click this image it will show a alert message","Alerting message", 0)
},false);

b.onClick=function()
{
    w.close();
}
//help tip
a.helpTip="If you click this it will show some alert message"
b.helpTip="Closing Button"


w.center ();
w.show();
*/