const fs=require("fs");
const path=require("path");
const pluginManager=require("../lib/plugins_manager.js");
const ejs=require("ejs");

const manager=new pluginManager();

function include_page(root,page,data,asset=false){
    const full_dir=path.join(root,page);
    const content=fs.readFileSync(full_dir,"utf-8");
    if(asset){
        return content;
    }
    const html=ejs.render(content,data);
    return html;
}
function get_asset_dir(theme,asset){
    const plugin=manager.get_plugin(theme);
    if(plugin==null){
        return false;
    }
    const url=path.join(__dirname,`../plugins/${theme}`);
    const manifest=JSON.parse(fs.readFileSync(path.join(url,"/theme.json"),"utf8"));
    const static=path.join(url,manifest.static);
    console.log("static",static)
    try {
        return path.join(static,asset)
    } catch(e) {
        // statements
        console.log(e);
        return false;
    }
}

function requestPage(theme,page,data={shop:[],meta:{}}){
    const plugin=manager.get_plugin(theme);
    if(plugin==null){
        return false;
    }
    const url=path.join(__dirname,`../plugins/${theme}`);
    try {
         const theme_manifest=fs.readFileSync(path.join(url,"theme.json"));
         const manifest=JSON.parse(theme_manifest);
         const pages_root=path.join(url,manifest.pageRoot);
         const target_page=path.join(pages_root,manifest["@pages"][page]);
         const content_page=fs.readFileSync(target_page,"utf-8");
         const options={
            link:(page)=>{
                return include_page(pages_root,page,{...data,...options});
            },
            link_to:(asset)=>{
                return `/docs/pcontent/${theme}/${asset}`;
            }
         }
         const html=ejs.render(content_page,{...data,...options});
         return html;
    } catch (error) {
      console.log(error)
    }
    return null;
}

module.exports={
    requestPage,
    include_page,
    get_asset_dir
};