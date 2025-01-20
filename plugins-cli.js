#!/usr/bin/env node
const args=process.argv.slice(2);
const PluginManager = require("./");
const path=require("path");
const __workingDir=process.cwd();
const fs=require("fs");
const helper=require("./lib/types/helper.js");
const Plugin = require("./lib/types/plugin.js");
const server=require("./server.js");

const manager=new PluginManager.PluginManager();

switch (args[0]){
    case "plugin":
        if(args.length==1){
            console.error("Not plugin id especified");
        }
        else if(args.length==2) {
           const plugin=manager.get_plugin(args[1]);
           console.log(plugin);
        }
        else if(args.length==3){
            const options=['-r'];
            if(args[1]==options[0]){
                manager.removePlugin(args[2]);
            }
        }
    break;
    case "--init":
        const folder_name=__workingDir.split("/");
        const folder=folder_name[folder_name.length - 1];

        const template=`
        {
            "id":"${folder}",
            "name":"plguin",
            "version":"1.0",
            "type":"theme",
            "author":"author",
            "description":"",
            "preview":""
        }
        `;
        fs.writeFileSync("plugin.json",template);
        break;
    case "publish":
        const get_manifest=fs.readdirSync(__workingDir);
        console.log(get_manifest);
        if(!get_manifest.includes("plugin.json")){
            throw new Error("plugin.json file not found at current director")
        }
        const manifest=fs.readFileSync(path.join(__workingDir,"plugin.json"));
        const data=JSON.parse(manifest.toString());
        console.log(data);
        const _newplugin=new Plugin(data.id,data.name,data.version,data.author,data.type,data.description,data.preview);

        const plugins_dir=path.join(__dirname,"/plugins/");
        const add= manager.add_plugin(_newplugin,true);
        const _toCopy=__workingDir.split("/");
        delete _toCopy[_toCopy.length - 1];
        const toCopy=_toCopy.join("/").replace("null","");

        if(manager.get_plugin(data.id)){
            helper.copyDir(toCopy,plugins_dir);
        }

    break;
    case "test":
        if(args.length>1){
            const targetPlugin=args[1];
            console.log(`running plugin ${targetPlugin} in dev mode, see https://mozshops.store/dev/plugins to know how to publish to the plugin store`);
            const plugin_found=manager.get_plugin(targetPlugin);
            if(plugin_found==null){
                throw new Error(`plugin ${targetPlugin} not found or not registed try ms-plugins publish `);
            }
            const port=args[2];
            if(!port){
                console.log(`No port selected  running at the default port 3000 use ms-plugins test <plugin> <port>`);
            }
            server(!port?3000:port,targetPlugin);
        }
        break;
    case "--help":
        break;
    default:
        console.log(`argument ${args[0]} not found try --help`)
}