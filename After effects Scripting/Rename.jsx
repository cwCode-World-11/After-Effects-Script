var myFolder=Folder("C:\\Users\\Rajanstark\\Pictures");//folder ah select pandren
var files=myFolder.getFiles();//athula irukura files-ah vanguren

var file,extension
for(i=0;i<files.length;i++)
{
    file=files[i];
    extension=file.name.slice(file.name.length-4,file.name.length);//"slice(file.name.length-4" ithu artham last irunthu 4 mattum vittutu mathathalam operation pannu extension purpose-ku
    $.writeln("file length: "+file.length)
    file.rename ((i+1).toString ()+extension)
    $.writeln("i:"+i)
    $.writeln("i+1:"+(i+1))
    $.writeln("i+1 tostring:  :"+(i+1).toString ())//tostring=number ah string ah convert pannum
}