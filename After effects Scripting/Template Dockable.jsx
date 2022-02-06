{
    function script(thisObj)
    {
        function ui(thisObj)
        {
            var pal=thisObj instanceof Panel?thisObj:new Window("palette",'script',undefined);
            
            res="group{,\
          btn:Button{text:Okay},\
            }"
            
            pal.grp=pal.add(res)
            pal.layout.layout(true)
            return pal;
        }
    var mys=ui(thisObj);
    mys.show();
    mys.center();
    }
script(this)
}