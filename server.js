const express=require("express");
const plugins =require("./lib/plugins_manager.js");
const data=require("./core/ViewManager.js");
const { get_asset_dir }=require("./core/caller.js");

const app=express();
const plugin=require("./");

function get_content(theme,data){
	const caller=plugin.requestPage(theme,"home",data);
	return caller;
}

function run(port=3000,dir){
    app.get("/docs/pcontent/:plugin/:res",(req,res)=>{
        const get_asset=get_asset_dir(req.params.plugin,req.params.res);
        res.status(200).sendFile(get_asset);
    });
    app.get("/",(req,res)=>{
        const html=get_content(dir,data);
        res.status(200).send(html);
    })
    app.listen(port,()=>console.log("server listenning at "+port));
}

module.exports=run;