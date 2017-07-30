"use strict";

const displayDiv = document.querySelector("#display");
const selectSeason = document.querySelector("#seasons");
let products = [];
let categories = [];

selectSeason.addEventListener("change", showDiscounts);

function showDiscounts(e){
    let season = e.currentTarget.value;
    let items = products.filter((prod)=> prod.category_info.season_discount === season)
    let discountedItems = items.map((prod)=> {
            console.log("prod: in map: ", prod);
            prod.price = (prod.price - (prod.price*prod.category_info.discount)).toFixed(2);
            return prod;
        });

    console.log("discountedItems", discountedItems);
    displayDiv.innerHTML = ""
    
    discountedItems.forEach((prod)=>{
        displayDiv.innerHTML += `<div>
                                <h2>Name: ${prod.name}</h2>
                                <p>Department: ${prod.category_info.name}</p>
                                <p>Discounted Price: ${prod.price}</p>
                                </div>`;
                                
        
    });
}

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
        break;
        case 'categories': 
        categories = data.categories;
        combine(products, categories);
        break;
    }
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
display(products);
}

function display(prods){
    prods.forEach((prod)=>{
        displayDiv.innerHTML += `<div>
                                <h2>Name: ${prod.name}</h2>
                                <p>Department: ${prod.category_info.name}</p>
                                <p>Price: ${prod.price}</p>
                              </div>`
    });
}


get('products.json');
get('categories.json');