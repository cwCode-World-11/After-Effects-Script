var window = new Window("palette", "Mask Exporter", undefined);
window.orientation = "column";

var panel = window.add("panel", undefined, "");
var groupTwo = panel.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var locationButton = groupTwo.add("button", undefined, "...");

window.center();
window.show();


locationButton.onClick = function() {
    var thisPresetFolder =new Folder;
    thisPresetFolder = thisPresetFolder.selectDlg("presets Folder");
    
    if(thisPresetFolder != null) {
        locationEditText.text = thisPresetFolder.fsName.replace(/%20/g, " ");
        } 
    }