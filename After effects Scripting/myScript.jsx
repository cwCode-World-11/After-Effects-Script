//app.beginUndoGroup("Myscript");//undo
//app=application,project=current project,activeItems=layers,properties=opacity,position,rotation,etc...
var selected=app.project.activeItem.selectedProperties;

if(selected.length==0){
    alert("Please selected property");
}
else{
    for(i=0;i<selected.length;i++)
{
    selected[i].expression="wiggle(15,50)";
}
}

var name=app.project.item(3).name;//displaying 3rd comp name//.item(3)=index(not array index)
alert (name);

alert (app.project.activeItem.reflect.properties);//it showing all the properties in layer or projectPanel

alert (app.project.item(2).name);
alert (app.project.item(2).name="Changed");//it will change the comp name//item=comp,folders,etc..//item(2)=listed item

//app.project.items.addComp(name,width,height,aspect rideo,sec,frame rate)
var newComp=app.project.items.addComp("Sample creating comp",1280,720,1,10,25);//creating a comp
var newLayer=newComp.layers.addText("Rajan Stark");//creating new text
newLayer.position.setValue([1000,380])//setting a position
//alert(selected[0].value);
//selected[0].setValue(30);//ithu opacity kumattum thaan work aagum because opacity ku thaan value 1 varum.
//app.endUndoGroup();//redo