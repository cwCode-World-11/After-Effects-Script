/*target
*select song
*adjust markers
*apply text 
*finally pre comp
*/

var lyricTxt=[];
var items=[];
var audioItem=[];
var audioNames=[];

var window=new Window("palette","Lyric Script",undefined);
var panel=window.add("panel",undefined,"Lyric Script");

var verifiedCheckBox=panel.add("checkbox",undefined,"Verified");

var  grpOne=panel.add("group",undefined,"Group One");
grpOne.orientation="row";
var staticText=grpOne.add("statictext",undefined,"Select Song Lyric");
var songPath=grpOne.add("edittext",undefined,"Please select a text file");
songPath.size=[250,30];
var dotOption=grpOne.add("button",undefined,". . .");
dotOption.size=[28,28];

var grp=panel.add("group",undefined,"Group Three");
var songStaticText=grp.add("statictext",undefined,"Select a song");
var songDD=grp.add("dropdownlist",undefined,getAudio());
songDD.selection=0;
songDD.size=[200,25];

var grpTwo=panel.add("group",undefined,"Group Two");
var generateMarkers=grpTwo.add("button",undefined,"Generate Markers");
var applyMarkers=grpTwo.add("button",undefined,"Apply Markers");
applyMarkers.enabled=false;
var cancel=grpTwo.add("button",undefined,"Cancel");
cancel.enabled=false;

window.show();
window.center();

dotOption.onClick=function()
{
    var temTextFile=new File;
    temTextFile=temTextFile.openDlg("Select a lyric text file","*.txt",false);
    if(temTextFile!=null)
    {
        songPath.text=temTextFile.fsName.replace (/%20/g, " ");
    }
    else
    {
        alert("Please select a text file properly");
        return false;
    }
}

generateMarkers.onClick=function()
{
    if(verifiedCheckBox.value==false)
    {
        alert ("Please verify before you hit generate button. \n \n Procedure: \n \nStep 1: Create a sample text before you run this script in after effects(NOTE: Font size,text color,position are getting from your sample text). \n \n Step 2: Run this script and fill the boxes and hit generate button. \n \n Step 3: After apply generate button adjust the markers based on  time or song lyric timming. \n \n Step 4: Finally press apply button to generate text.");
        return false;
    }
    else
    {
        if(!File(songPath.text).exists) 
    {
            alert("Please select a lyric text file first");
            return false;
    }
        
    songPath.enabled=false;
    dotOption.enabled=false;
    generateMarkers.enabled=false;
    songDD.enabled=false;
    applyMarkers.enabled=true;
    
    cancel.enabled=true;
    
    main(File(songPath.text),audioItem[songDD.selection.index]);
    }
}

function main(txtFile,audio)
{
    app.beginUndoGroup("Undo Lyric Script");
    var comp=app.project.items.addComp("Lyric Generated Script",1920,1080,1,audio.duration,30);
    var audioSong=comp.layers.add(audio);
    var thisLine;
    var thisMarker=new MarkerValue("");
    var markerTime=0;
    //oru marker-kum innoru marker-kum space varathuku.
    txtFile.open("r");
    do
    {
        thisLine=txtFile.readln();
        if(thisLine!="")
        {
            lyricTxt.push(thisLine);
        }
    }while(!txtFile.eof);
    var markerTimeIncrement=(comp.duration-markerTime)/lyricTxt.length;
    for(var j=0;j<lyricTxt.length;j++)
    {
        thisMarker.comment=lyricTxt[j];
        //layer.property("Marker").setValueAtTime(time,value);
        audioSong.property("Marker").setValueAtTime(markerTime, thisMarker);
        markerTime+=markerTimeIncrement;
    }
    comp.openInViewer();
    app.endUndoGroup();
}

applyMarkers.onClick=function()
{
    var lyricComp=app.project.activeItem;
    var songLayer=lyricComp.layer(1);
    //ithu reverse la podarathu ku kaaranam song first line first layer la irukunum athaan
    for(var q=lyricTxt.length;q>0;q--)
    {
        var txtLayer=lyricComp.layers.addText(songLayer.property("Marker").keyValue(q).comment);
        txtLayer.inPoint=songLayer.property("Marker").keyTime(q);
        if(q != songLayer.property("Marker").numKeys) 
        {
            txtLayer.outPoint = songLayer.property("Marker").keyTime(q+1);
        }
    }
}

function getAudio()
{
    for(var i=1;i<=app.project.numItems;i++)
    {
        items.push(app.project.item(i).file);
        if(app.project.item(i).hasVideo==false && app.project.item(i).hasAudio==true)
        {
            audioItem.push(app.project.item(i));
            audioNames.push(app.project.item(i).name);
        }
    }
    return audioNames;
}

cancel.onClick=function()
{
    songPath.enabled=true;
    dotOption.enabled=true;
    generateMarkers.enabled=true;
    songDD.enabled=true;
    applyMarkers.enabled=false;
    cancel.enabled=false;
    
    songPath.text="Please select a text file";
}