{
	function rd_ScriptLauncher(thisObj)//1........................1
	{
		var rd_ScriptLauncherData = new Object();	// Store globals in an object
		rd_ScriptLauncherData.scriptName = "rd: Script Launcher";
		rd_ScriptLauncherData.scriptTitle = rd_ScriptLauncherData.scriptName + " v2.3";
		rd_ScriptLauncherData.scriptPath = "";
		rd_ScriptLauncherData.scriptFiles = new Array();
		rd_ScriptLauncherData.strScriptsFolder = {en: "Folder..."};
		rd_ScriptLauncherData.strRefreshList = {en: "Refresh"};
		rd_ScriptLauncherData.strRun = {en: "Run"};
		rd_ScriptLauncherData.strHelp = {en: "?"};
		rd_ScriptLauncherData.strErrNoScriptsPath = {en: "Cannot open the palette because the Scripts folder could not be located."};
		rd_ScriptLauncherData.strMinAE80 = {en: "This script requires Adobe After Effects CS3 or later."};
		rd_ScriptLauncherData.strHelpText = 
		{
			en: "Copyright (c) 2005-2008 redefinery (Jeffrey R. Almasol). \n" +
			"All rights reserved.\n" +
			"\n" +
			"This script displays a palette Scripts folder  extensions are displayed.\n" +
			"\n"
		};
		function rd_ScriptLauncher_localize(strVar)
		{
			return strVar["en"];
		}

		function rd_ScriptLauncher_buildUI(thisObj)
		{
			var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", rd_ScriptLauncherData.scriptName, undefined, {resizeable:true});
			
			if (pal != null)
			{
				var res =//2..................................2
				"group { \
					orientation:'column', alignment:['fill','fill'], \
					header: Group { \
						alignment:['fill','top'], \
						title: StaticText { text:'" + rd_ScriptLauncherData.scriptName + "', alignment:['fill','center'] }, \
						help: Button { text:'" + rd_ScriptLauncher_localize(rd_ScriptLauncherData.strHelp) +"', maximumSize:[30,20], alignment:['right','center'] }, \
					}, \
					listBox: ListBox { alignment:['fill','fill'], properties:{items:" + rd_ScriptLauncherData.scripts + "} }, \
					footer: Group { \
						alignment:['fill','bottom'], \
						folder: Button { text:'" + rd_ScriptLauncher_localize(rd_ScriptLauncherData.strScriptsFolder) + "', alignment:['left','center'] }, \
						refresh: Button { text:'" + rd_ScriptLauncher_localize(rd_ScriptLauncherData.strRefreshList) + "', alignment:['right','center'] }, \
					}, \
				}";
				pal.grp = pal.add(res);//3.........................................3
				
				// Workaround to ensure the edittext text color is black, even at darker UI brightness levels
				var winGfx = pal.graphics;
				var darkColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0.7058823529411765,0.7058823529411765,0.7058823529411765], 1);
				pal.grp.listBox.graphics.foregroundColor = darkColorBrush;
				pal.grp.listBox.preferredSize.height = 300;
				
				pal.layout.layout(true);//4.........................................4
				pal.grp.minimumSize = [pal.grp.size.width, pal.grp.header.size.height + pal.grp.spacing * 5];
				pal.layout.resize();
				pal.onResizing = pal.onResize = function () {this.layout.resize();}
				
				pal.grp.header.help.onClick = function () {alert(rd_ScriptLauncherData.scriptTitle + "\n" + rd_ScriptLauncher_localize(rd_ScriptLauncherData.strHelpText), rd_ScriptLauncherData.scriptName);}
				pal.grp.footer.folder.onClick = rd_ScriptLauncher_doSelectFolder;
				pal.grp.footer.refresh.onClick = rd_ScriptLauncher_doRefreshList;
				pal.grp.listBox.onDoubleClick = rd_ScriptLauncher_doRun;
			}
			
			return pal;//5.......................................5
		}

		function rd_ScriptLauncher_doSelectFolder()
		{
			var folder = Folder.selectDialog("Locate AE's Scripts folder");
			if (folder != null)
			{
				rd_ScriptLauncherData.scriptPath = folder;
				
				// Store the path in the settings so the user doesn't have to set it the next time
				app.settings.saveSetting("redefinery", "rd_ScriptLauncher_scriptPath", folder.fsName)
				
				rd_ScriptLauncher_buildScriptsList(this.parent.parent.parent);//parameter la [object Window] va mention pandrom
				$.writeln(this.parent.parent.parent)
			}
		}

		function rd_ScriptLauncher_doRefreshList()
		{
			rd_ScriptLauncher_buildScriptsList(this.parent.parent.parent);
		}

		function rd_ScriptLauncher_doRun()
		{
			var scriptSelected = (rdslPal.grp.listBox.selection != null);
			
			if (scriptSelected)
			{
				var scriptIndex = rdslPal.grp.listBox.selection.index;
				var scriptFile = new File(rd_ScriptLauncherData.scriptFiles[scriptIndex].absoluteURI);
				
				// Load the script's contents into a string
				if (scriptFile.fsName.match(/.jsxbin$/) == null)
				{
					var scriptText = "";
					
					// Load the script's contents into a string
					scriptFile.open("r");
					while (!scriptFile.eof)
						scriptText += scriptFile.readln() + "\r\n";
					scriptFile.close();
					
					// Evaluate the script's contents
					eval(scriptText);
				}
				else
					$.evalFile(scriptFile);
			}
		}
		
		function rd_ScriptLauncher_sortByName(a, b)
		{
			if (a.name.toLowerCase() < b.name.toLowerCase())
				return -1;
			else if (a.name.toLowerCase() > b.name.toLowerCase())
				return 1;
			else
				return 0;
		}

		function rd_ScriptLauncher_getAEScripts(path)
		{
			var pathFiles = path.getFiles(), files = new Array(), subfiles;
			
			// Sort the entries in pathFiles
			pathFiles.sort(rd_ScriptLauncher_sortByName);
			
			// Loop through the current folder's files and subfolders
			for (var i = 0; i < pathFiles.length; i++)
				if (pathFiles[i] instanceof Folder)
				{
					// Skip recusion if folder's name is enclosed in parentheses
					if (pathFiles[i].name.match(/^\(.*\)$/))
						continue;
					else
					{
						// Recurse, and append contents - isn't there an easier way, like array addition?
						subfiles = rd_ScriptLauncher_getAEScripts(pathFiles[i]);
						for (var j = 0; j < subfiles.length; j++)
							files[files.length] = subfiles[j];
					}
				}
				else
				{
                    $.writeln(files)
					// Add only files that end in .js or .jsx
					if (pathFiles[i].name.match(/\.(js|jsx|jsxbin)$/)){
						files[files.length] = pathFiles[i];
                        }
				}
			return files;
		}
		function rd_ScriptLauncher_buildScriptsList(palette)
		{
			var fullName, script;
			
			// Remove the existing list items
			palette.grp.listBox.removeAll();
			
			// Load the scripts from the Scripts folder hierarchy
			rd_ScriptLauncherData.scriptFiles = rd_ScriptLauncher_getAEScripts(rd_ScriptLauncherData.scriptPath);
			var item, iconFile;
			for (var i = 0; i < rd_ScriptLauncherData.scriptFiles.length; i++)
			{
				// Build the array of script names used in the UI, but strip off the base path 
				// (and folder separator, assumed as one character)
				fullName = rd_ScriptLauncherData.scriptFiles[i].fsName;
				iconFile = File(fullName.replace(/.(js|jsx|jsxbin)$/,".png"));
				fullName = fullName.substr(rd_ScriptLauncherData.scriptPath.fsName.length+1);
				
				// Add the script's name to the list box
				item = palette.grp.listBox.add("item", fullName);
				if (iconFile.exists)
					item.icon = iconFile;
			}
		}
    
		// main code:
		// Prerequisites check
		if (parseFloat(app.version) < 8.0)
			alert(rd_ScriptLauncher_localize(rd_ScriptLauncherData.strMinAE80), rd_ScriptLauncherData.scriptName);
		else
		{
			// Check if the script path variable is stored in the settings; use if so
			var gotScriptPath = false;
			if (app.settings.haveSetting("redefinery", "rd_ScriptLauncher_scriptPath"))
			{
				rd_ScriptLauncherData.scriptPath = new Folder(app.settings.getSetting("redefinery", "rd_ScriptLauncher_scriptPath"));
				gotScriptPath = true;
			}
			else
			{
				// No stored script path, so ask the user where the Scripts folder is located
				var folder = Folder.selectDialog("Locate AE's Scripts folder");
				if (folder != null)
				{
					rd_ScriptLauncherData.scriptPath = folder;
					gotScriptPath = true;
					
					// Store the path in the settings so the user doesn't have to set it the next time
					app.settings.saveSetting("redefinery", "rd_ScriptLauncher_scriptPath", folder.fsName)
				}
			}
			
			// Build and show the palette
			var rdslPal= rd_ScriptLauncher_buildUI(thisObj);
			if (rdslPal != null)
			{
				if (gotScriptPath)
					rd_ScriptLauncher_buildScriptsList(rdslPal);
				else
					alert(rd_ScriptLauncher_localize(rd_ScriptLauncherData.strErrNoScriptsPath), rd_ScriptLauncherData.scriptName);
				
				if (rdslPal instanceof Window)//6.....................................6
				{
					rdslPal.center();
					rdslPal.show();
				}
				else
					rdslPal.layout.layout(true);
			}
		}
	}
	rd_ScriptLauncher(this);//7.................................................7
}