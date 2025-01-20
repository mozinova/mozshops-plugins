const fs=require("fs");
const path=require("path");

function copyDir(src,dist){
    console.log([src,dist])
    if(!fs.existsSync(dist)){
        fs.mkdirSync(dist,{
            recursive:true
        });
    }
    const items=fs.readdirSync(src);
    for (let i in items){
        const srcPath=path.join(src,items[i]);
        const _dist=path.join(dist,items[i]);
        if(fs.lstatSync(srcPath).isDirectory()){
            copyDir(srcPath,_dist);
        }
        else {
            fs.copyFileSync(srcPath,_dist)
        }
    }
}

module.exports={
    copyDir
}