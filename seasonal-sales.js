"use strict";


function get(file) {
    console.log("get fired" );
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", display);
    xhr.addEventListener("error", oops);
    xhr.open("GET", file);
    xhr.send();

}

function display(load){
    let data = JSON.parse(this.responseText);
    console.log(`load data ${Object.keys(data)[0]}: `, data);
}

function oops(error){
    console.log("there was an error with the hxr", error);
}

get('products.json');
get('categories.json');