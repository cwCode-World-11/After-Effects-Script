var f=File("D:/Studies/Programs/After effects/Logo JPEG.jpg");
f.encoding='BINARY';
f.open('e');

var binary;
binary=f.read().toSource();

var myFile=new File("D:/Studies/Programs/After effects/binary.txt");
myFile.open("w");
myFile.encoding="UTF-8";
myFile.write(binary);
myFile.close();


f.close();

var w=new Window ("palette","myImage", undefined)
var a=w.add("image",undefined,"D:/Studies/Programs/After effects/Logo PNG.png");
w.show();