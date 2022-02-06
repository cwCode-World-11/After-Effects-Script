//After complete notes- pothiva color-roda value na vey RGB thaan.athula 0 to 255 verikum range(values) irukku.

var ui=new Window("palette","Random color(Cinematic look)",undefined)
ui.size=[200,50];
ui.orientation="colomn"
var grp=ui.add("group",undefined,"GroupOne");
grp.orientatioon="row"
//grp.location=
var btn=grp.add("button",undefined,"Change");
ui.show();


var comp=app.project.activeItem;
var layer=comp.selectedLayers
var effect=layer[0].property("Effects")
var ea=effect.addProperty("Tritone");
var m=ea.property("Midtones");
var s=ea.property("Shadows");
var h=ea.property("Highlights");
//RGB
//pothuva random method=0 to 1 veraikum random ah result ah kudukum.
//m.setValue([Math.random()*255,Math.random()*255,Math.random()*255]);
//alert (Math.random()*255,Math.random()*255,Math.random()*255)
btn.onClick=function()
{
    calc();
}
function calc()
{
    //alert ("edrfgtvrcfdzswqa")
    //After complete notes-tritone la irukura property value va eduthukurom atha random potrukanala random ah value pannuthu.
        m.setValue([Math.random(),Math.random(),Math.random()]);
        s.setValue([Math.random(),Math.random(),Math.random()]);
        h.setValue([Math.random(),Math.random(),Math.random()]);
        
        //After complete notes-intha calc potta tritone la irukura property value voda (*255) calculation aaguthu
        //After complete notes-athaavuthu random-ah 135 vanthuchi na *255 kuthu irukanala athoda multiple aaguthu
      /*m.setValue([Math.random()*m.maxValue,Math.random()*m.maxValue,Math.random()*m.maxValue]);
        s.setValue([Math.random()*255,Math.random()*255,Math.random()*255]);
        h.setValue([Math.random()*255,Math.random()*255,Math.random()*255]);*/
       
    }
//$.writeln("M :",m.value)
//$.writeln("S :",s.value)
//$.writeln("H :",h.value)