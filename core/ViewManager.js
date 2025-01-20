const product={
    id:"rrgggre4rrrf",
    product_name:"Sample Product", 
    product_description:"This is a sample product to test your plugin",
    price:"999",
    quantity:10,
    product_photos:"/docs/pcontent/default.theme/233392354.jpg" 
}
const products=[

]
for (let i=0;i<9;i++){
    products.push(product);
}
const data={
    id:"bfhhvfhvureure7r",
    shop_name:"Test Shop",
    shop_description:"Test SHop",
    shop_icon:"/docs/pcontent/default.theme/app_icon.jpg", 
    visits:19,
    products
}
const shop=[
    data
];

const meta={
    shop:data.id,
    name:data.shop_name,
    icone:data.shop_icon,
    all:shop,
    is_auth:{
        whatsapp:"860614661",
        address:"Maputo"
    }
}//shared data between pages

module.exports={
    meta,
    shop
};