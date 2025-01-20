const PluginManager = require("./lib/plugins_manager.js");
const plugin= require("./lib/types/plugin.js");
const { requestPage,include_page,get_asset_dir }=require("./core/caller.js");
const { name } = require("ejs");

module.exports={
    plugin,
    PluginManager,
    requestPage,
    include_page,
    get_asset_dir
};
