const fs=require("fs");
const path=require("path");
const plugin=require("./types/plugin.js");

module.exports=class PluginManager {
    _GLOBAL_URL=path.join(__dirname,"../plugins.json");
    _DATA={};
    get_plugin(pluginId){
        const all=this.get();
        let found={};
        for(let i in all.src){
            if(all.src[i]!=null){
                if(all.src[i].id==pluginId){
                    found={...all.src[i]};
                }
            }
        }
        return Object.keys(found).length > 0 ? found : null;
    }


    update(){
        const file=fs.readFileSync(this._GLOBAL_URL);
        this._DATA={...JSON.parse(file.toString())};
    }
    get(){
        return this._DATA;
    }
    commit(){
        this._format([null]);

        const json=JSON.stringify(this.get());
        fs.writeFileSync(this._GLOBAL_URL,json);
        this.update();
    }
    _format(filter=[]){
        const newObj=[];
        const data=this.get();
        data.src.forEach(item=>{
            if(!filter.includes(item)){
                newObj.push(item);
            }
        });
        this._DATA.src=newObj;
    }
    add_plugin(data,override=false){
        this.update();
        if(this.get_plugin(data.id)!=null && !override){
            throw new Error(`id ${data.id} was used in another aplication`);
            this._DATA.src.push(data.get());
        }
        else {
            let index=-1;
            const all=this.get().src;
            for(let i in all){
                if(all[i].id==data.get().id){
                    index=i;
                }
            }
            if(index>-1){
                this._DATA.src[index]=data.get();
            }
            else{
                this.add_plugin(data);
            }
        }
        
        this.commit();
    }
    removePlugin(id){
        const data=this.get();
        let index=-1;
        for(let i in data.src){
            if(typeof data.src === "object"){
                if(data.src[i].id==id){
                    index=i;
                }
            }
            
        }
        if(index>-1){
            delete this._DATA.src[index];
            this.commit();
            console.log(`plugin ${id} deleted sucessful`);
        }
    }
    constructor(){
        this.update();
    }
}