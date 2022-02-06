/*
var a=app.project.activeItem;
alert ("a",a)
var b=app.project.activeItems;
alert ("b",b)
var c=app.project.item;
alert ("c",c)
var d=app.project.items;
alert ("d",d)
var e=app.project.numItem;
alert ("e",e)
var f=app.project.numItems;
alert ("f",f)
*/


//creating removing script
//Creating UI
var mainWindow=new Window("palette","Remove unsed items",undefined)
mainWindow.orientation="column";

var r=mainWindow.add("panel",undefined,"Remove");
r.orientation="row"
var imageCheck=r.add("checkbox",undefined,"Image")
imageCheck.value=1;                                                       //1=on,   //0=off
var videoCheck=r.add("checkbox",undefined,"Video")
videoCheck.value=1;
var audioCheck=r.add("checkbox",undefined,"Audio")
audioCheck.value=1;
var r2=mainWindow.add("group",undefined,"r2");
var removeButton=r2.add("button",undefined,"Remove");
removeButton.orientation="row"

mainWindow.center();
mainWindow.show();

//remove onclicking
removeButton.onClick=function()
{
    removeFunction(imageCheck.value,videoCheck.value,audioCheck.value);
}

//remove oncliking function
function removeFunction(imageBool,videoBool,audioBool)
{
    app.beginUndoGroup("Undo removed items by myScript");
    
    var comps=[ ];//ithu la yen array la store pandrom na orey variables naraiya values store pannanum athanalathaan.
    var images=[ ];
    var videos=[ ];
    var audio=[ ];
    var itemName;  //extension ah kandupudichi athuketha mari remove pannum
    
    //item name lam "comps" variable store pandrom
    for(i=1;i<=app.project.numItems;i++)
    {
    //alert (app.project.numItems,"app.project.numItems");
    itemName=app.project.item(i).name;
    //comp thaana nu check pandrom,check pannitu name-ah add panndrom
    if(app.project.item(i) instanceof CompItem)
    {
        comps.push(app.project.item(i));
    }
    //image checks
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="jpg")
    {
        images.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="jpeg")
    {
        images.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="png")
    {
        images.push(app.project.item(i))
    }
    //videos check
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="mov")
    {
        videos.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="avi")
    {
        videos.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="mp4")
    {
        videos.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="mkv")
    {
        videos.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="mpg")
    {
        videos.push(app.project.item(i))
    }
    //audio checks
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="mp3")
    {
        audio.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="m4a")
    {
        audio.push(app.project.item(i))
    }
    if(itemName.substring(itemName.length-3, itemName.length).toLowerCase()=="wav")
    {
        audio.push(app.project.item(i))
    }

    
    //athulam true va iruntha?itha execute pannu
    if(imageBool==true)
    {
        searchComps(comps,images)
    }
    if(videoBool==true)
    {
        searchComps(comps,videos)
    }
    if(audioBool==true)
    {
        searchComps(comps,audio)
    }
}
    deleteUnfound();
    app.endUndoGroup();
}


function deleteUnfound()
{
    for(var i=app.project.numItems;i>0;i--)
    {
        if(app.project.item(i).typeName=="Footage"&&app.project.item(i).comment!="Found")
        {
            app.project.item(i).remove();
        }
    }
}



//comp la irukura source(img,vid,aud) project panel la irutha "comment" la "found"-nu pottu mension pandren.because,appadi potta found-u thavira mathatha remove panna easy ya irukum.
function searchComps(comps,items)
{
    var thisComp,thisLayer,thisSource;
    //$.writeln("a")
    for(var i=0;i<comps.length;i++)//comp-puku
    {
        thisComp=comps[i];
        for(var e=1;e<=thisComp.numLayers;e++)//layers-ku
        {
            //$.writeln("b")
            thisLayer=thisComp.layer(e);
            for(q=items.length-1;q>=0;q--)//project panel la keezha irunthu mela poganum(select aaganum)//source(vid,aud,img)-ku
            {
                //$.writeln("c")
                if(thisLayer.source==items[q])
                {
                    //$.writeln("d")
                    thisLayer.source.comment="Found";
                }
            }
        }
    }
    
}