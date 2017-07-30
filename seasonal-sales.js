"use strict";

const display = document.querySelector("#display");
let products = [];
let categories = [];

function get(file) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", store);
    xhr.addEventListener("error", oops);
    xhr.open("GET", file);
    xhr.send();

}

function oops(error){
    console.log("there was an error with the hxr", error);
}

function store(load){
    let data = JSON.parse(this.responseText);
    let value = Object.keys(data)[0];
    switch(value){
        case 'products': products = data.products;
        console.log("products", products);
        break;
        case 'categories': categories = data.categories;
        console.log("categories", categories);
        break;
    }
    combine(products, categories);
}

function combine(prod, cat){
    prod.forEach((product)=>{
        cat.forEach((category)=>{
            if(product.category_id === category.id){
                product.category_info = category;
            }
        });
    });
console.log("products with cat_info: ", products);
}



get('products.json');
get('categories.json');