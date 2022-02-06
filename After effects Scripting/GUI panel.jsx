//new Window (type, title, bounds, properties)
var dlg = new Window('dialog', 'Alert Box Builder'); 
dlg.btnPnl = dlg.add('panel', undefined, 'Build it'); 
dlg.btnPnl.testBtn = dlg.btnPnl.add('button', undefined, 'Test'); 
dlg.btnPnl.buildBtn = dlg.btnPnl.add('button', undefined, 'Build',  {name:'ok'}); 
dlg.btnPnl.cancelBtn = dlg.btnPnl.add('button', undefined, 'Cancel',  {name:'cancel'}); 
dlg.show(); 
//panel na div mari vechikalam

var d=new Window('dialog','Alert box');
d.icon=d.add ("iconbutton", undefined, "./Logo PNG.png")
d.variableName=d.add ('button', undefined, 'test')
d.variableNameTwo=d.add('button',undefined,'cancel')
d.show();
/*ithoda meaning window la irukura add method la irukura button ah add pandrom.
 */
var d1=new Window('dialog','Alert box');
//d1.variableName=d.
//d1.variableNameTwo=d.add('button',undefined,'cancel')
d1.show(d1.add ('button', undefined, 'myName'),d1.add('button',undefined,'cancel pandra Button'),d1.add('button',undefined,'Cancel'));

/*{
function fu (thisobj){
       var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "FX Console", [100, 100, 500, 600], {resizeable:true});
}
fu (this);
}*/