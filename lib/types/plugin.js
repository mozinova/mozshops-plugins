module.exports=class {
    name="";
    version="";
    author="";
    type="theme";
    description="";
    preview="";
    id="";
    constructor(id,name,version,author,type,description,preview){
        if(type != "theme" && type!= "function"){
            throw new Error(`plugin of type ${type}  not aplicable`);
        }
        if(name.replace(/\s/g,"")=="" || preview.replace(/\s/g,"")==""){
            throw new Error(`fields name and preview cannot be empty`);            
        } 
        const id_parts=id.split(".");
        if(id_parts.length == 0 || id.length < 4){
            throw new Error(`id ${id} is invalid`);
        }
        this.id=id.replace(/\s/g,"");
        this.name=name;
        this.author=author;
        this.preview=preview;
        this.description=description;
        this.version=version;
        this.type=type;
    }
    get(){
        return {
            id:this.id,
            name:this.name,
            version:this.version,
            preview:this.preview,
            version:this.version,
            description:this.description,
            type:this.type,
            author:this.author
        };
    }
    getJson(){
        return JSON.stringify(this.get());
    }
}