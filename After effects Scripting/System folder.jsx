var creatingFolder=new Folder("D:\\TestFolder");//folder ah ippadi creat panu nu set pandrom
$.writeln(!creatingFolder.exists);//ippadi oru folder iruthuchina true va return pannum,ilaina false thaan kuda not(!) symbol inga use panni irukom  //"$.writeIn"=alert mari or console mari

if(!creatingFolder.exist)//ippadi oru folderilaina intha statement ah execute pannuthu
{
    creatingFolder.create();//intha edathala create aaguthu
}
 //new file create pannuthu //same path         //folder name ulla         //intha file ah create pannu
var txtFile=File(creatingFolder.path+"\\"+creatingFolder.name+"/myTxtFile.txt");
if(!txtFile.exists)
{
    txtFile.open("w");//"w"=write or read
    txtFile.write("this is my first creating text file using inside of scripting")//text file ulla intha type pannuthu
    txtFile.close();
    alert ("message", "title")
}